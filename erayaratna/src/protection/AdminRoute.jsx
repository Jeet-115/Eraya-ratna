// src/protection/AdminRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) return null; // Wait for auth state to load

  return user.role === "admin" ? children : <Navigate to="/" replace />;
}

export default AdminRoute;
