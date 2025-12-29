import profile from "../../assets/images/profile.png";
import RamPrasadSingh from "../../assets/images/RamPrasadSingh.svg";
import TopbarModal from "../../components/common components/TopbarModal";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import BookingDetailsRenderer from "../../components/progress/BookingDetailsRenderer";

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
            <img src={booking.image} alt="Service Image" />
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

            {activeTab === "review" && (
              <div className="tab-pane active">
                <div className="row">
                  <div className="col-6">
                    <div className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <img src={RamPrasadSingh} alt="User Photo" />
                          <strong>Ram Prasad Singh</strong>
                        </div>
                        <div className="review-date">20/05/2025</div>
                      </div>
                      <div className="stars">★ ★ ★ ★ ★</div>
                      <div className="review-text">
                        “Booked a tractor through HaritPane for ploughing my field. The driver
                        arrived on time, and the work was done smoothly. Highly reliable service!”
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <img src={RamPrasadSingh} alt="User Photo" />
                          <strong>Bhagwan Singh Rathore</strong>
                        </div>
                        <div className="review-date">20/05/2025</div>
                      </div>
                      <div className="stars">★ ★ ★ ★ ★</div>
                      <div className="review-text">
                        “Booked a tractor through HaritPane for ploughing my field. The driver
                        arrived on time, and the work was done smoothly. Highly reliable service!”
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <img src={RamPrasadSingh} alt="User Photo" />
                          <strong>Ram Prasad Singh</strong>
                        </div>
                        <div className="review-date">20/05/2025</div>
                      </div>
                      <div className="stars">★ ★ ★ ★ ★</div>
                      <div className="review-text">
                        “Booked a tractor through HaritPane for ploughing my field. The driver
                        arrived on time, and the work was done smoothly. Highly reliable service!”
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <img src={RamPrasadSingh} alt="User Photo" />
                          <strong>Bhagwan Singh Rathore</strong>
                        </div>
                        <div className="review-date">20/05/2025</div>
                      </div>
                      <div className="stars">★ ★ ★ ★ ★</div>
                      <div className="review-text">
                        “Booked a tractor through HaritPane for ploughing my field. The driver
                        arrived on time, and the work was done smoothly. Highly reliable service!”
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceTrackingVendorDetails;
