import { Paperclip, Send } from "lucide-react";

export const TicketReplyForm = ({
  form,
  onChange,
  onSubmit,
  error,
  loading,
}) => {
  const handleFieldChange = (key) => (e) => {
    onChange({ ...form, [key]: e.target.value });
  };

  return (
    <div className="p-6 border-t border-gray-100">
      <h4 className="text-sm font-medium text-gray-800 mb-4">Tambah Jawaban</h4>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status Tiket
            </label>
            <select
              value={form.status}
              onChange={handleFieldChange("status")}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
        </div>

        <div>
          <textarea
            value={form.content}
            onChange={handleFieldChange("content")}
            className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-1 ${
              error?.content
                ? "border-red-500 ring-red-500"
                : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            }`}
            rows={4}
            placeholder="Tulis jawaban Anda di sini..."
          />
          {error?.content && (
            <p className="mt-1 text-xs text-red-500">
              {error.content.join(", ")}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
            >
              <Paperclip className="w-4 h-4 inline-block mr-2" />
              Lampiran
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4 inline-block mr-2" />
            {loading ? "Loading..." : "Kirim Jawaban"}
          </button>
        </div>
      </form>
    </div>
  );
};
