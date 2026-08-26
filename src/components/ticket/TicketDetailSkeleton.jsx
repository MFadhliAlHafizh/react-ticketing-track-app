const Bar = ({ className }) => (
  <div className={`animate-pulse rounded bg-gray-100 ${className}`} />
);

export const TicketDetailSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div className="mb-5">
        <Bar className="h-5 w-40" />
      </div>

      {/* Ticket Header */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 bg-white px-5 py-5 sm:px-6 sm:py-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0 flex-1 space-y-3">
              {/* #code • Detail Tiket */}
              <div className="flex items-center gap-2">
                <Bar className="h-3 w-16" />
                <Bar className="h-3 w-20" />
              </div>

              {/* Judul */}
              <Bar className="h-7 w-2/3" />

              {/* Badges: status, priority, pelapor */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <Bar className="h-6 w-20 rounded-full" />
                <Bar className="h-6 w-16 rounded-full" />
                <Bar className="h-4 w-36" />
              </div>
            </div>

            {/* Tombol aksi */}
            <div className="flex flex-col gap-2 sm:flex-row xl:shrink-0">
              <Bar className="h-10 w-28 rounded-lg" />
              <Bar className="h-10 w-40 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Discussion */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* Discussion Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Bar className="h-9 w-9 rounded-lg" />
            <div className="space-y-2">
              <Bar className="h-4 w-16" />
              <Bar className="h-3 w-32" />
            </div>
          </div>
          <Bar className="h-5 w-20 rounded-full" />
        </div>

        {/* Reply items */}
        <div className="divide-y divide-gray-100">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-start gap-4 p-6">
              <Bar className="h-10 w-10 shrink-0 rounded-full" />
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <Bar className="h-4 w-32" />
                  <Bar className="h-3 w-24" />
                </div>
                <Bar className="h-3 w-full" />
                <Bar className="h-3 w-4/5" />
              </div>
            </div>
          ))}
        </div>

        {/* Reply Form */}
        <div className="space-y-4 border-t border-gray-100 bg-gray-50/50 p-6">
          <Bar className="h-4 w-28" />

          <div className="space-y-2">
            <Bar className="h-3 w-20" />
            <Bar className="h-10 w-full rounded-lg" />
          </div>

          <Bar className="h-24 w-full rounded-lg" />

          <div className="flex items-center justify-between">
            <Bar className="h-9 w-24 rounded-lg" />
            <Bar className="h-10 w-32 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};
