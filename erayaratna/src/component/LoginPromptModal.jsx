import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPromptModal = ({ onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, onClose]);

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <p className="text-lg font-semibold text-gray-800">Please login to continue.</p>
      </div>
    </div>
  );
};

export default LoginPromptModal;
