import axios from "axios";

const API_URL = "http://localhost:5000/api/exams";

export const createExam = async (title, date) => {
  const response = await axios.post(API_URL, { title, date });
  return response.data;
};

export const getExams = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const deleteExam = async (examId) => {
  const response = await axios.delete(`${API_URL}/${examId}`);
  return response.data;
};
