// src/pages/Login.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const { login } = useAuth(); // Auth context to handle JWT
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to the backend
      const response = await axios.post('/api/auth/login', {
        name,
        password,
        role: 'admin', // Always admin for this frontend
      });

      // Upon successful login, store JWT token and role in Auth context
      await login(response.data.token, 'admin');

      // Redirect to the admin dashboard
      navigate('/admin-dashboard');
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="p-6 max-w-md w-full bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-secondary mb-6">Admin Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Name Field (Admin only) */}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />
          
          {/* Password Field */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-secondary text-white rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
