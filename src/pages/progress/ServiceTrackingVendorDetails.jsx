import profile from "../../assets/images/profile.png";
import TopbarModal from "../../components/common components/TopbarModal";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import BookingDetailsRenderer from "../../components/progress/service tracking details/BookingDetailsRenderer";
import serviceImg from "../../assets/images/service.png";
import ReviewTab from "../../components/common components/ReviewTab";

function ServiceTrackingVendorDetails() {
  const { bookingId } = useParams();
  const { services } = useSelector((state) => state.services.bookingListSlice);
  const booking = services.find((b) => b.id === bookingId);

  const [activeTab, setActiveTab] = useState("service");

  if (!booking) {
    return <p className="text-center">Loading vendor details...</p>;
  }

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title="Vendor Details"
          navigate="/service-tracking"
          profile={profile}
        />
        <div className="dashboard progress-vendor-details">
          <figure className="status-image-tag" style={{ minHeight: "200px" }}>
            <img src={booking.image || serviceImg} alt="Service Image" />
          </figure>

          <div className="CommonTabs mt-0">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "service" ? "active" : ""}`}
                  onClick={() => setActiveTab("service")}
                >
                  Service Details
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "review" ? "active" : ""}`}
                  onClick={() => setActiveTab("review")}
                >
                  Review &amp; Rating
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
