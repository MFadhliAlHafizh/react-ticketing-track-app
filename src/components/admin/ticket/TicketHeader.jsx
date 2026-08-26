// components/ticket/TicketHeader.jsx
import { capitalize } from "lodash";
import { Download, CheckCircle, User } from "lucide-react";
import { STATUS_STYLES, PRIORITY_STYLES } from "../../../ticketConstants";

export const TicketHeader = ({ ticket }) => {
    const statusStyle = STATUS_STYLES[ticket.status] ?? "text-gray-700 bg-gray-100";
    const priorityStyle = PRIORITY_STYLES[ticket.priority] ?? "text-gray-700 bg-gray-100";

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-white px-5 py-5 sm:px-6 sm:py-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    <div className="flex min-w-0 gap-4">
                        <div className="min-w-0">
                            <div className="mb-1 flex flex-wrap items-center gap-2">
                                <span className="font-mono text-xs font-semibold text-blue-600">
                                    #{ticket.code}
                                </span>
                                <span className="text-gray-300">•</span>
                                <span className="text-xs text-gray-400">Detail Tiket</span>
                            </div>

                            <h1 className="wrap-break-word text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                                {ticket.title}
                            </h1>

                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyle}`}>
                                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                    {capitalize(ticket.status)}
                                </span>
                                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${priorityStyle}`}>
                                    {capitalize(ticket.priority)}
                                </span>
                                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                                    <User className="h-3.5 w-3.5 text-gray-400" />
                                    Dilaporkan oleh
                                    <span className="font-semibold text-gray-700">{ticket.user?.name}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row xl:shrink-0">
                        <button className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                            <Download className="w-4 h-4 mr-2 cursor-pointer" />
                            Lampiran
                        </button>
                        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm hover:shadow transition-all">
                            <CheckCircle className="w-4 h-4 mr-2 cursor-pointer" />
                            Selesaikan Tiket
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};