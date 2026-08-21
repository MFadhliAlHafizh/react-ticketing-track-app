import { NavLink } from "react-router-dom";
import { useAppContext } from "../../AppContext";
import { Activity, House, LogOut, Tag } from "lucide-react";

export const Sidebar = () => {
  const { handleLogout } = useAppContext();

  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center">
          <Activity className="w-8 h-8 mr-2" />
          TickTrack
        </h1>
      </div>
      <nav className="mt-6">
        <NavLink
          to="/admin/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-600 hover:border-l-4 hover:bg-blue-50 hover:border-blue-600 ${isActive ? "bg-blue-50 border-l-4 border-blue-600" : ""}`
          }
        >
          <House className="w-5 h-5 mr-3" />
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/ticket"
          end
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-600 hover:border-l-4 hover:bg-blue-50 hover:border-blue-600 ${isActive ? "bg-blue-50 border-l-4 border-blue-600" : ""}`
          }
        >
          <Tag className="w-5 h-5 mr-3" />
          Tiket
        </NavLink>
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-6 py-3 text-gray-600 hover:border-l-4 hover:bg-blue-50 hover:border-blue-600 cursor-pointer"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </nav>
    </aside>
  );
};
