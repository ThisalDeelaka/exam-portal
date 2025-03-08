import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaBook, FaClipboardList, FaTrophy, FaChartLine, FaUserGraduate, FaBell, FaTimes } from "react-icons/fa";

const Dashboard = () => {
  const { admin } = useContext(AuthContext);
  const [adminName, setAdminName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Modal state
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  
  // Exam form states
  const [examID, setExamID] = useState("");
  const [examDate, setExamDate] = useState(""); // ✅ Added Exam Date
  const [examName, setExamName] = useState("");
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    if (!admin) {
      navigate("/");
    } else {
      // Extract admin name from token if available
      setAdminName(localStorage.getItem("adminName") || "Admin");
      setLoading(false);
    }
  }, [admin, navigate]);
  
  // Handle exam creation
  const handleCreateExam = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("token");

        // Ensure date is selected
        if (!examDate) {
            setMessage("Please select an exam date.");
            return;
        }

        const res = await axios.post(
            "http://localhost:5000/api/exam/create",
            { examID, examName, examDate }, // ✅ Send Exam Date
            { headers: { Authorization: `Bearer ${token}` } }
        );

        setMessage(res.data.message);
        setExamID("");
        setExamName("");
        setExamDate(""); // ✅ Reset Exam Date
        
        setTimeout(() => {
            setIsExamModalOpen(false);
            setMessage("");
        }, 2000);
        
    } catch (error) {
        setMessage("Error creating exam");
    }
};

  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* Main content with padding-top to account for fixed navbar */}
      <div className="pt-16"> {/* Added padding-top of 4rem (16) to account for navbar height */}
        {/* Header Section */}
        <header className="bg-gradient-to-r from-primary to-secondary pt-6 pb-12 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl font-bold text-white">
                  Welcome, {adminName} 👋
                </h1>
                <p className="text-white text-opacity-80 mt-1">
                  Dashboard Overview • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
              </div>
              
              <div className="flex space-x-2">
                <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center">
                  <FaBell className="mr-2" /> Notifications
                </button>
                <button className="bg-white text-primary px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-200 font-medium">
                  View Reports
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Stats Summary */}
        <section className="px-6 -mt-8 mb-8 relative z-10">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
              <p className="text-gray-500 text-sm font-medium">Total Exams</p>
              <p className="text-2xl font-bold text-gray-800">24</p>
              <div className="flex items-center text-xs text-green-500 mt-1">
                <FaChartLine className="mr-1" /> +12% from last month
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
              <p className="text-gray-500 text-sm font-medium">Active Students</p>
              <p className="text-2xl font-bold text-gray-800">856</p>
              <div className="flex items-center text-xs text-green-500 mt-1">
                <FaChartLine className="mr-1" /> +3% from last month
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
              <p className="text-gray-500 text-sm font-medium">Average Score</p>
              <p className="text-2xl font-bold text-gray-800">72.5%</p>
              <div className="flex items-center text-xs text-green-500 mt-1">
                <FaChartLine className="mr-1" /> +5% from last month
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-amber-500">
              <p className="text-gray-500 text-sm font-medium">Upcoming Exams</p>
              <p className="text-2xl font-bold text-gray-800">7</p>
              <div className="flex items-center text-xs text-amber-500 mt-1">
                <FaBell className="mr-1" /> 2 this week
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Dashboard Sections */}
        <section className="px-6 mb-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Exam Management Panel - Now opens modal instead of navigating */}
              <div className="group cursor-pointer" onClick={() => setIsExamModalOpen(true)}>
                <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-all duration-200 border border-gray-100 h-full">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <FaBook className="text-primary text-xl" />
                    </div>
                    <div className="ml-auto">
                      <span className="bg-blue-50 text-blue-600 text-xs font-medium px-2 py-1 rounded-full">
                        Core
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Exam Management</h3>
                  <p className="text-gray-600 mb-4">
                    Create and manage exams with advanced scheduling options.
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    Get Started
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Marks Management Panel */}
              <Link to="/all-exams" className="group">
                <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-all duration-200 border border-gray-100 h-full">
                  <div className="flex items-start mb-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <FaClipboardList className="text-purple-600 text-xl" />
                    </div>
                    <div className="ml-auto">
                      <span className="bg-purple-50 text-purple-600 text-xs font-medium px-2 py-1 rounded-full">
                        Essential
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Marks Management</h3>
                  <p className="text-gray-600 mb-4">
                    Add, update and analyze student performance with detailed insights.
                  </p>
                  <div className="flex items-center text-purple-600 font-medium">
                    Get Started
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
              
              {/* Leaderboard Panel */}
              <Link to="/dashboard" className="group">
                <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-all duration-200 border border-gray-100 h-full">
                  <div className="flex items-start mb-4">
                    <div className="bg-amber-100 p-3 rounded-lg">
                      <FaTrophy className="text-amber-600 text-xl" />
                    </div>
                    <div className="ml-auto">
                      <span className="bg-amber-50 text-amber-600 text-xs font-medium px-2 py-1 rounded-full">
                        Analytics
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Leaderboard</h3>
                  <p className="text-gray-600 mb-4">
                    View comprehensive student rankings with customizable filters.
                  </p>
                  <div className="flex items-center text-amber-600 font-medium">
                    Get Started
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
        
        
       
      </div>
      
      {/* Exam Creation Modal */}
      {isExamModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h3 className="text-xl font-bold text-gray-800">Create Exam</h3>
              <button 
                onClick={() => {
                  setIsExamModalOpen(false);
                  setMessage("");
                  setExamID("");
                  setExamName("");
                  setExamDate(""); 
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="p-4">
              <form onSubmit={handleCreateExam}>
                <input type="text" placeholder="Exam ID" value={examID} onChange={(e) => setExamID(e.target.value)}
                  className="w-full p-2 border rounded mb-3" required />
                <input type="text" placeholder="Exam Name" value={examName} onChange={(e) => setExamName(e.target.value)}
                  className="w-full p-2 border rounded mb-3" required />
                <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)}
                  className="w-full p-2 border rounded mb-3" required />

                {message && <p className="mt-2 text-center text-secondary">{message}</p>}

                <div className="flex justify-end">
                  <button type="button" onClick={() => setIsExamModalOpen(false)}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-300 transition duration-200">
                    Cancel
                  </button>
                  <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition duration-200">
                    Create Exam
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
    </div>
    
  );
};

export default Dashboard;