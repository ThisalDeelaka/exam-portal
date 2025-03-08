import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const AllExams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/exam/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExams(res.data);
      } catch (error) {
        console.error("Error fetching exams", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="pt-16 px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Exams Dashboard</h1>
          
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-pulse flex space-x-2">
                <div className="h-3 w-3 bg-secondary rounded-full"></div>
                <div className="h-3 w-3 bg-secondary rounded-full"></div>
                <div className="h-3 w-3 bg-secondary rounded-full"></div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 md:p-5 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">All Exams</h2>
                <span className="bg-gray-100 text-gray-700 py-1 px-3 rounded-full text-sm font-medium">
                  {exams.length} {exams.length === 1 ? "Exam" : "Exams"}
                </span>
              </div>
              
              <div className="overflow-x-auto">
                {/* Mobile view (card-based layout) */}
                <div className="grid grid-cols-1 md:hidden">
                  {exams.length > 0 ? (
                    exams.map((exam) => (
                      <div key={exam._id} className="p-4 border-b">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-gray-800">{exam.examName}</span>
                          <span className="text-sm text-gray-500">ID: {exam.examID}</span>
                        </div>
                        <div className="grid grid-cols-1 gap-2 mt-3">
                          <Link 
                            to={`/add-marks/${exam.examID}/paper1`}
                            className="bg-primary bg-opacity-10 text-primary text-center py-2 rounded-md font-medium text-sm transition-colors hover:bg-opacity-20"
                          >
                            Paper I
                          </Link>
                          <Link 
                            to={`/add-marks/${exam.examID}/paper2`}
                            className="bg-primary bg-opacity-10 text-primary text-center py-2 rounded-md font-medium text-sm transition-colors hover:bg-opacity-20"
                          >
                            Paper II
                          </Link>
                          <Link 
  to={`/leaderboard/${exam.examID}`}
  className="bg-green-100 text-green-700 text-center py-2 rounded-md font-medium text-sm transition-colors hover:bg-green-200 flex items-center justify-center"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
  View Leaderboard
</Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-10 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p>No exams found</p>
                        <p className="text-gray-400 mt-1">Exams will appear here once created</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Desktop view (table layout) */}
                <table className="hidden md:table min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam ID</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Name</th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Paper I</th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Paper II</th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Leaderboard</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {exams.length > 0 ? (
                      exams.map((exam) => (
                        <tr key={exam._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.examID}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{exam.examName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <Link
                              to={`/add-marks/${exam.examID}/paper1`}
                              className="inline-flex items-center px-3 py-1.5 bg-primary bg-opacity-10 text-primary text-sm font-medium rounded hover:bg-opacity-20 transition-colors"
                            >
                              Add Marks
                            </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <Link
                              to={`/add-marks/${exam.examID}/paper2`}
                              className="inline-flex items-center px-3 py-1.5 bg-primary bg-opacity-10 text-primary text-sm font-medium rounded hover:bg-opacity-20 transition-colors"
                            >
                              Add Marks
                            </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                          <Link
  to={`/leaderboard/${exam.examID}`}
  className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded hover:bg-green-200 transition-colors"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
  View Leaderboard
</Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-10 text-center text-sm text-gray-500">
                          <div className="flex flex-col items-center justify-center">
                            <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p>No exams found</p>
                            <p className="text-gray-400 mt-1">Exams will appear here once created</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AllExams;