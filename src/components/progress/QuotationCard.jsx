function QuotationCard({ data, onAccept, onReject }) {
  return (
    <div className="quotation-card">
      <div className="quotation-row">
        <span className="quotation-label">Name</span>
        <span className="quotation-value">{data.name}</span>
      </div>

      <div className="quotation-row">
        <span className="quotation-label">Phone Number</span>
        <span className="quotation-value">{data.phone}</span>
      </div>

      <div className="quotation-row">
        <span className="quotation-label">Date & Time</span>
        <span className="quotation-value">{data.dateTime}</span>
      </div>

      <div className="quotation-row">
        <span className="quotation-label">Vehicle Type</span>
        <span className="quotation-value">{data.vehicleType}</span>
      </div>

      <div className="quotation-row">
        <span className="quotation-label">Goods to be Transported</span>
        <span className="quotation-value">{data.goods}</span>
      </div>

      <div className="quotation-row">
        <span className="quotation-label">End Travel Location</span>
        <span className="quotation-value">{data.location}</span>
      </div>

      <div className="quotation-row">
        <span className="quotation-label">Charges</span>
        <span className="quotation-value">₹ {data.charges.toFixed(2)}</span>
      </div>

      <div className="quotation-actions">
        <button className="accept-btn" onClick={() => onAccept(data.id)}>
          Accept
        </button>
        <button className="reject-btn" onClick={() => onReject(data.id)}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default QuotationCard;
