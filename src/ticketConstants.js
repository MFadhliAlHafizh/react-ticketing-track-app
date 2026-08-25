export const STATUS_STYLES = {
  open: "text-blue-700 bg-blue-50 ring-1 ring-inset ring-blue-200",
  onprogress: "text-yellow-700 bg-yellow-50 ring-1 ring-inset ring-yellow-200",
  resolved: "text-green-700 bg-green-50 ring-1 ring-inset ring-green-200",
  rejected: "text-red-700 bg-red-50 ring-1 ring-inset ring-red-200",
};

export const PRIORITY_STYLES = {
  high: "text-green-700 bg-green-50 ring-1 ring-inset ring-green-200",
  medium: "text-yellow-700 bg-yellow-50 ring-1 ring-inset ring-yellow-200",
  low: "text-red-700 bg-red-50 ring-1 ring-inset ring-red-200",
};

export const PRIORITY_OPTIONS = [
  { value: "low", title: "Rendah", description: "Tidak mendesak" },
  { value: "medium", title: "Sedang", description: "Normal" },
  { value: "high", title: "Tinggi", description: "Mendesak" },
];