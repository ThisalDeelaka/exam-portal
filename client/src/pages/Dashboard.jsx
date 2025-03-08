import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaChartLine, FaTrophy, FaGraduationCap, FaCalendarAlt, FaBookOpen } from "react-icons/fa";
import Navbar from "../components/Navbar";

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

// Action Card Component
const ActionCard = ({ title, description, icon, bgColor, textColor, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md hover:translate-y-1 transition-all flex items-center w-full"
    >
      <div className={`p-3 rounded-lg ${bgColor} ${textColor}`}>
        {icon}
      </div>
      <div className="ml-4 text-left">
        <h3 className="font-medium text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </button>
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
  const recentExam = "Mid-Term Science";
  const recentScore = 92;
  const completedCourses = 8;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-16">
        {/* Hero section with improved gradient and subtle pattern */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-10 md:py-14 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-2/3">
                <h1 className="text-3xl md:text-4xl font-bold">Welcome, {student?.name} 👋</h1>
                <p className="mt-3 text-white text-opacity-90 text-lg">Track your academic progress and performance</p>
                <div className="mt-4 flex">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white">
                    <FaCalendarAlt className="mr-2 h-4 w-4" />
                    Current Semester: Spring 2025
                  </span>
                </div>
              </div>
              <div className="mt-8 md:mt-0">
                <div className="inline-flex rounded-md shadow">
                  <button
                    onClick={() => navigate("/my-marks")}
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 transition-colors"
                  >
                    View My Records
                  </button>
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
              title="Recent Exam" 
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

        {/* Academic summary section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Academic Summary</h2>
              <button 
                onClick={() => navigate("/academic-report")}
                className="text-primary hover:text-primary-dark font-medium text-sm"
              >
                View full report
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100">
                    <FaGraduationCap className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Courses Completed</p>
                    <p className="text-2xl font-bold text-gray-800">{completedCourses}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100">
                    <FaBookOpen className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Best Subject</p>
                    <p className="text-xl font-bold text-gray-800">Mathematics</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100">
                    <FaTrophy className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Achievements</p>
                    <p className="text-xl font-bold text-gray-800">3 Awards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions with improved styling */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <FaCalendarAlt className="mr-2 text-primary" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            <ActionCard 
              title="View My Marks" 
              description="Check your performance in all subjects"
              icon={<FaChartLine className="h-5 w-5" />}
              bgColor="bg-blue-100"
              textColor="text-blue-600"
              onClick={() => navigate("/my-marks")}
            />
            
            <ActionCard 
              title="Leaderboard" 
              description="See your ranking among classmates"
              icon={<FaTrophy className="h-5 w-5" />}
              bgColor="bg-yellow-100"
              textColor="text-yellow-600"
              onClick={() => navigate("/leaderboard")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;