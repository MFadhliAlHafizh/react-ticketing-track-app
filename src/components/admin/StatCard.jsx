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
    <div className="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">
            {loading ? "..." : value}
          </h3>
        </div>
        <div className={`p-3 ${iconBg} rounded-lg`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span
          className={`${trendUp ? "text-green-500" : "text-red-500"} flex items-center`}
        >
          <TrendIcon className="w-4 h-4 mr-1" />
          {trend}
        </span>
        <span className="text-gray-500 ml-2">vs bulan lalu</span>
      </div>
    </div>
  );
};
