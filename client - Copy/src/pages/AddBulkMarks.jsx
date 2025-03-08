import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const AddBulkMarks = () => {
  const { examID, paper } = useParams();
  const [students, setStudents] = useState([{ studentID: "", marks: "" }]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState("success"); // "success" or "error"

  // Determine if it's Paper I or Paper II
  const isPaperOne = paper === "paper1";
  const paperLabel = isPaperOne ? "Paper I" : "Paper II";

  // Handle input change
  const handleChange = (index, field, value) => {
    const updatedStudents = [...students];
    updatedStudents[index][field] = value;
    setStudents(updatedStudents);
  };

  // Add new student row
  const addStudentRow = () => {
    setStudents([...students, { studentID: "", marks: "" }]);
  };

  // Remove student row
  const removeStudentRow = (index) => {
    if (students.length > 1) {
      setStudents(students.filter((_, i) => i !== index));
    }
  };

  // Submit marks for selected paper only
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      const data = {
        examID,
        students: students.map((s) => ({
          studentID: s.studentID,
          [isPaperOne ? "paper1Marks" : "paper2Marks"]: Number(s.marks),
        })),
      };

      await axios.post("http://localhost:5000/api/exam/add-marks-bulk", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage(`Marks for ${paperLabel} added successfully!`);
      setMessageType("success");
      setStudents([{ studentID: "", marks: "" }]); // Reset fields
    } catch (error) {
      setMessage(error.response?.data?.message || "Error adding marks");
      setMessageType("error");
    } finally {
      setLoading(false);
      
      // Auto-dismiss message after 5 seconds
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="pt-16 px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Add Marks - {paperLabel}
            </h1>
            <div className="mt-2 md:mt-0 text-sm text-gray-500">
              Exam ID: <span className="font-medium text-gray-700">{examID}</span>
            </div>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              messageType === "success" 
                ? "bg-green-50 text-green-700 border border-green-100" 
                : "bg-red-50 text-red-700 border border-red-100"
            }`}>
              <div className="flex items-center">
                <span className={`flex-shrink-0 inline-flex mr-2 ${
                  messageType === "success" ? "text-green-500" : "text-red-500"
                }`}>
                  {messageType === "success" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
                {message}
              </div>
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 md:p-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Student Marks Entry</h2>
              <p className="text-sm text-gray-500 mt-1">Enter student IDs and their corresponding marks for {paperLabel}</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="p-4 md:p-5">
                <div className="overflow-x-auto -mx-4 md:mx-0">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {paperLabel} Marks
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.map((student, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              value={student.studentID}
                              onChange={(e) => handleChange(index, "studentID", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                              placeholder="Enter Student ID"
                              required
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              value={student.marks}
                              onChange={(e) => handleChange(index, "marks", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                              placeholder="Enter Marks"
                              min="0"
                              required
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <button
                              type="button"
                              onClick={() => removeStudentRow(index)}
                              disabled={students.length <= 1}
                              className={`inline-flex items-center px-3 py-1 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2
                                ${students.length <= 1 
                                  ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                                  : 'border-red-200 text-red-600 hover:bg-red-50 focus:ring-red-500'}`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={addStudentRow}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Student
                  </button>
                </div>
              </div>
              
              <div className="px-4 py-4 md:px-5 md:py-5 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row-reverse gap-3 sm:gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>Submit {paperLabel} Marks</>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setStudents([{ studentID: "", marks: "" }])}
                  className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Reset Form
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddBulkMarks;