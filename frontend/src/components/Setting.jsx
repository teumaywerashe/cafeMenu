import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserCircle,
  FaShieldAlt,
  FaChevronRight,
  FaBell,
  FaPalette,
  FaSignOutAlt,
} from "react-icons/fa";
import { StoreContext } from "../context/storeContext";

function Setting() {
  const { role, logOut } = useContext(StoreContext);

  const settingOptions = [
    {
      title: "Profile Settings",
      description: "Update your profile photo, name, and contact details.",
      icon: <FaUserCircle size={24} />,
      path: `/${role}/profileSetting`,
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "Account & Security",
      description: "Manage bank accounts, change password, and security roles.",
      icon: <FaShieldAlt size={24} />,
      path: `/${role}/accountSetting"`, // Assuming you have this route
      color: "text-purple-600 bg-purple-50",
    },
    {
      title: "Notifications",
      description: "Choose what alerts and emails you want to receive.",
      icon: <FaBell size={24} />,
      path: `/${role}/notifications`,
      color: "text-amber-600 bg-amber-50",
    },
    {
      title: "App Appearance",
      description: "Toggle Dark Mode or change the dashboard theme.",
      icon: <FaPalette size={24} />,
      path: `/${role}/appearance`,
      color: "text-teal-600 bg-teal-50",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      {/* --- Page Header --- */}
      <div className="max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage your account preferences and system configurations.
        </p>
      </div>

      {/* --- Settings List --- */}
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {settingOptions.map((option, index) => (
          <NavLink
            key={index}
            to={option.path}
            className={({ isActive }) =>
              `group flex items-center justify-between p-5 bg-white rounded-xl border border-gray-200 shadow-sm transition-all duration-200 
               ${
                 isActive
                   ? "border-orange-500 ring-1 ring-orange-500"
                   : "hover:border-orange-300 hover:shadow-md"
               }`
            }
          >
            <div className="flex items-center gap-5">
              {/* Icon Box */}
              <div
                className={`p-3 rounded-full ${option.color} flex items-center justify-center shrink-0`}
              >
                {option.icon}
              </div>

              {/* Text Info */}
              <div>
                <h2 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                  {option.title}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  {option.description}
                </p>
              </div>
            </div>

            {/* Chevron Arrow */}
            <div className="text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all">
              <FaChevronRight size={18} />
            </div>
          </NavLink>
        ))}

        {/* --- Logout Section (Optional but recommended) --- */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <button
            onClick={logOut}
            className="flex items-center gap-3 text-red-500 font-medium hover:bg-red-50 px-4 py-3 rounded-lg w-full transition-colors"
          >
            <FaSignOutAlt />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Setting;
