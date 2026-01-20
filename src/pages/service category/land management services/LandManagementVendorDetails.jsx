import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

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

function LandManagementVendorDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("service");
  const [showCancelModal, setShowCancelModal] = useState(false);

  const { services, filters } = useSelector((state) => state.services.LandServiceMgmtSlice);

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
            title="Vendor Details"
            navigate={`/service-category/land-management/available-services?${new URLSearchParams(
              filters,
            ).toString()}`}
          />

          <div className="dashboard">
            {!vendor ? (
              <p style={{ color: "gray", marginTop: "10px" }}>
                No vendor data available. Please go back and select a vendor again.
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
                          serviceName={"Land Management"}
                        />
                      </div>
                      <div className="col">
                        <PriceBreakdown
                          info={vendor.Info}
                          extraCharges={vendor.extraCharges}
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
                {activeTab === "review" && <ReviewTab serviceId={vendor.provider._id} />}
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
