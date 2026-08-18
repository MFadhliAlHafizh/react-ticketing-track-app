import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../AppContext";

export const ProtectedRoute = () => {
  const { user, loading } = useAppContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }
  
  return <Outlet />;
};
