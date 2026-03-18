import userIcon from "../../../assets/images/user-icon.svg";
import locationIcon from "../../../assets/images/location-icon.png";
import mobile from "../../../assets/images/mobile.svg";
import CancelBookingModal from "../../common components/CancelBookingModal";
import { useState } from "react";
import { cancelBooking } from "../../../reduxtoolkit/slices/service category/bookingSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import PriceBreakdown from "../../service category/compund wall builder/PriceBreakdown";
import { formatDate } from "../../../utils/dateFormatter";
import { convertTo12Hour } from "../../../utils/formatTime12Hour";
import {
  CANCEL_REASONS_BY_SERVICE,
  SERVICE_REASON_KEY_MAP,
} from "../../../constants/progress/cancelReasons";

function CompoundWallDetails({ data }) {
  const service = data.serviceDetails;
  const provider = data.providerDetails;
  const [showCancelModal, setShowCancelModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const serviceName = data?.bookingFor || "compoundWall";
  const serviceKey = SERVICE_REASON_KEY_MAP[serviceName];
  const reasons = CANCEL_REASONS_BY_SERVICE[serviceKey] || [];
  const handleCancelBooking = async (reason) => {
    try {
      await dispatch(
        cancelBooking({ bookingId: data._id, status: "cancelled", reasonForRejection: reason }),
      ).unwrap();
      toast.success("Booking cancelled successfully");
      setShowCancelModal(false);
      navigate("/service-tracking");
    } catch (err) {
      toast.error(err?.message || "Failed to cancel booking");
    }
  };

  const handleStartChat = () => {
    navigate("/chats", {
      state: {
        roomId: data._id,
        farmerId: data.farmerId,
        serviceProviderId: data.providerDetails._id,
        providerDetails: data.providerDetails,
        chatType: "online_Provider",
      },
    });
  };

  return (
    <>
      <div className="tab-pane active">
        <div className="option-wrapper">
          <h5 className="normal-heading">Vendor Information</h5>
          <h6>
            <span>
              <img src={userIcon} alt="" />
            </span>
            {provider?.name || "N/A"}
          </h6>
          <h6>
            <span>
              <img src={locationIcon} alt="" />
            </span>
            {provider?.address || "N/A"}
          </h6>
          <h6>
            <span>
              {" "}
              <img src={mobile} alt="" />
            </span>
            {provider?.phone
              ? data.status !== "pending" && data.status !== "rejected"
                ? `+91 ${provider.phone}`
                : `+91 ${provider.phone.slice(0, -6)}${"X".repeat(6)}`
              : "N/A"}
          </h6>
        </div>
        <div>
          <div className="row align-items-center">
            <div className="col align-items-center">
              <div className="option-wrapper booking-area">
                <h5 className="normal-heading">Booking Details</h5>
                <p>Service Name: Compound Wall Builder</p>
                <p>Business Name: {service?.businessName || "N/A"}</p>
                <br />
                <p>Field Location: {data?.addressOfFarm || "N/A"}</p>
                <p>Wall Type: {data?.typeOfWall || "N/A"}</p>
                {/* <p>Length of Wall(meter): {data?.length || "N/A"}</p>
                <p>Height of Wall(ft): {data?.height || "N/A"}</p> */}
                <p>Start Date: {formatDate(data?.bookingFromDate)}</p>
                <p>End Date: {formatDate(data?.bookingTillDate)}</p>
                <p>Start Time: {convertTo12Hour(data?.bookingStartTime) || "N/A"}</p>
              </div>
            </div>
            <div className="col">
              <div className="bookingPriceTableParent">
                <PriceBreakdown
                  perMeter={data?.perMeter}
                  length={data?.length}
                  height={data?.height}
                  payableAmount={data.amount}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center">
          {["pending", "accepted", "started"].includes(data.status) && (
            <button type="button" className="btn-delete" onClick={() => setShowCancelModal(true)}>
              Cancel Booking
            </button>
          )}
          {data.status === "accepted" && (
            <button type="button" className="btn-edit" onClick={handleStartChat}>
              Start Chat
            </button>
          )}
          <button className="btn-edit">Raise Enquiry</button>
        </div>
      </div>
      <CancelBookingModal
        show={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onCancel={handleCancelBooking}
        status={data.status}
        reasons={reasons}
      />
    </>
  );
}

export default CompoundWallDetails;
