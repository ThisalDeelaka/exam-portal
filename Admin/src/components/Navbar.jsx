import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { 
  FaBars, 
  FaTimes, 
  FaHome, 
  FaBook, 
  FaUser, 
  FaSignOutAlt,
  FaBell
} from "react-icons/fa";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  // Check if the current path matches the link
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-secondary shadow-lg" : "bg-secondary bg-opacity-95"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="bg-primary text-white p-1.5 rounded-lg">
              <FaBook className="text-lg" />
            </div>
            <span className="text-white text-xl font-bold tracking-tight">
              PaperRank<span className="text-primary font-extrabold">.</span>
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-1">
            <li>
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                  isActive('/dashboard') 
                    ? 'bg-primary bg-opacity-20 text-white' 
                    : 'text-gray-300 hover:bg-primary hover:bg-opacity-10 hover:text-white'
                }`}
              >
                <FaHome className="mr-1.5" /> Dashboard
              </Link>
            </li>
            <li className="ml-1">
              <button className="relative p-2 text-gray-300 hover:text-white transition-colors duration-200">
                <FaBell />
                <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span>
              </button>
            </li>
            <li className="ml-1">
              <div className="border-l border-gray-600 h-8 mx-2"></div>
            </li>
            <li>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <button className="flex items-center justify-center h-8 w-8 bg-primary bg-opacity-20 rounded-full text-white">
                    <FaUser size={14} />
                  </button>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="bg-primary hover:bg-opacity-90 transition-colors duration-200 px-4 py-2 rounded flex items-center space-x-2 text-sm font-medium text-white"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            </li>
          </ul>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="text-white p-2 rounded-lg hover:bg-primary hover:bg-opacity-20 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {menuOpen ? 
                <FaTimes size={20} /> : 
                <FaBars size={20} />
              }
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute w-full bg-secondary shadow-lg transition-all duration-300 ease-in-out transform ${
          menuOpen ? "opacity-100 max-h-screen" : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <div className="px-4 py-3 space-y-2">
          <Link
            to="/dashboard"
            className={`block px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
              isActive('/dashboard') 
                ? 'bg-primary bg-opacity-20 text-white' 
                : 'text-gray-300 hover:bg-primary hover:bg-opacity-10 hover:text-white'
            }`}
          >
            <div className="flex items-center">
              <FaHome className="mr-3" /> Dashboard
            </div>
          </Link>
          
          <div className="border-t border-gray-700 my-3"></div>
          
          <div className="flex items-center">
            <button 
              onClick={handleLogout} 
              className="w-full bg-primary hover:bg-opacity-90 transition-colors duration-200 px-4 py-3 rounded-md flex items-center justify-center space-x-2 text-base font-medium text-white"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;