import React from "react";
import Sidebar from "../components/Sidebar";
// import AdminDashboard from "../components/adminDashboard";
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
          <Route path="/dashboard" element={<AdminDashboard />}></Route>
          <Route path="/management" element={<Management />}></Route>
          <Route path="/setting" element={<Setting />}></Route>
          <Route path="/profileSetting" element={<ProfileSetting />}></Route>
          <Route path="/addItem" element={<AddItem/>}></Route>
          <Route path="/updateItem" element={<UpdateItem/>}></Route>
          <Route path="/edit" element={<EditItem/>}></Route>

        </Routes>
      </div>
    </>
  );
}

export default AdminHomePage;
