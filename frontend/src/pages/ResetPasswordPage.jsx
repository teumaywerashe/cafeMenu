import React, { useContext, useState } from "react";
import { FaLock, FaEye, FaEyeSlash, FaArrowLeft, FaCoffee } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../context/storeContext";

function ResetPasswordPage() {
  const { url } = useContext(StoreContext);
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const now = new Date();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }
    if (password !== confirm) {
      return setError("Passwords do not match.");
    }
    setIsLoading(true);
    try {
      const res = await axios.post(`${url}/user/reset-password/${token}`, { password });
      if (res.data.success) {
        setMessage(res.data.msg);
      } else {
        setError(res.data.msg);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-white font-sans">
      {/* Left panel */}
      <div
        className="hidden md:flex md:w-1/2 lg:w-5/12 bg-cover bg-center relative overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/60 to-black/80 z-10"></div>
        <div className="relative z-20 flex flex-col justify-between h-full p-12 text-white">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-2 rounded-lg">
              <FaCoffee />
            </div>
            <span className="font-bold text-lg tracking-wide">The Daily Feast</span>
          </div>
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Set a new <span className="text-orange-400">password</span>.
            </h1>
            <p className="text-gray-300 text-lg">
              Choose something strong and memorable.
            </p>
          </div>
          <p className="text-xs text-gray-500">
            © {now.getFullYear()} Sara Cafe System. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full md:w-1/2 lg:w-7/12 flex items-center justify-center p-6 relative">
        <button
          onClick={() => navigate("/login")}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-all"
          title="Back to Login"
        >
          <FaArrowLeft size={20} />
        </button>

        <div className="w-full max-w-md">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">New Password</h2>
            <p className="text-gray-500">Enter and confirm your new password below.</p>
          </div>

          {message ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="text-green-600 text-4xl mb-3">✅</div>
              <p className="text-green-700 font-semibold text-lg mb-1">Password Updated</p>
              <p className="text-green-600 text-sm">{message}</p>
              <button
                onClick={() => navigate("/login")}
                className="mt-6 w-full py-3 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 transition-all"
              >
                Go to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">New Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Confirm Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                  </div>
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    value={confirm}
                    onChange={(e) => { setConfirm(e.target.value); setError(""); }}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {error && <p className="text-red-500 font-semibold">{error}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3.5 rounded-xl text-white font-bold shadow-lg shadow-orange-500/20 transition-all transform active:scale-95
                  ${isLoading ? "bg-orange-400 cursor-wait" : "bg-orange-600 hover:bg-orange-700 hover:-translate-y-1"}`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </span>
                ) : (
                  "Update Password"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
