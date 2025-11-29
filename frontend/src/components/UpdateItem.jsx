import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
// Assuming food_list is imported correctly
import { food_list } from "../assets/assets";

function UpdateItem() {
  // 1. Simulate fetching the item (In real app, you might get ID from URL params)
  const originalItem = food_list[0]; 

  // 2. State for form data
  const [data, setData] = useState({
    name: originalItem.name,
    category: originalItem.category,
    price: originalItem.price,
    description: originalItem.description,
  });

  // 3. State for Image Preview
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(originalItem.image);

  const categories = ["Salad", "Sandwich", "Rolls", "Pure Veg", "Dessert", "Pasta", "Noodles", "Cake"];

  // Handle Text Inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // Create a temporary local URL for preview
    }
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", data);
    console.log("New Image File:", image);
    alert("Item Updated Successfully!");
  };

  // Cleanup memory for object URL
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl !== originalItem.image) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, originalItem.image]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-orange-500 px-8 py-6">
            <h1 className="text-2xl font-bold text-white tracking-wide">Update Menu Item</h1>
            <p className="text-orange-100 text-sm mt-1">Modify details for <span className="font-bold underline">{originalItem.name}</span></p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Left Side: Image Upload */}
            <div className="w-full md:w-1/3 flex flex-col gap-3">
              <label className="font-semibold text-gray-700">Item Image</label>
              
              <div className="relative group w-full aspect-square bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-orange-400 transition-colors">
                {previewUrl ? (
                   <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                   <div className="text-center text-gray-400">
                     <FaCloudUploadAlt size={32} className="mx-auto mb-2"/>
                     <span className="text-xs">No Image</span>
                   </div>
                )}
                
                {/* Overlay Input */}
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                    <p className="text-white font-medium text-sm flex items-center gap-2">
                        <FaCloudUploadAlt /> Change
                    </p>
                </div>
                <input 
                    type="file" 
                    onChange={handleImageChange} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    accept="image/*"
                />
              </div>
              <p className="text-xs text-gray-400 text-center">Click image to upload new</p>
            </div>

            {/* Right Side: Text Details */}
            <div className="w-full md:w-2/3 space-y-5">
                
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="font-semibold text-gray-700 text-sm">Item Name</label>
                    <input
                        type="text"
                        name="name" // Important for handleInputChange
                        id="name"
                        value={data.name} // Bind to state, not constant
                        onChange={handleInputChange}
                        className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-800"
                        placeholder="e.g. Grilled Salmon"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Category */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="category" className="font-semibold text-gray-700 text-sm">Category</label>
                        <select
                            name="category"
                            id="category"
                            value={data.category}
                            onChange={handleInputChange}
                            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white"
                        >
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="price" className="font-semibold text-gray-700 text-sm">Price (Birr)</label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            value={data.price}
                            onChange={handleInputChange}
                            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="description" className="font-semibold text-gray-700 text-sm">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        value={data.description}
                        onChange={handleInputChange}
                        rows={4}
                        className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none text-sm text-gray-600"
                    ></textarea>
                </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
             <button 
                type="button" 
                className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
             >
                Cancel
             </button>
             <button
                type="submit"
                className="px-8 py-2.5 bg-gray-900 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30"
            >
                Update Item
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default UpdateItem;