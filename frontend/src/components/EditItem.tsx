import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../context/storeContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaBackward, FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";

function EditItem() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const navigate = useNavigate();
  const { url, token, item, setItem, getItem } = useContext(StoreContext);

  useEffect(() => { getItem(id); }, []);

  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const categories = ["Salad", "Sandwich", "Rolls", "Pure Veg", "Dessert", "Pasta", "Noodles", "Cake"];

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setItem((prev: any) => ({ ...prev, [name]: value }));
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      if (image) formData.append("image", image);
      for (const key in item) {
        formData.append(key, item[key]);
      }
      const response = await axios.patch(`${url}/items/update/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setTimeout(() => { toast.success("Item Edited Successfully!"); }, 1500);
        navigate("/admin/dashboard");
      } else {
        setTimeout(() => { toast.error(response.data.msg); }, 500);
      }
    } catch (error) {
      setTimeout(() => { toast.error("Error updating item"); }, 1500);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-linear-to-r from-orange-500 to-amber-500 px-8 py-6 text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-wide">Edit Item</h1>
            <p className="text-orange-100 text-sm mt-1">Edit Item's of your menu</p>
          </div>
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm"><FaEdit size={20} /></div>
        </div>

        <form onSubmit={onSubmitHandler} className="p-8">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              <label className="font-semibold text-gray-700">Edit Image</label>
              <div className="relative group w-full aspect-4/3 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-orange-400 hover:bg-orange-50 transition-all cursor-pointer">
                <img src={image ? previewUrl! : `${url}/uploads/${item.image}`} alt="Preview" className="w-full h-full object-cover" />
                <input type="file" onChange={onImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </div>
              <p className="text-xs text-gray-400 text-center">Supports: JPG, PNG, WEBP (Max 5MB)</p>
            </div>

            <div className="w-full md:w-2/3 flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-700 text-sm">Item Name</label>
                <input name="name" value={item.name} onChange={onChangeHandler} type="text"
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                  placeholder="e.g. Spicy Chicken Burger" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-gray-700 text-sm">Category</label>
                  <select name="category" value={item.category} onChange={onChangeHandler}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 bg-white cursor-pointer">
                    {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-gray-700 text-sm">Price (Birr)</label>
                  <input name="price" value={item.price} onChange={onChangeHandler} type="number"
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                    placeholder="0.00" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-700 text-sm">Description</label>
                <textarea name="description" value={item.description} onChange={onChangeHandler}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all resize-none h-32"
                  placeholder="Write a short description about the food..."></textarea>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-100">
            <button type="button" onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition-colors">
              <FaBackward /> Back
            </button>
            <button type="submit" disabled={loading}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg text-white font-bold shadow-lg shadow-orange-500/20 transition-all transform active:scale-95
                ${loading ? "bg-orange-300 cursor-wait" : "bg-orange-600 hover:bg-orange-700 hover:-translate-y-1"}`}>
              {loading ? "Editing..." : "Edit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditItem;
