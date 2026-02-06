import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import sortArrowDown from "../../../assets/images/sort-arrow-down.svg";
import AugerDrillingService from "../../../assets/images/AugerDrillingService.png";
import AugerServiceIcon from "../../../assets/images/AugerService-icon.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import { getAllServicesOfAuger } from "../../../reduxtoolkit/slices/service category/augerServices";
import VendorCardSkeleton from "../../../components/skeletons/VendorCardSkeleton";
import { Commonpagination } from "../../../components/common components/Commonpagination";

function AugerChangeAvailablity() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterValues = Object.fromEntries(queryParams.entries());
  const [filters, setFilters] = useState(filterValues);
  const { date, toDate = "" } = filters;
  const {
    services = [],
    loading,
    paginationData = {},
    sortByRating,
  } = useSelector((state) => state.services.AugerServiceMgmtSlice);
  const [currentPage, setCurrentPage] = useState(paginationData.page || 1);
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(
    sortByRating === true ? "Top Rated" : "Nearest First",
  );
  const toggleSortMenu = () => {
    setIsOpen((prev) => !prev);
  };
  const selectSortOption = (option) => {
    setSelectedSort(option);
    setIsOpen(false);
  };
  const handlePageChange = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
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
    if (toDate) {
      if (new Date(toDate) < today) {
        newErrors.toDate = "*To date cannot be in the past";
      }
      if (date && toDate && new Date(date) > new Date(toDate)) {
        newErrors.toDate = "*To date cannot be earlier than from date";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchServices = async () => {
    if (!validateForm()) return;
    const params = {
      ...filters,
      page: currentPage,
      sortByRating: selectedSort === "Top Rated" ? true : false,
    };
    try {
      await dispatch(getAllServicesOfAuger(params)).unwrap();
    } catch {
      toast("Failed to load services");
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [date, toDate, selectedSort]);

  useEffect(() => {
    fetchServices();
  }, [date, toDate, currentPage, selectedSort]);

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title="Auger Service"
          secImage={AugerServiceIcon}
          navigate="/service-category/auger-service"
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
                      placeholder="From date*"
                      name="date"
                      value={date}
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
                        <div className="sort-option" onClick={() => selectSortOption("Top Rated")}>
                          Top Rated
                        </div>
                        <div
                          className="sort-option"
                          onClick={() => selectSortOption("Nearest First")}
                        >
                          Nearest First
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
                          src={service?.augerImg || AugerDrillingService}
                          alt="Service"
                          className="service-image"
                        />
                        <div className="service-text">
                          <div className="title">{service?.businessName || "No description"}</div>
                          <div className="rating">
                            <span>
                              <i className="fa-solid fa-star star-icon" />
                            </span>{" "}
                            {service?.provider?.averageRating ?? "N/A"}
                          </div>
                        </div>
                      </div>

                      {service.payableAmount ? (
                        <div className="price-info">
                          <h6>₹ {Number(service?.payableAmount ?? 0).toFixed(2)}</h6>
                          <small>Additional charges might apply</small>
                        </div>
                      ) : service.ratePerHr ? (
                        <div className="price-info">
                          <h6>₹ {Number(service?.ratePerHr ?? 0).toFixed(2)}/hour</h6>
                          <small>Additional charges might apply</small>
                        </div>
                      ) : service?.drillInfo?.[0]?.ratePerInch ? (
                        <div className="price-info">
                          <h6>
                            ₹ {Number(service?.drillInfo?.[0]?.ratePerInch ?? 0).toFixed(2)}/Running
                            ft
                          </h6>
                          <small>Additional charges might apply</small>
                        </div>
                      ) : null}
                    </div>
                  </Link>
                ))}
              </>
            )}
          </div>
          {!loading && services.length > 0 && (
            <div className="d-flex justify-content-center mt-4">
              <Commonpagination
                ActivePage={paginationData?.page || 1}
                ItemsCountPerPage={10}
                TotalItemsCount={paginationData?.total || 0}
                pageRangeDisplayed={3}
                Onchange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AugerChangeAvailablity;
