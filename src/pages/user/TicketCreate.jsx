import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Ticket, FileText, AlertCircle } from "lucide-react";
import { axiosInstance } from "../../plugins/axios";
import { handleError } from "../../helpers/errorHelper";
import { PriorityOption } from "../../components/user/PriorityOption";
import { PRIORITY_OPTIONS } from "../../ticketConstants";

export const TicketCreate = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFieldChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/ticket", form);
      navigate("/", { state: { success: response.data.message } });
    } catch (err) {
      setError(handleError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Back Navigation */}
      <div className="mb-5">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Kembali ke Daftar Tiket
        </Link>
      </div>

      {/* Page Header */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center gap-4 bg-linear-to-r from-blue-50/70 via-white to-white p-5 sm:p-6">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <Ticket className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              Buat Tiket Baru
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Jelaskan masalah yang Anda alami agar dapat segera ditangani.
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* Form Header */}
        <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-gray-400" />

            <h2 className="text-sm font-semibold text-gray-800">
              Informasi Tiket
            </h2>
          </div>

          <p className="mt-1 text-xs text-gray-400">
            Isi informasi berikut dengan lengkap dan jelas.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7 p-5 sm:p-6">
          {/* Judul Tiket */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Judul Tiket
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="text"
              id="title"
              value={form.title}
              onChange={handleFieldChange("title")}
              placeholder="Contoh: Gangguan Jaringan WiFi"
              className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition-all placeholder:text-gray-400 ${
                error?.title
                  ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  : "border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              }`}
            />

            {error?.title && (
              <div className="mt-2 flex items-start gap-1.5 text-xs text-red-500">
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />

                <p>{error.title.join(", ")}</p>
              </div>
            )}
          </div>

          {/* Deskripsi */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700"
              >
                Deskripsi Masalah
                <span className="ml-1 text-red-500">*</span>
              </label>

              <span className="text-xs text-gray-400">
                Jelaskan secara detail
              </span>
            </div>

            <textarea
              id="description"
              value={form.description}
              onChange={handleFieldChange("description")}
              rows={7}
              placeholder={
                "Jelaskan masalah Anda secara detail. Sertakan informasi seperti:\n\n• Kapan masalah mulai terjadi\n• Apa yang sudah Anda coba\n• Dampak masalah terhadap pekerjaan"
              }
              className={`w-full resize-y rounded-xl border bg-white px-4 py-3 text-sm leading-6 text-gray-800 shadow-sm outline-none transition-all placeholder:text-gray-400 ${
                error?.description
                  ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  : "border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              }`}
            />

            {error?.description && (
              <div className="mt-2 flex items-start gap-1.5 text-xs text-red-500">
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />

                <p>{error.description.join(", ")}</p>
              </div>
            )}
          </div>

          {/* Prioritas */}
          <div>
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700">
                Prioritas
                <span className="ml-1 text-red-500">*</span>
              </label>

              <p className="mt-1 text-xs text-gray-400">
                Pilih tingkat urgensi dari masalah yang Anda alami.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {PRIORITY_OPTIONS.map((opt) => (
                <PriorityOption
                  key={opt.value}
                  value={opt.value}
                  title={opt.title}
                  description={opt.description}
                  selected={form.priority === opt.value}
                  onSelect={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      priority: value,
                    }))
                  }
                />
              ))}
            </div>

            {error?.priority && (
              <div className="mt-2 flex items-start gap-1.5 text-xs text-red-500">
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />

                <p>{error.priority[0]}</p>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
            >
              Batal
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-sm"
            >
              <Send className="mr-2 h-4 w-4" />

              {loading ? "Mengirim..." : "Kirim Tiket"}
            </button>
          </div>
        </form>
      </div>

      {/* Information */}
      <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-100">
            <AlertCircle className="h-3.5 w-3.5 text-blue-600" />
          </div>

          <div>
            <p className="text-xs font-semibold text-blue-700">
              Tips membuat tiket
            </p>

            <p className="mt-0.5 text-xs leading-5 text-blue-600">
              Jelaskan masalah secara spesifik dan sertakan informasi yang dapat
              membantu tim support memahami masalah Anda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
