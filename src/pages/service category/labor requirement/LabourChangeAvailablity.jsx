import React from "react";

function LabourChangeAvailablity() {
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
              <h3 className="main-heading">Available Date</h3>
              <h6 className="form-label-max">Choose from in your radius</h6>
              {/* Card 1 (Selected) */}
              <div className="vendor-card selected">
                <div className="service-info">
                  <img src="assets/images/FarmLaborService.png" alt="Service" className="service-image" />
                  <div className="service-text">
                    <a href="labour-vendor-details-pending.html">Farm Labor Service</a>
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
                  <img src="assets/images/FarmLaborService.png" alt="Service" className="service-image" />
                  <div className="service-text">
                    <h6>Land Prep Done Right</h6>
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
                  <img src="assets/images/FarmLaborService.png" alt="Service" className="service-image" />
                  <div className="service-text">
                    <h6>Maximize Your Land Potential</h6>
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
                  <img src="assets/images/FarmLaborService.png" alt="Service" className="service-image" />
                  <div className="service-text">
                    <h6>Deep Tilling. Strong Yields</h6>
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

export default LabourChangeAvailablity;
