import { useState, useEffect, useMemo, useCallback } from "react";
import { debounce } from "lodash";
import { AlertCircle, Inbox, Ticket } from "lucide-react";
import { TicketFilters } from "../../components/admin/TicketFilters";
import { TicketTableRow } from "../../components/admin/TicketTableRow";
import { axiosInstance } from "../../plugins/axios";
import { handleError } from "../../helpers/errorHelper";

const TABLE_HEADS = [
  "ID Tiket",
  "Judul",
  "Pelapor",
  "Status",
  "Prioritas",
  "Tanggal",
  "Aksi",
];

export const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [ticketLoading, setTicketLoading] = useState(true);
  const [ticketError, setTicketError] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    date: "",
  });

  const fetchTickets = useCallback(async (params = {}) => {
    setTicketLoading(true);
    setTicketError(null);
    setTickets([]);
    try {
      const response = await axiosInstance.get("/ticket", { params });
      setTickets(response.data.data);
    } catch (error) {
      setTicketError(handleError(error));
    } finally {
      setTicketLoading(false);
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
    <div className="min-h-full space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Ticket className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Daftar Tiket
              </h1>

              <p className="mt-0.5 text-sm text-gray-500">
                Kelola dan tangani seluruh tiket pengguna.
              </p>
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 self-start rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm sm:self-auto">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-gray-600">
            {tickets.length} tiket ditemukan
          </span>
        </div>
      </div>

      <TicketFilters filters={filters} onChange={setFilters} />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/80 border-b border-gray-100">
              <tr>
                {TABLE_HEADS.map((head) => (
                  <th
                    key={head}
                    className="px-6 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {ticketLoading &&
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {TABLE_HEADS.map((_, j) => (
                      <td key={j} className="px-6 py-4">
                        <div className="h-4 rounded bg-gray-100 animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))}

              {!ticketLoading && ticketError && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center">
                    <div className="flex flex-col items-center gap-2 text-red-500">
                      <AlertCircle className="w-6 h-6" />
                      <span className="text-sm">{ticketError}</span>
                    </div>
                  </td>
                </tr>
              )}

              {!ticketLoading && !ticketError && tickets.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center">
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <Inbox className="w-6 h-6" />
                      <span className="text-sm">Tiket tidak ditemukan.</span>
                    </div>
                  </td>
                </tr>
              )}

              {!ticketLoading &&
                !ticketError &&
                tickets.map((ticket) => (
                  <TicketTableRow key={ticket.code} ticket={ticket} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
