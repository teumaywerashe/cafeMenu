import React, { useContext, useEffect } from "react";
import { StoreContext } from "../context/store";
import { FaShoppingBag, FaPlusCircle } from "react-icons/fa"; // Using FaPlusCircle for the action button

function ItemsDisplay() {

  const {
    category,
    setCategory,
    categories,
    userItems,
    url,
    id,
    getUserItems,
    searchTerm,
  } = useContext(StoreContext);

  useEffect(() => {
    getUserItems(id);
  }, [id, getUserItems]); // Added dependencies for useEffect

  const filteredItems = userItems?.filter((item) => {
    const newCategory = category === "All" || category === item.category;
    const matchItem = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return newCategory && matchItem;
  });

  const currentCategory = category;

  return (
    <section id="menu" className="py-16 px-4 md:px-10 bg-gray-950 min-h-screen font-sans">
      
      {/* --- SECTION HEADER --- */}
      <div className="text-center mb-12 space-y-4 max-w-5xl mx-auto">
        <h3 className="text-teal-400 font-extrabold uppercase tracking-widest text-sm md:text-base">
          Our Culinary Collection
        </h3>
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
          Explore Our Menu
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto text-lg pt-2">
          Indulge in our exquisite selection of dishes, prepared with premium ingredients
          and passion to deliver an unforgettable dining experience.
        </p>

        {/* CATEGORY FILTER BUTTONS (Improved Responsiveness and Style) */}
        <div className="flex justify-start sm:justify-center overflow-x-auto gap-3 py-6 px-1 md:px-0 scrollbar-hide">
          {categories.map((item, index) => (
            <button
              key={index}         
              onClick={()=>setCategory((pre)=>pre===item?"All":item)}
              className={`
                whitespace-nowrap px-5 py-2 rounded-full font-medium text-sm
                ${currentCategory === item 
                  ? "bg-teal-500 text-gray-900 shadow-lg shadow-teal-500/50 hover:shadow-teal-600/60" 
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"} 
              `}>
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* --- MENU GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 container mx-auto">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) =>(
            <div
              key={index}
              className="group bg-gray-800 rounded-xl shadow-2xl shadow-gray-900/50 transition-all duration-300 border border-gray-800 
                         hover:border-teal-500 hover:shadow-teal-900/50 overflow-hidden flex flex-col transform hover:-translate-y-1" 
            >
              {/* Image Container */}
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={`${url}/uploads/${item.image}`}
                  alt={item.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out" 
                />

                {/* Category Badge */}
                <span className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-medium text-teal-300 uppercase tracking-wider">
                  {item.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors duration-300 line-clamp-1">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                  <div className="flex flex-col leading-none">
                    <span className="text-xs text-gray-500 font-medium uppercase">
                      Price
                    </span>
                    <span className="text-2xl font-black text-white mt-1">
                      {item.price * 10}{" "}
                      <span className="text-sm font-normal text-teal-400">
                        Birr
                      </span>
                    </span>
                  </div>
                  
               
                </div>
              </div>
            </div>
          ))) : (
          <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
            <FaShoppingBag className="text-9xl text-gray-700/50 mb-6 animate-pulse" />
            <h3 className="text-3xl font-extrabold text-white mb-2">
              No Dishes Available
            </h3>
            <p className="text-gray-500 text-lg">
              We couldn't find any items matching the selected criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ItemsDisplay