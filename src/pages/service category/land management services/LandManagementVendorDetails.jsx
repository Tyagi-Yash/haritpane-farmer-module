import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { useLandManagementBooking } from "../../../hooks/useLandManagementBooking";

import PriceBreakdown from "../../../components/service category/land management/PriceBreakdown";
import TopbarModal from "../../../components/common components/TopbarModal";
import CancelBookingModal from "../../../components/common components/CancelBookingModal";
import VendorTabs from "../../../components/common components/VendorTabs";
import VendorInfo from "../../../components/common components/VendorInfo";
import VendorHeader from "../../../components/common components/VendorHeader";
import BookingSummary from "../../../components/common components/BookingSummary";
import BookingActions from "../../../components/common components/BookingActions";
import ReviewTab from "../../../components/common components/ReviewTab";
import SuccessModal from "../../../components/common components/SuccessModal";
import EquipmentDetails from "../../../components/service category/land management/EquipmentDetails";

function LandManagementVendorDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("service");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { services = [], filters = {} } = useSelector(
    (state) => state.services.LandServiceMgmtSlice,
  );

  const vendor = services.find((v) => v.Info?._id === id);

  const { isBooking, loading, bookingStatus, bookService, cancelServiceBooking } =
    useLandManagementBooking({
      vendor,
      filters,
    });

  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal
            titleBox
            title={t("common.vendorDetails")}
            navigate={`/service-category/land-management/available-services?${new URLSearchParams(
              filters,
            ).toString()}`}
          />

          <div className="dashboard">
            {!vendor ? (
              <p style={{ color: "gray", marginTop: "10px" }}>
                {t("common.noVendorData")}
              </p>
            ) : (
              <>
                <VendorHeader
                  image={vendor?.Info?.images?.[0]}
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
                          serviceName={t("dashboard.landManagementStatus")}
                        />
                        <EquipmentDetails vendor={vendor} />
                      </div>
                      <div className="col" style={{ marginTop: "auto" }}>
                        <PriceBreakdown
                          price={vendor.Info.price}
                          equipment={vendor?.Info?.equipmentInformation}
                          extraCharges={vendor.extraCharges}
                          additionalCharges={vendor.additionalCharges}
                          distanceBeyondRadius={vendor.distanceBeyondRadius}
                          payableAmount={vendor.payableAmount}
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

export default LandManagementVendorDetails;
