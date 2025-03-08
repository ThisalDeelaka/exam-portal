import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaLock, FaUser, FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await login(name, password);
      if (success) {
        setMessage("Login successful. Redirecting...");
        setMessageType("success");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setMessage("Invalid credentials. Please try again.");
        setMessageType("error");
        setLoading(false);
      }
    } catch (error) {
      setMessage("Login failed. Please try again.");
      setMessageType("error");
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-indigo-50 p-4">
      <div className="w-full max-w-md">
        {/* Card with subtle shadow and border */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Header section with gradient background */}
          <div className="bg-gradient-to-r from-primary to-secondary p-6 text-center">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-white bg-opacity-20 mb-4">
              <FaUser className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Login</h1>
            <p className="text-white text-opacity-80 mt-1">Sign in to manage exams and students</p>
          </div>
          
          {/* Form section */}
          <div className="p-6">
            {message && (
              <div className={`mb-4 p-3 ${
                messageType === "success" 
                  ? "bg-green-50 border-l-4 border-green-500 text-green-700" 
                  : "bg-red-50 border-l-4 border-red-500 text-red-700"
              } rounded`}>
                <p className="font-medium flex items-center">
                  <span className="mr-2">{messageType === "success" ? "✅" : "⚠️"}</span>
                  {message}
                </p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <FaSignInAlt className="mr-2" />
                )}
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>
          
          {/* Footer section */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register-admin" className="font-medium text-primary hover:text-opacity-80 inline-flex items-center">
                Create an Admin Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;