import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterAdmin = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/register", { name, password });
      setMessage(res.data.message);
      setName("");
      setPassword("");
      setTimeout(() => navigate("/"), 2000); // Redirect to login after 2 sec
    } catch (error) {
      setMessage("Registration failed. Admin may already exist.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-secondary text-white">
      <div className="bg-primary p-6 rounded-lg w-96 shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Registration</h2>
        <form onSubmit={handleRegister}>
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
          <button className="w-full bg-secondary p-2 rounded text-white font-bold">Register</button>
        </form>
        {message && <p className="mt-2 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default RegisterAdmin;
