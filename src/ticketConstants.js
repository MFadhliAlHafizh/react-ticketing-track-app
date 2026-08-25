import { CircleAlert, Gauge, Zap } from "lucide-react";

export const STATUS_STYLES = {
  open: "text-blue-700 bg-blue-50 ring-1 ring-inset ring-blue-200",
  onprogress: "text-yellow-700 bg-yellow-50 ring-1 ring-inset ring-yellow-200",
  resolved: "text-green-700 bg-green-50 ring-1 ring-inset ring-green-200",
  rejected: "text-red-700 bg-red-50 ring-1 ring-inset ring-red-200",
};

export const PRIORITY_STYLES = {
  high: "text-red-700 bg-red-50 ring-1 ring-inset ring-red-200",
  medium: "text-yellow-700 bg-yellow-50 ring-1 ring-inset ring-yellow-200",
  low: "text-green-700 bg-green-50 ring-1 ring-inset ring-green-200",
};

export const PRIORITY_OPTIONS = [
  { value: "low", title: "Rendah", description: "Tidak mendesak" },
  { value: "medium", title: "Sedang", description: "Normal" },
  { value: "high", title: "Tinggi", description: "Mendesak" },
];

export const PRIORITY_THEME = {
  low: {
    border: "border-green-300 bg-green-50",
    icon: "text-green-600",
    iconBg: "bg-green-100",
    hover: "hover:border-green-200 hover:bg-green-50/50",
    Icon: Gauge,
  },
  medium: {
    border: "border-yellow-300 bg-yellow-50",
    icon: "text-yellow-600",
    iconBg: "bg-yellow-100",
    hover: "hover:border-yellow-200 hover:bg-yellow-50/50",
    Icon: CircleAlert,
  },
  high: {
    border: "border-red-300 bg-red-50",
    icon: "text-red-600",
    iconBg: "bg-red-100",
    hover: "hover:border-red-200 hover:bg-red-50/50",
    Icon: Zap,
  },
};
