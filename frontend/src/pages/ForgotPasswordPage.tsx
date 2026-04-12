import React, { useContext, useState } from "react";
import { FaEnvelope, FaArrowLeft, FaCoffee } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../context/storeContext";

function ForgotPasswordPage() {
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const now = new Date();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await axios.post(`${url}/user/forgot-password`, { email });
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
            <div className="bg-orange-500 p-2 rounded-lg"><FaCoffee /></div>
            <span className="font-bold text-lg tracking-wide">The Daily Feast</span>
          </div>
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Forgot your <span className="text-orange-400">password?</span>
            </h1>
            <p className="text-gray-300 text-lg">No worries — we'll send you a reset link right away.</p>
          </div>
          <p className="text-xs text-gray-500">© {now.getFullYear()} Sara Cafe System. All rights reserved.</p>
        </div>
      </div>

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
            {message
              ? <h2 className="text-3xl font-bold text-green-400 mb-2">Reset Email Sent!</h2>
              : <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
            }
            {!message && <p className="text-gray-500">Enter your email and we'll send you a link to reset your password.</p>}
          </div>

          {message ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="text-green-600 text-4xl mb-3">✉️</div>
              <p className="text-green-700 font-semibold text-lg mb-1">Check your inbox</p>
              <p className="text-green-600 text-sm">{message}</p>
              <button onClick={() => navigate("/login")} className="mt-6 text-orange-600 font-medium hover:underline text-sm">
                Back to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    placeholder="admin@cafe.com"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    required
                  />
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
                    Sending...
                  </span>
                ) : "Send Reset Link"}
              </button>

              <p className="text-center text-sm text-gray-500">
                Remembered it?{" "}
                <button type="button" onClick={() => navigate("/login")} className="font-bold text-gray-900 hover:underline">
                  Back to Login
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
