import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const registerAdmin = async (name, password) => {
  const response = await axios.post(`${API_URL}/register`, { name, password, role: "admin" });
  return response.data;
};

export const loginAdmin = async (studentId, password) => {
  const response = await axios.post(`${API_URL}/login`, { studentId, password });
  return response.data;
};
