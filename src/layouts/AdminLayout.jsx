import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/admin/Sidebar";
import { Bell, ChevronDown } from "lucide-react";

export const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-20 lg:ml-0 overflow-x-hidden overflow-y-auto">
        {/* Topbar */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
          <div className="flex items-center justify-end px-4 sm:px-6 py-4">
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <button className="relative p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
              </button>

              <div className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 pl-1.5 pr-3 py-1.5 rounded-full cursor-pointer transition-colors">
                <img
                  src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
                  alt="Profile"
                  className="w-8 h-8 rounded-full ring-2 ring-white shadow-sm"
                />
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                  Admin
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
