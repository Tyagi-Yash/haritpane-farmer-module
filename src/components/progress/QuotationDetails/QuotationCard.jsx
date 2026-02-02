import { useDispatch, useSelector } from "react-redux";
import { acceptQuotation, rejectQuotation } from "../../../reduxtoolkit/slices/progress/quotations";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function QuotationCard({ data, jobOrderId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { actionLoading, farmerId } = useSelector((state) => state.services.quotationSlice);
  const [showNumber, setShowNumber] = useState(false);

  const { provider, amount, message, status, quotationId } = data;

  const handleAccept = async () => {
    try {
      await dispatch(acceptQuotation({ jobOrderId, quotationId })).unwrap();
      toast.success("Quotation accepted successfully. Booking confirmed!");
    } catch (error) {
      toast.error("Failed to accept quotation");
    }
  };

  const handleReject = async () => {
    try {
      await dispatch(rejectQuotation({ jobOrderId, quotationId })).unwrap();
      toast.success("Quotation Rejected successfully.");
    } catch (error) {
      toast.error("Failed to reject quotation");
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
        <span className="quotation-label">Service Provider</span>
        <span className="quotation-value">{provider?.name || "N/A"}</span>
      </div>
      <div className="amount-row">
        <span className="quotation-label">Amount</span>
        <span className="amount">₹ {amount}</span>
      </div>
      <div className="amount-row">
        <span className="quotation-label">Message</span>
        <span className="quotation-value">{message}</span>
      </div>
      {status === "accepted" ? (
        <>
          <div className="action-buttons">
            <p className="accepted-text">Accepted</p>
            <button className="view-btn" onClick={handleStartChat}>
              Chat
            </button>
            <button className="call-btn" onClick={() => setShowNumber((prev) => !prev)}>
              {showNumber ? provider?.phone || "N/A" : "Call"}
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
              Accept
            </button>
            <button
              className="quotation-btn reject"
              onClick={handleReject}
              disabled={actionLoading}
            >
              Reject
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default QuotationCard;
