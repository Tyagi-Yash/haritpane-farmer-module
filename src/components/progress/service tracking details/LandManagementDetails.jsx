import userIcon from "../../../assets/images/user-icon.svg";
import locationIcon from "../../../assets/images/location-icon.png";
import mobile from "../../../assets/images/mobile.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cancelBooking } from "../../../reduxtoolkit/slices/service category/bookingSlice";
import { toast } from "react-toastify";
import CancelBookingModal from "../../common components/CancelBookingModal";
import PriceBreakdown from "../../service category/land management/PriceBreakdown";
import { formatDate } from "../../../utils/dateFormatter";
import { convertTo12Hour } from "../../../utils/formatTime12Hour";
import {
  CANCEL_REASONS_BY_SERVICE,
  SERVICE_REASON_KEY_MAP,
} from "../../../constants/progress/cancelReasons";

function LandManagementDetails({ data }) {
  const service = data.serviceDetails;
  const provider = data.providerDetails;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const serviceName = data?.bookingFor || "land_management";
  const serviceKey = SERVICE_REASON_KEY_MAP[serviceName];
  const reasons = CANCEL_REASONS_BY_SERVICE[serviceKey] || [];
  const handleCancelBooking = async (reason) => {
    try {
      await dispatch(
        cancelBooking({ bookingId: data._id, status: "cancelled", reasonForRejection: reason }),
      ).unwrap();
      toast.success(t("progress.bookingCancelled"));
      setShowCancelModal(false);
      navigate("/service-tracking");
    } catch (err) {
      toast.error(err?.message || t("progress.bookingCancelFail"));
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

  const info = service?.Info?.find((i) => i._id === data.tractorInfoId);

  return (
    <>
      <div className="tab-pane active">
        <div className="option-wrapper">
          <h5 className="normal-heading">{t("progress.vendorInformation")}</h5>
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
                <h5 className="normal-heading">{t("progress.bookingDetails")}</h5>
                <p>{t("progress.serviceName")}: {t("progress.landManagement")}</p>
                <p>{t("progress.businessName")}: {service?.businessName || "N/A"}</p>
                <br />
                <p>{t("progress.farmLocation")}: {data?.addressOfFarm || "N/A"}</p>
                <p>{t("progress.equipment")}: {info?.equipmentInformation || "N/A"}</p>
                {/* <p>
                  {info?.equipmentInformation === "Trolly" ? "Trip Distance" : "Farm Area"}:{" "}
                  {data?.farmArea
                    ? `${data.farmArea} ${info?.equipmentInformation === "Trolly" ? "Km" : "Acre"}`
                    : "N/A"}
                </p> */}
                <p>{t("progress.startDate")}: {formatDate(data?.bookingFromDate)}</p>
                <p>{t("progress.endDate")}: {formatDate(data?.bookingTillDate)}</p>
                <p>{t("progress.startTime")}: {convertTo12Hour(data?.bookingStartTime) || "N/A"}</p>
              </div>
            </div>
            <div className="col mb-0">
              <div className="bookingPriceTableParent">
                <PriceBreakdown
                  price={data?.price}
                  equipment={info?.equipmentInformation}
                  extraCharges={data?.extraCharges}
                  additionalCharges={service?.additionalCharges}
                  payableAmount={data?.amount}
                  distanceBeyondRadius={Number(data?.distanceBeyondRadius) || 0}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center">
          {["pending", "accepted", "started"].includes(data.status) && (
            <button type="button" className="btn-delete" onClick={() => setShowCancelModal(true)}>
              {t("progress.cancelBooking")}
            </button>
          )}
          {data.status === "accepted" && (
            <button type="button" className="btn-edit" onClick={handleStartChat}>
              {t("progress.startChat")}
            </button>
          )}
          <button className="btn-edit">{t("progress.raiseEnquiry")}</button>
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

export default LandManagementDetails;
