const API_BASE_URL = "/api"; // Base URL for all API requests

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : {};
};

// **Authentication API**
export const registerUser = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
};

// **Exam API**
export const fetchExams = async () => {
  const res = await fetch(`${API_BASE_URL}/exams`, { headers: getAuthHeaders() });
  return res.json();
};

export const createExam = async (examData) => {
  const res = await fetch(`${API_BASE_URL}/exams`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(examData),
  });
  return res.json();
};

export const deleteExam = async (examId) => {
  const res = await fetch(`${API_BASE_URL}/exams/${examId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return res.json();
};

// **Marks API**
export const addOrUpdateMarks = async (marksData) => {
  const res = await fetch(`${API_BASE_URL}/marks`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(marksData),
  });
  return res.json();
};

export const fetchStudentMarks = async (studentId, examId) => {
  const res = await fetch(`${API_BASE_URL}/marks/${studentId}/${examId}`, {
    headers: getAuthHeaders(),
  });
  return res.json();
};

// **Leaderboard API**
export const fetchLeaderboard = async (examId) => {
  const res = await fetch(`${API_BASE_URL}/marks/leaderboard/${examId}`, {
    headers: getAuthHeaders(),
  });
  return res.json();
};

export const fetchStudentRank = async (studentId, examId) => {
  const res = await fetch(`${API_BASE_URL}/marks/rank/${studentId}/${examId}`, {
    headers: getAuthHeaders(),
  });
  return res.json();
};
