import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/store";

function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  

  const { getUserItems,url,userItems, ownerId ,categories} = useContext(StoreContext);

  useEffect(() => {
    getUserItems(ownerId);   
  }, []);

  
  const filteredList = userItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Menu Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your cafe's dishes and prices
          </p>
        </div>

        {/* Statistics Cards (Mini) */}
        <div className="flex gap-4">
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            <p className="text-xs text-gray-500 uppercase font-semibold">
              Total Items
            </p>
            <p className="text-xl font-bold text-gray-800">
              {filteredList.length}
            </p>
          </div>
        </div>
      </div>

      {/* --- CONTROLS SECTION (Search & Filter) --- */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {/* Search Icon */}
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out sm:text-sm"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* --- TABLE HEADER (Desktop Only) --- */}
      <div className="hidden md:grid grid-cols-[80px_2fr_3fr_1.5fr_1fr] gap-4 px-6 py-3 bg-gray-100 rounded-t-xl text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
        <p>Image</p>
        <p>Name</p>
        <p>Description</p>
        <p>Category</p>
        <p className="text-right">Price</p>
        {/* <p className="text-center">Actions</p> */}
      </div>

      {/* --- LIST ITEMS --- */}
      <div className="space-y-4 md:space-y-0 bg-white rounded-b-xl shadow-sm border border-gray-200 md:border-t-0">
        {filteredList.length > 0 ? (
          filteredList.map((item, i) => (
            <div
              key={i}
              className="group gap-10 flex flex-col md:grid md:grid-cols-[80px_2fr_3fr_1.5fr_1fr] p-4 border-b border-gray-500 last:border-b-0 hover:bg-orange-50/30 transition-colors duration-200 items-center"
            >
              {/* Image */}
              <div className="flex items-center justify-between w-full md:w-auto">
                <img
                  className="w-16 h-16 object-cover rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-300"
                  src={`${url}/uploads/${item.image}`}
                  alt={item.name}
                />
                {/* Mobile Price (Shown here for layout balance on mobile) */}
                <span className="md:hidden text-lg font-bold text-gray-900">
                  {item.price * 10} Birr
                </span>
              </div>

              {/* Name */}
              <div className="w-full">
                <p className="font-bold text-gray-800 text-lg md:text-base">
                  {item.name}
                </p>
                {/* Mobile Category (Shown under name on mobile) */}
                <span className="md:hidden inline-block px-2 py-0.5 mt-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                  {item.category}
                </span>
              </div>

              {/* Description */}
              <div className="w-full">
                <p className="text-gray-500 text-sm line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Category (Desktop) */}
              <div className="hidden md:block">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                  {item.category}
                </span>
              </div>

              {/* Price (Desktop) */}
              <div className="hidden md:block text-right">
                <p className="font-bold text-gray-900">
                  {item.price * 10} Birr
                </p>
              </div>

         
            </div>
          ))
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-gray-100 p-4 rounded-full mb-3">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No items found</p>
            <p className="text-gray-400 text-sm">
              Try adjusting your search or category filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
