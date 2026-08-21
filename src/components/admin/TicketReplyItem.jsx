import { DateTime } from "luxon";

export const TicketReplyItem = ({ reply }) => {
  return (
    <div className="p-6 border-b border-gray-100">
      <div className="flex items-start space-x-4">
        <img
          src={`https://ui-avatars.com/api/?name=${reply.user.name}&background=0D8ABC&color=fff`}
          alt={reply.user.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-800">
                {reply.user.name}
              </h4>
              <p className="text-xs text-gray-500">
                {DateTime.fromISO(reply.created_at).toFormat(
                  "dd MMMM yyyy, HH:mm",
                )}
              </p>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-800">
            <p>{reply.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
