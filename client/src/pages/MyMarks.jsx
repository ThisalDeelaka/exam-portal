import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronDown, Filter, Download, Clock, Award, BarChart2, TrendingUp, Calendar } from "lucide-react";

const MyMarks = () => {
  const { student } = useContext(AuthContext);
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("recent");

  // Brand colors
  const primaryColor = "#FF7350";
  const secondaryColor = "#125875";

  useEffect(() => {
    if (student) fetchMarks();
  }, [student]);

  const fetchMarks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in again.");
        setLoading(false);
        return;
      }
      
      const res = await axios.get(`http://localhost:5000/api/exam/student/my-marks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Add some mock data for illustration of design
      const enhancedData = res.data.map(exam => ({
        ...exam,
        date: exam.date || "2023-04-15", // Mock date if not present
        grade: calculateGrade(exam.totalMarks)
      }));
      
      setMarks(enhancedData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching marks:", err);
      setError("Failed to fetch marks. Please try again.");
      setLoading(false);
    }
  };

  const calculateGrade = (marks) => {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    if (marks >= 50) return "D";
    return "F";
  };

  const getOverallStats = () => {
    if (!marks.length) return { average: 0, highest: 0, lowest: 0, trend: 0 };
    
    const totalMarks = marks.map(m => m.totalMarks);
    const average = totalMarks.reduce((a, b) => a + b, 0) / totalMarks.length;
    const highest = Math.max(...totalMarks);
    const lowest = Math.min(...totalMarks);
    
    // Calculate trend based on the most recent 3 exams (if available)
    let trend = 0;
    if (marks.length >= 2) {
      const recentMarks = [...marks].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
      if (recentMarks.length >= 2) {
        trend = recentMarks[0].totalMarks - recentMarks[recentMarks.length - 1].totalMarks;
      }
    }
    
    return { average, highest, lowest, trend };
  };

  const stats = getOverallStats();

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <Navbar />
      
      <main className="pt-16 pb-16">
        {/* Hero section with student info */}
        <div style={{ background: `linear-gradient(to right, ${secondaryColor}, ${secondaryColor}CC)` }} className="text-white">
          <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Academic Performance Dashboard</h1>
                <p className="text-blue-100 mb-4">Track your exam results and performance</p>
              </div>
              
              <div className="hidden md:flex justify-end">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 w-64">
                  <div className="mb-3 flex items-center">
                    
                    <div>
                      <div className="font-medium">{student?.name || "Student"}</div>
                      <div className="text-xs opacity-80">{student?.id || "ID: 2023505"}</div>
                    </div>
                  </div>
                  
                  <div className="text-xs font-medium mb-1">Current Standing</div>
                  <div className="w-full bg-white/20 rounded-full h-2 mb-3">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ width: `${Math.min(stats.average, 100)}%`, backgroundColor: primaryColor }}
                    ></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="bg-white/10 rounded p-2">
                      <div className="font-medium">{marks.length}</div>
                      <div>Exams</div>
                    </div>
                    <div className="bg-white/10 rounded p-2">
                      <div className="font-medium">{stats.average.toFixed(1)}%</div>
                      <div>Average</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="max-w-6xl mx-auto px-4 -mt-6">
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm font-medium text-gray-500">Average Score</div>
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
                  <BarChart2 size={16} />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">{stats.average.toFixed(1)}%</div>
              <div className="text-xs text-gray-500 flex items-center">
                {stats.trend > 0 ? (
                  <><TrendingUp size={14} className="text-green-500 mr-1" /> Improving</>
                ) : stats.trend < 0 ? (
                  <><TrendingUp size={14} className="text-red-500 mr-1 transform rotate-180" /> Declining</>
                ) : (
                  <><span className="inline-block w-3 h-px bg-gray-300 mr-1"></span> Stable</>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm font-medium text-gray-500">Highest Score</div>
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${secondaryColor}20`, color: secondaryColor }}>
                  <Award size={16} />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">{stats.highest}%</div>
              <div className="text-xs text-gray-500">Top performance</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm font-medium text-gray-500">Recent Performance</div>
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
                  <Clock size={16} />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">
                {marks.length > 0 ? marks[0].totalMarks : 0}%
              </div>
              <div className="text-xs text-gray-500">Latest exam result</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm font-medium text-gray-500">Completion</div>
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${secondaryColor}20`, color: secondaryColor }}>
                  <BarChart2 size={16} />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">{marks.length}</div>
              <div className="text-xs text-gray-500">Exams completed</div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            {/* Toolbar */}
            <div className="flex flex-wrap justify-between items-center p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold">Exam Results</h2>
              
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                <div className="flex">
                  <button 
                    className={`px-3 py-1.5 text-xs font-medium rounded-l-lg ${viewMode === 'table' ? 'text-white' : 'bg-gray-50 text-gray-500'}`}
                    style={viewMode === 'table' ? {backgroundColor: primaryColor} : {}}
                    onClick={() => setViewMode('table')}
                  >
                    Table
                  </button>
                  <button 
                    className={`px-3 py-1.5 text-xs font-medium rounded-r-lg ${viewMode === 'cards' ? 'text-white' : 'bg-gray-50 text-gray-500'}`}
                    style={viewMode === 'cards' ? {backgroundColor: primaryColor} : {}}
                    onClick={() => setViewMode('cards')}
                  >
                    Cards
                  </button>
                </div>
                
                <button 
                  className="flex items-center px-3 py-1.5 text-xs font-medium bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100"
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  <Filter size={14} className="mr-1" />
                  Filter
                </button>
                
                <button className="flex items-center px-3 py-1.5 text-xs font-medium bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100">
                  <Download size={14} className="mr-1" />
                  Export
                </button>
              </div>
            </div>
            
            {/* Filter dropdown panel */}
            {filterOpen && (
              <div className="p-4 bg-gray-50 border-b border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Sort By</label>
                    <select className="w-full text-sm border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2" style={{ outlineColor: primaryColor }}>
                      <option>Recent first</option>
                      <option>Highest marks</option>
                      <option>Lowest marks</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Score Range</label>
                    <select className="w-full text-sm border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2" style={{ outlineColor: primaryColor }}>
                      <option>All scores</option>
                      <option>Above 80%</option>
                      <option>60% - 80%</option>
                      <option>Below 60%</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {/* Content display */}
            {loading ? (
              <div className="flex justify-center items-center p-16">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 border-4 border-t-4 rounded-full animate-spin mb-4" style={{ borderColor: `${secondaryColor}30`, borderTopColor: primaryColor }}></div>
                  <p className="text-gray-500">Loading your academic records...</p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center p-12 bg-red-50">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-red-800 mb-2">{error}</h3>
                <p className="text-red-600 mb-4">We couldn't retrieve your academic records</p>
                <button 
                  onClick={fetchMarks} 
                  className="px-4 py-2 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ backgroundColor: primaryColor }}
                >
                  Try Again
                </button>
              </div>
            ) : marks.length === 0 ? (
              <div className="text-center p-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">No Results Available</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Your exam results will appear here after your instructors publish them
                </p>
              </div>
            ) : viewMode === 'table' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-6 py-3 font-medium text-gray-500">Exam</th>
                      <th className="px-4 py-3 font-medium text-gray-500">Paper I</th>
                      <th className="px-4 py-3 font-medium text-gray-500">Paper II</th>
                      <th className="px-4 py-3 font-medium text-gray-500">Total</th>
                      <th className="px-4 py-3 font-medium text-gray-500">Grade</th>
                      <th className="px-4 py-3 font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {marks.map((exam) => {
                      const scorePercentage = exam.totalMarks;
                      let statusColor, statusBg, statusText;
                      
                      if (scorePercentage >= 80) {
                        statusColor = 'bg-green-500';
                        statusBg = 'bg-green-50';
                        statusText = 'text-green-600';
                      } else if (scorePercentage >= 60) {
                        statusColor = primaryColor;
                        statusBg = `${primaryColor}10`;
                        statusText = primaryColor;
                      } else if (scorePercentage >= 40) {
                        statusColor = secondaryColor;
                        statusBg = `${secondaryColor}10`;
                        statusText = secondaryColor;
                      } else {
                        statusColor = 'bg-red-500';
                        statusBg = 'bg-red-50';
                        statusText = 'text-red-600';
                      }
                      
                      return (
                        <tr key={exam.examID} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-medium">{exam.examName}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{exam.date}</div>
                          </td>
                          <td className="px-4 py-4">{exam.paper1Marks}</td>
                          <td className="px-4 py-4">{exam.paper2Marks}</td>
                          <td className="px-4 py-4">
                            <div className="font-medium">{exam.totalMarks}</div>
                            <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1.5">
                              <div 
                                className="h-1.5 rounded-full" 
                                style={{ 
                                  width: `${scorePercentage}%`,
                                  backgroundColor: typeof statusColor === 'string' && statusColor.startsWith('bg-') 
                                    ? undefined 
                                    : statusColor,
                                  className: typeof statusColor === 'string' && statusColor.startsWith('bg-') 
                                    ? statusColor 
                                    : undefined
                                }}
                              ></div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span 
                              className="inline-flex items-center justify-center w-8 h-8 rounded-full font-medium"
                              style={{ 
                                backgroundColor: typeof statusBg === 'string' && statusBg.startsWith('bg-') 
                                  ? undefined 
                                  : statusBg,
                                color: typeof statusText === 'string' && statusText.startsWith('text-') 
                                  ? undefined 
                                  : statusText,
                                className: `${typeof statusBg === 'string' && statusBg.startsWith('bg-') ? statusBg : ''} ${typeof statusText === 'string' && statusText.startsWith('text-') ? statusText : ''}`
                              }}
                            >
                              {exam.grade}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span 
                              className="inline-block px-2 py-1 rounded-full text-xs font-medium"
                              style={{ 
                                backgroundColor: typeof statusBg === 'string' && statusBg.startsWith('bg-') 
                                  ? undefined 
                                  : statusBg,
                                color: typeof statusText === 'string' && statusText.startsWith('text-') 
                                  ? undefined 
                                  : statusText,
                                className: `${typeof statusBg === 'string' && statusBg.startsWith('bg-') ? statusBg : ''} ${typeof statusText === 'string' && statusText.startsWith('text-') ? statusText : ''}`
                              }}
                            >
                              {scorePercentage >= 60 ? "Passed" : "Failed"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {marks.map((exam) => {
                  const scorePercentage = exam.totalMarks;
                  let statusColor, statusBg, statusText;
                  
                  if (scorePercentage >= 80) {
                    statusColor = 'bg-green-500';
                    statusBg = 'bg-green-50';
                    statusText = 'text-green-600';
                  } else if (scorePercentage >= 60) {
                    statusColor = primaryColor;
                    statusBg = `${primaryColor}10`;
                    statusText = primaryColor;
                  } else if (scorePercentage >= 40) {
                    statusColor = secondaryColor;
                    statusBg = `${secondaryColor}10`;
                    statusText = secondaryColor;
                  } else {
                    statusColor = 'bg-red-500';
                    statusBg = 'bg-red-50';
                    statusText = 'text-red-600';
                  }
                  
                  return (
                    <div key={exam.examID} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{exam.examName}</h3>
                          <span 
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full font-medium"
                            style={{ 
                              backgroundColor: typeof statusBg === 'string' && statusBg.startsWith('bg-') 
                                ? undefined 
                                : statusBg,
                              color: typeof statusText === 'string' && statusText.startsWith('text-') 
                                ? undefined 
                                : statusText,
                              className: `${typeof statusBg === 'string' && statusBg.startsWith('bg-') ? statusBg : ''} ${typeof statusText === 'string' && statusText.startsWith('text-') ? statusText : ''}`
                            }}
                          >
                            {exam.grade}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{exam.date}</div>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          <div className="text-center">
                            <div className="text-xs text-gray-500 mb-1">Paper I</div>
                            <div className="font-medium">{exam.paper1Marks}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-500 mb-1">Paper II</div>
                            <div className="font-medium">{exam.paper2Marks}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-500 mb-1">Total</div>
                            <div className="font-medium">{exam.totalMarks}</div>
                          </div>
                        </div>
                        
                        <div className="mb-2">
                          <div className="flex justify-between items-center text-xs mb-1">
                            <span className="text-gray-500">Score</span>
                            <span className="font-medium">{exam.totalMarks}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full" 
                              style={{ 
                                width: `${scorePercentage}%`,
                                backgroundColor: typeof statusColor === 'string' && statusColor.startsWith('bg-') 
                                  ? undefined 
                                  : statusColor,
                                className: typeof statusColor === 'string' && statusColor.startsWith('bg-') 
                                  ? statusColor 
                                  : undefined
                              }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <span 
                            className="inline-block px-2 py-1 rounded-full text-xs font-medium"
                            style={{ 
                              backgroundColor: typeof statusBg === 'string' && statusBg.startsWith('bg-') 
                                ? undefined 
                                : statusBg,
                              color: typeof statusText === 'string' && statusText.startsWith('text-') 
                                ? undefined 
                                : statusText,
                              className: `${typeof statusBg === 'string' && statusBg.startsWith('bg-') ? statusBg : ''} ${typeof statusText === 'string' && statusText.startsWith('text-') ? statusText : ''}`
                            }}
                          >
                            {scorePercentage >= 60 ? "Passed" : "Failed"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyMarks;