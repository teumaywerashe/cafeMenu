import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../context/storeContext";
import toast from "react-hot-toast";
import { FaCheck, FaTimes, FaTrash, FaInbox } from "react-icons/fa";

function AccountRequests() {
  const { url, token } = useContext(StoreContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchRequests = async () => {
    console.log(token);
    try {
      const res = await axios.get(`${url}/requests/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      if (res.data.success) setRequests(res.data.requests);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.patch(
        `${url}/requests/status/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        toast.success(res.data.msg);
        setRequests((prev) => prev.map((r) => (r._id === id ? { ...r, status } : r)));
      }
    } catch {
      toast.error("Failed to update status.");
    }
  };

  const deleteRequest = async (id) => {
    if (!window.confirm("Delete this request?")) return;
    try {
      const res = await axios.delete(`${url}/requests/remove/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        toast.success(res.data.msg);
        setRequests((prev) => prev.filter((r) => r._id !== id));
      }
    } catch {
      toast.error("Failed to delete.");
    }
  };

  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);

  const statusBadge = (status) => {
    const map = {
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      approved: "bg-green-100 text-green-700 border-green-200",
      rejected: "bg-red-100 text-red-700 border-red-200",
    };
    return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${map[status]}`;
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Account Requests</h1>
          <p className="text-gray-500 text-sm mt-1">Review and manage user account requests</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", "pending", "approved", "rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-all ${
                filter === f
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300"
              }`}
            >
              {f}
              <span className="ml-1.5 text-xs opacity-70">
                ({f === "all" ? requests.length : requests.filter((r) => r.status === f).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <svg className="animate-spin h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="bg-gray-100 p-5 rounded-full mb-4">
            <FaInbox className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg font-medium">No requests found</p>
          <p className="text-gray-400 text-sm mt-1">
            {filter === "all" ? "No account requests have been submitted yet." : `No ${filter} requests.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((req) => (
            <div key={req._id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Info */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-bold text-gray-900 text-lg">{req.name}</h3>
                    <span className={statusBadge(req.status)}>{req.status}</span>
                  </div>
                  <p className="text-sm text-gray-500">{req.email}{req.phone && ` · ${req.phone}`}</p>
                  <p className="text-sm font-medium text-orange-600">☕ {req.cafeName}</p>
                  {req.message && (
                    <p className="text-sm text-gray-500 mt-1 italic">"{req.message}"</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    Submitted: {new Date(req.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {req.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(req._id, "approved")}
                        className="flex items-center gap-1.5 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-lg transition-all"
                      >
                        <FaCheck size={12} /> Approve
                      </button>
                      <button
                        onClick={() => updateStatus(req._id, "rejected")}
                        className="flex items-center gap-1.5 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-all"
                      >
                        <FaTimes size={12} /> Reject
                      </button>
                    </>
                  )}
                  {req.status !== "pending" && (
                    <button
                      onClick={() => updateStatus(req._id, "pending")}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-semibold rounded-lg transition-all"
                    >
                      Reset
                    </button>
                  )}
                  <button
                    onClick={() => deleteRequest(req._id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="Delete"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AccountRequests;
