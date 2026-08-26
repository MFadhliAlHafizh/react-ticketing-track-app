import { MessageCircle } from "lucide-react";
import { TicketReplyItem } from "../../ticket/TicketReplyItem";
import { TicketReplyForm } from "./TicketReplyForm";

export const TicketDiscussion = ({
  replies = [],
  form,
  onChange,
  onSubmit,
  error,
  loading,
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* Discussion Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <MessageCircle className="h-4 w-4" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-800 sm:text-base">
              Diskusi
            </h2>

            <p className="text-xs text-gray-400">Percakapan terkait tiket</p>
          </div>
        </div>

        {replies.length > 0 && (
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500">
            {replies.length} tanggapan
          </span>
        )}
      </div>

      {/* Replies */}
      {replies.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {replies.map((reply) => (
            <TicketReplyItem key={reply.id} reply={reply} />
          ))}
        </div>
      ) : (
        <div className="px-6 py-14 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <MessageCircle className="h-5 w-5 text-gray-400" />
          </div>

          <p className="text-sm font-semibold text-gray-600">
            Belum ada tanggapan
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Jadilah yang pertama memberikan tanggapan.
          </p>
        </div>
      )}

      {/* Reply Form */}
      <TicketReplyForm
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
        loading={loading}
      />
    </div>
  );
};
