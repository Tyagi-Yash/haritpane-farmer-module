import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useCattleBooking } from "../../../hooks/useCattleBooking";

import PriceBreakdown from "../../../components/service category/cattle purchase and sale/PriceBreakdown";
import TopbarModal from "../../../components/common components/TopbarModal";
import CancelBookingModal from "../../../components/common components/CancelBookingModal";
import VendorHeader from "../../../components/common components/VendorHeader";
import VendorTabs from "../../../components/common components/VendorTabs";
import VendorInfo from "../../../components/common components/VendorInfo";
import BookingSummary from "../../../components/common components/BookingSummary";
import BookingActions from "../../../components/common components/BookingActions";
import ReviewTab from "../../../components/common components/ReviewTab";
import SuccessModal from "../../../components/common components/SuccessModal";

function CattleVendorDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("service");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { services = [], filters = {} } = useSelector(
    (state) => state.services.CattleServiceMgmtSlice,
  );

  const vendor = services.find((v) => v.basicInfo?._id === id);

  const { isBooking, loading, bookingStatus, bookService, cancelServiceBooking } = useCattleBooking(
    {
      vendor,
      filters,
    },
  );

  const { cattleInfo = {}, basicInfo = {} } = vendor;

  const renderField = (label, value) => {
    if (!value && value !== 0 && value !== false) return null;
    return (
      <p>
        <strong>{label}:</strong> {value}
      </p>
    );
  };

  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal
            titleBox={true}
            title="Vendor Details"
            navigate={`/service-category/cattle-purchase-sale/available-services?${new URLSearchParams(
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
                  image={vendor?.basicInfo?.images?.[0]}
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
                          serviceName={"Cattle Purchase & Sale"}
                        />
                        <div className="option-wrapper booking-area mb-0">
                          <h6 className="normal-heading">Cattle Details</h6>
                          {renderField("Cattle Name", cattleInfo.cattleName)}
                          {renderField("Breed", cattleInfo.cattleBreed)}
                          {renderField("Gender", cattleInfo.cattleGender)}
                          {renderField("Age", basicInfo.age && `${basicInfo.age}`)}
                          {renderField("Weight", basicInfo.weight && `${basicInfo.weight} Kg`)}
                          {basicInfo.calf && renderField("Calf Available", "Yes")}
                          {renderField("Number of Calf", basicInfo.numberOfCalf)}
                          {renderField(
                            "Milk Per Day",
                            basicInfo.milkPerDay && `${basicInfo.milkPerDay} Liters`,
                          )}
                          {renderField("Lactation", basicInfo.lactation)}
                          {renderField("Description", basicInfo.animalDescription)}
                        </div>
                      </div>
                      <div className="col">
                        <PriceBreakdown
                          sellingPrice={vendor.basicInfo.sellingPrice}
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

export default CattleVendorDetails;
