import { Link } from "react-router-dom";
import sortArrowDown from "../../assets/images/sort-arrow-down.svg";
import dryCattleManagement from "../../assets/images/DryCattleManagement.png";
import TopbarModal from "../../components/common components/TopbarModal";

function ServiceTracking() {
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal titleBox={true} title="Service Tracking" navigate="/dashboard" />
          <div className="dashboard service-tracking">
            <div className="option-wrapper">
              <h3 className="main-heading">Change Availability Date</h3>
              <div className="filter-area">
                <div className="row align-items-end">
                  {/* Start Date */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Select Start Date</label>
                    <div className="input-group">
                      <input
                        type="date"
                        className="form-control"
                        placeholder="From date*"
                        required
                      />
                    </div>
                  </div>
                  {/* End Date */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Select End Date</label>
                    <div className="input-group">
                      <input
                        type="date"
                        className="form-control"
                        placeholder="From date*"
                        required
                      />
                    </div>
                  </div>
                  {/* Sort Dropdown */}
                  <div className="col-md-4 mb-3">
                    <div className="sort-box" id="sortBox">
                      <div className="sort-toggle">
                        <span>
                          <span id="sortSelectedLabel" className="sort-label">
                            Sort
                          </span>
                          <img src={sortArrowDown} alt="Sort Icon" />
                        </span>
                      </div>
                      <div className="sort-menu">
                        <div className="sort-option">Top rating</div>
                        <div className="sort-option">Out of Radius</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="CommonTabs mt-0">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className="nav-link active" data-bs-toggle="tab" data-bs-target="#Complete">
                    Complete
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="tab" data-bs-target="#Pending">
                    Pending
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="tab" data-bs-target="#In-Progress">
                    In-Progress
                  </a>
                </li>
              </ul>
            </div>
            <div className="tab-content">
              <div className="tab-pane active" id="Complete">
                <div className="option-wrapper">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3 className="main-heading">Available Vendor</h3>
                      <h6 className="form-label-max">Choose from in your radius</h6>
                    </div>
                    <div className="status-badge-completed">
                      <span className="dot" />
                      Completed
                    </div>
                  </div>
                  {/* Card 1 (Selected) */}
                  <Link className="vendor-card-link" to="vendor-details">
                    <div className="vendor-card">
                      <div className="service-info">
                        <img src={dryCattleManagement} alt="Service" className="service-image" />
                        <div className="service-text">
                          <div className="title">Dry Cattle Management</div>
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
                  </Link>
                  {/* Card 2 */}
                  <Link className="vendor-card-link" to="vendor-details">
                    <div className="vendor-card">
                      <div className="service-info">
                        <img src={dryCattleManagement} alt="Service" className="service-image" />
                        <div className="service-text">
                          <div className="title">Dry Cattle Management</div>
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
                  </Link>
                  {/* Card 3 */}
                  <Link className="vendor-card-link" to="vendor-details">
                    <div className="vendor-card">
                      <div className="service-info">
                        <img src={dryCattleManagement} alt="Service" className="service-image" />
                        <div className="service-text">
                          <div className="title">Dry Cattle Management</div>
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
                  </Link>
                  {/* Card 4 */}
                  <Link className="vendor-card-link" to="vendor-details">
                    <div className="vendor-card">
                      <div className="service-info">
                        <img src={dryCattleManagement} alt="Service" className="service-image" />
                        <div className="service-text">
                          <div className="title">Dry Cattle Management</div>
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
                  </Link>
                </div>
              </div>
              <div className="tab-pane fade" id="Pending">
                <div className="option-wrapper">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3 className="main-heading">Available Vendor</h3>
                      <h6 className="form-label-max">Choose from in your radius</h6>
                    </div>
                    <div className="status-badge-pending">
                      <span className="dot" />
                      Pending
                    </div>
                  </div>
                  {/* Card 1 (Selected) */}
                  <Link className="vendor-card-link" to="vendor-details">
                    <div className="vendor-card">
                      <div className="service-info">
                        <img src={dryCattleManagement} alt="Service" className="service-image" />
                        <div className="service-text">
                          <div className="title">Dry Cattle Management</div>
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
                  </Link>
                  {/* Card 2 */}
                  <Link className="vendor-card-link" to="vendor-details">
                    <div className="vendor-card">
                      <div className="service-info">
                        <img src={dryCattleManagement} alt="Service" className="service-image" />
                        <div className="service-text">
                          <div className="title">Dry Cattle Management</div>
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
                  </Link>
                  {/* Card 3 */}
                  <Link className="vendor-card-link" to="vendor-details">
                    <div className="vendor-card">
                      <div className="service-info">
                        <img src={dryCattleManagement} alt="Service" className="service-image" />
                        <div className="service-text">
                          <div className="title">Dry Cattle Management</div>
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
                  </Link>
                  {/* Card 4 */}
                  <Link className="vendor-card-link" to="vendor-details">
                    <div className="vendor-card">
                      <div className="service-info">
                        <img src={dryCattleManagement} alt="Service" className="service-image" />
                        <div className="service-text">
                          <div className="title">Dry Cattle Management</div>
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
                  </Link>
                </div>
              </div>
              {/* enquiry */}
              <div className="tab-pane fade" id="In-Progress">
                <div className="option-wrapper">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3 className="main-heading">Available Vendor</h3>
                      <h6 className="form-label-max">Choose from in your radius</h6>
                    </div>
                    <div className="status-badge-progress">
                      <span className="dot" />
                      In-Progress
                    </div>
                  </div>
                  {/* Card 1 (Selected) */}
                  <Link className="vendor-card-link" to="vendor-details">
                    <div className="vendor-card">
                      <div className="service-info">
                        <img src={dryCattleManagement} alt="Service" className="service-image" />
                        <div className="service-text">
                          <div className="title">Dry Cattle Management</div>
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
                  </Link>
                  {/* Card 2 */}
                  <Link className="vendor-card-link" to="vendor-details">
                    <div className="vendor-card">
                      <div className="service-info">
                        <img src={dryCattleManagement} alt="Service" className="service-image" />
                        <div className="service-text">
                          <div className="title">Dry Cattle Management</div>
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
                  </Link>
                  {/* Card 3 */}
                  <Link className="vendor-card-link" to="vendor-details">
                    <div className="vendor-card">
                      <div className="service-info">
                        <img src={dryCattleManagement} alt="Service" className="service-image" />
                        <div className="service-text">
                          <div className="title">Dry Cattle Management</div>
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
                  </Link>
                  {/* Card 4 */}
                  <Link className="vendor-card-link" to="vendor-details">
                    <div className="vendor-card">
                      <div className="service-info">
                        <img src={dryCattleManagement} alt="Service" className="service-image" />
                        <div className="service-text">
                          <div className="title">Dry Cattle Management</div>
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
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceTracking;
