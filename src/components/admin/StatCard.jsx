import { TrendingUp, TrendingDown } from "lucide-react";

export const StatCard = ({
  label,
  value,
  icon: Icon,
  iconBg,
  iconColor,
  trend,
  trendUp,
  loading,
}) => {
  const TrendIcon = trendUp ? TrendingUp : TrendingDown;

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500 truncate">{label}</p>
          {loading ? (
            <div className="h-8 w-20 mt-2 rounded-md bg-red-100 animate-pulse" />
          ) : (
            <h3 className="text-2xl font-bold text-gray-900 mt-1 tracking-tight">
              {value}
            </h3>
          )}
        </div>
        <div
          className={`p-3 ${iconBg} rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-105`}
        >
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm">
        {loading ? (
          <div className="h-4 w-24 rounded bg-gray-100 animate-pulse" />
        ) : (
          <>
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium ${
                trendUp
                  ? "text-green-700 bg-green-50"
                  : "text-red-700 bg-red-50"
              }`}
            >
              <TrendIcon className="w-3.5 h-3.5" />
              {trend}
            </span>
            <span className="text-gray-400">vs bulan lalu</span>
          </>
        )}
      </div>
    </div>
  );
};
