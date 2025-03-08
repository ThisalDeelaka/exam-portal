import axios from "axios";

const API_URL = "http://localhost:5000/api/marks";

export const getLeaderboard = async (examId) => {
  const response = await axios.get(`${API_URL}/leaderboard/${examId}`);
  return response.data;
};
