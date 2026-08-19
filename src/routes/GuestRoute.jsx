import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../AppContext";

export const GuestRoute = () => {
  const { user } = useAppContext();

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
