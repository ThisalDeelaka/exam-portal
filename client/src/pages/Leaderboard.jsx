import { useEffect, useState } from "react";
import { getLeaderboard } from "../services/leaderboardService";
import { getExams } from "../services/examService";

const Leaderboard = () => {
  const [examId, setExamId] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [exams, setExams] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const data = await getExams();
      setExams(data);
    } catch (error) {
      console.error("Failed to fetch exams", error);
    }
  };

  const fetchLeaderboard = async () => {
    if (!examId) return;
    try {
      const data = await getLeaderboard(examId);
      setLeaderboard(data);
    } catch (error) {
      console.error("Failed to fetch leaderboard", error);
    }
  };

  const filteredLeaderboard = leaderboard.filter((student) =>
    student.studentId.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-secondary">Leaderboard</h2>

      <div className="mt-4 flex space-x-4">
        <select
          className="p-2 border rounded w-1/2"
          onChange={(e) => setExamId(e.target.value)}
        >
          <option value="">Select Exam</option>
          {exams.map((exam) => (
            <option key={exam._id} value={exam._id}>
              {exam.title}
            </option>
          ))}
        </select>
        <button
          onClick={fetchLeaderboard}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          View Leaderboard
        </button>
      </div>

      <input
        type="text"
        placeholder="Search Student ID"
        className="w-full p-2 border rounded mt-4"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="mt-6">
        <table className="w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-secondary text-white">
              <th className="p-2">Rank</th>
              <th className="p-2">Student ID</th>
              <th className="p-2">Paper I</th>
              <th className="p-2">Paper II</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaderboard.map((student, index) => (
              <tr key={student._id} className="border-b">
                <td className="p-2 text-center">{index + 1}</td>
                <td className="p-2 text-center">{student.studentId}</td>
                <td className="p-2 text-center">{student.paper1}</td>
                <td className="p-2 text-center">{student.paper2}</td>
                <td className="p-2 text-center font-bold">{student.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
