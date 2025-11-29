
import "./App.css";
import { StoreContextProvider } from "./context/store";
import { Route, Routes } from "react-router-dom";
import SuperAdminHomePage from "./pages/SuperAdminHomePage";
import AdminHomePage from "./pages/AdminHomePage";
import UserHomePage from "./pages/userHomePage";
import LoginPage from "./pages/loginPage";
import UserList from "./pages/UserList";

function App() {
  return (
    <StoreContextProvider>
      <Routes>
      <Route path="/" element={<UserList/>}></Route>
        <Route path="/user" element={<UserHomePage />}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/admin/*" element={<AdminHomePage/>}></Route>
        <Route path="/superadmin/*" element={<SuperAdminHomePage/>}></Route>


      </Routes>
    </StoreContextProvider>
  );
}

export default App;
