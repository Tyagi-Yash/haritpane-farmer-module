import landstatus from "../../../assets/images/landstatus.png";

const VendorHeader = ({ image, isBooking }) => {
  return (
    <figure className="status-image-tag" style={{ minHeight: "200px" }}>
      <img src={image || landstatus} alt="Service Image" />
      {isBooking && <div className="status-tag-pending">Booking Approval Pending</div>}
    </figure>
  );
};

export default VendorHeader;
