import { useEffect, useState } from "react";
import { createExam, getExams, deleteExam } from "../services/examService";
import { toast } from "react-toastify";

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

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

  const handleCreateExam = async (e) => {
    e.preventDefault();
    try {
      await createExam(title, date);
      setTitle("");
      setDate("");
      fetchExams();
      toast.success("Exam created successfully!");
    } catch (error) {
      toast.error("Failed to create exam");
    }
  };

  const handleDeleteExam = async (examId) => {
    try {
      await deleteExam(examId);
      fetchExams();
      toast.success("Exam deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete exam");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-secondary">Manage Exams</h2>

      <form onSubmit={handleCreateExam} className="bg-white p-4 rounded-lg shadow mt-4">
        <input
          type="text"
          placeholder="Exam Title"
          className="w-full p-2 border rounded mt-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="date"
          className="w-full p-2 border rounded mt-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button className="w-full bg-primary text-white p-2 rounded mt-4" type="submit">
          Create Exam
        </button>
      </form>

      <h3 className="text-xl font-semibold mt-6">Existing Exams</h3>
      <ul className="mt-4">
        {exams.map((exam) => (
          <li key={exam._id} className="bg-white p-4 shadow rounded flex justify-between mt-2">
            <div>
              <h4 className="text-lg font-semibold">{exam.title}</h4>
              <p className="text-gray-500">{new Date(exam.date).toDateString()}</p>
            </div>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => handleDeleteExam(exam._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Exams;
