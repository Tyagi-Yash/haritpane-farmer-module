import React from "react";
import { Link } from "react-router-dom";
import landManagementTractorServices from "../../assets/images/land-management-tractor-services.png";
import profile from "../../assets/images/profile.png";
import userIcon from "../../assets/images/user-icon.svg";
import locationIcon from "../../assets/images/location-icon.png";
import mobile from "../../assets/images/mobile.svg";
import RamPrasadSingh from "../../assets/images/RamPrasadSingh.svg";
import BhagwanSinghRathore from "../../assets/images/BhagwanSinghRathore.png";
import RameshYadav from "../../assets/images/RameshYadav.png";
import servicestatus from "../../assets/images/servicestatus.png";
import TopbarModal from "../../components/common components/TopbarModal";

function ServiceTrackingVendorDetails() {
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal
            titleBox={true}
            title="Vendor Details"
            secImage={landManagementTractorServices}
            navigate="/service-tracking"
            profile={profile}
          />
          <div className="dashboard progress-vendor-details">
            <figure className="status-image-tag">
              <img src={servicestatus} alt="" />
              <div className="status-tag-accepted">Accepted</div>
            </figure>
            {/* Nav pills */}
            <div className="CommonTabs mt-0">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className="nav-link active" data-bs-toggle="pill" href="#home">
                    Service Details
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="pill" href="#menu1">
                    Review &amp; Rating
                  </a>
                </li>
              </ul>
            </div>
            {/* Tab panes */}
            <div className="tab-content">
              <div className="tab-pane active" id="home">
                <div className="option-wrapper">
                  <h5 className="normal-heading">Vendor Information</h5>
                  <h6>
                    <span>
                      <img src={userIcon} alt="" />
                    </span>
                    Kallu pandey
                  </h6>
                  <h6>
                    <span>
                      <img src={locationIcon} alt="" />
                    </span>
                    Samaypur, Meerut
                  </h6>
                  <h6>
                    <span>
                      {" "}
                      <img src={mobile} alt="" />
                    </span>
                    +919874XXXXXX
                  </h6>
                </div>
                <div>
                  <div className="row align-items-center">
                    <div className="col align-items-center">
                      <div className="option-wrapper booking-area">
                        <h5 className="normal-heading">Booking Details</h5>
                        <p>Service Name: Power Precision Farming</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="bookingPriceTableParent">
                        <div className="option-wrapper bookingPriceTable">
                          <h5 className="normal-heading">Total Booking Price</h5>
                          <table className="table table-borderless">
                            <thead>
                              <tr>
                                <th />
                                <th />
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Service Cost</td>
                                <td>₹ 400.00</td>
                              </tr>
                              <tr>
                                <td>Transportation Charges</td>
                                <td>₹ 70.00</td>
                              </tr>
                            </tbody>
                            <tfoot>
                              <tr>
                                <td>Total Payable Amount</td>
                                <td>₹ 350.00</td>
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
                      <tr>
                        <td className="date-cell">20/05/2025</td>
                        <td className="time-cell" data-time="8:00:00 AM">
                          8:00:00 AM
                        </td>
                      </tr>
                      <tr>
                        <td className="date-cell">21/05/2025</td>
                        <td className="time-cell" data-time="4:00:00 PM">
                          4:00:00 PM
                        </td>
                      </tr>
                      <tr>
                        <td className="date-cell">22/05/2025</td>
                        <td className="time-cell" data-time="2:30:00 PM">
                          2:30:00 PM
                        </td>
                      </tr>
                      <tr>
                        <td className="date-cell">24/05/2025</td>
                        <td className="time-cell" data-time="1:50:00 PM">
                          1:50:00 PM
                        </td>
                      </tr>
                      <tr>
                        <td className="date-cell">25/05/2025</td>
                        <td className="time-cell" data-time="1:50:00 PM">
                          1:50:00 PM
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="d-flex justify-content-end align-items-center mt-5">
                  <button type="button" className="btn-delete">
                    Cancel Request
                  </button>
                  <a href="#" type="submit" className="btn-edit">
                    Raise Enquiry
                  </a>
                </div>
              </div>
              <div className="tab-pane fade" id="menu1">
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
                        “Booked a tractor through HaritPane for ploughing my field. The driver arrived on
                        time, and the work was done smoothly. Highly reliable service!”
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <img src={BhagwanSinghRathore} alt="User Photo" />
                          <strong>Bhagwan Singh Rathore</strong>
                        </div>
                        <div className="review-date">20/05/2025</div>
                      </div>
                      <div className="stars">★ ★ ★ ★ ★</div>
                      <div className="review-text">
                        “Booked a tractor through HaritPane for ploughing my field. The driver arrived on
                        time, and the work was done smoothly. Highly reliable service!”
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <img src={RameshYadav} alt="User Photo" />
                          <strong>Ramesh Yadav</strong>
                        </div>
                        <div className="review-date">20/05/2025</div>
                      </div>
                      <div className="stars">★ ★ ★ ★ ★</div>
                      <div className="review-text">
                        “Booked a tractor through HaritPane for ploughing my field. The driver arrived on
                        time, and the work was done smoothly. Highly reliable service!”
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
                        “Booked a tractor through HaritPane for ploughing my field. The driver arrived on
                        time, and the work was done smoothly. Highly reliable service!”
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
                        “Booked a tractor through HaritPane for ploughing my field. The driver arrived on
                        time, and the work was done smoothly. Highly reliable service!”
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <img src={BhagwanSinghRathore} alt="User Photo" />
                          <strong>Bhagwan Singh Rathore</strong>
                        </div>
                        <div className="review-date">20/05/2025</div>
                      </div>
                      <div className="stars">★ ★ ★ ★ ★</div>
                      <div className="review-text">
                        “Booked a tractor through HaritPane for ploughing my field. The driver arrived on
                        time, and the work was done smoothly. Highly reliable service!”
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <img src={RameshYadav} alt="User Photo" />
                          <strong>Ramesh Yadav</strong>
                        </div>
                        <div className="review-date">20/05/2025</div>
                      </div>
                      <div className="stars">★ ★ ★ ★ ★</div>
                      <div className="review-text">
                        “Booked a tractor through HaritPane for ploughing my field. The driver arrived on
                        time, and the work was done smoothly. Highly reliable service!”
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
                        “Booked a tractor through HaritPane for ploughing my field. The driver arrived on
                        time, and the work was done smoothly. Highly reliable service!”
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceTrackingVendorDetails;
