import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Navbar from "../components/Navbar";

const Leaderboard = () => {
  const { student } = useContext(AuthContext);
  const [leaderboard, setLeaderboard] = useState([]);
  const [studentRank, setStudentRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLeaderboard();
    fetchStudentRank();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/exam/latest/leaderboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setLeaderboard(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch leaderboard");
      setLoading(false);
    }
  };

  const fetchStudentRank = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/exam/latest/rank/${student.studentID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStudentRank(res.data.rank);
    } catch (err) {
      setStudentRank(null);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-secondary text-center">Latest Exam Leaderboard</h1>

        {loading ? (
          <div className="text-center mt-6 text-gray-600">Loading leaderboard...</div>
        ) : error ? (
          <div className="text-center mt-6 text-red-500">{error}</div>
        ) : (
          <div className="mt-6">
            <table className="w-full border-collapse border border-gray-300 mt-4">
              <thead>
                <tr className="bg-secondary text-white">
                  <th className="border p-2">Rank</th>
                  <th className="border p-2">Student Name</th>
                  <th className="border p-2">School</th>
                  <th className="border p-2">Total Marks</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length > 0 ? (
                  leaderboard.map((student, index) => (
                    <tr key={student.studentID._id} className="border">
                      <td className="border p-2">{index + 1}</td>
                      <td className="border p-2">{student.studentID.name}</td>
                      <td className="border p-2">{student.studentID.school}</td>
                      <td className="border p-2 font-bold">{student.totalMarks}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-4 text-gray-600">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {studentRank && studentRank > 20 && (
          <div className="mt-6 text-center">
            <h2 className="text-primary text-2xl">Your Rank</h2>
            <p className="border p-4 text-xl">
              Your rank: <span className="text-secondary font-bold">{studentRank}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
