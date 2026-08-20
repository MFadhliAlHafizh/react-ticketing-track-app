import { Link } from "react-router-dom";
import { capitalize } from "lodash";
import { DateTime } from "luxon";
import { MessageSquare } from "lucide-react";

const STATUS_STYLES = {
  open: "text-blue-700 bg-blue-100",
  onprogress: "text-yellow-700 bg-yellow-100",
  resolved: "text-green-700 bg-green-100",
  rejected: "text-red-700 bg-red-100",
};

const PRIORITY_STYLES = {
  high: "text-red-700 bg-red-100",
  medium: "text-yellow-700 bg-yellow-100",
  low: "text-green-700 bg-green-100",
};

export const TicketTableRow = ({ ticket }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
        #{ticket.code}
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-800">{ticket.title}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <img
            src={`https://ui-avatars.com/api/?name=${ticket.user.name}&background=0D8ABC&color=fff`}
            alt={ticket.user.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="ml-2 text-sm text-gray-800">{ticket.user.name}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${STATUS_STYLES[ticket.status] ?? ""}`}
        >
          {capitalize(ticket.status)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${PRIORITY_STYLES[ticket.priority] ?? ""}`}
        >
          {capitalize(ticket.priority)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {DateTime.fromISO(ticket.created_at).toFormat("dd MMMM yyyy HH:mm")}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <Link
          to={`/admin/ticket/${ticket.code}`}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Jawab
        </Link>
      </td>
    </tr>
  );
};
