import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import sortArrowDown from "../../../assets/images/sort-arrow-down.svg";
import GoodsTransportService from "../../../assets/images/GoodsTransportService.png";
import TransportationIcon from "../../../assets/images/Transportation-icon.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import VendorCardSkeleton from "../../../components/skeletons/VendorCardSkeleton";
import { getAllServicesTransportation } from "../../../reduxtoolkit/slices/service category/transportationService";
import { validateFromDateRequired } from "../../../utils/formValidators";

function TransportationChangeAvailablity() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterValues = Object.fromEntries(queryParams.entries());
  const initialFilters = (() => {
    const result = { ...filterValues };
    if (filterValues.transportItem === "equipment") {
      result.equipmentDimensions = {
        lengthCm: filterValues.lengthCm || "",
        widthCm: filterValues.widthCm || "",
        heightCm: filterValues.heightCm || "",
      };
      delete result.lengthCm;
      delete result.widthCm;
      delete result.heightCm;
    }
    return result;
  })();

  const [filters, setFilters] = useState(initialFilters);
  const { toDate, fromDate } = filters;
  const [errors, setErrors] = useState({});
  const { services, loading } = useSelector(
    (state) => state.services.TransportationServiceMgmtSlice
  );

  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Top rating");

  const toggleSortMenu = () => {
    setIsOpen((prev) => !prev);
  };
  const selectSortOption = (option) => {
    setSelectedSort(option);
    setIsOpen(false);
  };

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

    const dateErrors = validateFromDateRequired(fromDate, toDate);
    newErrors = { ...newErrors, ...dateErrors };

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchServices = async () => {
    if (!validateForm()) return;
    try {
      await dispatch(getAllServicesTransportation(filters)).unwrap();
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
          title="Transportation"
          secImage={TransportationIcon}
          navigate="/service-category/transportation"
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
                      placeholder="From date*"
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
                    <div className="sort-toggle" onClick={toggleSortMenu}>
                      <span>
                        <span className="sort-label">{selectedSort}</span>
                        <img src={sortArrowDown} alt="Sort Icon" />
                      </span>
                    </div>
                    {isOpen && (
                      <div className="sort-menu">
                        <div className="sort-option" onClick={() => selectSortOption("Top rating")}>
                          Top rating
                        </div>
                        <div
                          className="sort-option"
                          onClick={() => selectSortOption("Out of Radius")}
                        >
                          Out of Radius
                        </div>
                      </div>
                    )}
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
                          src={service?.vehicleDetails?.vehicleImg?.[0] || GoodsTransportService}
                          alt="Service"
                          className="service-image"
                        />
                        <div className="service-text">
                          <div className="title">{service?.businessName || "No description"}</div>
                          <div className="rating">
                            <span>
                              <i className="fa-solid fa-star star-icon" />
                            </span>{" "}
                            {service?.rating ?? "N/A"}
                          </div>
                        </div>
                      </div>
                      {/* <div className="price-info">
                        <h6>₹ {Number(service?.payableAmount ?? 0).toFixed(2)}</h6>
                        <small>Additional charges might apply</small>
                      </div> */}
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

export default TransportationChangeAvailablity;
