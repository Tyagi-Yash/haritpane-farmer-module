import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import sortArrowDown from "../../../assets/images/sort-arrow-down.svg";
import ElectrostaticSprayingforCrops from "../../../assets/images/ElectrostaticSprayingforCrops.png";
import ElectrostaticSprayingIcon from "../../../assets/images/Electrostatic-Spraying-icon.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import { getAllServicesOfElectrostatic } from "../../../reduxtoolkit/slices/service category/electrostaticSprayingServices";
import VendorCardSkeleton from "../../../components/skeletons/VendorCardSkeleton";
import { validateFromDateRequired } from "../../../utils/formValidators";
import { Commonpagination } from "../../../components/common components/Commonpagination";

import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { formatPrice } from "../../../utils/formatPrice";

function ElectrostaticChangeAvailablity() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterValues = Object.fromEntries(queryParams.entries());
  const [filters, setFilters] = useState(filterValues);
  const { toDate = "", fromDate } = filters;
  const {
    services = [],
    loading,
    paginationData = {},
    sortByRating,
  } = useSelector((state) => state.services.ElectrostaticSprayingServiceMgmtSlice);
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
  const validateForm = () => {
    let newErrors = {};

    const dateErrors = validateFromDateRequired(fromDate, toDate, t);
    newErrors = { ...newErrors, ...dateErrors };

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
      await dispatch(getAllServicesOfElectrostatic(params)).unwrap();
    } catch {
      toast(t("progress.failedToLoadServices"));
    }
  };
  useEffect(() => {
    fetchServices();
  }, [toDate, fromDate, selectedSort, currentPage]);
  useEffect(() => {
    setCurrentPage(1);
  }, [fromDate, toDate, selectedSort]);
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title={t("electrostatic.electrostaticSpraying")}
          secImage={ElectrostaticSprayingIcon}
          navigate="/service-category/electrostatic-spraying"
        />
        <div className="dashboard">
          <div className="option-wrapper">
            <h3 className="main-heading">{t("common.changeAvailabilityDate")}</h3>
            <div className="filter-area">
              <div className="row align-items-end">
                <div className="col-md-4 mb-3">
                  <label className="form-label">{t("common.selectStartDate")}</label>
                  {errors.fromDate && <p className="error-text">{errors.fromDate}</p>}
                  <div className="input-group">
                    <DatePicker
                      selected={fromDate ? new Date(fromDate) : null}
                      onChange={(selectedDate) => {
                        const formatted = format(selectedDate, "yyyy-MM-dd");
                        setFilters((prev) => ({ ...prev, fromDate: formatted }));
                        setErrors((prev) => ({ ...prev, fromDate: "" }));
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
              <p style={{ color: "gray", marginTop: "10px" }}>
                {t("common.noServicesFound")}
              </p>
            ) : (
              <>
                <h3 className="main-heading">{t("common.availableVendor")}</h3>
                <h6 className="form-label-max">{t("common.chooseRadius")}</h6>
                {services.map((service) => (
                  <Link
                    className="vendor-card-link"
                    to={`vendor-details/${service._id}`}
                    key={service._id}
                  >
                    <div className="vendor-card">
                      <div className="service-info">
                        <img
                          src={service?.equipmentImage?.[0] || ElectrostaticSprayingforCrops}
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
                        <h6>₹ {formatPrice(service?.basicInfo?.chargePerAcre ?? 0)} {t("common.perAcre")}</h6>
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

export default ElectrostaticChangeAvailablity;
