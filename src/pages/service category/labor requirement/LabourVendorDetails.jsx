import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { useLabourBooking } from "../../../hooks/useLabourBooking";

import PriceBreakdown from "../../../components/service category/labour requirement/PriceBreakdown";
import TopbarModal from "../../../components/common components/TopbarModal";
import CancelBookingModal from "../../../components/common components/CancelBookingModal";
import VendorHeader from "../../../components/common components/VendorHeader";
import VendorTabs from "../../../components/common components/VendorTabs";
import VendorInfo from "../../../components/common components/VendorInfo";
import BookingSummary from "../../../components/common components/BookingSummary";
import BookingActions from "../../../components/common components/BookingActions";
import ReviewTab from "../../../components/common components/ReviewTab";
import SuccessModal from "../../../components/common components/SuccessModal";
import LabourProductInformation from "../../../components/service category/labour requirement/LabourProductInformation";

function LabourVendorDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("service");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { services = [], filters = {} } = useSelector(
    (state) => state.services.LabourServiceMgmtSlice,
  );

  const vendor = services.find((v) => v._id === id);

  const { isBooking, loading, bookingStatus, bookService, cancelServiceBooking } = useLabourBooking(
    {
      vendor,
      filters,
    },
  );

  const getNumberOfDays = (fromDate, toDate) => {
    if (!fromDate || !toDate) return 1;
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const startUTC = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
    const endUTC = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
    const diffDays = Math.round((endUTC - startUTC) / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 1;
  };

  const numberOfDays = getNumberOfDays(filters?.fromDate, filters?.toDate);

  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal
            titleBox={true}
            title={t("progress.vendorDetails")}
            navigate={`/service-category/labour-requirement/available-services?${new URLSearchParams(
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
                  image={vendor?.images?.[0]}
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
                          serviceName={t("labour.labourRequirement")}
                        />
                        <LabourProductInformation vendor={vendor} />
                      </div>
                      <div className="col" style={{ marginTop: "auto" }}>
                        <PriceBreakdown
                          dailyWage={vendor.labourInfo.dailyWage}
                          additionalCharges={vendor?.labourInfo?.additionalCharges}
                          extraCharges={vendor.extraCharges}
                          payableAmount={vendor.payableAmount}
                          numberOfLabour={filters.numberOfLabour}
                          distanceBeyondRadius={vendor.distanceBeyondRadius}
                          numberOfDays={numberOfDays}
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

export default LabourVendorDetails;
