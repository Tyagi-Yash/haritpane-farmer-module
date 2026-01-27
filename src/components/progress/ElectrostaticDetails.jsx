import userIcon from "../../assets/images/user-icon.svg";
import locationIcon from "../../assets/images/location-icon.png";
import mobile from "../../assets/images/mobile.svg";
import CancelBookingModal from "../common components/CancelBookingModal";
import { useState } from "react";
import { cancelBooking } from "../../reduxtoolkit/slices/service category/bookingSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import PriceBreakdown from "../service category/electrostatic spraying/PriceBreakdown";

function ElectrostaticDetails({ data }) {
  const service = data.serviceDetails;
  const provider = data.providerDetails;
  const [showCancelModal, setShowCancelModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCancelBooking = async (reason) => {
    try {
      const res = await dispatch(
        cancelBooking({
          bookingId: data._id,
          status: "cancelled",
          reasonForRejection: reason,
        }),
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
            {provider?.phone ? `+91 ${provider.phone.slice(0, -6) + "X".repeat(6)}` : "N/A"}
          </h6>
        </div>
        <div>
          <div className="row align-items-center">
            <div className="col align-items-center">
              <div className="option-wrapper booking-area">
                <h5 className="normal-heading">Booking Details</h5>
                <p>Service Name: Electrostatic Spraying</p>
                <p>Business Name: {service?.businessName || "N/A"}</p>
              </div>
            </div>
            <div className="col">
              <div className="bookingPriceTableParent">
                <PriceBreakdown
                  info={service.basicInfo}
                  additionalCharges={service.basicInfo.additionalCharges}
                  extraCharges={data.extraCharges}
                  payableAmount={data.amount}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center mt-5">
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
      />
    </>
  );
}

export default ElectrostaticDetails;
