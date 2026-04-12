import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

export const useStoreState = () => {
  const navigate = useNavigate();

  const url = import.meta.env.VITE_API_URL;

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [userItems, setUserItems] = useState<any[]>([]);
  const [user, setUser] = useState<any>("");
  const [item, setItem] = useState<any>({});
  const [ownerId, setOwnerId] = useState<string | null>(localStorage.getItem("ownerId"));
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));
  const [cafe, setCafe] = useState<any>();
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let categories: string[] = ["All", ...new Set(userItems.map((i) => i.category))];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${url}/user/login`, { email, password });

      if (!response.data.success) {
        setError(response.data.msg);
      } else {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("ownerId", response.data.user._id.toString());
        localStorage.setItem("role", response.data.user.role);
        setToken(response.data.token);
        setRole(response.data.user.role);
        setOwnerId(response.data.user._id);

        response.data.user.role === "admin"
          ? navigate(`/admin/dashboard`)
          : navigate(`/superadmin/dashboard`);
      }
    } catch (error: any) {
      if (error.response) {
        console.log("Axios error response:", error.response.data);
        setIsLoading(false);
        setError(error.response.data.msg || "Server error");
      } else if (error.request) {
        console.log("No response from server", error.request);
        setIsLoading(false);
        setError("No response from server");
      } else {
        console.log("Error setting up request:", error.message);
        setIsLoading(false);
        setError(error.message);
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  const getUsers = async () => {
    const response = await axios.get(`${url}/user/get`);
    if (response.data.success) setUsers(response.data.users);
  };

  const deleteUser = async (id: string) => {
    if (window.confirm("Are you sure to remove the user❗")) {
      const response = await axios.delete(`${url}/user/remove/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) { toast.success(response.data.msg) }
    }
  };

  const deleteItem = async (id: string) => {
    if (window.confirm('Are you suref to delete the item')) {
      const response = await axios.delete(`${url}/items/remove/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(response.data.msg);
    }
  };

  const [itemsLoading, setItemsLoading] = useState(false);

  const getUserItems = async (ownerId: string) => {
    setItemsLoading(true);
    try {
      const response = await axios.get(`${url}/items/get/${ownerId}`);
      setUserItems(response.data.success ? response.data.items : []);
    } finally {
      setItemsLoading(false);
    }
  };

  const getCafe = async (id: string) => {
    const response = await axios.get(`${url}/items/get/${id}`);
    if (response.data.success) setCafe(response.data.user);
  };

  const getUser = async (paramId: string) => {
    const response = await axios.get(`${url}/user/get/${paramId}`);
    if (response.data.success) setUser(response.data.user);
  };

  const logOut = () => {
    localStorage.clear();
    setToken(null);
    setOwnerId(null);
    setRole(null);
    navigate("/login");
  };

  const getItem = async (id: string) => {
    const response = await axios.get(`${url}/items/getItem/${id}`);
    setItem(response.data.item);
  };

  return {
    userItems,
    id,
    item,
    setItem,
    getUsers,
    handleSubmit,
    isLoading,
    setIsLoading,
    error,
    setError,
    deleteUser,
    users,
    getItem,
    email,
    setEmail,
    password,
    setPassword,
    logOut,
    getUser,
    setRole,
    user,
    role,
    setUserItems,
    ownerId,
    setOwnerId,
    getUserItems,
    itemsLoading,
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
  };
};
