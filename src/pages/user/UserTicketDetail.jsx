import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { capitalize } from "lodash";
import { DateTime } from "luxon";
import { ArrowLeft, CheckCircle, Download, X, MessageCircle } from "lucide-react";
import { axiosInstance } from "../../plugins/axios";
import { handleError } from "../../helpers/errorHelper";
import { PRIORITY_STYLES, STATUS_STYLES } from "../../ticketConstants";
import { TicketReplyItem } from "../../components/admin/TicketReplyItem";
import { UserTicketReplyForm } from "../../components/user/UserTicketReplyForm";

export const UserTicketDetail = () => {
  const { code } = useParams();

  const [ticket, setTicket] = useState(null);
  const [detailLoading, setDetailLoading] = useState(true);
  const [detailError, setDetailError] = useState(null);

  const [content, setContent] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const fetchTicketDetail = useCallback(async () => {
    setDetailLoading(true);
    setDetailError(null);

    try {
      const response = await axiosInstance.get(`/ticket/${code}`);
      setTicket(response.data.data);
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
    setSubmitSuccess(null);

    try {
      const response = await axiosInstance.post(`/ticket-reply/${code}`, { content });

      setContent("");
      setSubmitSuccess(response.data.message);

      await fetchTicketDetail();
    } catch (error) {
      setSubmitError(handleError(error));
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketDetail();
  }, [code]);

  if (detailLoading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 animate-pulse rounded-xl bg-gray-100" />

            <div className="flex-1 space-y-3">
              <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
              <div className="h-6 w-2/3 animate-pulse rounded bg-gray-100" />

              <div className="flex gap-2">
                <div className="h-6 w-20 animate-pulse rounded-full bg-gray-100" />
                <div className="h-6 w-20 animate-pulse rounded-full bg-gray-100" />
              </div>
            </div>
          </div>
        </div>

        {/* Discussion Skeleton */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-9 w-9 animate-pulse rounded-lg bg-gray-100" />

            <div className="space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
              <div className="h-3 w-40 animate-pulse rounded bg-gray-100" />
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex gap-4">
              <div className="h-10 w-10 animate-pulse rounded-full bg-gray-100" />

              <div className="flex-1 space-y-3">
                <div className="h-4 w-32 animate-pulse rounded bg-gray-100" />
                <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
                <div className="h-16 w-full animate-pulse rounded bg-gray-100" />
              </div>
            </div>

            <div className="h-24 w-full animate-pulse rounded-xl bg-gray-100" />
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
            <X className="h-5 w-5 text-red-600" />
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

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div className="mb-5">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Kembali ke Daftar Tiket
        </Link>
      </div>

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
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLES[ticket.status]}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {capitalize(ticket.status)}
                  </span>

                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${PRIORITY_STYLES[ticket.priority]}`}
                  >
                    {capitalize(ticket.priority)}
                  </span>

                  <span className="text-sm text-gray-500">
                    Dibuat pada{" "}
                    {DateTime.fromISO(ticket.created_at).toFormat(
                      "dd MMMM yyyy, HH:mm",
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row xl:shrink-0">
              <button className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4 mr-2 cursor-pointer" />
                Lampiran
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {submitSuccess && (
        <div
          className="flex items-center justify-between gap-4 rounded-2xl border border-green-100 bg-green-50 px-4 py-2 shadow-sm"
          role="alert"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>

            <p className="text-sm font-semibold text-green-700">
              {submitSuccess}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSubmitSuccess(null)}
            className="rounded-md p-1 text-green-600 transition-colors hover:bg-green-100 cursor-pointer"
            aria-label="Tutup pesan"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

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
        <UserTicketReplyForm
          content={content}
          onChange={setContent}
          onSubmit={handleSubmit}
          error={submitError}
          loading={submitLoading}
        />
      </div>
    </div>
  );
};
