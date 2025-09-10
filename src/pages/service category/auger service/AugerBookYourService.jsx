import React from "react";

function AugerBookYourService() {
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
                    <img src="assets/images/AugerService-icon.png" alt />
                  </span>
                  Auger Service
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
                  <div className="col-md-12">
                    <input type="text" className="form-control" placeholder="Job location*" required />
                  </div>
                </div>
                <h5 className="book-heading">Estimate Job Duration</h5>
                <div className="row g-3">
                  {/* Farm Location (Text) */}
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Estimate duration(In hours)*"
                      required
                    />
                  </div>
                </div>
                <h5 className="book-heading">Book Services date &amp; time</h5>
                <div className="row g-3">
                  {/* From Date */}
                  <div className="col-md-6">
                    <input type="date" className="form-control" required />
                  </div>
                  {/* From Time */}
                  <div className="col-md-6">
                    <input type="time" className="form-control" required />
                  </div>
                </div>
              </div>
            </div>
            <div className="available-service-btn">
              <a href="auger-change-availablity.html">See Available Service</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AugerBookYourService;
