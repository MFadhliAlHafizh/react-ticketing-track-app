import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { TicketFilters } from "../../components/admin/TicketFilters";
import { axiosInstance } from "../../plugins/axios";
import { handleError } from "../../helpers/errorHelper";
import { TicketCard } from "../../components/user/TicketCard";
import { debounce } from "lodash";

export const UserDashboard = () => {

  const [tickets, setTickets] = useState([]);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    date: "",
  });

  const fetchTickets = useCallback(async (params = {}) => {
    setTicketsLoading(true);
    setError(null);
    setTickets([]);
    try {
      const response = await axiosInstance.get("/ticket", { params });
      setTickets(response.data.data);
    } catch (error) {
      setError(handleError(error));
    } finally {
      setTicketsLoading(false);
    }
  }, []);

  const debouncedFetch = useMemo(
    () => debounce((params) => fetchTickets(params), 300),
    [fetchTickets],
  );

  useEffect(() => {
    debouncedFetch(filters);
    return () => debouncedFetch.cancel();
  }, [filters, debouncedFetch]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tiket Saya</h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola dan pantau status tiket Anda
          </p>
        </div>
        <Link
          to="/app/ticket/create"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Buat Tiket Baru
        </Link>
      </div>

      {/* Filters */}
      <TicketFilters filters={filters} onChange={setFilters} />

      {/* Tickets List */}
      <div className="space-y-4">
        {ticketsLoading && (
          <p className="text-sm text-gray-500 text-center py-6">
            Memuat tiket...
          </p>
        )}
        {error && (
          <p className="text-sm text-red-500 text-center py-6">{error}</p>
        )}
        {!ticketsLoading && tickets.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-6">
            Belum ada tiket.
          </p>
        )}
        {tickets.map((ticket) => (
          <TicketCard key={ticket.code} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};
