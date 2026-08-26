import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { axiosInstance } from "../../plugins/axios";
import { handleError } from "../../helpers/errorHelper";
import { UserTicketHeader } from "../../components/user/ticket/UserTicketHeader";
import { UserTicketDiscussion } from "../../components/user/ticket/UserTicketDiscussion";
import { SuccessAlert } from "../../components/SuccessAlert";
import { TicketDetailSkeleton } from "../../components/ticket/TicketDetailSkeleton";

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
      const response = await axiosInstance.post(`/ticket-reply/${code}`, {
        content,
      });
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
  }, [fetchTicketDetail]);

  if (detailLoading) {
    return <TicketDetailSkeleton />;
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
      <UserTicketHeader ticket={ticket} />

      {/* Success Message */}
      <SuccessAlert
        message={submitSuccess}
        onClose={() => setSubmitSuccess(null)}
      />

      {/* Discussion */}
      <UserTicketDiscussion
        replies={ticket.ticket_replies}
        content={content}
        onChange={setContent}
        onSubmit={handleSubmit}
        error={submitError}
        loading={submitLoading}
      />
    </div>
  );
};
