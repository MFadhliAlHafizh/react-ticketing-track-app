import { Activity, useEffect, useState } from "react";
import { Tag, Clock, CheckCircle, AlertCircle, Inbox, LayoutDashboard } from "lucide-react";
import { handleError } from "../../helpers/errorHelper";
import { axiosInstance } from "../../plugins/axios";
import { StatusChart } from "../../components/admin/dashboard/StatusChart";
import { StatCard } from "../../components/admin/dashboard/StatCard";
import { TicketItem } from "../../components/admin/ticket/TicketItem";
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
      setRecentTickets(response.data.data.slice(0, 5));
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
    <div className="min-h-full space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <LayoutDashboard className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Dashboard
              </h1>

              <p className="mt-0.5 text-sm text-gray-500">
                Pantau aktivitas dan perkembangan tiket Anda.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm">
          <Activity className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-600">Overview</span>
        </div>
      </div>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
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

      {statError && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {statError}
        </div>
      )}

      {/* Charts and Recent Tickets */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Recent Tickets */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">
              Tiket Terbaru
            </h3>
            <Link
              to="/admin/ticket"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Lihat Semua &rarr;
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {ticketLoading &&
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-4">
                  <div className="h-4 w-2/3 rounded bg-gray-100 animate-pulse mb-2" />
                  <div className="h-3 w-1/4 rounded bg-gray-100 animate-pulse mb-3" />
                  <div className="h-5 w-16 rounded-full bg-gray-100 animate-pulse" />
                </div>
              ))}

            {ticketError && (
              <div className="flex items-center gap-2 p-4 text-sm text-red-600">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {ticketError}
              </div>
            )}

            {!ticketLoading && recentTickets.length === 0 && !ticketError && (
              <div className="flex flex-col items-center justify-center gap-2 py-10 text-gray-400">
                <Inbox className="w-8 h-8" />
                <p className="text-sm">Belum ada tiket.</p>
              </div>
            )}

            {!ticketLoading &&
              recentTickets.map((ticket) => (
                <TicketItem key={ticket.code} ticket={ticket} />
              ))}
          </div>
        </div>

        {/* Status Distribution Chart */}
        <div className="w-full lg:max-w-86 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Distribusi Status
          </h3>
          <StatusChart statistic={statistic} />
        </div>
      </div>
    </div>
  );
};
