import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { lazy, Suspense } from "react";

import { useLandManagementBooking } from "../../../hooks/useLandManagementBooking";

import TopbarModal from "../../../components/common components/TopbarModal";
import CancelBookingModal from "../../../components/common components/CancelBookingModal";
import VendorHeader from "../../../components/service category/land management/VendorHeader";
import VendorTabs from "../../../components/service category/land management/VendorTabs";
import VendorInfo from "../../../components/service category/land management/VendorInfo";
import BookingSummary from "../../../components/service category/land management/BookingSummary";
import PriceBreakdown from "../../../components/service category/land management/PriceBreakdown";
import BookingActions from "../../../components/service category/land management/BookingActions";
import ReviewTabSkeleton from "../../../components/skeletons/ReviewTabSkeleton";

const ReviewTab = lazy(() =>
  import("../../../components/service category/land management/ReviewTab")
);

function LandManagementVendorDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("service");
  const [showCancelModal, setShowCancelModal] = useState(false);

  const { services, filters } = useSelector((state) => state.services.LandServiceMgmtSlice);

  const vendor = services.find((v) => v.Info?._id === id);

  const { isBooking, loading, bookService, cancelServiceBooking } = useLandManagementBooking({
    vendor,
    filters,
  });

  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal
            titleBox
            title="Vendor Details"
            navigate={`/service-category/land-management/available-services?${new URLSearchParams(
              filters
            ).toString()}`}
          />

          <div className="dashboard">
            {!vendor ? (
              <p style={{ color: "gray", marginTop: "10px" }}>
                No vendor data available. Please go back and select a vendor again.
              </p>
            ) : (
              <>
                <VendorHeader image={vendor?.Info?.images?.[0]} isBooking={isBooking} />
                <VendorTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                {activeTab === "service" && (
                  <>
                    <VendorInfo provider={vendor.provider} />
                    <div className="row align-items-center">
                      <div className="col">
                        <BookingSummary businessName={vendor.businessName} />
                      </div>
                      <div className="col">
                        <PriceBreakdown
                          info={vendor.Info}
                          additionalCharges={vendor.additionalCharges}
                          payableAmount={vendor.payableAmount}
                        />
                      </div>
                    </div>
                    <BookingActions
                      isBooking={isBooking}
                      loading={loading}
                      onBook={bookService}
                      onCancelClick={() => setShowCancelModal(true)}
                    />
                  </>
                )}
                {activeTab === "review" && (
                  <Suspense fallback={<ReviewTabSkeleton />}>
                    <ReviewTab />
                  </Suspense>
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
    </>
  );
}

export default LandManagementVendorDetails;
