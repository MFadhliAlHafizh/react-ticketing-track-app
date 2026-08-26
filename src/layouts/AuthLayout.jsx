import { Activity } from "lucide-react";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="flex justify-center items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <Activity className="h-6 w-6" />
          </div>

          <div className="min-w-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Tick<span className="text-blue-600">Track</span>
            </h1>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
