import { useState, useEffect } from "react";
import { capitalize } from "lodash";
import { DateTime } from "luxon";
import { MoreVertical, Eye } from "lucide-react";

export const TicketItem = ({ ticket }) => {
  const [openMenuCode, setOpenMenuCode] = useState(null);

  const toggleMenu = (code) => {
    setOpenMenuCode((prev) => (prev === code ? null : code));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("[data-ticket-menu]")) {
        setOpenMenuCode(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="p-4 hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-gray-800">{ticket.title}</h4>
          <p className="text-xs text-gray-500 mt-1">#{ticket.code}</p>
          <div className="flex items-center mt-2 space-x-2">
            <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
              {capitalize(ticket.status)}
            </span>
            <span className="text-xs text-gray-500">
              {DateTime.fromISO(ticket.created_at).toRelative()}
            </span>
          </div>
        </div>
        <div className="relative" data-ticket-menu>
          <button
            onClick={() => toggleMenu(ticket.code)}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          {openMenuCode === ticket.code && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
              <a
                href={`/admin/ticket/${ticket.code}`}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Eye className="w-4 h-4 mr-2" />
                Lihat Detail
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
