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
import PriceBreakdown from "../../service category/cattle purchase and sale/PriceBreakdown";
import {
  CANCEL_REASONS_BY_SERVICE,
  SERVICE_REASON_KEY_MAP,
} from "../../../constants/progress/cancelReasons";

function CattleDetails({ data }) {
  const service = data.serviceDetails;
  const provider = data.providerDetails;
  const [showCancelModal, setShowCancelModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const serviceName = data?.bookingFor || "cattle";
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

  const { cattleInfo = {}, basicInfo = [] } = service;

  const basicInfoArray = basicInfo?.[0];

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
                <p>{t("progress.serviceName")}: {t("progress.cattlePurchaseSale")}</p>
                <p>{t("progress.businessName")}: {service?.businessName || "N/A"}</p>
                <br />
                <p>{t("progress.farmLocation")}: {data?.addressOfFarm || "N/A"}</p>
                <p>{t("progress.cattleName")}: {data?.cattleName && t(`cattle.${data.cattleName.toLowerCase()}`)}</p>
                <p>{t("progress.cattleBreed")}: {data?.cattleBreed && t(`cattle.breeds.${data.cattleBreed.toLowerCase().replace(/ - /g, "_").replace(/ /g, "_").replace(/-/g, "_")}`, { defaultValue: data.cattleBreed })}</p>
                <p>{t("progress.gender")}: {cattleInfo.cattleGender && t(`cattle.${cattleInfo.cattleGender.toLowerCase()}`)}</p>
                {basicInfoArray.age && <p>{t("progress.age")}: {basicInfoArray.age} {t("progress.year")}</p>}
                {basicInfoArray.weight && <p>{t("progress.weight")}: {basicInfoArray.weight} {t("progress.kg")}</p>}
                {basicInfoArray.calf && <p>{t("progress.calfAvailable")}: {t("progress.yes")}</p>}
                {basicInfoArray.numberOfCalf && (
                  <p>{t("progress.numberOfCalf")}: {basicInfoArray.numberOfCalf}</p>
                )}
                {basicInfoArray.milkPerDay && (
                  <p>{t("progress.milkPerDay")}: {basicInfoArray.milkPerDay} {t("progress.liters")}</p>
                )}
                {basicInfoArray.lactation && <p>{t("progress.lactation")}: {basicInfoArray.lactation}</p>}
                {basicInfoArray.animalDescription && (
                  <p>{t("progress.description")}: {basicInfoArray.animalDescription}</p>
                )}
              </div>
            </div>
            <div className="col">
              <div className="bookingPriceTableParent">
                <PriceBreakdown sellingPrice={data?.sellingPrice} payableAmount={data?.amount} />
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

export default CattleDetails;
