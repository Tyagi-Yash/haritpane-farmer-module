import userIcon from "../../../assets/images/user-icon.svg";
import locationIcon from "../../../assets/images/location-icon.png";
import mobile from "../../../assets/images/mobile.svg";
import CancelBookingModal from "../../common components/CancelBookingModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cancelBooking } from "../../../reduxtoolkit/slices/service category/bookingSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import PriceBreakdown from "../../service category/labour requirement/PriceBreakdown";
import { formatDate } from "../../../utils/dateFormatter";
import { convertTo12Hour } from "../../../utils/formatTime12Hour";
import { LabourTypes } from "../../../constants/service category/labor requirement/labour type data";

function LabourDetails({ data }) {
  const service = data.serviceDetails;
  const provider = data.providerDetails;
  const [showCancelModal, setShowCancelModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
                <h5 className="normal-heading">{t("progress.bookingDetails")}</h5>
                <p>{t("progress.serviceName")}: {t("progress.labourRequirement")}</p>
                <p>{t("progress.businessName")}: {service?.businessName || "N/A"}</p>
                <br />
                <p>{t("progress.farmLocation")}: {data?.addressOfFarm || "N/A"}</p>
                <p>
                  {t("progress.labourFor")}:{" "}
                  {LabourTypes.find((type) => type?.value === data?.labourType)?.name || "N/A"}
                </p>
                <p>{t("progress.numberOfLabour")}: {data?.numberOfLabour || "N/A"}</p>
                {/* {data?.areaUnderCultivation ? (
                  <p>Farm Area: {data.areaUnderCultivation} Acre</p>
                ) : null} */}
                {data?.cropUnderCultivation ? <p>{t("progress.cropName")}: {data.cropUnderCultivation}</p> : null}
                <p>{t("progress.startDate")}: {formatDate(data?.bookingFromDate)}</p>
                <p>{t("progress.endDate")}: {formatDate(data?.bookingTillDate)}</p>
                {data?.bookingStartTime ? (
                  <p>{t("progress.startTime")}: {convertTo12Hour(data?.bookingStartTime)}</p>
                ) : null}
                {data?.bookingEndTime ? (
                  <p>{t("progress.endTime")}: {convertTo12Hour(data?.bookingEndTime)}</p>
                ) : null}
              </div>
            </div>
            <div className="col">
              <div className="bookingPriceTableParent">
                <PriceBreakdown
                  dailyWage={data?.dailyWage}
                  additionalCharges={data?.additionalCharges}
                  extraCharges={data.extraCharges}
                  payableAmount={data.amount}
                  distanceBeyondRadius={Number(data?.distanceBeyondRadius) || 0}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center mt-5">
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
      />
    </>
  );
}

export default LabourDetails;
