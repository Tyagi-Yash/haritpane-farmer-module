import serviceImg from "../../assets/images/service.png";

const VendorHeader = ({ image, isBooking, bookingStatus }) => {
  return (
    <figure className="status-image-tag" style={{ minHeight: "200px" }}>
      <img src={image || serviceImg} alt="Service Image" />
      {/* {isBooking && <div className="status-tag-pending">Booking Approval {bookingStatus}</div>} */}
    </figure>
  );
};

export default VendorHeader;
