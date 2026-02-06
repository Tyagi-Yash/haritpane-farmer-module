import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import sortArrowDown from "../../../assets/images/sort-arrow-down.svg";
import filter from "../../../assets/images/filter.png";
import cattleIcon from "../../../assets/images/cattle-icon.png";
import MilkProductionSupport from "../../../assets/images/MilkProductionSupport.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import { getAllServicesOfCattle } from "../../../reduxtoolkit/slices/service category/cattlePurchaseServices";
import VendorCardSkeleton from "../../../components/skeletons/VendorCardSkeleton";
import { Commonpagination } from "../../../components/common components/Commonpagination";

function CattleChangeAvailablity() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterValues = Object.fromEntries(queryParams.entries());
  const [filters, setFilters] = useState(filterValues);
  const {
    services = [],
    loading,
    paginationData = {},
    sortByRating,
  } = useSelector((state) => state.services.CattleServiceMgmtSlice);
  const [currentPage, setCurrentPage] = useState(paginationData.page || 1);
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
  const [selectedFilter, setSelectedFilter] = useState("Filter");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const toggleFilterMenu = () => {
    setIsFilterMenuOpen((prev) => !prev);
  };
  const selectFilterOption = (option) => {
    setSelectedFilter(option);
    setIsFilterMenuOpen(false);
  };
  const fetchServices = async () => {
    const params = {
      ...filters,
      page: currentPage,
      sortByRating: selectedSort === "Top Rated" ? true : false,
    };
    try {
      await dispatch(getAllServicesOfCattle(params)).unwrap();
    } catch {
      toast("Failed to load services");
    }
  };
  useEffect(() => {
    fetchServices();
  }, [filters, currentPage, selectedSort]);
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, selectedSort]);

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title="Cattle Purchase & Sale"
          secImage={cattleIcon}
          navigate="/service-category/cattle-purchase-sale"
        />
        <div className="dashboard">
          <div className="option-wrapper">
            {loading ? (
              <VendorCardSkeleton count={5} />
            ) : services.length === 0 ? (
              <p style={{ color: "gray", marginTop: "10px" }}>
                No services found for the selected filters.
              </p>
            ) : (
              <>
                <div className="row align-items-end ">
                  <div className="col-md-6 mb-4">
                    <h3 className="main-heading">Available Vendor</h3>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="row align-items-end">
                      <div className="col-md-6 ">
                        <div className="sort-box" id="sortBox">
                          <div className="sort-toggle" onClick={toggleFilterMenu}>
                            <span>
                              <span className="sort-label">{selectedFilter}</span>
                              <img src={filter} alt="Sort Icon" />
                            </span>
                          </div>
                          {isFilterMenuOpen && (
                            <div className="sort-menu">
                              <div
                                className="sort-option"
                                onClick={() => selectFilterOption("Breed")}
                              >
                                Breed
                              </div>
                              <div
                                className="sort-option"
                                onClick={() => selectFilterOption("Age")}
                              >
                                Age
                              </div>
                              <div
                                className="sort-option"
                                onClick={() => selectFilterOption("Price")}
                              >
                                Price
                              </div>
                              <div
                                className="sort-option"
                                onClick={() => selectFilterOption("State")}
                              >
                                State
                              </div>
                              <div
                                className="sort-option"
                                onClick={() => selectFilterOption("Lactation")}
                              >
                                Lactation
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="sort-box" id="sortBox">
                          <div className="sort-toggle" onClick={toggleSortMenu}>
                            <span>
                              <span className="sort-label">{selectedSort}</span>
                              <img src={sortArrowDown} alt="Sort Icon" />
                            </span>
                          </div>
                          {isOpen && (
                            <div className="sort-menu">
                              <div
                                className="sort-option"
                                onClick={() => selectSortOption("Top Rated")}
                              >
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

                <h6 className="form-label-max">Choose from in your radius</h6>
                {services.map((service) => (
                  <Link
                    className="vendor-card-link"
                    to={`vendor-details/${service?.basicInfo?._id || ""}`}
                    key={service?.basicInfo?._id || service?._id}
                  >
                    <div className="vendor-card">
                      <div className="service-info">
                        <img
                          src={service?.basicInfo?.images?.[0] || MilkProductionSupport}
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

export default CattleChangeAvailablity;
