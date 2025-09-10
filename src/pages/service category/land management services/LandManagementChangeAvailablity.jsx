import React from "react";

function LandManagementChangeAvailablity() {
  return (
    <>
      <div className="WrapperArea form-section">
        <div className="WrapperBox">
          <div className="topbar">
            <div className="TitleBox">
              <div className="TitleBox-top-bar">
                <span>
                  <a className="back-circle-navbar" href="land-management-services-sub-services.html">
                    <i className="fa-solid fa-arrow-left" />
                  </a>
                </span>
                <h4 className="book-heading d-flex align-items-center">
                  <span className="top-icon-image">
                    <img src="assets/images/land-management-tractor-services.png" alt />
                  </span>
                  Land Management Services Listing
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
            65r2edcx
          </div>
          <div className="dashboard">
            <div className="option-wrapper">
              <h3 className="main-heading">Change Availability Date</h3>
              <div className="filter-area">
                <div className="row align-items-end">
                  {/* Start Date */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Select Start Date</label>
                    <div className="input-group">
                      <input type="date" className="form-control" placeholder="From date*" required />
                    </div>
                  </div>
                  {/* End Date */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Select End Date</label>
                    <div className="input-group">
                      <input type="date" className="form-control" placeholder="From date*" required />
                    </div>
                  </div>
                  {/* Sort Dropdown */}
                  <div className="col-md-4 mb-3">
                    <div className="sort-box" id="sortBox">
                      <div className="sort-toggle" onclick="toggleSortMenu()">
                        <span>
                          <span id="sortSelectedLabel" className="sort-label">
                            Sort
                          </span>
                          <img src="assets/images/sort-arrow-down.svg" alt="Sort Icon" />
                        </span>
                      </div>
                      <div className="sort-menu">
                        <div className="sort-option" onclick="selectSortOption('Top rating')">
                          Top rating
                        </div>
                        <div className="sort-option" onclick="selectSortOption('Out of Radius')">
                          Out of Radius
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="option-wrapper">
              <h3 className="main-heading">Available Vendor</h3>
              <h6 className="form-label-max">Choose from in your radius</h6>
              {/* Card 1 (Selected) */}
              <div className="vendor-card selected">
                <div className="service-info">
                  <img
                    src="assets/images/PoweringPrecisionFarming.png"
                    alt="Service"
                    className="service-image"
                  />
                  <div className="service-text">
                    <a href="land-management-vendor-details-pending.html">Powering Precision Farming</a>
                    <div className="rating">
                      <span>
                        <i className="fa-solid fa-star star-icon" />
                      </span>{" "}
                      4.2
                    </div>
                  </div>
                </div>
                <div className="price-info">
                  <h6>₹ 699.00</h6>
                  <small>Additional charges might apply</small>
                </div>
              </div>
              {/* Card 2 */}
              <div className="vendor-card">
                <div className="service-info">
                  <img src="assets/images/LandPrepDoneRight.svg" alt="Service" className="service-image" />
                  <div className="service-text">
                    <a href="#">Land Prep Done Right</a>
                    <div className="rating">
                      <span>
                        <i className="fa-solid fa-star star-icon" />
                      </span>{" "}
                      4.2
                    </div>
                  </div>
                </div>
                <div className="price-info">
                  <h6>₹ 499.00</h6>
                  <small>Additional charges might apply</small>
                </div>
              </div>
              {/* Card 3 */}
              <div className="vendor-card">
                <div className="service-info">
                  <img
                    src="assets/images/PoweringPrecisionFarming.png"
                    alt="Service"
                    className="service-image"
                  />
                  <div className="service-text">
                    <a href="#">Maximize Your Land Potential</a>
                    <div className="rating">
                      <span>
                        <i className="fa-solid fa-star star-icon" />
                      </span>{" "}
                      4.2
                    </div>
                  </div>
                </div>
                <div className="price-info">
                  <h6>₹ 999.00</h6>
                  <small>Additional charges might apply</small>
                </div>
              </div>
              {/* Card 4 */}
              <div className="vendor-card">
                <div className="service-info">
                  <img
                    src="assets/images/PoweringPrecisionFarming.png"
                    alt="Service"
                    className="service-image"
                  />
                  <div className="service-text">
                    <a href="#">Deep Tilling. Strong Yields</a>
                    <div className="rating">
                      <span>
                        <i className="fa-solid fa-star star-icon" />
                      </span>{" "}
                      4.2
                    </div>
                  </div>
                </div>
                <div className="price-info">
                  <h6>₹ 599.00</h6>
                  <small>Additional charges might apply</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandManagementChangeAvailablity;
