import React from "react";

function LaborBookYourService() {
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="topbar">
            <div className="TitleBox">
              <div className="TitleBox-top-bar">
                <span>
                  <a className="back-circle-navbar" href="service-category.html">
                    <i className="fa-solid fa-arrow-left" />
                  </a>
                </span>
                <h4 className="book-heading d-flex align-items-center">
                  <span className="top-icon-image">
                    <img src="assets/images/labour-icon.png" alt />
                  </span>
                  Labor Requirement
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
            <div className="option-wrapper">
              <div className="form-section">
                <h5 className="book-heading">Book your service</h5>
                <div className="row g-3">
                  {/* Farm Location (Text) */}
                  <div className="col-md-4">
                    <div className="location-wrapper">
                      <input type="text" className="form-control" placeholder="Farm location*" required />
                      <img src="assets/images/location-black.svg" alt className="location-icon" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <select name id className="form-control">
                      <option value className="form-control">
                        Labour for?
                      </option>
                      <option value className="form-control">
                        Land Clearing- Weed removal
                      </option>
                      <option value className="form-control">
                        Plantation- Seeding
                      </option>
                      <option value className="form-control">
                        Pesticide Application- Knapsack Pump Operator
                      </option>
                      <option value className="form-control">
                        Tractor Driver
                      </option>
                      <option value className="form-control">
                        Harvesting Work
                      </option>
                      <option value className="form-control">
                        Packaging Work
                      </option>
                      <option value className="form-control">
                        Unskilled Labor
                      </option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <input type="text" placeholder="Area under Cultivation*" className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Crop Under Cultivation*"
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Area Under Cultivation(per acre)*"
                      disabled
                    />
                  </div>
                </div>
                <h5 className="book-heading">Book Services date &amp; time</h5>
                <div className="row g-3">
                  {/* From Date */}
                  <div className="col-md-6">
                    <input type="date" className="form-control" required />
                  </div>
                  {/* Till Date */}
                  <div className="col-md-6">
                    <input type="date" className="form-control" required />
                  </div>
                  {/* From Time */}
                  <div className="col-md-6">
                    <input type="time" className="form-control" required />
                  </div>
                  {/* From Time */}
                  <div className="col-md-6">
                    <input type="time" className="form-control" required />
                  </div>
                </div>
              </div>
              <div className="hide form-section">
                <h5 className="mt-5 mb-4 book-heading">Tentative Duration</h5>
                <div className="row">
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter tentative hours(In hours)*"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="available-service-btn">
              <a href="labour-change-availablity.html">See Available Service</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LaborBookYourService;
