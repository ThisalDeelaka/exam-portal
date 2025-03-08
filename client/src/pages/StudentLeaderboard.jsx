import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { Medal, Trophy, User } from "lucide-react";

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
  
      const res = await axios.get(`http://localhost:5000/api/exam/${examID}/student-leaderboard`, {
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

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <Navbar />
      
      <main className="pt-16 pb-16">
        {/* Header Section */}
        <div style={{ background: `linear-gradient(to right, ${secondaryColor}, ${secondaryColor}CC)` }} className="text-white">
          <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Leaderboard for {examName}</h1>
            <p className="text-blue-100">See the top performers and your rank</p>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="max-w-6xl mx-auto px-4 -mt-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold">Top 20 Students</h2>
            </div>

            {loading ? (
              <div className="flex justify-center items-center p-16">
                <div className="w-10 h-10 border-4 border-t-4 rounded-full animate-spin" style={{ borderColor: `${secondaryColor}30`, borderTopColor: primaryColor }}></div>
              </div>
            ) : error ? (
              <div className="text-center p-12 bg-red-50">
                <p className="text-red-600">{error}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-6 py-3 font-medium text-gray-500">Rank</th>
                      <th className="px-6 py-3 font-medium text-gray-500">Student ID</th>
                      <th className="px-6 py-3 font-medium text-gray-500">Name</th>
                      <th className="px-6 py-3 font-medium text-gray-500">School</th>
                      <th className="px-6 py-3 font-medium text-gray-500">Total Marks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {leaderboard.map((entry, index) => (
                      <tr key={entry.studentID.studentID} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 flex items-center space-x-2">
                          {index === 0 ? <Trophy className="text-yellow-500" size={18} /> : null}
                          {index === 1 ? <Medal className="text-gray-400" size={18} /> : null}
                          {index === 2 ? <Medal className="text-orange-500" size={18} /> : null}
                          <span className="font-medium">{index + 1}</span>
                        </td>
                        <td className="px-6 py-4">{entry.studentID.studentID}</td>
                        <td className="px-6 py-4">{entry.studentID.name}</td>
                        <td className="px-6 py-4">{entry.studentID.school}</td>
                        <td className="px-6 py-4 font-medium">{entry.totalMarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Student's Own Rank if Not in Top 20 */}
          {studentEntry && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold">Your Rank</h2>
              </div>
              <div className="p-4 flex items-center space-x-4 bg-gray-50">
                <User className="text-gray-700" size={40} />
                <div>
                  <div className="text-xl font-bold">{studentEntry.studentID.name}</div>
                  <div className="text-gray-500 text-sm">{studentEntry.studentID.school}</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-sm text-gray-500">Rank</div>
                  <div className="text-xl font-bold">{studentRank}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Total Marks</div>
                  <div className="text-xl font-bold">{studentEntry.totalMarks}</div>
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
