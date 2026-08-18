import { NavLink } from "react-router-dom";
import { axiosInstance } from "../../plugins/axios";
import Cookies from "js-cookie";
import { handleError } from "../../helpers/errorHelper";
import { useAppContext } from "../../AppContext";

export const Sidebar = () => {
  const { navigate, setError, setLoading } = useAppContext();

  const handleLogout = async () => {
    setLoading(true);
    setError(null);

    try {
      await axiosInstance.post("/logout");

      Cookies.remove("token");

      navigate("/auth/login");
    } catch (error) {
      setError(handleError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center">
          <i data-feather="activity" className="w-8 h-8 mr-2"></i>
          TickTrack
        </h1>
      </div>
      <nav className="mt-6">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-600
                hover:bg-gray-50 hover:border-l-4 hover:border-gray-200
                ${isActive ? "bg-blue-50 border-l-4 border-blue-600" : ""}`
          }
        >
          <i data-feather="home" className="w-5 h-5 mr-3"></i>
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/ticket"
          end
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-600
                hover:bg-gray-50 hover:border-l-4 hover:border-gray-200
                ${isActive ? "bg-blue-50 border-l-4 border-blue-600" : ""}`
          }
        >
          <i data-feather="home" className="w-5 h-5 mr-3"></i>
          Tiket
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:border-l-4 hover:border-gray-200 mt-6 cursor-pointer"
        >
          <i data-feather="log-out" className="w-5 h-5 mr-3"></i>
          Logout
        </button>
      </nav>
    </aside>
  );
};
