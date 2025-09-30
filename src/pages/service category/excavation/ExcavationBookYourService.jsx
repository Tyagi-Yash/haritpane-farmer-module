import React from "react";
import TopbarModal from "../../../components/common components/TopbarModal";

function ExcavationBookYourService() {
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
         <TopbarModal
          titleBox={true}
          title="Harvester"
          secImage={harvestorIcon}
          navigate="/service-category"
        />
        {/* <div className="topbar">
          <div className="TitleBox">
            <div className="TitleBox-top-bar">
              <span>
                <a className="back-circle-navbar" href="service-category.html">
                  <i className="fa-solid fa-arrow-left" />
                </a>
              </span>
              <h4 className="book-heading d-flex align-items-center">
                <span className="top-icon-image">
                  <img src="assets/images/Excavation-icon.png" alt />
                </span>
                Excavation
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
        </div> */}
        <div className="dashboard">
          <div className="option-wrapper">
            <div className="form-section" id="tractorForm" style={{ display: "block" }}>
              <h5 className="book-heading">Book your service</h5>
              <div className="row g-3">
                {/* Farm Location */}
                <div className="col-md-6">
                  <div className="location-wrapper">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Farm location*"
                      required
                    />
                    <img src="assets/images/location-black.svg" alt className="location-icon" />
                  </div>
                </div>
                <div className="col-md-6">
                  <select name id className="form-control">
                    <option value disabled selected>
                      Select Specific Service*
                    </option>
                    <option value className="form-control">
                      JCB Back Hoe Loader
                    </option>
                    <option value className="form-control">
                      Excavator
                    </option>
                    <option value className="form-control">
                      Wheel Loader
                    </option>
                    <option value className="form-control">
                      Dozer
                    </option>
                    <option value className="form-control">
                      Dump Truck
                    </option>
                    <option value className="form-control">
                      Caterpillar Excavator
                    </option>
                    <option value className="form-control">
                      Mini Excavator
                    </option>
                    <option value className="form-control">
                      Long Reach Excavator
                    </option>
                  </select>
                </div>
              </div>
              <h5 className="book-heading">Book Services date &amp; time</h5>
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
              <h5 className="book-heading">Tentative Duration</h5>
              <div className="row">
                <div className="col-md-12">
                  <input
                    type="time"
                    className="form-control"
                    placeholder="Enter tentative hours(In hours)*"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="available-service-btn">
            <a href="excavation-change-availablity.html">See Available Service</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExcavationBookYourService;
