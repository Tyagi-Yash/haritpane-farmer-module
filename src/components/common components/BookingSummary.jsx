const BookingSummary = ({ businessName, serviceName }) => {
  return (
    <div className="option-wrapper mb-0">
      <h5 className="normal-heading">Booking Details</h5>
      <p>Service Name: {serviceName}</p>
      <p>Business Name: {businessName || "N/A"}</p>
    </div>
  );
};

export default BookingSummary;
