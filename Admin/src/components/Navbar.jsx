import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-secondary p-4 text-white flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">
        <Link to="/">Exam System</Link>
      </h1>

      <div>
        {user ? (
          <>
            <Link to="/dashboard" className="mr-4 hover:underline">Dashboard</Link>
            <Link to="/exams" className="mr-4 hover:underline">Exams</Link>
            <button
              onClick={logout}
              className="bg-primary px-4 py-2 rounded hover:opacity-80 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="mr-4 hover:underline">Login</Link>
            <Link
              to="/register"
              className="bg-primary px-4 py-2 rounded hover:opacity-80 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
