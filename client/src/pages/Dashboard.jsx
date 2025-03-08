import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaChartLine, FaTrophy, FaGraduationCap, FaCalendarAlt, FaBookOpen, FaFileAlt, FaVideo, FaLaptop, FaUserFriends } from "react-icons/fa";
import Navbar from "../components/Navbar";
import loginLogo from "../assets/login_logo.png"; // Properly import the logo

// Stats Card Component with animation and improved styling
const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md hover:translate-y-1 cursor-pointer">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
};

// Resource Card Component
const ResourceCard = ({ title, description, icon, bgColor }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md hover:translate-y-1">
      <div className={`${bgColor} h-2`}></div>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className={`p-3 rounded-full bg-gray-100`}>
            {icon}
          </div>
          <h3 className="ml-3 font-semibold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
        <button className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium text-white ${bgColor} hover:opacity-90 transition-opacity`}>
          View Details
        </button>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const { student } = useContext(AuthContext);
  const navigate = useNavigate();

  // Sample data for demonstration
  const averageScore = 87.5;
  const rank = 14;
  const totalStudents = 156;
  const recentExam = "Paper 01";
  const recentScore = 92;
  
  // Next class info
  const nextClass = {
    date: "March 15, 2025",
    time: "9:00 AM - 12:00 PM",
    topic: "Paper 01 -Applied Mathematics",
    location: "Main Hall"
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-16">
        {/* Hero section with improved gradient and repositioned logo */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-10 md:py-14 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-1/2">
                <h1 className="text-3xl md:text-4xl font-bold">Welcome, {student?.name} 👋</h1>
                <p className="mt-3 text-white text-opacity-90 text-lg">Track your academic progress and performance</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white">
                    <FaCalendarAlt className="mr-2 h-4 w-4" />
                    Current Year: 2025
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white">
                    <FaGraduationCap className="mr-2 h-4 w-4" />
                    Instructor: Dhammika Karunarathna
                  </span>
                </div>
                <div className="mt-8">
                  <button
                    onClick={() => navigate("/my-marks")}
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 transition-colors shadow-md"
                  >
                    View My Records
                  </button>
                </div>
              </div>
              
              {/* Logo in circular frame - hidden on mobile */}
              <div className="hidden md:flex justify-center md:justify-end">
                <div className="bg-white p-3 rounded-full shadow-lg">
                  <img 
                    src={loginLogo} 
                    alt="Combined Maths by Dhammika Karunarathna" 
                    className="h-52 w-52 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats grid with animations */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <FaChartLine className="mr-2 text-primary" />
            Performance Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard 
              title="Average Score" 
              value={`${averageScore}%`} 
              icon={<FaChartLine className="h-5 w-5 text-white" />}
              color="bg-blue-500"
            />
            <StatsCard 
              title="Class Rank" 
              value={`${rank} of ${totalStudents}`} 
              icon={<FaTrophy className="h-5 w-5 text-white" />}
              color="bg-yellow-500"
            />
            <StatsCard 
              title="Recent Paper" 
              value={recentExam} 
              icon={<FaGraduationCap className="h-5 w-5 text-white" />}
              color="bg-green-500"
            />
            <StatsCard 
              title="Recent Score" 
              value={`${recentScore}%`} 
              icon={<FaChartLine className="h-5 w-5 text-white" />}
              color="bg-purple-500"
            />
          </div>
        </div>

        {/* Next Class Information */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-primary h-2"></div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaCalendarAlt className="mr-2 text-primary" />
                Next Class Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="border-r border-gray-100 pr-4">
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p className="text-lg font-medium text-gray-800">{nextClass.date}</p>
                </div>
                <div className="border-r border-gray-100 pr-4">
                  <h3 className="text-sm font-medium text-gray-500">Time</h3>
                  <p className="text-lg font-medium text-gray-800">{nextClass.time}</p>
                </div>
                <div className="border-r border-gray-100 pr-4">
                  <h3 className="text-sm font-medium text-gray-500">Next Paper</h3>
                  <p className="text-lg font-medium text-gray-800">{nextClass.topic}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="text-lg font-medium text-gray-800">{nextClass.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        
{/* Footer */}
<footer className="bg-gray-800 text-white py-6 mt-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <p className="mb-2">© {new Date().getFullYear()} Combined Maths by Dhammika Karunarathna. All rights reserved.</p>
    <p className="text-sm text-gray-400">Contact: info@dhammikamaths.com | +94 71 234 5678</p>
  </div>
</footer>
       
      </div>
      
    </>
  );
};

export default Dashboard;