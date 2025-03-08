import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RegisterAdmin from "./pages/RegisterAdmin";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateExam from "./pages/CreateExam";
import AddMarks from "./pages/AddMarks";
import Leaderboard from "./pages/Leaderboard";

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
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
