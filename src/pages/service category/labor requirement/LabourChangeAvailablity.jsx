import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import sortArrowDown from "../../../assets/images/sort-arrow-down.svg";
import FarmLaborService from "../../../assets/images/FarmLaborService.png";
import labouricon from "../../../assets/images/labour-icon.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import { getAllServicesOfLabour } from "../../../reduxtoolkit/slices/service category/labourServices";
import VendorCardSkeleton from "../../../components/skeletons/VendorCardSkeleton";

function LabourChangeAvailablity() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterValues = Object.fromEntries(queryParams.entries());
  const [filters, setFilters] = useState(filterValues);
  const { toDate, fromDate } = filters;
  const [errors, setErrors] = useState({});
  const { services, loading } = useSelector((state) => state.services.LabourServiceMgmtSlice);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const fetchServices = async () => {
    try {
      await dispatch(getAllServicesOfLabour(filters)).unwrap();
    } catch {
      toast("Failed to load services");
    }
  };

  useEffect(() => {
    fetchServices();
  }, [toDate, fromDate]);

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title="Labor Requirement"
          secImage={labouricon}
          navigate="/service-category/labor-requirement"
        />
        <div className="dashboard">
          <div className="option-wrapper">
            <h3 className="main-heading">Change Availability Date</h3>
            <div className="filter-area">
              <div className="row align-items-end">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Select Start Date</label>
                  {errors.fromDate && <p className="error-text">{errors.fromDate}</p>}
                  <div className="input-group">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Till date*"
                      name="fromDate"
                      value={fromDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Select End Date</label>
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
                  </div>
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
                          src={service?.attachmentImage || FarmLaborService}
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

export default LabourChangeAvailablity;
