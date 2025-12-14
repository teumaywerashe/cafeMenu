import axios from "axios";
import React, { useContext, useState } from "react";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaArrowLeft,
  FaCoffee,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/store";

function LoginPage() {
  const { url, setToken, setOwnerId, setRole } = useContext(StoreContext);
  const now = new Date();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${url}/user/login`, {
        email,
        password,
      });

      if (!response.data.success) {
        setError(response.data.msg);
      } else {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("ownerId", response.data.user._id.toString());
        localStorage.setItem("role", response.data.user.role);
        setToken(response.data.token);
        setRole(response.data.user.role);
        // console.log(response.data.user._id);
        setOwnerId(response.data.user._id);
        // console.log(response.data.user.role);
        response.data.user.role === "admin"
          ? navigate(`/admin/dashboard`)
          : navigate(`/superadmin/dashboard`);
      }
    } catch (error) {
      if (error.response) {
        console.log("Axios error response:", error.response.data);
        setIsLoading(false);
        setError(error.response.data.msg || "Server error");
      } else if (error.request) {
        console.log("No response from server", error.request);
        setIsLoading(false);
        setError("No response from server");
      } else {
        console.log("Error setting up request:", error.message);
        setIsLoading(false);
        setError(error.message);
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-white font-sans">
      {/* --- LEFT SIDE: Visual (Hidden on Mobile) --- */}
      <div
        className="hidden md:flex md:w-1/2 lg:w-5/12 bg-cover bg-center relative overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 z-10"></div>

        {/* Content */}
        <div className="relative z-20 flex flex-col justify-between h-full p-12 text-white">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-2 rounded-lg">
              <FaCoffee />
            </div>
            <span className="font-bold text-lg tracking-wide">
              The Daily Feast
            </span>
          </div>

          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Manage your cafe with{" "}
              <span className="text-orange-400">efficiency</span>.
            </h1>
            <p className="text-gray-300 text-lg">
              Track orders, manage inventory, and analyze sales all in one
              place.
            </p>
          </div>

          <p className="text-xs text-gray-500">
            © {now.getFullYear()} Sara Cafe System. All rights reserved.
          </p>
        </div>
      </div>

      {/* --- RIGHT SIDE: Login Form --- */}
      <div className="w-full md:w-1/2 lg:w-7/12 flex items-center justify-center p-6 relative">
        {/* Close / Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-all"
          title="Go Back"
        >
          <FaArrowLeft size={20} />
        </button>

        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back!
            </h2>
            <p className="text-gray-500">
              Please enter your details to access the admin panel.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                  type="email"
                  placeholder="admin@cafe.com"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError();
                  }}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-gray-900">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                Remember me
              </label>
              <a
                href="#"
                className="font-medium text-orange-600 hover:text-orange-700 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            {error && <p className="text-red-500 font-semibold"> {error}!</p>}

            {/* Submit Button */}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 rounded-xl text-white font-bold shadow-lg shadow-orange-500/20 transition-all transform active:scale-95
                    ${
                      isLoading
                        ? "bg-orange-400 cursor-wait"
                        : "bg-orange-600 hover:bg-orange-700 hover:-translate-y-1"
                    }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider for Signup (Optional) */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Don't have an account?{" "}
            <a href="#" className="font-bold text-gray-900 hover:underline">
              Contact Admin
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
