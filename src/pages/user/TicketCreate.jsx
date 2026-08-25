import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
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
    <div>
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Daftar Tiket
        </Link>
      </div>

      {/* Create Ticket Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800">Buat Tiket Baru</h1>
          <p className="text-sm text-gray-500 mt-1">
            Isi form di bawah ini untuk membuat tiket baru
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Judul Tiket */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Judul Tiket
            </label>
            <input
              type="text"
              id="title"
              value={form.title}
              onChange={handleFieldChange("title")}
              placeholder="Contoh: Gangguan Jaringan WiFi"
              className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 ${
                error?.title
                  ? "border-red-500 ring-red-500"
                  : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              }`}
            />
            {error?.title && (
              <p className="mt-1 text-xs text-red-500">
                {error.title.join(", ")}
              </p>
            )}
          </div>

          {/* Deskripsi */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Deskripsi Masalah
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={handleFieldChange("description")}
              rows={6}
              placeholder={
                "Jelaskan masalah Anda secara detail. Sertakan informasi seperti:\n" +
                "- Kapan masalah mulai terjadi\n" +
                "- Apa yang sudah Anda coba\n" +
                "- Dampak masalah terhadap pekerjaan"
              }
              className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-1 ${
                error?.description
                  ? "border-red-500 ring-red-500"
                  : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              }`}
            />
            {error?.description && (
              <p className="mt-1 text-xs text-red-500">
                {error.description.join(", ")}
              </p>
            )}
          </div>

          {/* Prioritas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prioritas
            </label>
            <div className="grid grid-cols-3 gap-4">
              {PRIORITY_OPTIONS.map((opt) => (
                <PriorityOption
                  key={opt.value}
                  value={opt.value}
                  title={opt.title}
                  description={opt.description}
                  selected={form.priority === opt.value}
                  onSelect={(value) =>
                    setForm((prev) => ({ ...prev, priority: value }))
                  }
                />
              ))}
            </div>
            {error?.priority && (
              <div className="flex items-center mt-2">
                <p className="text-xs text-red-500">{error.priority[0]}</p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link
              to="/"
              className="px-6 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Send className="w-4 h-4 inline-block mr-2" />
              {loading ? "Mengirim..." : "Kirim Tiket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
