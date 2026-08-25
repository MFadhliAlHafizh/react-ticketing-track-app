import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle, Plus, X, Ticket, ArrowUpRight } from "lucide-react";
import { TicketFilters } from "../../components/admin/TicketFilters";
import { axiosInstance } from "../../plugins/axios";
import { handleError } from "../../helpers/errorHelper";
import { TicketCard } from "../../components/user/TicketCard";
import { debounce } from "lodash";

export const UserDashboard = () => {
  const location = useLocation();

  const [tickets, setTickets] = useState([]);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [successMessage, setSuccessMessage] = useState(
    location.state?.success ?? null,
  );

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
    <div className="space-y-6">
      {/* Header */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-5 bg-linear-to-r from-blue-50/70 to-white p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Ticket className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                Tiket Saya
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Kelola dan pantau status tiket Anda
              </p>
            </div>
          </div>

          <Link
            to="/ticket/create"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
          >
            <Plus className="mr-2 h-4 w-4" />
            Buat Tiket Baru
          </Link>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div
          className="flex items-start justify-between gap-4 rounded-xl border border-green-100 bg-green-50 px-4 py-3.5 shadow-sm"
          role="alert"
        >
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>

            <div>
              <p className="text-sm font-semibold text-green-700">Berhasil</p>

              <p className="mt-0.5 text-xs text-green-600">{successMessage}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSuccessMessage(null)}
            className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-lg text-green-500 transition hover:bg-green-100 hover:text-green-700"
            aria-label="Tutup pesan"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Filters */}
      <div>
        <div className="mb-3 flex items-center justify-between px-1">
          <div>
            <h2 className="text-sm font-semibold text-gray-800">
              Daftar Tiket
            </h2>

            <p className="mt-0.5 text-xs text-gray-400">
              Cari dan filter tiket Anda
            </p>
          </div>

          {!ticketsLoading && !error && (
            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500">
              {tickets.length} tiket
            </span>
          )}
        </div>

        <TicketFilters filters={filters} onChange={setFilters} />
      </div>

      {/* Tickets List */}
      <div className="space-y-3">
        {/* Loading */}
        {ticketsLoading && (
          <>
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="h-5 w-2/3 animate-pulse rounded bg-gray-100" />
                    <div className="h-3 w-1/3 animate-pulse rounded bg-gray-100" />
                    <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
                    <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
                  </div>

                  <div className="h-8 w-8 animate-pulse rounded-lg bg-gray-100" />
                </div>
              </div>
            ))}
          </>
        )}

        {/* Error */}
        {error && !ticketsLoading && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-5 shadow-sm">
            <p className="text-sm font-semibold text-red-700">
              Gagal memuat tiket
            </p>

            <p className="mt-1 text-xs text-red-600">{error}</p>
          </div>
        )}

        {/* Empty */}
        {!ticketsLoading && !error && tickets.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <Ticket className="h-6 w-6 text-gray-400" />
            </div>

            <h3 className="text-sm font-semibold text-gray-700">
              Belum ada tiket
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-gray-400">
              Tidak ada tiket yang sesuai dengan filter saat ini.
            </p>

            <Link
              to="/ticket/create"
              className="mt-5 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Buat Tiket
            </Link>
          </div>
        )}

        {/* Tickets */}
        {!ticketsLoading &&
          !error &&
          tickets.map((ticket) => (
            <TicketCard key={ticket.code} ticket={ticket} />
          ))}
      </div>

      {/* Bottom Hint */}
      {!ticketsLoading && !error && tickets.length > 0 && (
        <div className="flex items-center justify-center gap-2 pt-2 text-xs text-gray-400">
          <ArrowUpRight className="h-3.5 w-3.5" />
          <span>Pilih tiket untuk melihat detail dan percakapan</span>
        </div>
      )}
    </div>
  );
};
