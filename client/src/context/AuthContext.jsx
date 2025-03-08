import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const studentData = localStorage.getItem("studentData");

    if (token && studentData) {
      try {
        setStudent(JSON.parse(studentData)); // Parse valid JSON only
      } catch (error) {
        console.error("Error parsing studentData:", error);
        localStorage.removeItem("studentData"); // Clear corrupted data
      }
    }
  }, []);

  const login = async (studentID, password) => {
    try {
      const res = await axios.post("https://exam-portal-mnwv.onrender.com/api/student/login", { studentID, password });

      if (res.data.student) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("studentData", JSON.stringify(res.data.student)); // Ensure valid JSON
        setStudent(res.data.student);
        return true;
      } else {
        console.error("Invalid response format:", res.data);
        return false;
      }
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("studentData");
    setStudent(null);
  };

  return (
    <AuthContext.Provider value={{ student, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
