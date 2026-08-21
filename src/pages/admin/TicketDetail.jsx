import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { capitalize } from "lodash";
import { Download, CheckCircle } from "lucide-react";
import { axiosInstance } from "../../plugins/axios";
import { handleError } from "../../helpers/errorHelper";
import { PRIORITY_STYLES, STATUS_STYLES } from "../../labelStyles";
import { TicketReplyItem } from "../../components/admin/TicketReplyItem";
import { TicketReplyForm } from "../../components/admin/TicketReplyForm";

export const TicketDetail = () => {
  const { code } = useParams();

  const [ticket, setTicket] = useState(null);
  const [detailLoading, setDetailLoading] = useState(true);
  const [detailError, setDetailError] = useState(null);

  const [form, setForm] = useState({ status: "", content: "" });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const fetchTicketDetail = useCallback(async () => {
    setDetailLoading(true);
    try {
      const response = await axiosInstance.get(`ticket/${code}`);
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
      await axiosInstance.post(`ticket-reply/${code}`, form);
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
    return <div className="p-6 text-sm text-gray-500">Memuat tiket...</div>;
  }

  if (detailError) {
    return <div className="p-6 text-sm text-red-500">{detailError}</div>;
  }

  if (!ticket) {
    return null;
  }

  return (
    <div className="p-6">
      {/* Ticket Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {ticket.title}
              </h3>
              <div className="mt-4 flex items-center space-x-4">
                <span
                  className={`px-3 py-1 text-sm rounded-lg ${STATUS_STYLES[ticket.status] ?? ""}`}
                >
                  {capitalize(ticket.status)}
                </span>
                <span
                  className={`px-3 py-1 text-sm rounded-lg ${PRIORITY_STYLES[ticket.priority] ?? ""}`}
                >
                  {capitalize(ticket.priority)}
                </span>
                <span className="text-sm text-gray-500">
                  Dilaporkan oleh {ticket.user?.name}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-4">
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                <Download className="w-4 h-4 inline-block mr-2" />
                Lampiran
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                <CheckCircle className="w-4 h-4 inline-block mr-2" />
                Selesaikan Tiket
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Discussion Thread */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {ticket.ticket_replies?.length > 0 ? (
          ticket.ticket_replies.map((reply) => (
            <TicketReplyItem key={reply.id} reply={reply} />
          ))
        ) : (
          <div className="p-6">
            <p className="text-sm text-gray-500">Belum ada tanggapan</p>
          </div>
        )}

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
