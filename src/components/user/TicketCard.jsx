import { Link } from "react-router-dom";
import { capitalize } from "lodash";
import { DateTime } from "luxon";
import { MessageSquare, Clock, ChevronRight } from "lucide-react";
import { PRIORITY_STYLES, STATUS_STYLES } from "../../ticketConstants";

export const TicketCard = ({ ticket }) => {
  return (
    <Link
      to={`ticket/${ticket.code}`}
      className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-md"
    >
      <div className="p-5 sm:p-6">
        {/* Top Section */}
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            {/* Title + Status */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <h3 className="wrap-break-word text-base font-semibold text-gray-800 transition-colors group-hover:text-blue-600 sm:text-lg">
                {ticket.title}
              </h3>

              <div className="flex shrink-0 flex-wrap items-center gap-1.5">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLES[ticket.status] ?? "bg-gray-100 text-gray-700"}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {capitalize(ticket.status)}
                </span>

                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${PRIORITY_STYLES[ticket.priority] ?? "bg-gray-100 text-gray-700"}`}
                >
                  {capitalize(ticket.priority)}
                </span>
              </div>
            </div>

            {/* Ticket Meta */}
            <p className="mt-2 text-xs text-gray-400">
              <span className="font-mono font-medium text-blue-600">
                #{ticket.code}
              </span>
              <span className="mx-1.5 text-gray-300">•</span>
              Dibuat pada{" "}
              {DateTime.fromISO(ticket.created_at).toFormat(
                "dd MMMM yyyy, HH:mm",
              )}
            </p>

            {/* Description */}
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
              {ticket.description}
            </p>

            {/* Footer */}
            <div className="mt-5 flex flex-col gap-2 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100">
                    <MessageSquare className="h-3.5 w-3.5 text-gray-500" />
                  </div>

                  <span>{ticket.ticket_replies?.length ?? 0} balasan</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100">
                    <Clock className="h-3.5 w-3.5 text-gray-500" />
                  </div>

                  <span>
                    Update{" "}
                    {DateTime.fromISO(ticket.updated_at).toFormat(
                      "dd MMM yyyy, HH:mm",
                    )}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 transition-transform group-hover:translate-x-0.5">
                Lihat Detail
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
