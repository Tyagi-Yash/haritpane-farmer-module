import { useDispatch } from "react-redux";
import { acceptQuotation } from "../../reduxtoolkit/slices/progress/quotations";
import { toast } from "react-toastify";

function QuotationCard({ data, jobOrderId }) {
  const dispatch = useDispatch();

  const { provider, amount, message, status, quotationId, actionLoading } = data;

  const handleAccept = async () => {
    try {
      await dispatch(
        acceptQuotation({
          jobOrderId,
          quotationId,
        }),
      ).unwrap();
      toast.success("Quotation accepted successfully. Booking confirmed!");
    } catch (error) {
      toast.error("Failed to accept quotation");
    }
  };

  return (
    <div className="quotation-card">
      <div className="amount-row">
        <span className="quotation-label">Service Provider</span>
        <span className="quotation-value">{provider?.name}</span>
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
            <button className="view-btn">Start Chat</button>
          </div>
        </>
      ) : (
        <>
          <div className="action-buttons">
            <button className="quotation-btn accept" onClick={handleAccept} disabled={actionLoading}>
              Accept
            </button>
            <button className="quotation-btn reject">Reject</button>
          </div>
        </>
      )}
    </div>
  );
}

export default QuotationCard;
