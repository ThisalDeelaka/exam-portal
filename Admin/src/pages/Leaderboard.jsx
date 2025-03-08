import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

const Leaderboard = () => {
  const { token, user } = useContext(AuthContext);
  const { examId } = useParams();
  const [leaderboard, setLeaderboard] = useState([]);
  const [studentRank, setStudentRank] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
    fetchStudentRank();
  }, []);

  const fetchLeaderboard = async () => {
    const res = await fetch(`/api/marks/leaderboard/${examId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setLeaderboard(data);
  };

  const fetchStudentRank = async () => {
    if (user?.role === "student") {
      const res = await fetch(`/api/marks/rank/${user.studentId}/${examId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setStudentRank(data.rank);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-secondary text-3xl font-bold">Leaderboard</h1>

      <div className="mt-6">
        <h2 className="text-primary text-2xl">Top 20 Students</h2>
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-secondary text-white">
              <th className="border p-2">Rank</th>
              <th className="border p-2">Student ID</th>
              <th className="border p-2">Total Marks</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((student, index) => (
              <tr key={student.studentId} className="border">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{student.studentId}</td>
                <td className="border p-2">{student.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {user?.role === "student" && studentRank && studentRank > 20 && (
        <div className="mt-6">
          <h2 className="text-primary text-2xl">Your Rank</h2>
          <p className="border p-4 text-xl">
            Your rank: <span className="text-secondary font-bold">{studentRank}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
