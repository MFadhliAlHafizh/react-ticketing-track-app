import { useState, useEffect } from "react";
import { capitalize } from "lodash";
import { DateTime } from "luxon";
import { MoreVertical, Eye } from "lucide-react";
import { STATUS_STYLES } from "../../../ticketConstants";

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

  const statusStyle =
    STATUS_STYLES[ticket.status?.toLowerCase()] ?? "text-gray-700 bg-gray-100";

  return (
    <div className="p-4 hover:bg-gray-50/80 transition-colors duration-150">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h4 className="text-sm font-medium text-gray-800 truncate">
            {ticket.title}
          </h4>
          <p className="text-xs text-gray-400 mt-0.5">#{ticket.code}</p>
          <div className="flex flex-wrap items-center mt-2 gap-2">
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusStyle}`}
            >
              {capitalize(ticket.status)}
            </span>
            <span className="text-xs text-gray-400">
              {DateTime.fromISO(ticket.created_at).toRelative()}
            </span>
          </div>
        </div>

        <div className="relative shrink-0" data-ticket-menu>
          <button
            onClick={() => toggleMenu(ticket.code)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          {openMenuCode === ticket.code && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <a
                href={`/admin/ticket/${ticket.code}`}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg mx-1"
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
