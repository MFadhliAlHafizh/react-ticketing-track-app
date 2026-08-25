import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../AppContext";
import { Activity, House, LogOut, Tag, ChevronsRight, ChevronsLeft } from "lucide-react";

export const Sidebar = () => {
  const { handleLogout } = useAppContext();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    {
      to: "/admin/dashboard",
      label: "Dashboard",
      icon: House,
      end: true,
    },
    {
      to: "/admin/ticket",
      label: "Tiket",
      icon: Tag,
      end: true,
    },
  ];

  return (
    <div>
      {!isCollapsed && (
        <div
          onClick={() => setIsCollapsed(true)}
          className="fixed inset-0 z-40 bg-gray-900/30 backdrop-blur-[1px] lg:hidden"
        />
      )}
      <aside
        className={`${isCollapsed ? "w-20" : "w-64"} fixed inset-y-0 left-0 z-50 flex h-screen shrink-0 flex-col border-r border-gray-100 bg-white shadow-lg transition-all duration-300 lg:relative lg:z-auto lg:shadow-sm`}
      >
        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="absolute -right-4.5 top-15 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 shadow-sm hover:text-blue-600 hover:border-blue-200 cursor-pointer transition-colors z-50"
          title={isCollapsed ? "Perluas sidebar" : "Perkecil sidebar"}
        >
          {isCollapsed ? (
            <ChevronsRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronsLeft className="h-3.5 w-3.5" />
          )}
        </button>

        {/* Logo & Toggle */}
        <div className="px-5 flex h-19 items-center border-b border-gray-100">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <Activity className="h-5 w-5" />
            </div>

            {!isCollapsed && (
              <div className="min-w-0">
                <h1 className="truncate text-lg font-bold tracking-tight text-gray-900 whitespace-nowrap">
                  Tick<span className="text-blue-600">Track</span>
                </h1>

                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 whitespace-nowrap">
                  Admin Panel
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 flex-1 py-6">
          {!isCollapsed && (
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap">
              Menu Utama
            </p>
          )}

          <div className="space-y-1">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                title={isCollapsed ? label : undefined}
                className={({ isActive }) =>
                  `group relative flex items-center rounded-xl py-2.5 text-sm font-medium transition-all duration-200 gap-3 px-3 ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute left-0 h-6 w-1 rounded-r-full bg-blue-600" />
                    )}

                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        isActive
                          ? "bg-blue-100 text-blue-600"
                          : "bg-transparent text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-600"
                      }`}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </div>

                    {!isCollapsed && (
                      <>
                        <span className="whitespace-nowrap">{label}</span>

                        {isActive && (
                          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-600" />
                        )}
                      </>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Logout */}
        <div className="px-3 border-t border-gray-100 py-3">
          <button
            type="button"
            onClick={handleLogout}
            title={isCollapsed ? "Logout" : undefined}
            className="gap-3 px-3 group flex w-full cursor-pointer items-center rounded-xl py-2.5 text-sm font-medium text-gray-500 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors group-hover:bg-red-100 group-hover:text-red-600">
              <LogOut className="h-4.5 w-4.5" />
            </div>

            {!isCollapsed && <span className="whitespace-nowrap">Logout</span>}
          </button>
        </div>
      </aside>
    </div>
  );
};
