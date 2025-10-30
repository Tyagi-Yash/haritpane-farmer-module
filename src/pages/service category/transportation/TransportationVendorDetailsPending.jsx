import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TopbarModal from "../../../components/common components/TopbarModal";
import mobileIcon from "../../../assets/images/mobile.svg";
import locationIcon from "../../../assets/images/location-icon.png";
import userIcon from "../../../assets/images/user-icon.svg";
import transportstatus from "../../../assets/images/transportstatus.png";
import RamPrasadSingh from "../../../assets/images/RamPrasadSingh.svg";

function TransportationVendorDetailsPending() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("service");

  const { services, filters } = useSelector(
    (state) => state.services.TransportationServiceMgmtSlice
  );

  const vendor = services.find((v) => v._id === id);
  const [selectedAvailability, setSelectedAvailability] = useState("");

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title="Vendor Details"
          navigate={`/service-category/transportation/available-services?${new URLSearchParams(
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
              <figure className="status-image-tag" style={{ minHeight: "200px" }}>
                <img
                  src={vendor?.vehicleDetails?.vehicleImg?.[0] || transportstatus}
                  alt="Service Image"
                />
                <div className="status-tag-pending">Pending</div>
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
                {activeTab === "service" && (
                  <div className="tab-pane active" id="service">
                    <div className="option-wrapper">
                      <h5 className="normal-heading">Vendor Information</h5>
                      <h6>
                        <span>
                          <img src={userIcon} alt="" />
                        </span>
                        {vendor?.provider?.name || "N/A"}
                      </h6>
                      <h6>
                        <span>
                          <img src={locationIcon} alt="" />
                        </span>
                        {vendor?.provider?.address || "N/A"}
                      </h6>
                      <h6>
                        <span>
                          <img src={mobileIcon} alt="" />
                        </span>
                        {vendor?.provider?.phone
                          ? `+91 ${vendor.provider.phone.slice(0, -6) + "X".repeat(6)}`
                          : "N/A"}
                      </h6>
                    </div>

                    <div>
                      <div className="row align-items-center">
                        <div className="col align-items-center">
                          <div className="option-wrapper booking-area">
                            <h5 className="normal-heading">Booking Details</h5>
                            <p>Service Name: {vendor?.basicInfo?.Description || "N/A"}</p>
                          </div>
                        </div>
                        <div className="col">
                          <div className="bookingPriceTableParent">
                            <div className="option-wrapper bookingPriceTable">
                              <h5 className="normal-heading">Total Booking Price</h5>
                              <table className="table table-borderless">
                                <tbody>
                                  <tr>
                                    <td>Service Cost</td>
                                    <td>₹ {Number(vendor?.ratePerHr ?? 0).toFixed(2)}</td>
                                  </tr>
                                  <tr>
                                    <td>Transportation Charges</td>
                                    <td>₹ {Number(vendor?.additionCharges ?? 0).toFixed(2)}</td>
                                  </tr>
                                </tbody>
                                <tfoot>
                                  <tr>
                                    <td>Total Payable Amount</td>
                                    <td>₹ {Number(vendor?.payableAmount ?? 0).toFixed(2)}</td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="option-wrapper">
                      <h5 className="normal-heading">Select Availability</h5>
                      <table className="table table-borderless">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr onClick={() => setSelectedAvailability(1)}>
                            <td
                              className={
                                selectedAvailability === 1
                                  ? "availability-cells date-cell "
                                  : "date-cell"
                              }
                            >
                              20/05/2025
                            </td>
                            <td
                              className={
                                selectedAvailability === 1
                                  ? "availability-cells time-cell"
                                  : "time-cell"
                              }
                              data-time="8:00:00 AM"
                            >
                              8:00:00 AM
                            </td>
                          </tr>
                          <tr onClick={() => setSelectedAvailability(2)}>
                            <td
                              className={
                                selectedAvailability === 2
                                  ? "availability-cells date-cell "
                                  : "date-cell"
                              }
                            >
                              21/05/2025
                            </td>
                            <td
                              className={
                                selectedAvailability === 2
                                  ? "availability-cells time-cell"
                                  : "time-cell"
                              }
                              data-time="4:00:00 PM"
                            >
                              4:00:00 PM
                            </td>
                          </tr>
                          <tr onClick={() => setSelectedAvailability(3)}>
                            <td
                              className={
                                selectedAvailability === 3
                                  ? "availability-cells date-cell "
                                  : "date-cell"
                              }
                            >
                              22/05/2025
                            </td>
                            <td
                              className={
                                selectedAvailability === 3
                                  ? "availability-cells time-cell"
                                  : "time-cell"
                              }
                              data-time="2:30:00 PM"
                            >
                              2:30:00 PM
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === "review" && (
                  <div className="tab-pane active" id="review">
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
                            arrived on time, and the work was done smoothly. Highly reliable
                            service!”
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
                            arrived on time, and the work was done smoothly. Highly reliable
                            service!”
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
                            arrived on time, and the work was done smoothly. Highly reliable
                            service!”
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
                            arrived on time, and the work was done smoothly. Highly reliable
                            service!”
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default TransportationVendorDetailsPending;
