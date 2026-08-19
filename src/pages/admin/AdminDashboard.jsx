import { useEffect, useState, useCallback } from "react";
import { capitalize } from "lodash";
import { DateTime } from "luxon";
import { Tag, Clock, CheckCircle, TrendingUp, TrendingDown, MoreVertical, Eye } from "lucide-react";
import { handleError } from "../../helpers/errorHelper";
import { axiosInstance } from "../../plugins/axios";
import { useAppContext } from "../../AppContext";
import { StatusChart } from "../../components/admin/StatusChart";

export const AdminDashboard = () => {
    const [statistic, setStatistic] = useState(null);
    const [statLoading, setStatLoading] = useState(true);
    const [statError, setStatError] = useState(null);
    const [openMenuCode, setOpenMenuCode] = useState(null);

    const { tickets, ticketLoading, ticketError } = useAppContext();

    const fetchStatistics = useCallback(async () => {
        setStatLoading(true);
        try {
            const response = await axiosInstance.get("dashboard/statistics");
            setStatistic(response.data.data);
        } catch (err) {
            setStatError(handleError(err));
        } finally {
            setStatLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStatistics();
    }, [fetchStatistics]);

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
        <div>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Tiket</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">
                                {statLoading ? "..." : statistic?.total_tickets ?? 0}
                            </h3>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <Tag className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-green-500 flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            12%
                        </span>
                        <span className="text-gray-500 ml-2">vs bulan lalu</span>
                    </div>
                </div>

                <div className="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Tiket Aktif</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">
                                {statLoading ? "..." : statistic?.active_tickets ?? 0}
                            </h3>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-lg">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-red-500 flex items-center">
                            <TrendingDown className="w-4 h-4 mr-1" />
                            3%
                        </span>
                        <span className="text-gray-500 ml-2">vs bulan lalu</span>
                    </div>
                </div>

                <div className="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Selesai</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">
                                {statLoading ? "..." : statistic?.resolved_tickets ?? 0}
                            </h3>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-green-500 flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            8%
                        </span>
                        <span className="text-gray-500 ml-2">vs bulan lalu</span>
                    </div>
                </div>

                <div className="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Rata-rata Waktu</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">
                                {statLoading ? "..." : statistic?.avg_resolution_time ?? 0} Jam
                            </h3>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <Clock className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-green-500 flex items-center">
                            <TrendingDown className="w-4 h-4 mr-1" />
                            15%
                        </span>
                        <span className="text-gray-500 ml-2">vs bulan lalu</span>
                    </div>
                </div>
            </div>

            {statError && <p className="text-sm text-red-500 mt-2">{statError}</p>}

            {/* Charts and Recent Tickets */}
            <div className="grid grid-cols-12 gap-6 mt-6">
                {/* Recent Tickets */}
                <div className="col-span-8 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">Tiket Terbaru</h3>
                            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                                Lihat Semua
                            </a>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {ticketLoading && (
                            <p className="p-4 text-sm text-gray-500">Memuat tiket...</p>
                        )}

                        {ticketError && (
                            <p className="p-4 text-sm text-red-500">{ticketError}</p>
                        )}

                        {!ticketLoading && tickets.length === 0 && (
                            <p className="p-4 text-sm text-gray-500">Belum ada tiket.</p>
                        )}

                        {tickets.map((ticket) => (
                            <div key={ticket.code} className="p-4 hover:bg-gray-50">
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
                                                    href={`/ticket/${ticket.code}`}
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
                        ))}
                    </div>
                </div>

                {/* Status Distribution Chart */}
                <div className="col-span-4 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribusi Status</h3>
                    <StatusChart statistic={statistic} />
                </div>
            </div>
        </div>
    );
};