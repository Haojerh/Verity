import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Home from "../pages/Home";

export default function RoleHomeRedirect() {
  const { user } = useAuth();
  const role = user?.userRole?.toUpperCase();

  if (role === "ADMIN") return <Navigate to="/analytics" replace />;
  return <Home />
}