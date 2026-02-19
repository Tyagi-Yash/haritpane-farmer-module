import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { usecompoundWallBooking } from "../../../hooks/useCompoundWallBooking";

import TopbarModal from "../../../components/common components/TopbarModal";
import CancelBookingModal from "../../../components/common components/CancelBookingModal";
import VendorHeader from "../../../components/common components/VendorHeader";
import VendorTabs from "../../../components/common components/VendorTabs";
import VendorInfo from "../../../components/common components/VendorInfo";
import BookingSummary from "../../../components/common components/BookingSummary";
import PriceBreakdown from "../../../components/service category/compund wall builder/PriceBreakdown";
import BookingActions from "../../../components/common components/BookingActions";
import ReviewTab from "../../../components/common components/ReviewTab";

function CompoundWallVendorDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("service");
  const [showCancelModal, setShowCancelModal] = useState(false);

  const { services = [], filters = {} } = useSelector(
    (state) => state.services.CompoundWallServiceMgmtSlice,
  );

  const vendor = services.find((v) => v.compoundMaterialsInfo?._id === id);

  const { isBooking, loading, bookingStatus, bookService, cancelServiceBooking } =
    usecompoundWallBooking({
      vendor,
      filters,
    });
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal
            titleBox={true}
            title="Vendor Details"
            navigate={`/service-category/compound-wall-builder/available-services?${new URLSearchParams(
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
                  image={vendor?.toolsImges?.[0]}
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
                          serviceName={"Compound Wall Builder"}
                        />
                      </div>
                      <div className="col">
                        <PriceBreakdown
                          rate={vendor?.compoundMaterialsInfo?.rate}
                          additionalCharges={vendor?.additionCharges}
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
    </>
  );
}

export default CompoundWallVendorDetails;
