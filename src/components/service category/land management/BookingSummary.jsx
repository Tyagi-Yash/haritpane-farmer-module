const BookingSummary = ({ businessName }) => {
  return (
    <div className="option-wrapper booking-area">
      <h5 className="normal-heading">Booking Details</h5>
      <p>Service Name: Land Management Services</p>
      <p>Business Name: {businessName || "N/A"}</p>
    </div>
  );
};

export default BookingSummary;
