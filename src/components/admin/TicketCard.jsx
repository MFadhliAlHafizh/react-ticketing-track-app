import { Link } from "react-router-dom";
import { capitalize } from "lodash";
import { DateTime } from "luxon";
import { MessageSquare, Clock, ChevronRight } from "lucide-react";
import { PRIORITY_STYLES, STATUS_STYLES } from "../../labelStyles";

export const TicketCard = ({ ticket }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <Link to={`/app/ticket/${ticket.code}`} className="block p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {ticket.title}
              </h3>
              <span
                className={`px-3 py-1 text-sm rounded-lg ${STATUS_STYLES[ticket.status] ?? ""}`}
              >
                {capitalize(ticket.status)}
              </span>
              <span
                className={`px-3 py-1 text-sm rounded-lg ${PRIORITY_STYLES[ticket.priority] ?? ""}`}
              >
                {capitalize(ticket.priority)}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              #{ticket.code} • Dibuat pada{" "}
              {DateTime.fromISO(ticket.created_at).toFormat(
                "dd MMMM yyyy, HH:mm",
              )}
            </p>
            <p className="text-sm text-gray-600 mt-2">{ticket.description}</p>
            <div className="mt-4 flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-500">
                <MessageSquare className="w-4 h-4 mr-1" />
                <span>{ticket.ticket_replies?.length ?? 0} balasan</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                <span>
                  Terakhir diupdate{" "}
                  {DateTime.fromISO(ticket.updated_at).toFormat(
                    "dd MMMM yyyy, HH:mm",
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="ml-4">
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </Link>
    </div>
  );
};
