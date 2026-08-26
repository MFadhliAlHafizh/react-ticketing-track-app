// components/common/SuccessAlert.jsx
import { CheckCircle, X } from "lucide-react";

export const SuccessAlert = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div
      className="flex items-center justify-between gap-4 rounded-2xl border border-green-100 bg-green-50 px-4 py-2 shadow-sm"
      role="alert"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100">
          <CheckCircle className="h-4 w-4 text-green-600" />
        </div>
        <p className="text-sm font-semibold text-green-700">{message}</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="rounded-md p-1 text-green-600 transition-colors hover:bg-green-100 cursor-pointer"
        aria-label="Tutup pesan"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
