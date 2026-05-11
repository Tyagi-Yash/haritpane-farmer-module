import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getMyBookings } from "../../../reduxtoolkit/slices/progress/bookingList";
import serviceImg from "../../../assets/images/service.png";
import sortArrowDown from "../../../assets/images/sort-arrow-down.svg";
import { Commonpagination } from "../../common components/Commonpagination";
import { statusOptions } from "../../../constants/progress/statusOptions";
import ProgressVendorSkeleton from "../../skeletons/ProgressVendorSkeleton";

import DatePicker from "react-datepicker";
import { format } from "date-fns";

function ServiceTrackingTab() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { loading, services, paginationData, filters } = useSelector(
    (state) => state.services.bookingListSlice,
  );

  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState(filters?.status || "All");
  const [fromDate, setFromDate] = useState(filters?.fromDate || "");
  const [toDate, setToDate] = useState(filters?.toDate || "");

  const [isOpen, setIsOpen] = useState(false);

  const validateDateRange = (start, end) => {
    if (!start || !end) return true;
    return new Date(start) <= new Date(end);
  };

  const handleFromDateChange = (value) => {
    if (!validateDateRange(value, toDate)) {
      toast.error(t("progress.dateRangeError"));
      return;
    }
    setFromDate(value);
    setPage(1);
  };

  const handleToDateChange = (value) => {
    if (!validateDateRange(fromDate, value)) {
      toast.error(t("progress.dateRangeError"));
      return;
    }
    setToDate(value);
    setPage(1);
  };

  useEffect(() => {
    dispatch(
      getMyBookings({
        status: selectedStatus === "All" ? "" : selectedStatus,
        fromDate,
        toDate,
        page,
      }),
    );
  }, [selectedStatus, fromDate, toDate, page]);

  const toggleSortMenu = () => {
    setIsOpen((prev) => !prev);
  };
  const selectStatusOption = (option) => {
    setSelectedStatus(option);
    setPage(1);
    setIsOpen(false);
  };
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="dashboard service-tracking">
      <div className="option-wrapper mb-0">
        <h3 className="main-heading">{t("progress.changeAvailabilityDate")}</h3>
        <div className="filter-area">
          <div className="row align-items-end">
            <div className="col-md-4 mb-3">
              <label className="form-label">{t("progress.selectStartDate")}</label>
              <DatePicker
                selected={fromDate ? new Date(fromDate) : null}
                onChange={(selectedDate) => {
                  if (!selectedDate) {
                    setFromDate("");
                    setPage(1);
                    return;
                  }
                  const formatted = format(selectedDate, "yyyy-MM-dd");
                  handleFromDateChange(formatted);
                }}
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YYYY"
                className="form-control custom-datepicker"
                calendarClassName="custom-calendar"
                showPopperArrow={false}
                showOtherMonths
                fixedHeight
                isClearable
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">{t("progress.selectEndDate")}</label>
              <DatePicker
                selected={toDate ? new Date(toDate) : null}
                onChange={(selectedDate) => {
                  if (!selectedDate) {
                    setToDate("");
                    setPage(1);
                    return;
                  }
                  const formatted = format(selectedDate, "yyyy-MM-dd");
                  handleToDateChange(formatted);
                }}
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YYYY"
                className="form-control custom-datepicker"
                calendarClassName="custom-calendar"
                showPopperArrow={false}
                showOtherMonths
                fixedHeight
                isClearable
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">{t("progress.selectStatus")}</label>
              <div className="sort-box">
                <div
                  className={`sort-toggle status-${selectedStatus.toLowerCase()}`}
                  onClick={toggleSortMenu}
                >
                  <span>
                    <span className="sort-label">
                      {t(`progress.${selectedStatus.toLowerCase()}`)}
                    </span>
                    <img src={sortArrowDown} alt="Sort" />
                  </span>
                </div>
                {isOpen && (
                  <div className="sort-menu">
                    {statusOptions.map((status) => (
                      <div
                        key={status}
                        className={`sort-option status-${status.toLowerCase()}`}
                        onClick={() => selectStatusOption(status)}
                      >
                        {t(`progress.${status.toLowerCase()}`)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="option-wrapper mb-0">
        {loading && <ProgressVendorSkeleton count={5} />}
        {!loading && services.length === 0 && (
          <p className="text-center">
            {t("progress.noBookingsFound", {
              status:
                selectedStatus === "All"
                  ? t("progress.all")
                  : t(`progress.${selectedStatus.toLowerCase()}`),
            })}
          </p>
        )}
        {!loading &&
          services.map((item) => (
            <Link
              key={item.id}
              to={`/service-tracking/${item.bookingFor}/${item.id}`}
              className="vendor-card-link"
            >
              <div className={`vendor-card status-card-${item.raw.status?.toLowerCase()}`}>
                <div className="service-info">
                  <img src={item.image || serviceImg} alt="Service" className="service-image" />

                  <div className="service-text">
                    <div className="title">{item.businessName || t("progress.noDescription")}</div>

                    <div className="rating">
                      <i className="fa-solid fa-star star-icon" />
                      {item.rating ?? "N/A"}
                      
                      <div
                        className={`status-badge-inline status-${item.raw.status?.toLowerCase()}`}
                      >
                        {t(`progress.${item.raw.status?.toLowerCase()}`)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="price-info">
                  <h6>₹ {item.amount}</h6>
                  <small>{t("progress.additionalCharges")}</small>
                </div>
              </div>
            </Link>
          ))}
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
  );
}

export default ServiceTrackingTab;
