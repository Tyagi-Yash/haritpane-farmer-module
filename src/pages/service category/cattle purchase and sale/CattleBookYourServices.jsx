import React from "react";

function CattleBookYourServices() {
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
                    <img src="assets/images/cattle-icon.png" alt />
                  </span>
                  Cattle Purchase &amp; Sale
                </h4>
              </div>
            </div>
            <div className="right-section">
              <div className="search-box">
                <input type="text" placeholder="Search Services..." />
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
            <div className="cattle-purchase">
              <form id="bookingForm">
                <div className="option-wrapper">
                  <div className="form-section mb-4">
                    <h4 className="book-heading">Book your service</h4>
                    <div className="row g-3">
                      {/* Farm Location */}
                      <div className="col-md-4">
                        <div className="location-wrapper">
                          <input type="text" className="form-control" placeholder="Farm location*" required />
                          <img src="assets/images/location-black.svg" alt className="location-icon" />
                        </div>
                      </div>
                      {/* Cattle Dropdown */}
                      <div className="col-md-4">
                        <div className="dropdown">
                          <button
                            className="btn w-100 dropdown-toggle"
                            type="button"
                            id="cattleDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <span id="selectedCattle">Select Cattle</span>
                          </button>
                          <ul className="dropdown-menu" id="cattleList" />
                        </div>
                      </div>
                      {/* Breed Dropdown */}
                      <div className="col-md-4">
                        <div className="dropdown">
                          <button
                            className="btn w-100 dropdown-toggle"
                            type="button"
                            id="breedDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <span id="selectedBreed">Select Breed</span>
                          </button>
                          <ul className="dropdown-menu" id="breedList" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Submit Button */}
                <div className="text-center">
                  <div className="available-service-btn">
                    <a href="cattle-change-availablity.html">See Available Service</a>
                  </div>
                </div>
              </form>
            </div>
            {/* Script Logic */}
          </div>
        </div>
      </div>
    </>
  );
}

export default CattleBookYourServices;
