import React from "react";
import SupperAdminSidebare from "../components/SupperAdminSidebare";
import { Route, Routes } from "react-router-dom";
import SuperAdminDashboard from "../components/SuperAdminDashboard";
import SuperAdminManagement from "../components/SuperAdminManagement";
import RegisterNewUser from "../components/RegisterNewUser";
import Setting from "../components/Setting";
import EditUser from "../components/EditUser";
import ProfileSetting from "../components/ProfileSetting";
import AccountRequests from "../components/AccountRequests";
import AdminNav from "../components/AdminNav";

function SuperAdminHomePage() {
  return (
    <>
      <AdminNav />
      <div className="flex gap-3">
        <SupperAdminSidebare />
        <Routes>
          <Route path="/dashboard" element={<SuperAdminDashboard />} />
          <Route path="/management" element={<SuperAdminManagement />} />
          <Route path="/editUser" element={<EditUser />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/register" element={<RegisterNewUser />} />
          <Route path="/profileSetting" element={<ProfileSetting />} />
          <Route path="/requests" element={<AccountRequests />} />
        </Routes>
      </div>
    </>
  );
}

export default SuperAdminHomePage;
