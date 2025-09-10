import React from "react";

function HarvestorSubServices() {
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
                    <img src="assets/images/harvestor-icon.png" alt />
                  </span>
                  Harvester
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
            <form action>
              <div className="option-wrapper">
                <h3 className="main-heading">Sub Services</h3>
                <div className="sub-service-wrapper">
                  <div className="row">
                    {/* Option 1 */}
                    <div className="col">
                      <label id="tractorOption" className="tile">
                        <input
                          type="radio"
                          name="subService"
                          defaultValue="tractor"
                          className="radio-input"
                          defaultChecked
                        />
                        <div className="radio-card">
                          <img src="assets/images/StandardHarvesterCombined.png" alt="Tractor & Attachment" />
                          <span className="radio-label">Standard Harvester Combined</span>
                        </div>
                      </label>
                    </div>
                    <div className="col">
                      <label id="attachmentOption" className="tile">
                        <input
                          type="radio"
                          name="subService"
                          defaultValue="attachment"
                          className="radio-input"
                        />
                        <div className="radio-card">
                          <img src="assets/images/TractorHarvester.png" alt="Only Attachment" />
                          <span className="radio-label">Tractor Harvester</span>
                        </div>
                      </label>
                    </div>
                    {/* Option 2 */}
                  </div>
                </div>
              </div>
              <div className="option-wrapper">
                <div className="form-section" id="attachmentForm" style={{ display: "none" }}>
                  <h5 className="mb-4 book-heading">Book your service</h5>
                  <div className="row g-3">
                    {/* Farm Location (Text) */}
                    <div className="col-md-4">
                      <div className="location-wrapper">
                        <input type="text" className="form-control" placeholder="Farm location*" required />
                        <img src="assets/images/location-black.svg" alt className="location-icon" />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        placeholder="Name of Crop under Cultivation*"
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-4">
                      <input type="text" placeholder="Area under Cultivation*" className="form-control" />
                    </div>
                  </div>
                  <h5 className="mt-5 mb-4 book-heading">Book Services date &amp; time</h5>
                  <div className="row g-3">
                    {/* From Date */}
                    <div className="col-md-4">
                      <input type="date" className="form-control" required />
                    </div>
                    {/* Till Date */}
                    <div className="col-md-4">
                      <input type="date" className="form-control" required />
                    </div>
                    {/* From Time */}
                    <div className="col-md-4">
                      <input type="time" className="form-control" required />
                    </div>
                  </div>
                </div>
                <div className="form-section" id="tractorForm" style={{ display: "block" }}>
                  <h5 className="mb-4 book-heading">Book your service</h5>
                  <div className="row g-3">
                    {/* Farm Location */}
                    <div className="col-md-4">
                      <div className="location-wrapper">
                        <input type="text" className="form-control" placeholder="Farm location*" required />
                        <img src="assets/images/location-black.svg" alt className="location-icon" />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        placeholder="Name of Crop under Cultivation*"
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-4">
                      <input type="text" placeholder="Area under Cultivation*" className="form-control" />
                    </div>
                  </div>
                  <h5 className="mt-5 mb-4 book-heading">Book Services date &amp; time</h5>
                  <div className="row g-3">
                    {/* From Date */}
                    <div className="col-md-4">
                      <input type="date" className="form-control" placeholder="From date*" required />
                    </div>
                    {/* Till Date */}
                    <div className="col-md-4">
                      <input type="date" className="form-control" placeholder="Till date*" required />
                    </div>
                    {/* From Time */}
                    <div className="col-md-4">
                      <input type="time" className="form-control" placeholder="From time*" required />
                    </div>
                  </div>
                </div>
              </div>
              <div className="available-service-btn">
                <a href="harvestor-change-availablity.html">See Available Service</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default HarvestorSubServices;
