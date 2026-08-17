import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/admin/Sidebar";

export const AdminLayout = ({ title }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        {/* Topbar */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">{ title }</h2>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full">
                <i data-feather="bell" className="w-6 h-6"></i>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center bg-gray-50 px-4 py-2 rounded-full">
                <img
                  src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Admin
                </span>
                <i
                  data-feather="chevron-down"
                  className="w-4 h-4 ml-2 text-gray-500"
                ></i>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
