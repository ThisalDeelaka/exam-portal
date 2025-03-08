import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, BarChart2, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const ExamProgressChart = ({ marks = [] }) => {
  const [chartType, setChartType] = useState('line');
  
  // Brand colors
  const primaryColor = "#FF7350";
  const secondaryColor = "#125875";
  
  // Format the data for the chart
  const chartData = [...marks]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(exam => ({
      name: exam.examName,
      date: new Date(exam.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      }),
      score: exam.totalMarks,
      paper1: exam.paper1Marks,
      paper2: exam.paper2Marks,
      grade: exam.grade
    }));
  
  // Calculate performance insights
  const calculateInsights = () => {
    if (chartData.length < 2) return { trend: 0, improvement: 0 };
    
    const firstScore = chartData[0].score;
    const lastScore = chartData[chartData.length - 1].score;
    const difference = lastScore - firstScore;
    
    // Calculate overall improvement percentage
    const improvement = firstScore > 0 ? ((lastScore - firstScore) / firstScore) * 100 : 0;
    
    return {
      trend: difference,
      improvement: improvement.toFixed(1)
    };
  };
  
  const insights = calculateInsights();
  
  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-md rounded-lg border border-gray-100">
          <p className="font-semibold">{data.name}</p>
          <p className="text-xs text-gray-500">{data.date}</p>
          <div className="mt-2 space-y-1">
            <p className="text-sm flex justify-between">
              <span className="text-gray-500 mr-4">Total:</span>
              <span className="font-medium">{data.score}%</span>
            </p>
            <p className="text-sm flex justify-between">
              <span className="text-gray-500 mr-4">Paper I:</span>
              <span>{data.paper1}%</span>
            </p>
            <p className="text-sm flex justify-between">
              <span className="text-gray-500 mr-4">Paper II:</span>
              <span>{data.paper2}%</span>
            </p>
            <p className="text-sm flex justify-between">
              <span className="text-gray-500 mr-4">Grade:</span>
              <span>{data.grade}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <div className="flex flex-row items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Performance Trend</h3>
            <p className="text-sm text-gray-500">Track your progress across exams</p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setChartType('line')}
              className={`px-2 py-1 text-xs rounded-md ${chartType === 'line' 
                ? 'bg-blue-50 text-blue-600' 
                : 'hover:bg-gray-100'}`}
            >
              Line
            </button>
            <button 
              onClick={() => setChartType('bar')}
              className={`px-2 py-1 text-xs rounded-md ${chartType === 'bar' 
                ? 'bg-blue-50 text-blue-600' 
                : 'hover:bg-gray-100'}`}
            >
              Bar
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        {chartData.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500">First Score</span>
                  <Calendar size={16} className="text-gray-400" />
                </div>
                <div className="text-xl font-bold">{chartData[0]?.score}%</div>
                <div className="text-xs text-gray-500">{chartData[0]?.date}</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500">Recent Score</span>
                  <Calendar size={16} className="text-gray-400" />
                </div>
                <div className="text-xl font-bold">{chartData[chartData.length - 1]?.score}%</div>
                <div className="text-xs text-gray-500">{chartData[chartData.length - 1]?.date}</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500">Overall Trend</span>
                  <TrendingUp size={16} className="text-gray-400" />
                </div>
                <div className="flex items-center">
                  <span className="text-xl font-bold">{insights.improvement}%</span>
                  {insights.trend > 0 ? (
                    <ArrowUpRight size={18} className="text-green-500 ml-2" />
                  ) : insights.trend < 0 ? (
                    <ArrowDownRight size={18} className="text-red-500 ml-2" />
                  ) : (
                    <span className="w-4 h-px bg-gray-300 ml-2"></span>
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  {insights.trend > 0 
                    ? "Improving" 
                    : insights.trend < 0 
                      ? "Declining" 
                      : "Stable"}
                </div>
              </div>
            </div>
          
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'line' ? (
                  <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="score"
                      name="Total Score"
                      stroke={primaryColor}
                      strokeWidth={2}
                      dot={{ r: 4, fill: primaryColor }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="paper1"
                      name="Paper I"
                      stroke={secondaryColor}
                      strokeWidth={2}
                      dot={{ r: 4, fill: secondaryColor }}
                      strokeDasharray="5 5"
                    />
                    <Line
                      type="monotone"
                      dataKey="paper2"
                      name="Paper II"
                      stroke="#6366F1"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "#6366F1" }}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                ) : (
                  <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="score"
                      name="Total Score"
                      stroke={primaryColor}
                      strokeWidth={2}
                      dot={{ r: 4, fill: primaryColor }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          
            {chartData.length > 0 && (
              <div className="mt-2 text-center text-xs text-gray-500">
                Showing performance across {chartData.length} exams
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="p-3 rounded-full bg-gray-100 mb-3">
              <BarChart2 size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">No exam data available</p>
            <p className="text-xs text-gray-400 mt-1">Complete exams to see your progress</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamProgressChart;