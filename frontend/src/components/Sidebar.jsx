import React, { useContext, useEffect } from "react";
import {
  FaCog,
  FaTachometerAlt,
  FaUtensils,
  FaSignOutAlt,
  FaCoffee,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { StoreContext } from "../context/store";

function Sidebar() {
  const { user, logOut, url } = useContext(StoreContext);

  useEffect(() => {
    console.log(user);
  }, []);

  const getLinkClasses = ({ isActive }) => {
    const baseClasses =
      "flex items-center gap-3 px-4 py-3.5 mx-3 rounded-lg transition-all duration-200 font-medium";
    const activeClasses =
      "bg-orange-50 text-orange-600 shadow-sm border-l-4 border-orange-500"; // Active: Light Orange BG + Orange Text
    const inactiveClasses =
      "text-gray-500 hover:bg-gray-100 hover:text-gray-900"; // Inactive: Gray text + Hover Gray

    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-white border-r border-gray-200 shrink-0 font-sans">
      {/* --- LOGO SECTION --- */}
      <div className="flex items-center gap-3 h-20 px-8 border-b border-gray-100">
        <div className="bg-orange-500 p-2 rounded-lg text-white">
          <FaCoffee size={20} />
        </div>
        <div>
          <h1 className="font-bold text-lg text-gray-800 tracking-tight">
            Cafe<span className="text-orange-500">Admin</span>
          </h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
            Manager Panel
          </p>
        </div>
      </div>

      {/* --- NAVIGATION LINKS --- */}
      <nav className="flex-1 flex flex-col gap-1 mt-6">
        <NavLink to="/admin/dashboard" className={getLinkClasses}>
          <FaTachometerAlt size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/management" className={getLinkClasses}>
          <FaUtensils size={18} />
          <span>Menu Management</span>
        </NavLink>

        <NavLink to="/admin/setting" className={getLinkClasses}>
          <FaCog size={18} />
          <span>Settings</span>
        </NavLink>
      </nav>

      {/* --- USER / LOGOUT SECTION --- */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            {/* Placeholder Avatar */}
            <img
              src={
                user.profileImage
                  ? `${url}/uploads/${user.profileImage}`
                  : "https://ui-avatars.com/api/?name=Super+Admin&background=random"
              }
              alt="Admin"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          <button
            onClick={logOut}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <FaSignOutAlt size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
