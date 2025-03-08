import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Marks = () => {
  const { token, user } = useContext(AuthContext);
  const { examId } = useParams();
  const [marks, setMarks] = useState(null);
  const [paper1, setPaper1] = useState(0);
  const [paper2, setPaper2] = useState(0);

  useEffect(() => {
    fetchMarks();
  }, []);

  const fetchMarks = async () => {
    const res = await fetch(`/api/marks/${user.studentId}/${examId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMarks(data);
  };

  const submitMarks = async () => {
    const res = await fetch("/api/marks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ studentId: marks.studentId, examId, paper1, paper2 }),
    });

    if (res.ok) {
      fetchMarks();
    } else {
      alert("Failed to submit marks");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-secondary text-3xl font-bold">Marks</h1>
      {marks ? (
        <div>
          <p>Paper I: {marks.paper1}</p>
          <p>Paper II: {marks.paper2}</p>
          <p>Total: {marks.total}</p>
        </div>
      ) : (
        <p>No marks found</p>
      )}

      {user?.role === "admin" && (
        <div className="mt-6">
          <h2 className="text-primary text-2xl">Enter Marks</h2>
          <input
            type="number"
            placeholder="Paper I"
            value={paper1}
            onChange={(e) => setPaper1(Number(e.target.value))}
            className="border p-2 w-full mb-4"
          />
          <input
            type="number"
            placeholder="Paper II"
            value={paper2}
            onChange={(e) => setPaper2(Number(e.target.value))}
            className="border p-2 w-full mb-4"
          />
          <button className="bg-primary text-white p-2 w-full rounded-lg" onClick={submitMarks}>
            Submit Marks
          </button>
        </div>
      )}
    </div>
  );
};

export default Marks;
