import { useState } from "react";
import axios from "axios";

const CreateExam = () => {
  const [examID, setExamID] = useState("");
  const [examName, setExamName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateExam = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/exam/create",
        { examID, examName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || "Exam created successfully!");
      setExamID("");
      setExamName("");
    } catch (error) {
      setMessage("Error creating exam");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleCreateExam}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Exam ID
          </label>
          <input
            type="text"
            value={examID}
            onChange={(e) => setExamID(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter Exam ID"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Exam Name
          </label>
          <input
            type="text"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter Exam Name"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded hover:bg-opacity-90 transition"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Exam"}
        </button>

        {message && (
          <p className={`mt-3 text-sm text-center ${message.includes("Error") ? "text-red-500" : "text-green-600"}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default CreateExam;
