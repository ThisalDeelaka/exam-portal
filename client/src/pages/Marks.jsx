import { useState } from "react";
import { addMarks } from "../services/marksService";
import { toast } from "react-toastify";

const Marks = () => {
  const [studentId, setStudentId] = useState("");
  const [examId, setExamId] = useState("");
  const [paper1, setPaper1] = useState("");
  const [paper2, setPaper2] = useState("");

  const handleAddMarks = async (e) => {
    e.preventDefault();
    try {
      await addMarks(studentId, examId, parseInt(paper1), parseInt(paper2));
      toast.success("Marks added successfully!");
      setStudentId("");
      setExamId("");
      setPaper1("");
      setPaper2("");
    } catch (error) {
      toast.error("Failed to add marks");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-secondary">Manage Marks</h2>

      <form onSubmit={handleAddMarks} className="bg-white p-4 rounded-lg shadow mt-4">
        <input
          type="text"
          placeholder="Student ID"
          className="w-full p-2 border rounded mt-2"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Exam ID"
          className="w-full p-2 border rounded mt-2"
          value={examId}
          onChange={(e) => setExamId(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Paper I Marks"
          className="w-full p-2 border rounded mt-2"
          value={paper1}
          onChange={(e) => setPaper1(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Paper II Marks"
          className="w-full p-2 border rounded mt-2"
          value={paper2}
          onChange={(e) => setPaper2(e.target.value)}
          required
        />
        <button className="w-full bg-primary text-white p-2 rounded mt-4" type="submit">
          Add Marks
        </button>
      </form>
    </div>
  );
};

export default Marks;
