import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import sortArrowDown from "../../../assets/images/sort-arrow-down.svg";
import NewCompoundWallConstruction from "../../../assets/images/NewCompoundWallConstruction.png";
import CompoundWallBuilderIcon from "../../../assets/images/CompoundWallBuilder-icon.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import VendorCardSkeleton from "../../../components/skeletons/VendorCardSkeleton";
import { getAllServicesCompoundWall } from "../../../reduxtoolkit/slices/service category/compoundWallServices";
import { Commonpagination } from "../../../components/common components/Commonpagination";

import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { formatPrice } from "../../../utils/formatPrice";

function CompoundWallChangeAvailablity() {
  const { t } = useTranslation();
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
  } = useSelector((state) => state.services.CompoundWallServiceMgmtSlice);
  const [currentPage, setCurrentPage] = useState(paginationData.page || 1);
  const [errors, setErrors] = useState({});
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
      newErrors.date = t("common.fromDateRequired");
    } else if (new Date(date) < today) {
      newErrors.date = t("common.dateNotPast");
    }
    if (toDate) {
      if (new Date(toDate) < today) {
        newErrors.toDate = t("common.toDateNotPast");
      }
      if (date && toDate && new Date(date) > new Date(toDate)) {
        newErrors.toDate = t("common.toDateNotEarlier");
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
      sortByRating: selectedSort === "topRated",
    };
    try {
      await dispatch(getAllServicesCompoundWall(params)).unwrap();
    } catch {
      toast(t("common.loadServicesFail"));
    }
  };
  useEffect(() => {
    fetchServices();
  }, [date, toDate, currentPage, selectedSort]);
  useEffect(() => {
    setCurrentPage(1);
  }, [date, toDate, selectedSort]);
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title={t("compoundWall.compoundWallBuilder")}
          secImage={CompoundWallBuilderIcon}
          navigate="/service-category/compound-wall-builder"
        />
        <div className="dashboard">
          <div className="option-wrapper">
            <h3 className="main-heading">{t("common.changeAvailabilityDate")}</h3>
            <div className="filter-area">
              <div className="row align-items-end">
                <div className="col-md-4 mb-3">
                  <label className="form-label">{t("common.selectStartDate")}</label>
                  {errors.date && <p className="error-text">{errors.date}</p>}
                  <div className="input-group">
                    <DatePicker
                      selected={date ? new Date(date) : null}
                      onChange={(selectedDate) => {
                        const formatted = format(selectedDate, "yyyy-MM-dd");
                        setFilters((prev) => ({ ...prev, date: formatted }));
                        setErrors((prev) => ({ ...prev, date: "" }));
                      }}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="DD/MM/YYYY"
                      className="form-control custom-datepicker"
                      calendarClassName="custom-calendar"
                      showPopperArrow={false}
                      showOtherMonths
                      fixedHeight
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">{t("common.selectEndDate")}</label>
                  {errors.toDate && <p className="error-text">{errors.toDate}</p>}
                  <div className="input-group">
                    <DatePicker
                      selected={toDate ? new Date(toDate) : null}
                      onChange={(selectedDate) => {
                        const formatted = format(selectedDate, "yyyy-MM-dd");
                        setFilters((prev) => ({ ...prev, toDate: formatted }));
                        setErrors((prev) => ({ ...prev, toDate: "" }));
                      }}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="DD/MM/YYYY"
                      className="form-control custom-datepicker"
                      calendarClassName="custom-calendar"
                      showPopperArrow={false}
                      showOtherMonths
                      fixedHeight
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-3">
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
          <div className="option-wrapper">
            {loading ? (
              <VendorCardSkeleton count={5} />
            ) : services.length === 0 ? (
              <p style={{ color: "gray", marginTop: "10px" }}>{t("common.noServicesFound")}</p>
            ) : (
              <>
                <h3 className="main-heading">{t("common.availableVendor")}</h3>
                <h6 className="form-label-max">{t("common.chooseRadius")}</h6>
                {services.map((service) => (
                  <Link
                    className="vendor-card-link"
                    to={`vendor-details/${service?.compoundMaterialsInfo?.[0]?._id || ""}`}
                    key={service?.compoundMaterialsInfo?.[0]?._id || service?._id}
                  >
                    <div className="vendor-card">
                      <div className="service-info">
                        <img
                          src={service?.toolsImges?.[0] || NewCompoundWallConstruction}
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
                        <h6>
                          ₹ {formatPrice(service?.perMeter ?? 0)} {t("compoundWall.perMeterSq")}
                        </h6>
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

export default CompoundWallChangeAvailablity;
