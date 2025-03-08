import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Exams = () => {
  const { token, user } = useContext(AuthContext);
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const res = await fetch("/api/exams", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setExams(data);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const deleteExam = async (examId) => {
    if (!window.confirm("Are you sure you want to delete this exam?")) return;
    
    try {
      const res = await fetch(`/api/exams/${examId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setExams(exams.filter((exam) => exam._id !== examId));
      } else {
        alert("Failed to delete exam");
      }
    } catch (error) {
      console.error("Error deleting exam:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-secondary text-3xl font-bold">Exams</h1>
      {exams.length > 0 ? (
        <ul className="mt-4">
          {exams.map((exam) => (
            <li key={exam._id} className="border p-4 mb-4 flex justify-between items-center bg-white shadow rounded-lg">
              <span className="text-lg font-semibold">
                {exam.title} - {new Date(exam.date).toLocaleDateString()}
              </span>
              <div>
                <button
                  onClick={() => navigate(`/leaderboard/${exam._id}`)}
                  className="bg-secondary text-white px-3 py-1 rounded mr-2"
                >
                  Leaderboard
                </button>
                {user?.role === "admin" && (
                  <button
                    onClick={() => deleteExam(exam._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-lg text-gray-500">No exams available.</p>
      )}
    </div>
  );
};

export default Exams;
