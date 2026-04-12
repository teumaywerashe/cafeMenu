import "./App.css";
import { Route, Routes } from "react-router-dom";
import SuperAdminHomePage from "./pages/SuperAdminHomePage";
import AdminHomePage from "./pages/AdminHomePage";
import UserHomePage from "./pages/UserHomePage";
import LoginPage from "./pages/loginPage";
import UserList from "./pages/UserList";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ContactAdminPage from "./pages/ContactAdminPage";
import { StoreProvider } from "./context/storeProvider";

function App() {
  return (
    <StoreProvider>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user" element={<UserHomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/contact-admin" element={<ContactAdminPage />} />
        <Route path="/admin/*" element={<AdminHomePage />} />
        <Route path="/superadmin/*" element={<SuperAdminHomePage />} />
      </Routes>
    </StoreProvider>
  );
}

export default App;
