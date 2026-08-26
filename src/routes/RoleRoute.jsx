// components/RoleRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { FullPageLoader } from "../components/FullPageLoader";

const roleHome = (user) => (user?.role === "admin" ? "/admin/dashboard" : "/");

export const RoleRoute = ({ guestOnly = false, allowedRole }) => {
    const { user, loading } = useAppContext();

    if (loading) {
        return <FullPageLoader />;
    }

    if (guestOnly) {
        if (user) {
            return <Navigate to={roleHome(user)} replace />;
        }
        return <Outlet />;
    }

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    if (allowedRole && user.role !== allowedRole) {
        return <Navigate to={roleHome(user)} replace />;
    }

    return <Outlet />;
};