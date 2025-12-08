import React, { useContext, useEffect, useRef, useState } from "react";
// Replace this with your actual image path or keep it
import logo from "../assets/images";
// import { menu_list } from "../assets/assets";
import { StoreContext } from "../context/store";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaChevronDown,
  FaSearch,
  FaTimes,
  FaUtensils,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const { setSearchTerm, id, searchTerm } = useContext(StoreContext);

  // States
  const [isOpen, setIsOpen] = useState(false); // Mobile Menu
  // const [showMenuList, setShowMenuList] = useState(false); // "More" Dropdown
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close Mobile Menu if clicked outside
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* --- LEFT: LOGO --- */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate(`/user?id=${id}`)}
        >
          {/* Fallback icon if image fails or isn't present */}
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white shrink-0">
            {logo ? (
              <img
                src={logo}
                alt="Logo"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <FaUtensils />
            )}
          </div>
          {id && (
            <span
              className={`font-bold text-xl md:text-2xl tracking-tight ${
                scrolled ? "text-gray-800" : "text-gray-800 md:text-gray-800"
              }`}
            >
              The Daily Feast
            </span>
          )}
        </div>
        {!id && (
          <span
            className={`font-bold text-xl md:text-2xl tracking-tight ${
              scrolled ? "text-gray-800" : "text-gray-800 md:text-gray-800"
            }`}
          >
            The Daily Feast
          </span>
        )}

        {/* --- CENTER: DESKTOP NAV --- */}
        {id && (
          <nav className="hidden md:flex items-center gap-8">
            {["HOME", "MENU", "ABOUT US", "CONTACT"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                className="text-sm font-semibold text-white hover:text-orange-500 transition-colors uppercase tracking-wide"
              >
                {item}
              </a>
            ))}
          </nav>
        )}

        {/* --- RIGHT: ACTIONS --- */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Search Bar (Expandable) */}
          {id && (
            <>
              {" "}
              <div
                className={`flex items-center bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm transition-all duration-300 ${
                  showSearchInput ? "w-48 md:w-64" : "w-10"
                }`}
              >
                <FaSearch
                  className="text-gray-500 cursor-pointer hover:text-orange-500 shrink-0"
                  onClick={() => setShowSearchInput(!showSearchInput)}
                />
                <input
                  type="text"
                  value={searchTerm}
                  placeholder="Search..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`ml-2 bg-transparent outline-none text-sm text-gray-700 w-full ${
                    showSearchInput ? "block" : "hidden"
                  }`}
                />
              </div>
              {/* <div className="relative" ref={menuListRef}>
                <button
                  onClick={() => setShowMenuList(!showMenuList)}
                  className="hidden md:flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-orange-500 transition-colors"
                >
                  Categories{" "}
                  <FaChevronDown
                    className={`text-xs transition-transform duration-200 ${
                      showMenuList ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showMenuList && (
                  <div className="absolute top-10 right-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 animate-fadeIn origin-top-right">
               
                    <button
                      onClick={() => {
                        setCategory("All");
                        setShowMenuList(false);
                      }}
                      className={`w-full cursor-pointer text-left px-4 py-2 text-sm hover:bg-orange-50 transition-colors ${
                        categories === "All"
                          ? "text-orange-600 font-bold bg-orange-50"
                          : "text-gray-600"
                      }`}
                    >
                      All Items
                    </button>
                    <div className="h-px bg-gray-100 my-1"></div>

                  </div>
                )}
              </div> */}
            </>
          )}

          {/* Login / Get Started */}
          <button
            onClick={() => navigate("/login")}
            className="hidden md:block hover:bg-gray-900 bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-gray-900/20 hover:shadow-orange-500/30"
          >
            Login
          </button>

          {/* Mobile Toggle Button */}
          {id ? (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-700 hover:text-orange-500 cursor-pointer text-2xl focus:outline-none"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="md:hidden hover:bg-gray-900 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium transition-all shadow-lg shadow-gray-900/20 hover:shadow-orange-500/30"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div
        ref={navRef}
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col p-6 space-y-4">
          {/* <a href="/accounts"><button>accounts</button></a> */}
          {["HOME", "MENU", "ABOUT US", "CONTACT"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-gray-700 hover:text-orange-500 border-b border-gray-50 pb-2"
            >
              {item}
            </a>
          ))}

          {/* Mobile Categories Accordion */}
          {/* <div className="pt-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Categories
            </p>
            <div className="grid grid-cols-2 gap-2">
              {categories?.map((item, i) => (
                <a key={i} href="#menu">
                  {" "}
                  <button
                    key={i}
                    onClick={() => {
                      setCategory((pre) => (pre === item ? "All" : item));
                      setIsOpen(false);
                      // Scroll to menu section logic here if needed
                    }}
                    className={`text-sm cursor-pointer text-left px-3 py-2 rounded-lg ${
                      category === item
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-50 text-gray-600"
                    }`}
                  >
                    {item}
                  </button>
                </a>
              ))}
            </div>
          </div> */}

          <button
            onClick={() => {
              navigate("/login");
              setIsOpen(false);
            }}
            className="w-full cursor-pointer bg-orange-500 text-white py-3 rounded-xl font-bold mt-4"
          >
            Login
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
