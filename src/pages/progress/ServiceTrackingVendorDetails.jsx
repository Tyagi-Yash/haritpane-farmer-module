import profile from "../../assets/images/profile.png";
import TopbarModal from "../../components/common components/TopbarModal";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getBookingById } from "../../reduxtoolkit/slices/progress/bookingList";
import BookingDetailsRenderer from "../../components/progress/service tracking details/BookingDetailsRenderer";
import serviceImg from "../../assets/images/service.png";
import ReviewTab from "../../components/common components/ReviewTab";

function ServiceTrackingVendorDetails() {
  const { bookingId } = useParams();
  const { t } = useTranslation();
  const { services } = useSelector((state) => state.services.bookingListSlice);
  const booking = services.find((b) => b.id === bookingId);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("service");

  useEffect(() => {
    if (bookingId) {
      dispatch(getBookingById(bookingId));
    }
  }, [bookingId, dispatch]);

  if (!booking) {
    return <p className="text-center">{t("progress.loadingVendor")}</p>;
  }

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title={t("progress.vendorDetails")}
          navigate="/service-tracking"
          profile={profile}
        />
        <div className="dashboard progress-vendor-details">
          <div className="image-otp-container">
            <figure className="status-image-tag" style={{ minHeight: "200px" }}>
              <img src={booking.image || serviceImg} alt="Service Image" />
            </figure>

            <div className="otp-container">
              {booking.raw?.startTimeOtp && (
                <div className="otp-card start-otp">
                  <div className="otp-label">{t("progress.startServiceOtp")}</div>
                  <div className="otp-value">{booking.raw.startTimeOtp}</div>
                </div>
              )}
              {booking.raw?.endTimeOtp && (
                <div className="otp-card end-otp">
                  <div className="otp-label">{t("progress.endServiceOtp")}</div>
                  <div className="otp-value">{booking.raw.endTimeOtp}</div>
                </div>
              )}
            </div>
          </div>
          <div className="CommonTabs mt-0">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "service" ? "active" : ""}`}
                  onClick={() => setActiveTab("service")}
                >
                  {t("progress.serviceDetails")}
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "review" ? "active" : ""}`}
                  onClick={() => setActiveTab("review")}
                >
                  {t("progress.reviewRating")}
                </button>
              </li>
            </ul>
          </div>

          <div className="tab-content">
            {activeTab === "service" && <BookingDetailsRenderer booking={booking} />}

            {activeTab === "review" && <ReviewTab serviceId={booking.raw.providerId} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceTrackingVendorDetails;
