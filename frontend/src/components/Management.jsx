import React, { useContext, useEffect, useState } from "react";

import { FaPlus, FaSearch, FaEdit, FaTrashAlt, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/store";


function Management() {
  const navigate = useNavigate();
  const {categories,getUserItems,ownerId,deleteItem,userItems,url}=useContext(StoreContext)
 
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  

  const filteredList = userItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(()=>{
    getUserItems(ownerId)
  },[userItems])

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      
  
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Menu Management</h1>
          <p className="text-gray-500 text-sm mt-1">Add, edit, or remove items from your menu.</p>
        </div>
        
        <button 
          onClick={() => navigate('/admin/addItem')} 
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-orange-500/30 transition-all active:scale-95 font-semibold"
        >
          <FaPlus />
          <span>Add New Item</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        <div className="relative w-full md:w-96">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search item name..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
           <FaFilter className="text-gray-400 hidden md:block" />
           <select 
             className="w-full md:w-48 p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 cursor-pointer"
             value={selectedCategory}
             onChange={(e) => setSelectedCategory(e.target.value)}
           >
             {categories.map((cat, i) => (
               <option key={i} value={cat}>{cat}</option>
             ))}
           </select>
        </div>
      </div>

  
      {filteredList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredList.map((item, i) => (
            <div key={i} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
              
              <div className="relative h-48 overflow-hidden">
                <img src={`${url}/uploads/${item.image}`} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-md text-xs font-bold text-gray-700 shadow-sm">
                  {item.price * 10} Birr
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                   <div>
                     <p className="text-xs text-orange-500 font-bold uppercase tracking-wide mb-1">{item.category}</p>
                     <h3 className="font-bold text-gray-800 text-lg leading-tight">{item.name}</h3>
                   </div>
                </div>
                
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">
                  {item.description}
                </p>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => navigate(`/admin/edit?id=${item._id }`)} 
                    className="flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-50 text-gray-600 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button 
                    onClick={() => deleteItem(item._id)} 
                    className="flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-50 text-gray-600 font-medium hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* --- EMPTY STATE --- */
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
           <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaSearch className="text-gray-400 text-2xl" />
           </div>
           <h3 className="text-lg font-bold text-gray-700">No items found</h3>
           <p className="text-gray-500 text-sm">Try adjusting your search or category filter.</p>
           <button 
             onClick={() => {setSearchTerm(""); setSelectedCategory("All")}}
             className="mt-4 text-orange-600 font-semibold hover:underline"
            >
             Clear Filters
           </button>
        </div>
      )}

    </div>
  );
}

export default Management;