// src/pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { authToken, logout } = useAuth();
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('/api/exams', {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setExams(response.data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    fetchExams();
  }, [authToken]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-primary text-white p-4">
        <h1 className="text-2xl">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-secondary py-2 px-4 rounded-md mt-2">
          Logout
        </button>
      </header>

      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Exams</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <div key={exam._id} className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-primary">{exam.title}</h3>
              <p className="text-sm text-gray-600">{new Date(exam.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
