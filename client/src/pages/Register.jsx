// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Register = () => {
  const { login } = useAuth(); // You can use the login function after successful registration
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin'); // Default is admin, can be changed to 'student' if needed
  const [error, setError] = useState('');

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Register the user
      const response = await axios.post('/api/auth/register', {
        name,
        password,
        role,
      });

      // After successful registration, login the user
      await login(name, password);

      // Redirect to admin dashboard or student's dashboard based on the role
      if (response.data.message === 'Admin registered successfully') {
        navigate('/admin-dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="p-6 max-w-md w-full bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-secondary mb-6">Register</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
            required
          >
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
          <button
            type="submit"
            className="w-full py-2 bg-secondary text-white rounded-md"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
