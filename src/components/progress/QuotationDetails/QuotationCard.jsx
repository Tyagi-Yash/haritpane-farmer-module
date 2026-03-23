import { useDispatch, useSelector } from "react-redux";
import { acceptQuotation, rejectQuotation } from "../../../reduxtoolkit/slices/progress/quotations";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatPrice } from "../../../utils/formatPrice";

function QuotationCard({ data, jobOrderId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { actionLoading, farmerId } = useSelector((state) => state.services.quotationSlice);
  const [showNumber, setShowNumber] = useState(false);

  const { provider, amount, message, status, quotationId } = data;

  const handleAccept = async () => {
    try {
      await dispatch(acceptQuotation({ jobOrderId, quotationId })).unwrap();
      toast.success(t("progress.quotationAccepted"));
    } catch (error) {
      toast.error(t("progress.quotationAcceptFail"));
    }
  };

  const handleReject = async () => {
    try {
      await dispatch(rejectQuotation({ jobOrderId, quotationId })).unwrap();
      toast.success(t("progress.quotationRejected"));
    } catch (error) {
      toast.error(t("progress.quotationRejectFail"));
    }
  };

  const handleStartChat = () => {
    navigate("/chats", {
      state: {
        roomId: jobOrderId,
        farmerId,
        serviceProviderId: provider._id,
        providerDetails: provider,
        chatType: "online_Provider",
      },
    });
  };

  return (
    <div className="quotation-card">
      <div className="amount-row">
        <span className="quotation-label">{t("progress.serviceProvider")}</span>
        <span className="quotation-value">{provider?.name || "N/A"}</span>
      </div>
      <div className="amount-row">
        <span className="quotation-label">{t("progress.amount")}</span>
        <span className="amount">₹ {formatPrice(amount)}</span>
      </div>
      <div className="amount-row">
        <span className="quotation-label">{t("progress.message")}</span>
        <span className="quotation-value">{message}</span>
      </div>
      {status === "accepted" ? (
        <>
          <div className="action-buttons">
            <p className="accepted-text">{t("progress.accepted")}</p>
            <button className="view-btn" onClick={handleStartChat}>
              {t("progress.chat")}
            </button>
            <button className="call-btn" onClick={() => setShowNumber((prev) => !prev)}>
              {showNumber ? provider?.phone || "N/A" : t("progress.call")}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="action-buttons">
            <button
              className="quotation-btn accept"
              onClick={handleAccept}
              disabled={actionLoading}
            >
              {t("progress.accept")}
            </button>
            <button
              className="quotation-btn reject"
              onClick={handleReject}
              disabled={actionLoading}
            >
              {t("progress.reject")}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default QuotationCard;
