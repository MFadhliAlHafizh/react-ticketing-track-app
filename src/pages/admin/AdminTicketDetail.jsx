import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { capitalize } from "lodash";
import { Download, CheckCircle, AlertCircle, MessageCircle, User } from "lucide-react";
import { axiosInstance } from "../../plugins/axios";
import { handleError } from "../../helpers/errorHelper";
import { PRIORITY_STYLES, STATUS_STYLES } from "../../ticketConstants";
import { TicketReplyItem } from "../../components/admin/TicketReplyItem";
import { TicketReplyForm } from "../../components/admin/TicketReplyForm";

export const AdminTicketDetail = () => {
  const { code } = useParams();

  const [ticket, setTicket] = useState(null);
  const [detailLoading, setDetailLoading] = useState(true);
  const [detailError, setDetailError] = useState(null);

  const [form, setForm] = useState({ status: "", content: "" });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const fetchTicketDetail = useCallback(async () => {
    setDetailLoading(true);
    setDetailError(null);

    try {
      const response = await axiosInstance.get(`/ticket/${code}`);
      const data = response.data.data;

      setTicket(data);
      setForm((prev) => ({ ...prev, status: data.status }));
    } catch (error) {
      setDetailError(handleError(error));
    } finally {
      setDetailLoading(false);
    }
  }, [code]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitError(null);

    try {
      await axiosInstance.post(`/ticket-reply/${code}`, form);
      await fetchTicketDetail();
      setForm((prev) => ({ ...prev, content: "" }));
    } catch (error) {
      setSubmitError(handleError(error));
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketDetail();
  }, [fetchTicketDetail]);

  if (detailLoading) {
    return (
      <div className="space-y-6">
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 animate-pulse rounded-xl bg-gray-100" />
            <div className="flex-1 space-y-3">
              <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
              <div className="h-6 w-2/3 animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-1/3 animate-pulse rounded bg-gray-100" />
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm p-6 space-y-5">
          <div className="h-5 w-32 animate-pulse rounded bg-gray-100" />
          <div className="flex gap-4">
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-100" />
            <div className="flex-1 space-y-3">
              <div className="h-4 w-32 animate-pulse rounded bg-gray-100" />
              <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
              <div className="h-16 w-full animate-pulse rounded bg-gray-100" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (detailError) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100">
            <AlertCircle className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-red-700">
              Gagal memuat tiket
            </p>
            <p className="mt-1 text-xs text-red-600">{detailError}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return null;
  }

  const statusStyle =
    STATUS_STYLES[ticket.status] ?? "text-gray-700 bg-gray-100";
  const priorityStyle =
    PRIORITY_STYLES[ticket.priority] ?? "text-gray-700 bg-gray-100";

  return (
    <div className="space-y-6">
      {/* Ticket Header */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 bg-white px-5 py-5 sm:px-6 sm:py-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="flex min-w-0 gap-4">
              <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-blue-600">
                    #{ticket.code}
                  </span>

                  <span className="text-gray-300">•</span>

                  <span className="text-xs text-gray-400">Detail Tiket</span>
                </div>

                <h1 className="wrap-break-word text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                  {ticket.title}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyle}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {capitalize(ticket.status)}
                  </span>

                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${priorityStyle}`}
                  >
                    {capitalize(ticket.priority)}
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                    <User className="h-3.5 w-3.5 text-gray-400" />
                    Dilaporkan oleh
                    <span className="font-semibold text-gray-700">
                      {ticket.user?.name}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row xl:shrink-0">
              <button className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4 mr-2 cursor-pointer" />
                Lampiran
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm hover:shadow transition-all">
                <CheckCircle className="w-4 h-4 mr-2 cursor-pointer" />
                Selesaikan Tiket
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Discussion */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* Discussion Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <MessageCircle className="h-4 w-4" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-800 sm:text-base">
                Diskusi
              </h2>

              <p className="text-xs text-gray-400">Percakapan terkait tiket</p>
            </div>
          </div>

          {ticket.ticket_replies?.length > 0 && (
            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500">
              {ticket.ticket_replies.length} tanggapan
            </span>
          )}
        </div>

        {/* Replies */}
        {ticket.ticket_replies?.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {ticket.ticket_replies.map((reply) => (
              <TicketReplyItem key={reply.id} reply={reply} />
            ))}
          </div>
        ) : (
          <div className="px-6 py-14 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <MessageCircle className="h-5 w-5 text-gray-400" />
            </div>

            <p className="text-sm font-semibold text-gray-600">
              Belum ada tanggapan
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Jadilah yang pertama memberikan tanggapan.
            </p>
          </div>
        )}

        {/* Reply Form */}
        <TicketReplyForm
          form={form}
          onChange={setForm}
          onSubmit={handleSubmit}
          error={submitError}
          loading={submitLoading}
        />
      </div>
    </div>
  );
};
