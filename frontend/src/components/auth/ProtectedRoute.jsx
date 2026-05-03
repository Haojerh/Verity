import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../../services/api";

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    api.get("/api/users")
      .then(() => {
        setStatus("authenticated");
      })
      .catch((error) => {
        console.error("Auth check failed:", error);
        setStatus("unauthenticated");
      });
  }, []);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium">Verifying session...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return children;
}