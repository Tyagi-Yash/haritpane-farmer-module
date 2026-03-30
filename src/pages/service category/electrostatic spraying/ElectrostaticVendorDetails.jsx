import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { useElectrostaticBooking } from "../../../hooks/useElectrostaticBooking";

import TopbarModal from "../../../components/common components/TopbarModal";
import CancelBookingModal from "../../../components/common components/CancelBookingModal";
import VendorHeader from "../../../components/common components/VendorHeader";
import VendorTabs from "../../../components/common components/VendorTabs";
import VendorInfo from "../../../components/common components/VendorInfo";
import BookingSummary from "../../../components/common components/BookingSummary";
import PriceBreakdown from "../../../components/service category/electrostatic spraying/PriceBreakdown";
import BookingActions from "../../../components/common components/BookingActions";
import ReviewTab from "../../../components/common components/ReviewTab";
import SuccessModal from "../../../components/common components/SuccessModal";
import ElectrostaticProductInformation from "../../../components/service category/electrostatic spraying/ElectrostaticProductInformation";

function ElectrostaticVendorDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("service");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { services = [], filters = {} } = useSelector(
    (state) => state.services.ElectrostaticSprayingServiceMgmtSlice,
  );

  const vendor = services.find((v) => v._id === id);

  const { isBooking, loading, bookingStatus, bookService, cancelServiceBooking } =
    useElectrostaticBooking({
      vendor,
      filters,
    });
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal
            titleBox={true}
            title={t("progress.vendorDetails")}
            navigate={`/service-category/electrostatic-spraying/available-services?${new URLSearchParams(
              filters,
            ).toString()}`}
          />
          <div className="dashboard">
            {!vendor ? (
              <p style={{ color: "gray", marginTop: "10px" }}>
                {t("progress.noVendorData")}
              </p>
            ) : (
              <>
                <VendorHeader
                  image={vendor?.equipmentImage?.[0]}
                  isBooking={isBooking}
                  bookingStatus={bookingStatus}
                />
                <VendorTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                {activeTab === "service" && (
                  <>
                    <VendorInfo provider={vendor.provider} />
                    <div className="row align-items-center">
                      <div className="col">
                        <BookingSummary
                          businessName={vendor.businessName}
                          serviceName={t("electrostatic.electrostaticSpraying")}
                        />
                        <ElectrostaticProductInformation vendor={vendor} />
                      </div>
                      <div className="col" style={{ marginTop: "auto" }}>
                        <PriceBreakdown
                          chargePerAcre={vendor?.basicInfo?.chargePerAcre}
                          additionalCharges={vendor?.basicInfo?.additionalCharges}
                          extraCharges={vendor.extraCharges}
                          payableAmount={vendor.payableAmount}
                          areaUnderCultivation={filters.areaUnderCultivation}
                          distanceBeyondRadius={vendor.distanceBeyondRadius}
                        />
                      </div>
                    </div>
                    <BookingActions
                      isBooking={isBooking}
                      loading={loading}
                      onBook={async () => {
                        const success = await bookService();
                        if (success) setShowSuccess(true);
                      }}
                      onCancelClick={() => setShowCancelModal(true)}
                    />
                  </>
                )}
                {activeTab === "review" && vendor?.provider?._id && (
                  <ReviewTab serviceId={vendor.provider._id} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <CancelBookingModal
        show={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onCancel={(reason) => {
          cancelServiceBooking(reason);
          setShowCancelModal(false);
        }}
      />
      {showSuccess && <SuccessModal onClose={() => navigate("/dashboard")} />}
    </>
  );
}

export default ElectrostaticVendorDetails;
