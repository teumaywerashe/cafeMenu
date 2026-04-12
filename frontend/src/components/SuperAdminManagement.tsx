import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/storeContext";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaPlus, FaSearch, FaTrashAlt } from "react-icons/fa";
import { assets } from "../assets/assets";

function SuperAdminManagement() {
  const navigate = useNavigate();
  const { users, getUsers, deleteUser, url } = useContext(StoreContext);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers();
  }, [users]);

  const filteredUsers = Array.isArray(users)
    ? users.filter((user: any) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">User's Management</h1>
          <p className="text-gray-500 text-sm mt-1">Add, edit, or remove users from your Platform.</p>
        </div>
        <button
          onClick={() => navigate("/superadmin/register")}
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-orange-500/30 transition-all active:scale-95 font-semibold"
        >
          <FaPlus /><span>Register New User</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by user name..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map((user: any, i: number) => (
            <div key={i} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={user.profileImage === "default.jpg" ? assets.profile_icon : `${url}/uploads/${user.profileImage}`}
                  alt={user.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs text-orange-500 font-bold uppercase tracking-wide mb-1">{user.role}</p>
                    <h3 className="font-bold text-gray-800 text-lg leading-tight">{user.name}</h3>
                  </div>
                </div>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">{user.email}</p>
                <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/superadmin/editUser?id=${user._id}`)}
                    className="flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-50 text-gray-600 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
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
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FaSearch className="text-gray-400 text-2xl" />
          </div>
          <h3 className="text-lg font-bold text-gray-700">No users found</h3>
          <p className="text-gray-500 text-sm">Try adjusting your search or check your internet connection.</p>
        </div>
      )}
    </div>
  );
}

export default SuperAdminManagement;
