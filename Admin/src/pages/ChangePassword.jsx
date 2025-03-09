import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FaKey, FaUser } from "react-icons/fa";

const ChangePassword = () => {
    const [userID, setUserID] = useState("");
    const [role, setRole] = useState("student");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        
        try {
            const token = localStorage.getItem("token");
            const res = await axios.put(
                "https://exam-portal-mnwv.onrender.com/api/admin/update-password",
                { userID, newPassword, role },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            setMessage(res.data.message);
            setMessageType("success");
            setUserID("");
            setNewPassword("");
        } catch (error) {
            setMessage(error.response?.data?.message || "Error updating password");
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-indigo-50">
            {/* Spacious header area for navbar */}
            <div className="bg-white shadow-md">
                <div className="container mx-auto py-4 px-6">
                    <Navbar />
                </div>
            </div>
            
            <div className="container mx-auto px-4 py-16 flex justify-center">
                <div className="w-full max-w-sm">
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="bg-gradient-to-r from-orange-500 to-blue-800 p-6 text-center" style={{ background: `linear-gradient(to right, #FF7350, #125875)` }}>
                            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-white bg-opacity-20 mb-3">
                                <FaKey className="text-white text-2xl" />
                            </div>
                            <h1 className="text-2xl font-bold text-white">Change Password</h1>
                            <p className="text-white text-opacity-80 mt-1 text-sm">Update user account password</p>
                        </div>

                        <div className="p-6">
                            {message && (
                                <div className={`mb-4 p-3 rounded text-sm ${
                                    messageType === "success" 
                                        ? "bg-green-50 border-l-4 border-green-500 text-green-700" 
                                        : "bg-red-50 border-l-4 border-red-500 text-red-700"
                                }`}>
                                    <p className="font-medium text-center">{message}</p>
                                </div>
                            )}
                            
                            <form onSubmit={handleUpdatePassword} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="block font-medium text-gray-700">User ID</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaUser className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            value={userID}
                                            onChange={(e) => setUserID(e.target.value)}
                                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter Student ID"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                {/* Removed the role selection part as requested */}
                                <input type="hidden" value={role} />
                                
                                <div className="space-y-1">
                                    <label className="block font-medium text-gray-700">New Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaKey className="text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter New Password"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 mt-4 rounded-lg font-medium text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center"
                                    disabled={loading}
                                    style={{ 
                                        background: loading ? "#CBD5E1" : "linear-gradient(to right, #FF7350, #125875)"
                                    }}
                                >
                                    {loading ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Updating...
                                        </span>
                                    ) : (
                                        "Update Password"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;