import React from "react";

function CowDungVendorDetailsPending() {
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="topbar">
            <div className="TitleBox">
              <div className="TitleBox-top-bar">
                <span>
                  <a className="back-circle-navbar side-space" href="cow-Dung-change-availablity.html">
                    <i className="fa-solid fa-arrow-left" />
                  </a>
                </span>
                <h4 className="book-heading d-flex align-items-center">
                  <span className="top-icon-image hide">
                    <img src="assets/images/land-management-tractor-services.png" alt />
                  </span>
                  Vendor Details
                </h4>
              </div>
            </div>
            <div className="right-section">
              <div className="search-box">
                <input className="form-control" type="text" placeholder="Search Services..." />
                <i className="fas fa-search search-icon" />
              </div>
              <i className="far fa-bell bell-icon" />
              <div className="profile">
                <img src="assets/images/profile.png" alt="Profile" />
                <span className="username">Ramesh</span>
              </div>
            </div>
          </div>
          <div className="dashboard">
            <figure className="status-image-tag">
              <img src="assets/images/cowdungstatus.png" alt />
              <div className="status-tag-pending">Pending</div>
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
                      <img src="assets/images/user-icon.svg" alt />
                    </span>
                    Kallu pandey
                  </h6>
                  <h6>
                    <span>
                      <img src="assets/images/location-icon.png" alt />
                    </span>
                    Samaypur, Meerut
                  </h6>
                  <h6>
                    <span>
                      {" "}
                      <img src="assets/images/mobile.svg" alt />
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
                                {/* <th>Date</th>
                        <th>Time</th> */}
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
                <div className="quote-section">
                  <label htmlFor="quoteInput" className="normal-heading">
                    Quote
                  </label>
                  <div className="d-flex gap-2">
                    <input
                      type="text"
                      id="quoteInput"
                      className="form-control quote-input flex-grow-1"
                      placeholder="Quote your price"
                    />
                    <button type="button" className="btn-send-quote">
                      Send Quote
                    </button>
                  </div>
                </div>
                <div className="available-service-btn">
                  <a href="cow-dung-vendor-details-accepted.html">Accept this Offer</a>
                </div>
              </div>
              <div className="tab-pane fade" id="menu1">
                <div className="row">
                  <div className="col-6">
                    <div className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <img src="assets/images/RamPrasadSingh.svg" alt="User Photo" />
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
                          <img src="assets/images/BhagwanSinghRathore.png" alt="User Photo" />
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
                          <img src="assets/images/RameshYadav.png" alt="User Photo" />
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
                          <img src="assets/images/RamPrasadSingh.svg" alt="User Photo" />
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
                          <img src="assets/images/RamPrasadSingh.svg" alt="User Photo" />
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
                          <img src="assets/images/BhagwanSinghRathore.png" alt="User Photo" />
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
                          <img src="assets/images/RameshYadav.png" alt="User Photo" />
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
                          <img src="assets/images/RamPrasadSingh.svg" alt="User Photo" />
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
            <a href="cow-dung-awaiting-quote.html">awaiting</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default CowDungVendorDetailsPending;
