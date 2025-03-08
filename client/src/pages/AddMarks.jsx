import { useState } from "react";
import axios from "axios";

const AddMarks = () => {
  const [examID, setExamID] = useState("");
  const [studentID, setStudentID] = useState("");
  const [paper1Marks, setPaper1Marks] = useState("");
  const [paper2Marks, setPaper2Marks] = useState("");
  const [message, setMessage] = useState("");

  const handleAddMarks = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/exam/add-marks",
        { examID, studentID, paper1Marks: Number(paper1Marks), paper2Marks: Number(paper2Marks) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message);
      setExamID("");
      setStudentID("");
      setPaper1Marks("");
      setPaper2Marks("");
    } catch (error) {
      setMessage("Error adding marks");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-secondary mb-4">Add Marks</h2>
      <form onSubmit={handleAddMarks} className="bg-white p-6 shadow-lg rounded-md w-96">
        <input
          type="text"
          placeholder="Exam ID"
          value={examID}
          onChange={(e) => setExamID(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="text"
          placeholder="Student ID"
          value={studentID}
          onChange={(e) => setStudentID(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="number"
          placeholder="Paper I Marks"
          value={paper1Marks}
          onChange={(e) => setPaper1Marks(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="number"
          placeholder="Paper II Marks"
          value={paper2Marks}
          onChange={(e) => setPaper2Marks(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <button type="submit" className="w-full bg-primary p-2 rounded text-white font-bold">
          Submit Marks
        </button>
        {message && <p className="mt-2 text-center text-secondary">{message}</p>}
      </form>
    </div>
  );
};

export default AddMarks;
