import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Use Link for SPA navigation
import { User, ChevronRight } from "lucide-react";
import { StoreContext } from "../context/storeContext";
import Navebar from "../components/Navebar";
import { FaSearch } from "react-icons/fa";

function UserList() {
  const { users, getUsers } = useContext(StoreContext);

  useEffect(() => {
    getUsers();
  }, []);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUser = users.filter((user) => {
    return (
      user.role === "admin" &&
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  return (
    <>
      <Navebar />
      {/* <iframe className="fixed z-10 bottom-0 right-10"
        width="160"
        height="115"
        src="https://www.youtube.com/embed/6b65TL4wLzI"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe> */}

      <div className="min-h-screen mt-10 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Welcome to Your Forever Feast
            </h1>
            <p className="text-slate-500 text-lg">
              Select a cafe you prefer for your feast.
            </p>
          </div>

          {/* User Grid */}
          <div className="mb-10 flex items-center justify-items-end mx-auto w-[80%] z-10 md:w-96">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500f transition duration-150 ease-in-out sm:text-sm"
              placeholder="Search your cafe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredUser.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUser.map((user) => (
                <Link
                  key={user._id}
                  to={`/user?id=${user._id}`}
                  className="group relative bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-indigo-200 transition-all duration-300 flex items-center justify-between"
                >
                  {/* Left Side: Avatar & Info */}
                  <div className="flex items-center gap-4">
                    {/* Avatar Circle */}
                    <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                      <User size={24} />
                    </div>

                    {/* Text Info */}
                    <div>
                      <h3 className="font-bold capitalize text-slate-800 group-hover:text-indigo-700 transition-colors">
                        {user.name} Cafe
                      </h3>
                      <p className="text-xs font-medium text-slate-400  tracking-wide">
                        {user.role}
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Arrow Icon */}
                  <div className="text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-300">
                    <ChevronRight size={20} />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-5 py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaSearch className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-700">
                No users found
              </h3>
              <p className="text-gray-500 text-sm">
                Try adjusting your search or check your internat connection.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserList;
