import { Paperclip, Send } from "lucide-react";

export const UserTicketReplyForm = ({ content, onChange, onSubmit, error, loading }) => {
  return (
    <div className="p-6 border-t border-gray-100">
      <h4 className="text-sm font-medium text-gray-800 mb-4">Tambah Balasan</h4>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="group">
          <textarea
            value={content}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-1 ${
              error?.content
                ? "border-red-500 ring-red-500"
                : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            }`}
            rows={4}
            placeholder="Tulis balasan Anda di sini..."
            minLength={10}
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
            className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Send className="w-4 h-4 inline-block mr-2" />
            {loading ? "Mengirim..." : "Kirim Balasan"}
          </button>
        </div>
      </form>
    </div>
  );
};
