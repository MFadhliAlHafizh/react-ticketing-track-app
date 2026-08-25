import { useEffect, useState } from "react";
import { Tag, Clock, CheckCircle } from "lucide-react";
import { handleError } from "../../helpers/errorHelper";
import { axiosInstance } from "../../plugins/axios";
import { StatusChart } from "../../components/admin/StatusChart";
import { StatCard } from "../../components/admin/StatCard";
import { TicketItem } from "../../components/admin/TicketItem";
import { Link } from "react-router-dom";

export const AdminDashboard = () => {
    const [statistic, setStatistic] = useState(null);
    const [statLoading, setStatLoading] = useState(true);
    const [statError, setStatError] = useState(null);
    const [recentTickets, setRecentTickets] = useState([]);
    const [ticketLoading, setTicketLoading] = useState(true);
    const [ticketError, setTicketError] = useState(null);

    const fetchRecentTickets = async () => {
        setTicketLoading(true);
        setTicketError(null);

        try {
            const response = await axiosInstance.get("/ticket");
            setRecentTickets(response.data.data.slice(0,5));
        } catch (error) {
            setTicketError(handleError(error));
        } finally {
            setTicketLoading(false);
        }
    };  

    const fetchStatistics = async () => {
        setStatLoading(true);
        try {
            const response = await axiosInstance.get("/dashboard/statistics");
            setStatistic(response.data.data);
        } catch (err) {
            setStatError(handleError(err));
        } finally {
            setStatLoading(false);
        }
    };

    useEffect(() => {
        fetchStatistics();
        fetchRecentTickets();
    }, []);

    return (
        <div>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Total Tiket"
                    value={statistic?.total_tickets ?? 0}
                    icon={Tag}
                    iconBg="bg-blue-50"
                    iconColor="text-blue-600"
                    trend="12%"
                    trendUp
                    loading={statLoading}
                />
                <StatCard
                    label="Tiket Aktif"
                    value={statistic?.active_tickets ?? 0}
                    icon={Clock}
                    iconBg="bg-yellow-50"
                    iconColor="text-yellow-600"
                    trend="3%"
                    trendUp={false}
                    loading={statLoading}
                />
                <StatCard
                    label="Selesai"
                    value={statistic?.resolved_tickets ?? 0}
                    icon={CheckCircle}
                    iconBg="bg-green-50"
                    iconColor="text-green-600"
                    trend="8%"
                    trendUp
                    loading={statLoading}
                />
                <StatCard
                    label="Rata-rata Waktu"
                    value={`${statistic?.avg_resolution_time ?? 0} Jam`}
                    icon={Clock}
                    iconBg="bg-purple-50"
                    iconColor="text-purple-600"
                    trend="15%"
                    trendUp={false}
                    loading={statLoading}
                />
            </div>

            {statError && <p className="text-sm text-red-500 mt-2">{statError}</p>}

            {/* Charts and Recent Tickets */}
            <div className="flex flex-col lg:flex-row gap-6 mt-6">
                {/* Recent Tickets */}
                <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">Tiket Terbaru</h3>
                            <Link to="/admin/ticket" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                                Lihat Semua
                            </Link>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {ticketLoading && (
                            <p className="p-4 text-sm text-gray-500">Memuat tiket...</p>
                        )}

                        {ticketError && (
                            <p className="p-4 text-sm text-red-500">{ticketError}</p>
                        )}

                        {!ticketLoading && recentTickets.length === 0 && (
                            <p className="p-4 text-sm text-gray-500">Belum ada tiket.</p>
                        )}

                        {recentTickets.map((ticket) => (
                            <TicketItem key={ticket.code} ticket={ticket} />
                        ))}
                    </div>
                </div>

                {/* Status Distribution Chart */}
                <div className="w-full max-w-96 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribusi Status</h3>
                    <StatusChart statistic={statistic} />
                </div>
            </div>
        </div>
    );
};