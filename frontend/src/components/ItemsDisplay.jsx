import React, { useContext, useEffect } from "react";
import { StoreContext } from "../context/storeContext";

function ItemsDisplay() {
  const {
    category,
    setCategory,
    categories,
    userItems,
    url,
    id,
    getUserItems,
    itemsLoading,
    searchTerm,
  } = useContext(StoreContext);

  useEffect(() => {
    if (id) getUserItems(id);
  }, [id]);

  const filteredItems = userItems?.filter((item) => {
    const newCategory = category === "All" || category === item.category;
    const matchItem = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return newCategory && matchItem;
  });

  const currentCategory = category;

  return (
    <section id="menu" className="py-16 bg-white min-h-screen font-sans">
      <div className="text-center mb-8 space-y-4 max-w-5xl mx-auto px-4 md:px-10">
        <h3 className="text-teal-600 font-extrabold uppercase tracking-widest text-sm md:text-base">
          Our Culinary Collection
        </h3>
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
          Explore Our Menu
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg pt-2">
          Indulge in our exquisite selection of dishes, prepared with premium
          ingredients and passion.
        </p>
      </div>

      <div className="sticky top-14 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 mb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="flex justify-start sm:justify-center overflow-x-auto gap-3 py-4 scrollbar-hide">
            {categories.map((item, index) => (
              <button
                key={index}
                onClick={() =>
                  setCategory((pre) => (pre === item ? "All" : item))
                }
                className={`whitespace-nowrap px-6 py-2 rounded-full font-medium text-sm transition-all
                  ${
                    currentCategory === item
                      ? "bg-[#24b622] text-white shadow-md scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 container mx-auto px-4 md:px-10">
        {itemsLoading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-[#24b622] rounded-full animate-spin" />
            <p className="text-gray-400 text-sm">Loading menu...</p>
          </div>
        ) : filteredItems && filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-sm shadow-sm border border-gray-200 overflow-hidden flex h-44 sm:h-48 transition-all hover:shadow-md"
            >
              <div className="flex-[1.5] py-2 px-4 flex flex-col relative min-w-0">
                <div className="flex-1 mb-2">
                  <h3 className="text-lg font-bold text-gray-800 mb-1 capitalize truncate">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-3 leading-snug">
                    {item.description}
                  </p>
                </div>

                <div
                  className="absolute bottom-2 left-0 bg-[#24b622] text-white py-2 px-6 pr-7 font-bold text-sm sm:text-base"
                  style={{
                    clipPath:
                      "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)",
                  }}
                >
                  Br {item.price.toFixed(2)}
                </div>
              </div>

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
          <div className="col-span-full text-center py-20 text-gray-400">
            No items found in this category.
          </div>
        )}
      </div>
    </section>
  );
}

export default ItemsDisplay;
