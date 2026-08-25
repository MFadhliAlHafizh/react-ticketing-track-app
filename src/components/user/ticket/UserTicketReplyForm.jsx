import { Paperclip, Send } from "lucide-react";

export const UserTicketReplyForm = ({
  content,
  onChange,
  onSubmit,
  error,
  loading,
}) => {
  return (
    <div className="border-t border-gray-100 bg-gray-50/50 p-5 sm:p-6">
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-800">
          Tambah Balasan
        </h4>
        <p className="mt-1 text-xs text-gray-400">
          Sampaikan informasi atau tanggapan terkait tiket Anda.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <textarea
            value={content}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 transition-all focus:outline-none focus:ring-2 ${
              error?.content
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
            }`}
            rows={5}
            placeholder="Tulis balasan Anda di sini..."
            minLength={10}
          />

          {error?.content && (
            <p className="mt-2 text-xs font-medium text-red-500">
              {error.content.join(", ")}
            </p>
          )}

          <div className="mt-2 flex justify-end">
            <span className="text-xs text-gray-400">
              Minimal 10 karakter
            </span>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50 cursor-pointer"
          >
            <Paperclip className="h-4 w-4" />
            Lampiran
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            <Send className="h-4 w-4" />
            {loading ? "Mengirim..." : "Kirim Balasan"}
          </button>
        </div>
      </form>
    </div>
  );
};