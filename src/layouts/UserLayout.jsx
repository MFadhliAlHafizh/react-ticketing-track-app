import { Outlet } from "react-router-dom";
import { Navbar } from "../components/user/Navbar";

export const UserLayout = () => {
  return (
    <div className="bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};
