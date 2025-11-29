import React from "react";
import AdminNav from "../components/AdminNav";
import Sidebar from "../components/Sidebar";
import SupperAdminSidebare from "../components/SupperAdminSidebare";
import { Route, Routes } from "react-router-dom";
import SuperAdminDashboard from "../components/SuperAdminDashboard";

function SuperAdminHomePage() {
  return (
    <>
      <AdminNav />
      <div className="flex gap-3">
        <SupperAdminSidebare />
        <Routes>
          <Route path="/" element={<SuperAdminDashboard />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default SuperAdminHomePage;
