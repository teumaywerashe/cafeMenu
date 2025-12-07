import React from "react";
import AdminNav from "../components/AdminNav";
import Sidebar from "../components/Sidebar";
import SupperAdminSidebare from "../components/SupperAdminSidebare";
import { Route, Routes } from "react-router-dom";
import SuperAdminDashboard from "../components/SuperAdminDashboard";
import SuperAdminManagement from "../components/SuperAdminManagement";
import RegisterNewUser from "../components/RegisterNewUser";
import Setting from "../components/Setting";
import EditUser from "../components/EditUser";
import ProfileSetting from "../components/ProfileSetting";


function SuperAdminHomePage() {
  return (
    <>
      <AdminNav />
      <div className="flex gap-3">
        <SupperAdminSidebare />
        <Routes>
          <Route path="/dashboard" element={<SuperAdminDashboard />}></Route>
          <Route path="/management" element={<SuperAdminManagement />}></Route>
          <Route path="/editUser" element={<EditUser />}></Route>
          <Route path="/setting" element={<Setting/>}></Route>
          <Route path="/register" element={<RegisterNewUser />}></Route>
            <Route path="/profileSetting" element={<ProfileSetting />}></Route>
          


        </Routes>
      </div>
    </>
  );
}

export default SuperAdminHomePage;
