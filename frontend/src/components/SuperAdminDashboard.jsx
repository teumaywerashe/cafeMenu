import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/store";
import { assets } from "../assets/assets";

function SuperAdminDashboard() {
  const { getUsers, users, url } = useContext(StoreContext);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers();
    console.log(users);
  }, []);

  const filteredUsers=users.filter((user)=>{
    return user.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            User Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your Platform Users and there Profiles
          </p>
        </div>

        {/* Statistics Cards (Mini) */}
        <div className="flex gap-4">
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            <p className="text-xs text-gray-500 uppercase font-semibold">
              Total Users
            </p>
            <p className="text-xl font-bold text-gray-800">{users.length}</p>
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
            placeholder="Search user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* --- TABLE HEADER (Desktop Only) --- */}
      <div className="hidden md:grid grid-cols-[3fr_3fr_3fr_3fr] gap-4 px-6 py-3 bg-gray-100 rounded-t-xl text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
        <p>profileImage</p>
        <p>Name</p>
        <p>Email</p>
        <p>Role</p>
      </div>

      {/* --- LIST ITEMS --- */}
      <div className="space-y-4 md:space-y-0 bg-white rounded-b-xl shadow-sm border border-gray-200 md:border-t-0">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, i) => (
            <div
              key={i}
              className="group gap-10 flex flex-col md:grid md:grid-cols-[3fr_3fr_3fr_3fr] p-4 border-b border-gray-500 last:border-b-0 hover:bg-orange-50/30 transition-colors capitalize duration-200 items-center"
            >
              {/* Image */}
              <div className="flex items-center justify-between w-full md:w-auto">
                <img
                  className="w-16 h-16 object-cover rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-300"
                  src={`${
                    user.profileImage === "default.jpg"
                      ? assets.profile_icon
                      : `${url}/uploads/${user.profileImage}`
                  }`}
                  alt={user.name}
                />
              </div>

              {/* Name */}
              <div className="w-full">
                <p className="font-bold text-gray-800 text-lg md:text-base">
                  {user.name}
                </p>
                {/* Mobile Category (Shown under name on mobile) */}
                <span className="md:hidden inline-block px-2 py-0.5 mt-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                  {user.email}
                </span>
              </div>

              {/* Description */}
              <div className="w-full">
                <p className="text-gray-500 text-sm line-clamp-2">
                  {user.email}
                </p>
              </div>
              <div className="w-full">
                <p className="text-gray-500 text-sm line-clamp-2">
                  {user.role}
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
            <p className="text-gray-500 text-lg">No user found found</p>
            <p className="text-gray-400 text-sm">Try adjusting your search or check your interner connection</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
