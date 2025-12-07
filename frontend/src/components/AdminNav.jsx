import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUserCog,
  FaCog,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

import logo from "../assets/images";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/store";

function AdminNav() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { logOut, getUser, role, user, ownerId, url } = useContext(StoreContext);

  // Refs for click-outside logic
  const mobileMenuRef = useRef(null);
  const profileMenuRef = useRef(null);
  const mobileBtnRef = useRef(null);
  const profileBtnRef = useRef(null);

  useEffect(() => {
    getUser(ownerId);
  }, [user]);
  // Handle Click Outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close Mobile Menu
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !mobileBtnRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }

      // Close Profile Dropdown
      if (
        isProfileOpen &&
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target) &&
        !profileBtnRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen, isProfileOpen]);

  // Logout Handler
  const handleLogout = () => {
    logOut();
    navigate("/login");
  };

  const navLinks = [
    {
      name: "Dashboard",
      path: role === "user" ? "/admin/dashboard" : "/superadmin/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Management",
      path: role === "user" ? "/admin/management" : "/superadmin/management",
      icon: <FaUserCog />,
    },
    {
      name: "Settings",
      path: role === "user" ? "/admin/setting" : "/superadmin/setting",
      icon: <FaCog />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm font-sans w-full">
      <div className="px-4 md:px-6 h-16 flex items-center justify-between">
        {/* --- LEFT SECTION: Logo & Mobile Toggle --- */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Mobile Hamburger */}
          <button
            ref={mobileBtnRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-500 hover:text-orange-600 focus:outline-none p-1 transition-colors"
          >
            {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>

          {/* Logo Area */}
          <div
            className="flex items-center gap-2"
            onClick={() => navigate("/admin/")}
          >
            <img
              src={logo}
              alt="Logo"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-gray-100 hidden sm:block"
            />
            <span className="text-lg md:text-xl font-bold text-gray-800 tracking-tight">
              The Daily Feast{" "}
              <span className="text-orange-500 text-xs uppercase tracking-wider hidden lg:inline-block ml-1">
                {role}
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          {/* Notification Icon (Visual only) */}
          <button className="relative text-gray-400 hover:text-orange-500 transition-colors">
            <FaBell size={20} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Profile Dropdown Container */}
          <div className="relative">
            <button
              ref={profileBtnRef}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 focus:outline-none group"
            >
              <img
                className="w-9 h-9 rounded-full object-cover border border-gray-200 group-hover:border-orange-500 transition-all"
                src={
                  user.profileImage === "default.jpg"
                    ? assets.profile_icon
                    : `${url}/uploads/${user.profileImage}`
                }
                alt="Profile"
              />
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold capitalize text-gray-700 group-hover:text-orange-600">
                  {user.name}
                </p>
                <p className="text-[10px] text-gray-400">View Profile</p>
              </div>
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div
                ref={profileMenuRef}
                className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in-down origin-top-right"
              >
                <div className="px-4 py-2 border-b border-gray-50 md:hidden">
                  <p className="text-sm font-bold text-gray-800 capitalize">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>

                <button
                  onClick={() => {
                    navigate("/admin/profileSetting");
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 flex items-center gap-2 transition-colors"
                >
                  <FaUserCircle /> Profile
                </button>
                <button
                  onClick={() => {
                    navigate("/admin/setting");
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 flex items-center gap-2 transition-colors"
                >
                  <FaCog /> Settings
                </button>

                <div className="h-px bg-gray-100 my-1"></div>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2 transition-colors font-medium"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- MOBILE NAVIGATION MENU (Slide Down) --- */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-gray-100 ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col bg-gray-50 p-4 gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                    : "bg-white text-gray-600 hover:bg-gray-200"
                }`
              }
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.name}</span>
            </NavLink>
          ))}

          {/* Mobile Logout (Extra accessibility) */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-red-50 text-red-600 mt-2 border border-red-100"
          >
            <FaSignOutAlt className="text-lg" />
            <span>Logout</span>
          </button>
        </ul>
      </div>
    </header>
  );
}

export default AdminNav;
