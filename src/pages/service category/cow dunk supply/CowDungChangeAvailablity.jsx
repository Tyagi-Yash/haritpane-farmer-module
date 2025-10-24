import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import sortArrowDown from "../../../assets/images/sort-arrow-down.svg";
import DungforFarming from "../../../assets/images/DungforFarming.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import CowDunkSupplyIcon from "../../../assets/images/CowDunkSupply-icon.png";
import VendorCardSkeleton from "../../../components/skeletons/VendorCardSkeleton";
import { getAllServiceCowDunk } from "../../../reduxtoolkit/slices/service category/cowDunkServices";

function CowDungChangeAvailablity() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterValues = Object.fromEntries(queryParams.entries());
  const [filters, setFilters] = useState(filterValues);
  const { date } = filters;
  const { services, loading } = useSelector((state) => state.services.CowDunkServiceMgmtSlice);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!date) {
      newErrors.date = "*From date is required";
    } else if (new Date(date) < today) {
      newErrors.date = "*From date cannot be in the past";
    }

    // if (!toDate) {
    //   newErrors.toDate = "*To date is required";
    // } else if (new Date(toDate) < today) {
    //   newErrors.toDate = "*To date cannot be in the past";
    // }
    // if (date && toDate && new Date(date) > new Date(toDate)) {
    //   newErrors.toDate = "*To date cannot be earlier than from date";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchServices = async () => {
    if (!validateForm()) return;
    try {
      await dispatch(getAllServiceCowDunk(filters)).unwrap();
    } catch {
      toast("Failed to load services");
    }
  };

  useEffect(() => {
    fetchServices();
  }, [date]);
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title="Cow Dunk Supply"
          secImage={CowDunkSupplyIcon}
          navigate="/cow-dunk-supply"
        />
        <div className="dashboard">
          <div className="option-wrapper">
            <h3 className="main-heading">Change Availability Date</h3>
            <div className="filter-area">
              <div className="row align-items-end">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Select Start Date</label>
                  {errors.date && <p className="error-text">{errors.date}</p>}
                  <div className="input-group">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Till date*"
                      name="date"
                      value={date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  {/* <label className="form-label">Select End Date</label>
                  {errors.toDate && <p className="error-text">{errors.toDate}</p>}
                  <div className="input-group">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Till date*"
                      name="toDate"
                      value={toDate}
                      onChange={handleInputChange}
                    />
                  </div> */}
                </div>
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
          <div className="option-wrapper">
            {loading ? (
              <VendorCardSkeleton count={5} />
            ) : services.length === 0 ? (
              <p style={{ color: "gray", marginTop: "10px" }}>
                No services found for the selected filters.
              </p>
            ) : (
              <>
                <h3 className="main-heading">Available Vendor</h3>
                <h6 className="form-label-max">Choose from in your radius</h6>
                {services.map((service) => (
                  <Link
                    className="vendor-card-link"
                    to={`vendor-details/${service._id}`}
                    key={service._id}
                  >
                    <div className="vendor-card">
                      <div className="service-info">
                        <img
                          src={service?.Image || DungforFarming}
                          alt="Service"
                          className="service-image"
                        />
                        <div className="service-text">
                          <div className="title">
                            {service?.equipmentDescription || "No description"}
                          </div>
                          <div className="rating">
                            <span>
                              <i className="fa-solid fa-star star-icon" />
                            </span>{" "}
                            {service?.rating ?? "N/A"}
                          </div>
                        </div>
                      </div>
                      <div className="price-info">
                        <h6>₹ {Number(service?.payableAmount ?? 0).toFixed(2)}</h6>
                        <small>Additional charges might apply</small>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CowDungChangeAvailablity;
