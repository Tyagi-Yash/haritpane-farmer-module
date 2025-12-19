const BookingActions = ({ isBooking, loading, onBook, onCancelClick }) => {
  return (
    <div className="d-flex justify-content-end align-items-center mt-5">
      {!isBooking ? (
        <button onClick={onBook} disabled={loading} className="btn-edit">
          {loading ? "Booking..." : "Send Booking Request"}
        </button>
      ) : (
        <>
          <button type="button" className="btn-delete" disabled={loading} onClick={onCancelClick}>
            {loading ? "Cancelling..." : "Cancel Booking"}
          </button>

          <button className="btn-edit">Contact Vendor</button>
        </>
      )}
    </div>
  );
};

export default BookingActions;
