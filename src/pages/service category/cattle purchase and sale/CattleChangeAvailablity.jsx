import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import sortArrowDown from "../../../assets/images/sort-arrow-down.svg";
import filter from "../../../assets/images/filter.png";
import cattleIcon from "../../../assets/images/cattle-icon.png";
import MilkProductionSupport from "../../../assets/images/MilkProductionSupport.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import { getAllServicesOfCattle } from "../../../reduxtoolkit/slices/service category/cattlePurchaseServices";
import VendorCardSkeleton from "../../../components/skeletons/VendorCardSkeleton";
import { Commonpagination } from "../../../components/common components/Commonpagination";
import { formatPrice } from "../../../utils/formatPrice";

function CattleChangeAvailablity() {
  const { t } = useTranslation();
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
    sortByRating === true ? "topRated" : "nearestFirst",
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
      sortByRating: selectedSort === "topRated",
    };
    try {
      await dispatch(getAllServicesOfCattle(params)).unwrap();
    } catch {
      toast(t("common.somethingWentWrong"));
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
          title={t("cattle.cattlePurchaseSale")}
          secImage={cattleIcon}
          navigate="/service-category/cattle-purchase-sale"
        />
        <div className="dashboard">
          <div className="option-wrapper">
            {loading ? (
              <VendorCardSkeleton count={5} />
            ) : services.length === 0 ? (
              <p style={{ color: "gray", marginTop: "10px" }}>
                {t("common.noServicesFound")}
              </p>
            ) : (
              <>
                <div className="row align-items-end ">
                  <div className="col-md-6 mb-4">
                    <h3 className="main-heading">{t("common.availableVendor")}</h3>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="row align-items-end">
                      <div className="col-md-6 ">
                        <div className="sort-box" id="sortBox">
                          <div className="sort-toggle" onClick={toggleFilterMenu}>
                            <span>
                              <span className="sort-label">
                                {selectedFilter === "Filter"
                                  ? t("cattle.filter")
                                  : t(`cattle.${selectedFilter.toLowerCase()}`)}
                              </span>
                              <img src={filter} alt="Sort Icon" />
                            </span>
                          </div>
                          {isFilterMenuOpen && (
                            <div className="sort-menu">
                              <div
                                className="sort-option"
                                onClick={() => selectFilterOption("Breed")}
                              >
                                {t("cattle.breed")}
                              </div>
                              <div
                                className="sort-option"
                                onClick={() => selectFilterOption("Age")}
                              >
                                {t("cattle.age")}
                              </div>
                              <div
                                className="sort-option"
                                onClick={() => selectFilterOption("Price")}
                              >
                                {t("cattle.price")}
                              </div>
                              <div
                                className="sort-option"
                                onClick={() => selectFilterOption("State")}
                              >
                                {t("cattle.state")}
                              </div>
                              <div
                                className="sort-option"
                                onClick={() => selectFilterOption("Lactation")}
                              >
                                {t("cattle.lactation")}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="sort-box" id="sortBox">
                          <div className="sort-toggle" onClick={toggleSortMenu}>
                            <span>
                              <span className="sort-label">
                                {selectedSort === "topRated"
                                  ? t("common.topRated")
                                  : t("common.nearestFirst")}
                              </span>
                              <img src={sortArrowDown} alt="Sort Icon" />
                            </span>
                          </div>
                          {isOpen && (
                            <div className="sort-menu">
                              <div
                                className="sort-option"
                                onClick={() => selectSortOption("topRated")}
                              >
                                {t("common.topRated")}
                              </div>
                              <div
                                className="sort-option"
                                onClick={() => selectSortOption("nearestFirst")}
                              >
                                {t("common.nearestFirst")}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h6 className="form-label-max">{t("common.chooseRadius")}</h6>
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
                          <div className="title">
                            {service?.businessName || t("common.noDescription")}
                          </div>
                          <div className="rating">
                            <span>
                              <i className="fa-solid fa-star star-icon" />
                            </span>{" "}
                            {service?.provider?.averageRating ?? "N/A"}
                          </div>
                        </div>
                      </div>
                      <div className="price-info">
                        <h6>₹ {formatPrice(service?.payableAmount ?? 0)}</h6>
                        <small>{t("common.additionalCharges")}</small>
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
