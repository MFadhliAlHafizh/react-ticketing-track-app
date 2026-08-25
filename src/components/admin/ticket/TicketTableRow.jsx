import { Link } from "react-router-dom";
import { capitalize } from "lodash";
import { DateTime } from "luxon";
import { MessageSquare } from "lucide-react";
import { PRIORITY_STYLES, STATUS_STYLES } from "../../../ticketConstants";

export const TicketTableRow = ({ ticket }) => {
  return (
    <tr className="group transition-colors duration-150 hover:bg-gray-50/80">
      {/* TICKET ID */}
      <td className="whitespace-nowrap px-5 py-4 sm:px-6">
        <span className="font-mono text-xs font-semibold text-blue-600">
          #{ticket.code}
        </span>
      </td>

      {/* TITLE */}
      <td className="max-w-xs px-5 py-4 sm:px-6">
        <div
          className="truncate text-sm font-semibold text-gray-800 transition-colors group-hover:text-blue-600"
          title={ticket.title}
        >
          {ticket.title}
        </div>
      </td>

      {/* REPORTER */}
      <td className="whitespace-nowrap px-5 py-4 sm:px-6">
        <div className="flex items-center">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(ticket.user.name)}&background=0D8ABC&color=fff`}
            alt={ticket.user.name}
            className="h-8 w-8 rounded-full ring-2 ring-white"
          />
          <div className="ml-2.5">
            <p className="text-sm font-medium text-gray-700">
              {ticket.user.name}
            </p>
          </div>
        </div>
      </td>

      {/* STATUS */}
      <td className="whitespace-nowrap px-5 py-4 sm:px-6">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${STATUS_STYLES[ticket.status] ?? "text-gray-700 bg-gray-100"}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {capitalize(ticket.status)}
        </span>
      </td>

      {/* PRIORITY */}
      <td className="whitespace-nowrap px-5 py-4 sm:px-6">
        <span
          className={`px-2.5 py-1 text-xs font-medium rounded-full ${PRIORITY_STYLES[ticket.priority] ?? "text-gray-700 bg-gray-100"}`}
        >
          {capitalize(ticket.priority)}
        </span>
      </td>

      {/* DATE */}
      <td className="whitespace-nowrap px-5 py-4 sm:px-6">
        <div className="text-xs font-medium text-gray-600">
          {DateTime.fromISO(ticket.created_at).toFormat("dd MMM yyyy")}
        </div>

        <div className="mt-0.5 text-[11px] text-gray-400">
          {DateTime.fromISO(ticket.created_at).toFormat("HH:mm")}
        </div>
      </td>

      {/* ACTION */}
      <td className="whitespace-nowrap px-5 py-4 sm:px-6">
        <Link
          to={`/admin/ticket/${ticket.code}`}
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          Jawab
        </Link>
      </td>
    </tr>
  );
};
