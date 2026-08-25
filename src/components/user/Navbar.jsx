import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../AppContext";
import { Activity, Bell, ChevronDown } from "lucide-react";

export const Navbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  const { user, handleLogout } = useAppContext();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          {/* Logo */}
          <div className="px-5 flex h-19 items-center border-b border-gray-100">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <Activity className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <h1 className="truncate text-lg font-bold tracking-tight text-gray-900 whitespace-nowrap">
                  Tick<span className="text-blue-600">Track</span>
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full cursor-pointer">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowUserMenu((prev) => !prev)}
                className="flex items-center bg-gray-50 px-4 py-2 rounded-full hover:bg-gray-100"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${user?.name}&background=0D8ABC&color=fff`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {user?.name}
                </span>
                <ChevronDown className="w-4 h-4 ml-2 text-gray-500 cursor-pointer" />
              </button>
              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className=" absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Profil
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Pengaturan
                  </a>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-start px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                  >
                    Keluar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
