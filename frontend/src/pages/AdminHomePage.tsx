import React from "react";
import Sidebar from "../components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Setting from "../components/Setting";
import Management from "../components/Management";
import AdminNav from "../components/AdminNav";
import ProfileSetting from "../components/ProfileSetting";
import AddItem from "../components/AddItem";
import UpdateItem from "../components/UpdateItem";
import EditItem from "../components/EditItem";
import AdminDashboard from "../components/AdminDashboard";

function AdminHomePage() {
  return (
    <>
      <AdminNav />
      <div className="flex gap-3">
        <Sidebar />
        <Routes>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/management" element={<Management />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/profileSetting" element={<ProfileSetting />} />
          <Route path="/addItem" element={<AddItem />} />
          <Route path="/updateItem" element={<UpdateItem />} />
          <Route path="/edit" element={<EditItem />} />
        </Routes>
      </div>
    </>
  );
}

export default AdminHomePage;
