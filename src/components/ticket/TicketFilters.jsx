import { Search, SlidersHorizontal } from "lucide-react";

export const TicketFilters = ({ filters, onChange }) => {
  const handleChange = (key) => (e) => {
    onChange({ ...filters, [key]: e.target.value });
  };

  const selectClass =
    "w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4 text-gray-400">
          <SlidersHorizontal className="w-4 h-4" />
          <span className="text-xs font-medium uppercase tracking-wider">
            Filter Tiket
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="relative md:col-span-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.search}
              onChange={handleChange("search")}
              placeholder="Cari tiket..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          <select
            value={filters.status}
            onChange={handleChange("status")}
            className={selectClass}
          >
            <option value="">Semua Status</option>
            <option value="open">Open</option>
            <option value="onprogress">On Progress</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={filters.priority}
            onChange={handleChange("priority")}
            className={selectClass}
          >
            <option value="">Semua Prioritas</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={filters.date}
            onChange={handleChange("date")}
            className={selectClass}
          >
            <option value="">Semua Tanggal</option>
            <option value="today">Hari Ini</option>
            <option value="week">Minggu Ini</option>
            <option value="month">Bulan Ini</option>
          </select>
        </div>
      </div>
    </div>
  );
};
