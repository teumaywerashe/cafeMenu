import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/store";
import { useSearchParams, useNavigate } from "react-router-dom";

function EditUser() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  // Destructure context (Added updateUser function to context expectation)
  const {
    getUser,
    user,
    // updateUser: contextUpdateUser,
  } = useContext(StoreContext);

  // Local state for the form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  // 1. Fetch User Data
  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        setIsLoading(true);
        await getUser(id);
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  // 2. Sync Local State when 'user' from context changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "user",
      });
    }
  }, [user]);

  // 3. Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 4. Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      // Assuming contextUpdateUser takes (id, data) and returns a promise
      if (contextUpdateUser) {
        await contextUpdateUser(id, formData);
        setMessage({ type: "success", text: "User updated successfully!" });

        // Optional: Redirect after success
        // setTimeout(() => navigate('/users'), 1500);
      } else {
        console.log("Updated Data:", formData);
        setMessage({
          type: "success",
          text: "Form valid! (Connect API to save)",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update user." });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 px-6 py-4">
          <h3 className="text-xl font-bold text-white">Edit User Details</h3>
          <p className="text-blue-200 text-sm">Update the information below</p>
        </div>

        {/* Feedback Message */}
        {message.text && (
          <div
            className={`px-6 py-3 text-sm font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="John Doe"
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email" // Fixed: was 'name'
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="john@example.com"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              User Role
            </label>
            <div className="relative">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
              </select>
              {/* Custom Arrow Icon */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)} // Go back
              className="w-1/3 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-2/3 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-colors"
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
