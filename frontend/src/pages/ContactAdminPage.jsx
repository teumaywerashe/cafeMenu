import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCoffee, FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaStore, FaCommentAlt } from "react-icons/fa";

function ContactAdminPage() {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({ name: "", email: "", phone: "", cafeName: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${url}/requests/submit`, form);
      if (res.data.success) {
        setSuccess(true);
      } else {
        setError(res.data.msg);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-white font-sans">
      {/* Left Panel */}
      <div
        className="hidden md:flex md:w-1/2 lg:w-5/12 bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/60 to-black/80 z-10"></div>
        <div className="relative z-20 flex flex-col justify-between h-full p-12 text-white">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-2 rounded-lg"><FaCoffee /></div>
            <span className="font-bold text-lg tracking-wide">The Daily Feast</span>
          </div>
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Want to join our <span className="text-orange-400">platform?</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Submit your request and our admin team will review it and get back to you shortly.
            </p>
          </div>
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} Sara Cafe System. All rights reserved.</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 lg:w-7/12 flex items-center justify-center p-6 relative">
        <button
          onClick={() => navigate("/login")}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-all"
          title="Back to Login"
        >
          <FaArrowLeft size={20} />
        </button>

        <div className="w-full max-w-md">
          {success ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
              <p className="text-gray-500 mb-6">Our admin team will review your request and contact you soon.</p>
              <button
                onClick={() => navigate("/login")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Request an Account</h2>
                <p className="text-gray-500">Fill in your details and we'll get back to you.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text" name="name" placeholder="Your full name" required
                    value={form.name} onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email" name="email" placeholder="Your email address" required
                    value={form.email} onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel" name="phone" placeholder="Phone number (optional)"
                    value={form.phone} onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  />
                </div>

                {/* Cafe Name */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaStore className="text-gray-400" />
                  </div>
                  <input
                    type="text" name="cafeName" placeholder="Your cafe / business name" required
                    value={form.cafeName} onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  />
                </div>

                {/* Message */}
                <div className="relative">
                  <div className="absolute top-3.5 left-0 pl-4 flex items-start pointer-events-none">
                    <FaCommentAlt className="text-gray-400" />
                  </div>
                  <textarea
                    name="message" placeholder="Tell us a bit about your business (optional)"
                    value={form.message} onChange={handleChange} rows={3}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none"
                  />
                </div>

                {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                <button
                  type="submit" disabled={isLoading}
                  className={`w-full py-3.5 rounded-xl text-white font-bold shadow-lg shadow-orange-500/20 transition-all transform active:scale-95 ${isLoading ? "bg-orange-400 cursor-wait" : "bg-orange-600 hover:bg-orange-700 hover:-translate-y-1"}`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : "Submit Request"}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-6">
                Already have an account?{" "}
                <button onClick={() => navigate("/login")} className="font-bold text-orange-600 hover:underline">Sign In</button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactAdminPage;
