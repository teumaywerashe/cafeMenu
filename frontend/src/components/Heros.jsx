import React from "react";
import { assets } from "../assets/assets";
import { FaArrowRight, FaUtensils } from "react-icons/fa";
import { useContext } from "react";
import { StoreContext } from "../context/store";
import { useEffect } from "react";
// import { useSearchParams } from "react-router-dom";

function Hero() {
  // const [searchParams] = useSearchParams();

  // const id = searchParams.get("id");

  const { user, getUser,id } = useContext(StoreContext);
  useEffect(() => {
    getUser(id);
  },[]);
  return (
    <div
      id="home"
      className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-gray-900"
    >
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        {/* The Image */}
        <img
          src={assets.header_img}
          alt="Sara Cafe Interior"
          className="w-full h-full object-cover opacity-90 scale-105 animate-slow-zoom"
        />
        {/* Dark Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/30"></div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center gap-6 animate-fade-in-up">
        {/* Small Tagline */}
        {/* <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-sm font-semibold tracking-widest uppercase mb-2 backdrop-blur-sm">
           Est. 2024 • The Daily Feast
        </span> */}

        {/* Main Headline with Gradient Text */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-tight drop-shadow-lg">
          Welcome to <br />
          <span className="bg-clip-text text-transparent bg-linear-to-r from-orange-400 capitalize to-amber-200">
            {user.name} Cafe
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl text-gray-200 font-light max-w-2xl leading-relaxed drop-shadow-md">
          Where every bite tells a story and every flavor sparks joy. Experience
          the taste of perfection.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <a
            href="#menu"
            className="group relative px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(234,88,12,0.5)] hover:shadow-[0_0_30px_rgba(234,88,12,0.7)] hover:-translate-y-1 flex items-center gap-2"
          >
            View Full Menu
            <FaUtensils className="text-sm group-hover:rotate-12 transition-transform" />
          </a>

          {/* <a 
            href="#about" 
            className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full transition-all duration-300 hover:-translate-y-1"
          >
            Book a Table
          </a> */}
        </div>
      </div>

      {/* --- SCROLL INDICATOR (Bottom) --- */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce opacity-80">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest opacity-70">
            Scroll
          </span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-orange-500 rounded-full animate-scroll-down"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
