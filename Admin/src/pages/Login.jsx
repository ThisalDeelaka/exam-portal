import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", { name, password });
      localStorage.setItem("token", res.data.token); // Store token in localStorage
      login(name, res.data.token); // Set admin state in context
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      setMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-secondary text-white">
      <div className="bg-primary p-6 rounded-lg w-96 shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Admin Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded mb-3 text-black"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded mb-3 text-black"
            required
          />
          <button className="w-full bg-secondary p-2 rounded text-white font-bold">Login</button>
        </form>
        {message && <p className="mt-2 text-center">{message}</p>}

        <p className="mt-2 text-center">
          Don't have an account? <a href="/register-admin" className="text-blue-300">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
