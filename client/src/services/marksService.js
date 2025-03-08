import axios from "axios";

const API_URL = "http://localhost:5000/api/marks";

export const addMarks = async (studentId, examId, paper1, paper2) => {
  const response = await axios.post(API_URL, { studentId, examId, paper1, paper2 });
  return response.data;
};

export const getStudentMarks = async (studentId, examId) => {
  const response = await axios.get(`${API_URL}/${studentId}/${examId}`);
  return response.data;
};
