import { useState, useEffect, useMemo, useCallback } from "react";
import { debounce } from "lodash";
import { TicketFilters } from "../../components/admin/TicketFilters";
import { TicketTableRow } from "../../components/admin/TicketTableRow";
import { axiosInstance } from "../../plugins/axios";
import { handleError } from "../../helpers/errorHelper";

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
            const response = await axiosInstance.get("ticket", { params });
            setTickets(response.data.data);
        } catch (error) {
            setTicketError(handleError(error));
        } finally {
            setTicketLoading(false);
        }
    }, []);

    const debouncedFetch = useMemo(
        () => debounce((params) => fetchTickets(params), 300),
        [fetchTickets]
    );

    useEffect(() => {
        debouncedFetch(filters);
        return () => debouncedFetch.cancel();
    }, [filters, debouncedFetch]);

  return (
    <div className="p-6">
      <TicketFilters filters={filters} onChange={setFilters} />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "ID Tiket",
                  "Judul",
                  "Pelapor",
                  "Status",
                  "Prioritas",
                  "Tanggal",
                  "Aksi",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {ticketLoading && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-sm text-gray-500 text-center"
                  >
                    Memuat tiket...
                  </td>
                </tr>
              )}
              {ticketError && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-sm text-red-500 text-center"
                  >
                    {ticketError}
                  </td>
                </tr>
              )}
              {!ticketLoading && tickets.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-sm text-gray-500 text-center"
                  >
                    Tiket tidak ditemukan.
                  </td>
                </tr>
              )}
              {tickets.map((ticket) => (
                <TicketTableRow key={ticket.code} ticket={ticket} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
