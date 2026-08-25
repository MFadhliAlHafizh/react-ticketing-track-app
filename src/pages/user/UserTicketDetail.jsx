import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { capitalize } from "lodash";
import { DateTime } from "luxon";
import { ArrowLeft, CheckCircle, Download, X } from "lucide-react";
import { axiosInstance } from "../../plugins/axios";
import { handleError } from "../../helpers/errorHelper";
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
    return <p className="text-sm text-gray-500">Memuat tiket...</p>;
  }

  if (detailError) {
    return <p className="text-sm text-red-500">{detailError}</p>;
  }

  if (!ticket) {
    return null;
  }

  return (
    <div>
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Daftar Tiket
        </Link>
      </div>

      {/* Ticket Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {ticket.title}
              </h1>
              <div className="mt-2 flex items-center space-x-4">
                <span className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
                  {capitalize(ticket.status)}
                </span>
                <span className="px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-full">
                  {capitalize(ticket.priority)}
                </span>
                <span className="text-sm text-gray-500">#{ticket.code}</span>
                <span className="text-sm text-gray-500">
                  Dibuat pada{" "}
                  {DateTime.fromISO(ticket.created_at).toFormat(
                    "dd MMMM yyyy, HH:mm",
                  )}
                </span>
              </div>
            </div>
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
              <Download className="w-4 h-4 inline-block mr-2" />
              Lampiran
            </button>
          </div>
        </div>
      </div>

      {submitSuccess && (
          <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">{submitSuccess}</span>
              </div>
              <button onClick={() => setSubmitSuccess(null)}>
                  <X className="w-4 h-4 text-green-600 cursor-pointer" />
              </button>
          </div>
      )}

      {/* Discussion Thread */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {ticket.ticket_replies?.map((reply) => (
          <TicketReplyItem key={reply.id} reply={reply} />
        ))}

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
