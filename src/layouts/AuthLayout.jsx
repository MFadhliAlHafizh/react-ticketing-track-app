import { Outlet } from "react-router-dom";

export const AuthLayout = ({ title }) => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <i data-feather="activity" className="w-12 h-12 text-blue-600"></i>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">TickTrack</h2>
          <p className="mt-2 text-sm text-gray-600">{ title }</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
