import axios from "axios";
import React, { useState, createContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  // const url = "http://localhost:3000";

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [userItems, setUserItems] = useState([]);
  const [user, setUser] = useState("");
  const [item, setItem] = useState({});

  const [ownerId, setOwnerId] = useState(localStorage.getItem("ownerId"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [cafe, setCafe] = useState();

  let categories = ["All", ...new Set(userItems.map((item) => item.category))];
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get(`${url}/user/get`);
      if (response.data.success) {
        setUsers(response.data.users);
        // console.log(response.data.users);
      } else {
        console.log(response.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`${url}/user/remove/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        setTimeout(() => {
          alert(response.data.msg);
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(`${url}/items/remove/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        setTimeout(() => {
          alert(response.data.msg);
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getUserItems = async (ownerId) => {
    try {
      const response = await axios.get(`${url}/items/get/${ownerId}`);
      if (response.data.success) {
        setUserItems(response.data.items);
      } else {
        setUserItems([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getCafe = async (id) => {
    try {
      const response = await axios.get(`${url}/items/get/${id}`);
      if (response.data.success) {
        setCafe(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async (paramId) => {
    try {
      const response = await axios.get(`${url}/user/get/${paramId}`);
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("ownerId");
    setToken(null);
    setOwnerId(null);
    setRole(null);
    navigate("/login");
  };

  const getItem = async (id) => {
    try {
      const response = await axios.get(`${url}/items/getItem/${id}`);
      setItem(response.data.item);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        userItems,
        id,
        item,
        setItem,
        getUsers,
        deleteUser,
        users,
        getItem,
        logOut,
        getUser,
        setRole,
        user,
        role,
        setUserItems,
        ownerId,
        setOwnerId,
        getUserItems,
        deleteItem,
        setCategory,
        categories,
        token,
        setToken,
        url,
        category,
        searchTerm,
        setSearchTerm,
        cafe,
        getCafe,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
