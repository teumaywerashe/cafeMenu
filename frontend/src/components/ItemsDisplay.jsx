import React, { useContext, useEffect } from "react";
// import { food_list } from "../assets/assets";
import { StoreContext } from "../context/store";
import { FaPlus, FaStar, FaShoppingBag } from "react-icons/fa";
// import { useSearchParams } from "react-router-dom";

function ItemDisplay() {
  const { category, userItems, url,id, getUserItems, searchTerm } =
    useContext(StoreContext);

  // const [searchParams] = useSearchParams();

  // const id = searchParams.get("id");

  useEffect(() => {
    getUserItems(id);
   
  }, []);

  const filteredItems = userItems?.filter((item) => {
    const newCategory = category === "All" || category === item.category;
    const matchItem = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return newCategory && matchItem;
  });

  return (
    <section id="menu" className="py-16 px-4 md:px-8 bg-gray-50 min-h-screen">
      {/* --- SECTION HEADER --- */}
      <div className="text-center mb-12 space-y-2">
        <h3 className="text-orange-500 font-bold uppercase tracking-widest text-sm">
          Delicious Choices
        </h3>
        <h1 className="text-4xl md:text-5xl font-black text-gray-800">
          Explore Our Menu
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Choose from our diverse menu of delectable dishes, crafted with the
          finest ingredients to satisfy your cravings.
        </p>
      </div>

      {/* --- MENU GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 container mx-auto">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div
              key={index}
              className="group h-64 sm:h-full sm:w-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-row-reverse sm:flex-col"
            >
              {/* Image Container */}
              <div className="relative flex items-center h-56 overflow-hidden">
                <img
                  src={`${url}/uploads/${item.image}`}
                  alt={item.name}
                  className="w-40 h-full object-cover flex-nonesm: sm:w-[80%] sm:h-[80%] sm:object-cover transform group-hover:scale-110 transition-transform duration-500"
                />

                {/* Category Badge */}
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm uppercase tracking-wide">
                  {item.category}
                </span>

                {/* Rating (Static for now) */}
                {/* <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                    <FaStar className="text-yellow-400 text-xs" />
                    <span className="text-white text-xs font-bold">4.8</span>
                </div> */}
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors line">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-medium">
                      Price
                    </span>
                    <span className="text-xl font-black text-gray-900">
                      {item.price * 10}{" "}
                      <span className="text-xs font-normal text-gray-500">
                        Birr
                      </span>
                    </span>
                  </div>

                  {/* <button 
                    className="w-10 h-10 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-orange-500/40"
                    onClick={() => alert(`Added ${item.name} to cart!`)}
                    title="Add to Cart"
                  >
                    <FaPlus className="text-sm" />
                  </button> */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center opacity-70">
            <FaShoppingBag className="text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-600">No items found</h3>
            <p className="text-gray-400">Try selecting a different category.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ItemDisplay;
