import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RegisterAdmin from "./pages/RegisterAdmin";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateExam from "./pages/CreateExam";
import AddMarks from "./pages/AddMarks";
import Leaderboard from "./pages/Leaderboard";
import AllExams from "./pages/AllExams";
import AddBulkMarks from "./pages/AddBulkMarks";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register-admin" element={<RegisterAdmin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-exam" element={<CreateExam />} />
          <Route path="/add-marks" element={<AddMarks />} />
          <Route path="/leaderboard/:examID" element={<Leaderboard />} />
          <Route path="/all-exams" element={<AllExams />} />
          <Route path="/add-marks/:examID/:paper" element={<AddBulkMarks />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
