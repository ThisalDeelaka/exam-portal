import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold text-secondary">Admin Dashboard</h1>
      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
        className="mt-4 px-4 py-2 bg-primary text-white rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
