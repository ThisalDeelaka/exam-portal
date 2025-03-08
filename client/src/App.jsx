import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyMarks from "./pages/MyMarks";
import StudentLeaderboard from "./pages/StudentLeaderboard"; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-marks" element={<MyMarks />} />
          <Route path="/leaderboard/:examID" element={<StudentLeaderboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
