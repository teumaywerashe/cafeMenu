import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
// import { assets } from "../assets/assets"; // Keeping your asset import
import { FaClosedCaptioning, FaCloudUploadAlt, FaEraser, FaHandMiddleFinger, FaPlus, FaRemoveFormat, FaXbox, FaXing, FaXRay } from "react-icons/fa";
import { StoreContext } from "../context/store";
import { useNavigate } from "react-router-dom";
import { PlusIcon, X } from "lucide-react";

function AddItem() {
  const navigate = useNavigate();
  const {categories, url, ownerId, token } = useContext(StoreContext);

  // 1. Centralized State for Form Data
  const [data, setData] = useState({
    ownerId,
    name: "",
    category: "Salad",
    price: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [newCategory, setNewCategory] = useState("");
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  // List of Categories (Easier to manage)
  

  // 2. Handle Text Input Changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // 3. Handle Image Selection
  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // 4. Handle Submit
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      if (image) {
        formData.append("image", image);
      }

      for (const key in data) {
        formData.append(key, data[key]);
      }
      const response = await axios.post(`${url}/items/add`, formData, {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "multipart/form-data",
      });
      if (response.data.success) {
        // console.log(response.data.item);
        setTimeout(() => {
          alert("Item Added Successfully!");
        }, 1500);
        navigate("/admin/dashboard");
      } else {
        setTimeout(() => {
          alert(response.data.msg);
        }, 500);
      }
    } catch (error) {
      setTimeout(() => {
        alert(error.response);
      }, 1500);
      // console.log(error);
    } finally {
      setTimeout(() => {
        // Reset Form
        setData({ name: "", category: "Salad", price: "", description: "" });
        setImage(null);
        setPreviewUrl(null);
        setLoading(false);
      }, 1500);
    }
  };

  // Cleanup memory for image preview
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* --- Header --- */}
        <div className="bg-linear-to-r from-orange-500 to-amber-500 px-8 py-6 text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-wide">Add New Item</h1>
            <p className="text-orange-100 text-sm mt-1">
              Create a new dish for your menu
            </p>
          </div>
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
            <FaPlus size={20} />
          </div>
        </div>

        <form onSubmit={onSubmitHandler} className="p-8">
          <div className="flex flex-col md:flex-row gap-10">
            {/* --- LEFT COLUMN: Image Upload --- */}
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              <label className="font-semibold text-gray-700">
                Upload Image
              </label>

              <div className="relative group w-full aspect-4/3 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-orange-400 hover:bg-orange-50 transition-all cursor-pointer">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-gray-400 group-hover:text-orange-500 transition-colors">
                    <FaCloudUploadAlt size={40} className="mx-auto mb-2" />
                    <span className="text-sm font-medium">Click to upload</span>
                  </div>
                )}

                <input
                  type="file"
                  onChange={onImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required
                />
              </div>
              <p className="text-xs text-gray-400 text-center">
                Supports: JPG, PNG, WEBP (Max 5MB)
              </p>
            </div>

            {/* --- RIGHT COLUMN: Form Details --- */}
            <div className="w-full md:w-2/3 flex flex-col gap-5">
              {/* Item Name */}
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-700 text-sm">
                  Item Name
                </label>
                <input
                  name="name"
                  value={data.name}
                  onChange={onChangeHandler}
                  type="text"
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                  placeholder="e.g. Spicy Chicken Burger"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-gray-700 text-sm">
                    Category
                  </label>


                  <div className="flex items-center justify-between"> 
                    <select
                    name="category"
                    value={data.category}
                    onChange={onChangeHandler}
                    className="p-3 border border-gray-300 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 bg-white cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowNewCategoryInput((pre) => !pre)}
                    className="flex items-center justify-between mt-2 text-xs text-orange-500 hover:underline self-start"
                  >
                    <PlusIcon/>
                  </button></div>
    
                 
                  {showNewCategoryInput && (
                    <div className="flex items-center gap-2 justify-between   ">
                      <input
                        type="text"
                        value={data.category}
                        name="category"
                        onChange={(e) => onChangeHandler(e)}
                        placeholder="New Category"
                        className=" border border-gray-300 px-4 pr-4 py-3  rounded-lg w-full focus:outline-none focus:ring-0  focus:border-0 transition-all"
                      />
                     <X className="cursor-pointer" onClick={() => setShowNewCategoryInput(false)}/>
            
                    </div>
                  )}
                </div>

            

                {/* Price */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-gray-700 text-sm">
                    Price (Birr)
                  </label>
                  <div></div>
                  <input
                    name="price"
                    value={data.price}
                    onChange={onChangeHandler}
                    type="number"
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-700 text-sm">
                  Description
                </label>
                <textarea
                  name="description"
                  value={data.description}
                  onChange={onChangeHandler}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all resize-none h-32"
                  placeholder="Write a short description about the food..."
                  required
                ></textarea>
              </div>
            </div>
          </div>

          {/* --- Footer Actions --- */}
          <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                setData({
                  name: "",
                  category: "Salad",
                  price: "",
                  description: "",
                });
                setImage(null);
                setPreviewUrl(null);
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
            >
              <FaEraser /> Reset
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg text-white font-bold shadow-lg shadow-orange-500/20 transition-all transform active:scale-95
                ${
                  loading
                    ? "bg-orange-300 cursor-wait"
                    : "bg-orange-600 hover:bg-orange-700 hover:-translate-y-1"
                }`}
            >
              {loading ? "Adding..." : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItem;
