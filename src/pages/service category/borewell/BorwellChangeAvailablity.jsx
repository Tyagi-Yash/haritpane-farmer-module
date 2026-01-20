import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import sortArrowDown from "../../../assets/images/sort-arrow-down.svg";
import BorewellDrillingService from "../../../assets/images/BorewellDrillingService.png";
import BorewellIcon from "../../../assets/images/Borewell-icon.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import { getAllServicesOfBorewell } from "../../../reduxtoolkit/slices/service category/borewellServices";
import VendorCardSkeleton from "../../../components/skeletons/VendorCardSkeleton";
import { validateFromDateRequired } from "../../../utils/formValidators";
import { Commonpagination } from "../../../components/common components/Commonpagination";

function BorwellChangeAvailablity() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterValues = Object.fromEntries(queryParams.entries());
  const [filters, setFilters] = useState(filterValues);
  const { toDate, fromDate } = filters;
  const { services, loading, paginationData } = useSelector(
    (state) => state.services.BorewellServiceMgmtSlice,
  );
  const [currentPage, setCurrentPage] = useState(paginationData.page || 1);
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Top rating");
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
    const dateErrors = validateFromDateRequired(fromDate, toDate);
    newErrors = { ...newErrors, ...dateErrors };
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const fetchServices = async () => {
    if (!validateForm()) return;
    const params = { ...filters, page: currentPage };
    try {
      await dispatch(getAllServicesOfBorewell(params)).unwrap();
    } catch {
      toast("Failed to load services");
    }
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [toDate, fromDate]);
  useEffect(() => {
    fetchServices();
  }, [toDate, fromDate, currentPage]);

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title="Borewell"
          secImage={BorewellIcon}
          navigate="/service-category/borewell"
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
                          src={service?.borewellInfo?.borewellImg?.[0] || BorewellDrillingService}
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

export default BorwellChangeAvailablity;
