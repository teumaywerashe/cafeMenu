import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function ItemDisplay({ item }: { item: any }) {
  const [showOpition, setShowOption] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="fles flex-col relative sm:grid grid-cols-[100px_8fr_10fr_10fr_50px] gap-2.5 p-2.5 border border-amber-400 m-2 rounded-2xl shadow-[0_1px_10px_grey]">
      <img
        className="w-16 h-16 object-cover rounded-md shadow"
        src={
          item?.image?.startsWith("http")
            ? item.image                                    // Cloudinary full URL
            : `${import.meta.env.VITE_API_URL}/uploads/${item?.image}` // legacy
        }
        alt={item?.name}
        loading="lazy"
      />
      <p className="font-semibold text-gray-900">{item?.name}</p>
      <p className="text-gray-600 text-sm truncate">{item?.description}</p>
      <p className="text-gray-700 font-medium">{item?.category}</p>
      <div className="flex relative">
        <BsThreeDotsVertical
          onClick={() => setShowOption((pre) => !pre)}
          className="absolute right-5 cursor-pointer top-0"
        />
        {showOpition && (
          <div className="flex flex-col absolute top-0 right-10 z-10 p-2 bg-amber-50 rounded-2xl shadow-lg">
            <button className="bg-white cursor-pointer text-red-600 font-semibold m-1 px-4 py-2 rounded-2xl hover:bg-red-50 hover:scale-105 transition transform shadow-sm">
              Delete
            </button>
            <button
              onClick={() => navigate(`/admin/updateItem?id=${item.id}`)}
              className="bg-white cursor-pointer text-amber-700 font-semibold m-1 px-4 py-2 rounded-2xl hover:bg-amber-100 hover:scale-105 transition transform shadow-sm"
            >
              Update
            </button>
          </div>
        )}
      </div>
      <p className="text-left font-semibold">{item?.price * 10} Birr</p>
    </div>
  );
}

export default ItemDisplay;
