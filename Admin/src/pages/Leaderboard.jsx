import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Trophy, Medal, Award, Search, RefreshCw, ChevronLeft, ChevronRight, FileText, User, School, Star, Calendar } from "lucide-react";

const Leaderboard = () => {
  const { examID } = useParams();
  const { admin } = useContext(AuthContext);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [examInfo, setExamInfo] = useState({
    title: `Examination ${examID}`,
    date: "March 2025",
    totalParticipants: 0
  });
  const studentsPerPage = 10;

  useEffect(() => {
    if (examID) {
      fetchLeaderboard();
      fetchExamInfo();
    }
  }, [examID]);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const fetchExamInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`https://exam-portal-mnwv.onrender.com/api/exam/${examID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExamInfo({
        title: res.data.title || `Examination ${examID}`,
        date: new Date(res.data.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) || "March 2025",
        totalParticipants: res.data.participants || 0
      });
    } catch (err) {
      console.error("Failed to fetch exam information");
    }
  };

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`https://exam-portal-mnwv.onrender.com/api/exam/${examID}/leaderboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaderboard(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch leaderboard data");
      setLoading(false);
    }
  };

  // Get top performers unfiltered (separate from search)
  const topPerformers = leaderboard.slice(0, 3);

  // Only filter the table data with search
  const filteredTableData = leaderboard.filter(student => 
    student.studentID.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentID.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentID.studentID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic for filtered table data
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredTableData.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredTableData.length / studentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1:
        return <Trophy className="text-yellow-500 w-6 h-6" />;
      case 2:
        return <Medal className="text-gray-400 w-6 h-6" />;
      case 3:
        return <Medal className="text-amber-700 w-6 h-6" />;
      default:
        return rank <= 10 ? <Award className="text-blue-400 w-5 h-5 opacity-70" /> : 
               <span className="text-gray-600 font-semibold">{rank}</span>;
    }
  };

  const getRowClass = (index) => {
    switch(index) {
      case 0:
        return "bg-amber-50 border-l-4 border-amber-500";
      case 1:
        return "bg-slate-50 border-l-4 border-slate-400";
      case 2:
        return "bg-orange-50 border-l-4 border-orange-400";
      default:
        return index % 2 === 0 ? "bg-white" : "bg-gray-50";
    }
  };

  const renderPagination = () => {
    const pageNumbers = [];
    
    // Maximum of 5 page numbers
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return (
      <div className="flex items-center space-x-1">
        <button 
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`inline-flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md text-sm font-medium ${
            currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`inline-flex items-center justify-center w-8 h-8 border ${
              currentPage === number
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
            } rounded-md text-sm font-medium`}
          >
            {number}
          </button>
        ))}
        
        <button
          onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`inline-flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md text-sm font-medium ${
            currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with exam information */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-indigo-800">{examInfo.title} LeaderBoard</h1>
                <div className="mt-2 flex items-center text-gray-600">
                  <FileText className="h-4 w-4 mr-2" />
                  <span className="text-sm sm:text-base">Academic Excellence Ranking</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
                <div className="bg-white py-2 px-4 rounded-lg shadow-sm flex items-center border border-gray-200">
                  <Calendar className="h-4 w-4 text-indigo-600 mr-2" />
                  <span className="text-sm font-medium">{examInfo.date}</span>
                </div>
                <div className="bg-white py-2 px-4 rounded-lg shadow-sm flex items-center border border-gray-200">
                  <User className="h-4 w-4 text-indigo-600 mr-2" />
                  <span className="text-sm font-medium">{leaderboard.length} Participants</span>
                </div>
              </div>
            </div>
            <div className="mt-4 h-1 w-32 bg-indigo-600 rounded-full"></div>
          </div>

          {/* Top performers cards - using original unfiltered leaderboard data */}
          {!loading && leaderboard.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Top Performers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {topPerformers.map((student, index) => (
                  <div key={`top-${student.studentID._id}`} 
                    className={`bg-white rounded-lg shadow-md overflow-hidden border-t-4 ${
                      index === 0 ? "border-yellow-400" : 
                      index === 1 ? "border-gray-400" : 
                      "border-amber-600"
                    }`}>
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-14 w-14 rounded-full flex items-center justify-center text-white font-bold ${
                          index === 0 ? "bg-gradient-to-br from-yellow-400 to-yellow-600" : 
                          index === 1 ? "bg-gradient-to-br from-gray-400 to-gray-600" : 
                          "bg-gradient-to-br from-amber-500 to-amber-700"
                        }`}>
                          {getRankIcon(index + 1)}
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="font-bold text-gray-900 text-lg">{student.studentID.name}</div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <School className="h-3.5 w-3.5 mr-1" />
                            {student.studentID.school}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <div className="text-sm text-gray-500">Student ID: {student.studentID.studentID}</div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="font-bold text-lg">{student.totalMarks}</span>
                          <span className="text-xs text-gray-500 ml-1">points</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              {/* Search and refresh bar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <div className="relative w-full sm:w-80">
                  <input
                    type="text"
                    placeholder="Search by name, school or ID..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                <button
                  onClick={fetchLeaderboard}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-5 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Data
                </button>
              </div>

              {/* Content area */}
              {loading ? (
                <div className="flex flex-col justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                  <p className="mt-4 text-gray-500">Loading leaderboard data...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              ) : filteredTableData.length === 0 ? (
                <div className="text-center py-16">
                  <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-4 text-gray-900 text-lg font-medium">No results found</h3>
                  <p className="mt-2 text-gray-500 text-base">Try adjusting your search criteria or check back later.</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider w-16 text-center bg-indigo-50 border-b-2 border-indigo-200">Rank</th>
                        <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider bg-indigo-50 border-b-2 border-indigo-200">Student</th>
                        <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider hidden md:table-cell bg-indigo-50 border-b-2 border-indigo-200">ID</th>
                        <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider hidden sm:table-cell bg-indigo-50 border-b-2 border-indigo-200">Institution</th>
                        <th scope="col" className="px-4 py-4 text-right text-xs font-medium text-indigo-800 uppercase tracking-wider bg-indigo-50 border-b-2 border-indigo-200">Score</th>
                        <th scope="col" className="px-4 py-4 text-center text-xs font-medium text-indigo-800 uppercase tracking-wider bg-indigo-50 border-b-2 border-indigo-200 hidden md:table-cell">Percentile</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentStudents.map((student, index) => {
                        // Find the actual rank in the original unfiltered leaderboard
                        const actualRank = leaderboard.findIndex(s => s.studentID._id === student.studentID._id) + 1;
                        const percentile = Math.round(100 * (1 - (actualRank - 1) / leaderboard.length));
                        
                        return (
                        <tr key={student.studentID._id} className={getRowClass(actualRank - 1)}>
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            <div className="flex items-center justify-center">
                              {getRankIcon(actualRank)}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                <span className="text-indigo-700 font-medium">
                                  {student.studentID.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-semibold text-gray-900">{student.studentID.name}</div>
                                <div className="text-xs text-gray-500 sm:hidden">{student.studentID.studentID}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                            <div className="text-sm text-gray-600 font-mono">{student.studentID.studentID}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                            <div className="text-sm text-gray-600">{student.studentID.school}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right">
                            <div className="text-sm font-medium">
                              {actualRank <= 3 ? (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-600 text-white">
                                  {student.totalMarks}
                                </span>
                              ) : (
                                <span className="text-gray-900 font-semibold">{student.totalMarks}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-center hidden md:table-cell">
                            <div className="text-sm">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                percentile > 90 ? "bg-green-100 text-green-800" :
                                percentile > 75 ? "bg-blue-100 text-blue-800" :
                                percentile > 50 ? "bg-yellow-100 text-yellow-800" :
                                "bg-gray-100 text-gray-800"
                              }`}>
                                {percentile}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      )})}
                    </tbody>
                  </table>
                </div>
              )}
              
              {/* Enhanced pagination */}
              {filteredTableData.length > 0 && !loading && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-500">
                    Showing <span className="font-medium">{indexOfFirstStudent + 1}</span> to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastStudent, filteredTableData.length)}
                    </span>{" "}
                    of <span className="font-medium">{filteredTableData.length}</span> results
                  </div>
                  
                  {totalPages > 1 && renderPagination()}
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;