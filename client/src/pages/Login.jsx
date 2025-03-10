import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaLock, FaUser, FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const [studentID, setStudentID] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await login(studentID, password);
      if (success) {
        navigate("/dashboard");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-indigo-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-primary to-secondary p-6 text-center">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-white bg-opacity-20 mb-4">
              <FaUser className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-white">Student Portal</h1>
            <p className="text-white text-opacity-80 mt-1">Sign in to access your dashboard</p>
          </div>
          <div className="p-6">
            {message && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                <p className="font-medium flex items-center">
                  <span className="mr-2">⚠️</span>
                  {message}
                </p>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Student ID</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={studentID}
                    onChange={(e) => setStudentID(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Enter your student ID"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mb-6">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-primary hover:bg-opacity-90 transition-all ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Signing in..." : <><FaSignInAlt className="mr-2" /> Sign In</>}
                </button>
              </div>
              <div className="text-center">
                <Link to="/forgotpassword" className="text-sm text-primary hover:text-opacity-80">
                  Forgot Password?
                </Link>
              </div>
            </form>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account? {" "}
              <Link to="/register" className="font-medium text-primary hover:text-opacity-80">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
