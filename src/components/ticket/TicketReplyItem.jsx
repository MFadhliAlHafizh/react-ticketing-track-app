import { DateTime } from "luxon";

export const TicketReplyItem = ({ reply }) => {
  return (
    <div className="p-6 border-b border-gray-100 last:border-b-0">
      <div className="flex items-start gap-4">
        <img
          src={`https://ui-avatars.com/api/?name=${reply.user.name}&background=0D8ABC&color=fff`}
          alt={reply.user.name}
          className="w-10 h-10 rounded-full ring-2 ring-white shadow-sm shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2 flex-wrap">
            <h4 className="text-sm font-medium text-gray-800">
              {reply.user.name}
            </h4>
            <p className="text-xs text-gray-400">
              {DateTime.fromISO(reply.created_at).toFormat(
                "dd MMMM yyyy, HH:mm",
              )}
            </p>
          </div>
          <div className="mt-2 text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl px-4 py-3">
            <p className="whitespace-pre-wrap">{reply.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
