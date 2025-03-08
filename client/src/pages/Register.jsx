import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaLock, FaUser, FaSchool, FaIdCard, FaUserPlus } from "react-icons/fa";

const Register = () => {
  const [studentID, setStudentID] = useState("");
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await axios.post("https://exam-portal-mnwv.onrender.com/api/student/register", {
        studentID,
        name,
        school,
        password,
      });
      
      setMessage(res.data.message);
      setStudentID("");
      setName("");
      setSchool("");
      setPassword("");
      
      // Success message styling
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/"), 2000); // Redirect to login after success
      
    } catch (error) {
      console.error("Registration error:", error);
      setMessage(error.response?.data?.message || "Registration failed. Please check your details.");
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
              <FaUserPlus className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-white">Create Account</h1>
            <p className="text-white text-opacity-80 mt-1">Join the student portal today</p>
          </div>
          
          <div className="p-6">
            {message && (
              <div className={`mb-4 p-3 rounded ${message.includes("successful") 
                ? "bg-green-50 border-l-4 border-green-500 text-green-700" 
                : "bg-red-50 border-l-4 border-red-500 text-red-700"}`}>
                <p className="font-medium flex items-center">
                  <span className="mr-2">{message.includes("successful") ? "✅" : "⚠️"}</span>
                  {message}
                </p>
              </div>
            )}
            
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Student ID</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaIdCard className="text-gray-400" />
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
                <label className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">School</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSchool className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Enter your school name"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
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
                    placeholder="Create a password"
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-primary hover:bg-opacity-90 transition-all ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Registering..." : <><FaUserPlus className="mr-2" /> Create Account</>}
              </button>
            </form>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              Already have an account? {" "}
              <Link to="/" className="font-medium text-primary hover:text-opacity-80">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;