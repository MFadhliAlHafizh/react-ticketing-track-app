import { Paperclip, Send } from "lucide-react";

export const TicketReplyForm = ({ form, onChange, onSubmit, error, loading }) => {
  const handleFieldChange = (key) => (e) => {
    onChange({ ...form, [key]: e.target.value });
  };

  return (
    <div className="p-6 border-t border-gray-100 bg-gray-50/50">
      <h4 className="text-sm font-semibold text-gray-800 mb-4">
        Tambah Jawaban
      </h4>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status Tiket
          </label>
          <select
            value={form.status}
            onChange={handleFieldChange("status")}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          >
            <option value="open" className="text-blue-700">
              Open
            </option>
            <option value="onprogress" className="text-yellow-700">
              On Progress
            </option>
            <option value="resolved" className="text-green-700">
              Resolved
            </option>
            <option value="rejected" className="text-red-700">
              Rejected
            </option>
          </select>
        </div>

        <div>
          <textarea
            value={form.content}
            onChange={handleFieldChange("content")}
            className={`w-full px-4 py-3 border rounded-lg text-sm bg-white focus:outline-none focus:ring-1 transition-colors ${
              error?.content
                ? "border-red-500 ring-red-500"
                : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            }`}
            rows={4}
            placeholder="Tulis jawaban Anda di sini..."
          />
          {error?.content && (
            <p className="mt-1.5 text-xs text-red-500">
              {error.content.join(", ")}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Paperclip className="w-4 h-4 mr-2" />
            Lampiran
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <Send className="w-4 h-4 mr-2" />
            {loading ? "Mengirim..." : "Kirim Jawaban"}
          </button>
        </div>
      </form>
    </div>
  );
};
