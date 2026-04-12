import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../assets/images";
import { StoreContext } from "../context/storeContext";
import { useNavigate } from "react-router-dom";
import { FaBars, FaSearch, FaTimes, FaUtensils } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const { setSearchTerm, id, searchTerm } = useContext(StoreContext);

  const [isOpen, setIsOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(`/`)}>
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white shrink-0">
            {logo ? (
              <img src={logo} alt="Logo" className="w-full h-full object-cover rounded-full" />
            ) : (
              <FaUtensils />
            )}
          </div>
          {id && (
            <span className={`font-bold text-xl md:text-2xl tracking-tight ${showSearchInput ? "hidden sm:flex transition-all duration-300" : "flex"} ${scrolled ? "text-gray-800 md:text-gray-800" : "text-gray-800"}`}>
              The Daily Feast
            </span>
          )}
        </div>
        {!id && (
          <span className={`font-bold text-xl md:text-2xl tracking-tight ${scrolled ? "text-gray-800" : "text-gray-800 md:text-gray-800"}`}>
            The Daily Feast
          </span>
        )}

        {id && (
          <nav className="hidden md:flex items-center gap-8">
            {["HOME", "MENU", "ABOUT US", "CONTACT"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                className={`text-sm font-semibold ${scrolled ? "text-black" : "text-white"} hover:text-orange-500 transition-colors uppercase tracking-wide`}
              >
                {item}
              </a>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3 md:gap-6">
          {id && (
            <div className={`flex items-center bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm transition-all duration-300 ${showSearchInput ? "w-48 md:w-64" : "w-10"}`}>
              <FaSearch
                className="text-gray-500 cursor-pointer hover:text-orange-500 shrink-0"
                onClick={() => setShowSearchInput(!showSearchInput)}
              />
              <input
                type="text"
                value={searchTerm}
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`ml-2 bg-transparent outline-none text-sm text-gray-700 w-full ${showSearchInput ? "block" : "hidden"}`}
              />
            </div>
          )}

          <button
            onClick={() => navigate("/login")}
            className="hidden md:block hover:bg-gray-900 bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-gray-900/20 hover:shadow-orange-500/30"
          >
            Login
          </button>

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

      <div
        ref={navRef}
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col p-6 space-y-4">
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
          <button
            onClick={() => { navigate("/login"); setIsOpen(false); }}
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
