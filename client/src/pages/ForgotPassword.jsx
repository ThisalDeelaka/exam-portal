import { Link } from "react-router-dom";
import { FaArrowLeft, FaLock } from "react-icons/fa";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-indigo-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-primary to-secondary p-6 text-center">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-white bg-opacity-20 mb-4">
              <FaLock className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-white">Password Reset</h1>
            <p className="text-white text-opacity-80 mt-1">Reset your account password</p>
          </div>
          <div className="p-6">
            <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700 rounded">
              <p className="font-medium text-center">
                Contact an instructor of Paperclass to reset your password.
              </p>
            </div>
            
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              Remember your password? {" "}
              <Link to="/" className="font-medium text-primary hover:text-opacity-80">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;