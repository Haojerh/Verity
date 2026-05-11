import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-4 text-sm text-muted-foreground">Loading...</div>;
  }

  // not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // role restriction
  const role = user?.userRole?.toUpperCase();

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;