import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { Medal, Trophy, User, Award, Star, ChevronUp } from "lucide-react";

const StudentLeaderboard = () => {
  const { student } = useContext(AuthContext);
  const { examID } = useParams(); // Get examID from URL params
  const [leaderboard, setLeaderboard] = useState([]);
  const [studentRank, setStudentRank] = useState(null);
  const [studentEntry, setStudentEntry] = useState(null);
  const [examName, setExamName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Brand colors
  const primaryColor = "#FF7350";
  const secondaryColor = "#125875";

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
  
      if (!token) {
        setError("No token found. Please log in again.");
        setLoading(false);
        return;
      }
  
      const res = await axios.get(`https://exam-portal-mnwv.onrender.com/api/exam/${examID}/student-leaderboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setLeaderboard(res.data.top20Leaderboard);
      setStudentRank(res.data.studentRank);
      setStudentEntry(res.data.studentEntry);
      setExamName(res.data.examName);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      setError("Failed to fetch leaderboard. Please try again.");
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (examID) {
      fetchLeaderboard(); 
    }
  }, [examID]); 

  // Function to get background style for rank
  const getRankStyle = (index) => {
    if (index === 0) return "bg-yellow-50 border-l-4 border-yellow-400";
    if (index === 1) return "bg-gray-50 border-l-4 border-gray-400";
    if (index === 2) return "bg-orange-50 border-l-4 border-orange-400";
    return "";
  };

  // Function to get trophy icon for rank
  const getRankIcon = (index) => {
    if (index === 0) return <Trophy className="text-yellow-500" size={20} />;
    if (index === 1) return <Medal className="text-gray-400" size={20} />;
    if (index === 2) return <Medal className="text-amber-600" size={20} />;
    if (index < 10) return <Star className="text-blue-400" size={18} />;
    return <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium">{index + 1}</span>;
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <Navbar />
      
      <main className="py-16">
        {/* Header Section with curved bottom */}
        <div 
          style={{ 
            background: `linear-gradient(135deg, ${secondaryColor}, ${primaryColor}90)`,
            borderRadius: "0 0 25px 25px"
          }} 
          className="text-white mb-8 relative overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full" style={{ background: `radial-gradient(circle, ${primaryColor}20, transparent 70%)` }}></div>
          <div className="absolute bottom-0 left-20 w-32 h-32 rounded-full" style={{ background: `radial-gradient(circle, ${primaryColor}20, transparent 70%)` }}></div>
          
          <div className="max-w-6xl mx-auto px-4 py-10 md:py-16 relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{examName} Leaderboard</h1>
            <p className="text-blue-100 text-lg">Celebrating academic excellence and achievement</p>
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-6xl mx-auto px-4">
          {/* Stats Summary Cards */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
                <div className="rounded-full p-3" style={{ backgroundColor: `${primaryColor}15` }}>
                  <Trophy size={24} style={{ color: primaryColor }} />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Top Score</h3>
                  <p className="text-2xl font-bold">{leaderboard[0]?.totalMarks || 0}</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
                <div className="rounded-full p-3" style={{ backgroundColor: `${secondaryColor}15` }}>
                  <Award size={24} style={{ color: secondaryColor }} />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Your Rank</h3>
                  <p className="text-2xl font-bold">{studentRank || "-"}</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
                <div className="rounded-full p-3" style={{ backgroundColor: `${primaryColor}15` }}>
                  <User size={24} style={{ color: primaryColor }} />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Your Score</h3>
                  <p className="text-2xl font-bold">{studentEntry?.totalMarks || "-"}</p>
                </div>
              </div>
            </div>
          )}

          {/* Leaderboard Table */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-8">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center" style={{ backgroundColor: `${secondaryColor}05` }}>
              <h2 className="text-xl font-bold" style={{ color: secondaryColor }}>Top Performers</h2>
              <div className="text-sm text-gray-500">Total Participants: {studentRank > 0 ? studentRank : 0}+</div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center p-20">
                <div className="w-12 h-12 border-4 rounded-full animate-spin" style={{ borderColor: `${secondaryColor}30`, borderTopColor: primaryColor }}></div>
              </div>
            ) : error ? (
              <div className="text-center p-12 bg-red-50">
                <p className="text-red-600 font-medium">{error}</p>
                <button 
                  className="mt-4 px-4 py-2 rounded text-white text-sm font-medium"
                  style={{ backgroundColor: primaryColor }}
                  onClick={fetchLeaderboard}
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: `${secondaryColor}10` }}>
                      <th className="px-6 py-4 font-semibold text-gray-600 text-left">Rank</th>
                      <th className="px-6 py-4 font-semibold text-gray-600 text-left">Student</th>
                      <th className="px-6 py-4 font-semibold text-gray-600 text-left">School</th>
                      <th className="px-6 py-4 font-semibold text-gray-600 text-right">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {leaderboard.map((entry, index) => (
                      <tr 
                        key={entry.studentID.studentID} 
                        className={`hover:bg-gray-50 transition-colors ${getRankStyle(index)} ${
                          student && entry.studentID.studentID === student.studentID ? "bg-blue-50" : ""
                        }`}
                      >
                        <td className="px-6 py-4 flex items-center space-x-3">
                          {getRankIcon(index)}
                          <span className="font-medium">{index + 1}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium">{entry.studentID.name}</div>
                          <div className="text-xs text-gray-500">ID: {entry.studentID.studentID}</div>
                        </td>
                        <td className="px-6 py-4">{entry.studentID.school}</td>
                        <td className="px-6 py-4 font-bold text-right">
                          <span className="px-3 py-1 rounded" style={{ backgroundColor: index < 3 ? `${primaryColor}15` : "transparent", color: index < 3 ? primaryColor : "inherit" }}>
                            {entry.totalMarks}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Student's Own Rank if Not in Top 20 */}
          {!loading && !error && studentEntry && studentRank > 20 && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-100" style={{ backgroundColor: `${primaryColor}10` }}>
                <h2 className="text-lg font-semibold" style={{ color: primaryColor }}>Your Position</h2>
              </div>
              <div className="p-6 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: `${secondaryColor}15` }}>
                    <User className="text-gray-700" size={32} />
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-lg font-bold">{studentEntry.studentID.name}</div>
                  <div className="text-gray-500">{studentEntry.studentID.school}</div>
                </div>
                <div className="flex flex-col sm:flex-row gap-8 ml-auto text-center sm:text-left">
                  <div>
                    <div className="text-sm font-medium text-gray-500">Your Rank</div>
                    <div className="flex items-center justify-center">
                      <span className="text-2xl font-bold">{studentRank}</span>
                      <ChevronUp size={16} className="text-green-500 ml-1" />
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded" style={{ backgroundColor: `${primaryColor}15` }}>
                    <div className="text-sm font-medium text-gray-500">Total Score</div>
                    <div className="text-2xl font-bold" style={{ color: primaryColor }}>{studentEntry.totalMarks}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentLeaderboard;