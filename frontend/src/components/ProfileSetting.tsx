import React, { useState, useContext, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCamera, FaSave, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../context/storeContext";
import toast from "react-hot-toast";

function ProfileSetting() {
  const navigate = useNavigate();
  const { user, url, token, id, getUser } = useContext(StoreContext);

  useEffect(() => { getUser(id); });
  useEffect(() => {
    if (user) {
      setData((prev) => ({ ...prev, name: user.name }));
      setEmail(user.email);
    }
  }, [user]);

  const [email, setEmail] = useState(user.email);
  const [data, setData] = useState({ name: user.name, password: "" });

  const updateData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((pre) => ({ ...pre, [name]: value }));
  };

  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(
    `https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        const val = (data as any)[key];
        if (val !== undefined && val !== null && val !== "" && val.length > 3) {
          formData.append(key, val);
        }
      });
      if (image) formData.append("profileImage", image);

      const response = await axios.patch(`${url}/user/update/${user._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating your profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 font-sans">
      <div className="w-full max-w-2xl mb-4">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-orange-600 transition-colors gap-2">
          <FaArrowLeft /> Back
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="h-32 bg-linear-to-r from-orange-400 to-red-500 relative"></div>

        <div className="relative px-8">
          <div className="-mt-16 w-32 h-32 rounded-full border-4 border-white shadow-md bg-gray-200 relative group mx-auto md:mx-0">
            <img
              src={user.profileImage ? `${url}/uploads/${user.profileImage}` : previewUrl}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
            <label htmlFor="profile-upload" className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-300">
              <FaCamera className="text-white text-xl" />
            </label>
            <input id="profile-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
          </div>
          <div className="mt-4 text-center md:text-left">
            <h1 className="text-2xl font-bold capitalize text-gray-800">{data.name}</h1>
            <p className="text-sm text-gray-500">Administrator</p>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-6 border-b pb-2">Edit Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Full Name</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500 transition-all bg-gray-50/50">
                <FaUser className="text-gray-400 mr-3" />
                <input type="text" name="name" value={data.name} required onChange={updateData}
                  className="flex-1 bg-transparent outline-none text-gray-700 font-medium" placeholder="Enter your name" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Email Address</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500 transition-all bg-gray-50/50">
                <FaEnvelope className="text-gray-400 mr-3" />
                <input type="email" value={email} readOnly onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-gray-700 font-medium" placeholder="name@example.com" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Password</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500 transition-all bg-gray-50/50">
                <FaLock className="text-gray-400 mr-3" />
                <input type={showPassword ? "text" : "password"} value={data.password} name="password" onChange={updateData}
                  className="flex-1 bg-transparent outline-none text-gray-700 font-medium" placeholder="••••••" />
                <button type="button" className="text-gray-400 hover:text-gray-600 cursor-pointer focus:outline-none" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 mt-8 pt-4 border-t border-gray-100">
              <button type="button" onClick={() => navigate("/admin/dashboard")}
                className="px-6 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={isSaving}
                className={`flex items-center gap-2 px-8 py-2.5 rounded-lg text-white font-semibold shadow-lg shadow-orange-500/30 transition-all
                  ${isSaving ? "bg-orange-400 cursor-wait" : "bg-orange-600 hover:bg-orange-700 hover:-translate-y-0.5"}`}>
                {isSaving ? <span>Saving...</span> : <><FaSave /> <span>Save Changes</span></>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileSetting;
