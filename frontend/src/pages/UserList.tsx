import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/storeContext";
import Navebar from "../components/Navebar";
import Footer from "../components/Footer";
import { resolveImage } from "../utils/imageUrl";
import { FaSearch, FaCoffee, FaUtensils, FaStar } from "react-icons/fa";
import { MdStorefront } from "react-icons/md";
import { ChevronRight } from "lucide-react";

const PALETTES = [
  { from: "#f0fdf4", to: "#dcfce7", accent: "#16a34a" },
  { from: "#fefce8", to: "#fef9c3", accent: "#ca8a04" },
  { from: "#eff6ff", to: "#dbeafe", accent: "#2563eb" },
  { from: "#fdf4ff", to: "#f3e8ff", accent: "#9333ea" },
  { from: "#fff7ed", to: "#ffedd5", accent: "#ea580c" },
  { from: "#f0fdfa", to: "#ccfbf1", accent: "#0d9488" },
];

function CafeCard({ user, index }: { user: any; index: number }) {
  const palette = PALETTES[index % PALETTES.length];
  const { url } = useContext(StoreContext);
  const hasImage = user.profileImage && user.profileImage !== "default.jpg";

  return (
    <Link
      to={`/user?id=${user._id}`}
      className="group relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
      style={{ background: `linear-gradient(135deg, ${palette.from}, ${palette.to})` }}
    >
      <div className="relative h-40 overflow-hidden flex items-center justify-center bg-white/40">
        {hasImage ? (
          <img
            src={resolveImage(user.profileImage, "", url)}
            alt={user.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-inner"
            style={{ background: palette.accent + "22", color: palette.accent }}
          >
            <FaCoffee />
          </div>
        )}
        <span className="absolute top-3 right-3 bg-white/90 text-green-600 text-xs font-bold px-2 py-0.5 rounded-full shadow">
          Open
        </span>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-extrabold text-lg capitalize leading-tight" style={{ color: palette.accent }}>
            {user.name} Cafe
          </h3>
          <ChevronRight
            size={18}
            className="mt-1 shrink-0 text-gray-300 group-hover:translate-x-1 transition-transform"
            style={{ color: palette.accent + "99" }}
          />
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <FaStar className="text-yellow-400" /> 4.{(index % 5) + 5}
          </span>
          <span className="flex items-center gap-1">
            <FaUtensils style={{ color: palette.accent }} />
            {["Ethiopian", "Pastry", "Fusion", "Italian", "Local", "Snacks"][index % 6]}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-auto pt-2 border-t border-gray-200/60">
          Tap to explore the menu →
        </p>
      </div>
    </Link>
  );
}

function UserList() {
  const { users, getUsers } = useContext(StoreContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await getUsers();
      setLoading(false);
    })();
  }, []);

  const filteredUser = users.filter(
    (user: any) =>
      user.role === "admin" &&
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navebar />

      <div className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white pt-24 pb-16 px-4">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 right-10 w-56 h-56 bg-yellow-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 bg-white/10 text-green-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/10">
            <MdStorefront size={14} /> Discover Cafes Near You
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight">
            Your Next Favorite <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-400">
              Cafe Awaits
            </span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto">
            Browse our curated list of cafes, pick one, and explore their full menu.
          </p>

          <div className="flex justify-center gap-8 pt-4">
            {[
              { label: "Cafes", value: users.filter((u: any) => u.role === "admin").length },
              { label: "Cuisines", value: 6 },
              { label: "Happy Guests", value: "1k+" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky top-14 z-20 bg-white/95 backdrop-blur border-b border-gray-100 py-3 px-4">
        <div className="max-w-lg mx-auto relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            placeholder="Search cafes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin" />
              <p className="text-gray-400 text-sm">Finding cafes for you...</p>
            </div>
          ) : filteredUser.length > 0 ? (
            <>
              <p className="text-sm text-gray-400 mb-6">
                Showing <span className="font-semibold text-gray-700">{filteredUser.length}</span> cafe{filteredUser.length !== 1 ? "s" : ""}
                {searchTerm && ` for "${searchTerm}"`}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUser.map((user: any, i: number) => (
                  <CafeCard key={user._id} user={user} index={i} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-dashed border-gray-200">
              <FaSearch className="text-gray-300 text-4xl mb-4" />
              <h3 className="text-lg font-bold text-gray-700">No cafes found</h3>
              <p className="text-gray-400 text-sm mt-1">Try a different search term.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserList;
