import { useState } from "react";
import axios from "axios";

const CreateExam = () => {
  const [examID, setExamID] = useState("");
  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateExam = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      // Ensure date is selected
      if (!examDate) {
        setMessage("Please select an exam date.");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/exam/create",
        { examID, examName, examDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message);
      setExamID("");
      setExamName("");
      setExamDate("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating exam");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-secondary mb-4">Create Exam</h2>
      <form onSubmit={handleCreateExam} className="bg-white p-6 shadow-lg rounded-md w-96">
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
          placeholder="Exam Name"
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="date"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <button type="submit" className="w-full bg-primary p-2 rounded text-white font-bold">
          Create Exam
        </button>
        {message && <p className="mt-2 text-center text-secondary">{message}</p>}
      </form>
    </div>
  );
};

export default CreateExam;
