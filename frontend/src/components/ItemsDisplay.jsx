import React, { useContext, useEffect } from "react";
import { StoreContext } from "../context/store";
import { FaShoppingBag } from "react-icons/fa";

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
  }, [id, getUserItems]);

  const filteredItems = userItems?.filter((item) => {
    const newCategory = category === "All" || category === item.category;
    const matchItem = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return newCategory && matchItem;
  });

  const currentCategory = category;

  return (
    <section
      id="menu"
      className="py-16 px-4 md:px-10 bg-white min-h-screen font-sans"
    >
      {/* --- SECTION HEADER --- */}
      <div className="text-center mb-12 space-y-4 max-w-5xl mx-auto">
        <h3 className="text-teal-600 font-extrabold uppercase tracking-widest text-sm md:text-base">
          Our Culinary Collection
        </h3>

        <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
          Explore Our Menu
        </h1>

        <p className="text-gray-600 max-w-3xl mx-auto text-lg pt-2">
          Indulge in our exquisite selection of dishes, prepared with premium
          ingredients and passion to deliver an unforgettable dining experience.
        </p>

        {/* CATEGORY FILTER BUTTONS */}
        <div className="flex justify-start sticky sm:justify-center overflow-x-auto gap-3 py-6 px-1 md:px-0 scrollbar-hide">
          {categories.map((item, index) => (
            <button
              key={index}
              onClick={() =>
                setCategory((pre) => (pre === item ? "All" : item))
              }
              className={`whitespace-nowrap px-5 py-2 rounded-full font-medium text-sm transition
                ${
                  currentCategory === item
                    ? "bg-teal-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* --- MENU GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 container mx-auto p-4">
  {filteredItems.length > 0 ? (
    filteredItems.map((item, index) => (
      <div
        key={index}
        className="group bg-white rounded-sm shadow-sm border border-gray-200 overflow-hidden flex h-44 sm:h-48 transition-all hover:shadow-md"
      >
        {/* Left Side: Content */}
        <div className="flex-[1.5] p-4 flex flex-col relative min-w-0"> 
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800  mb-1 capitalize truncate">
              {item.name}
            </h3>
            <p className="text-gray-500 text-xl sm:text-sm line-clamp-3 leading-snug">
              {item.description+item.description}
            </p>
          </div>

          {/* Price Ribbon */}
          <div 
            className="absolute bottom-4 left-0 bg-[#24b622] text-white py-1 px-3 pr-6 font-bold text-md sm:text-lg"
            style={{ 
              clipPath: "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)",
            }}
          >
            Br {item.price.toFixed(2)}
          </div>
        </div>

        {/* Right Side: Proportional Image Container */}
        <div className="flex-1 max-w-[40%] h-full overflow-hidden bg-gray-100">
          <img
            src={`${url}/uploads/${item.image}`}
            alt={item.name}
       
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    ))
  ) : (
    /* Empty state remains the same */
    <div className="col-span-full text-center py-20">No items found.</div>
  )}
</div>
    </section>
  );
}

export default ItemsDisplay;
