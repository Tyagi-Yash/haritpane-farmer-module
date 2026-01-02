import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMyBookings } from "../../reduxtoolkit/slices/progress/bookingList";

import sortArrowDown from "../../assets/images/sort-arrow-down.svg";
import TopbarModal from "../../components/common components/TopbarModal";
import { Commonpagination } from "../../components/common components/Commonpagination";
import { statusOptions } from "../../constants/progress/statusOptions";

function ServiceTracking() {
  const dispatch = useDispatch();

  const { loading, services, paginationData, filters } = useSelector(
    (state) => state.services.bookingListSlice
  );
  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState(filters?.status || "pending");
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    dispatch(
      getMyBookings({
        status: selectedStatus,
        page,
      })
    );
  }, [selectedStatus, page]);
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
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal titleBox={true} title="Service Tracking" navigate="/dashboard" />

        <div className="dashboard service-tracking">
          <div className="option-wrapper">
            <h3 className="main-heading">Change Availability Date</h3>
            <div className="filter-area">
              <div className="row align-items-end">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Select Start Date</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Select End Date</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Select Status</label>
                  <div className="sort-box">
                    <div className="sort-toggle" onClick={toggleSortMenu}>
                      <span>
                        <span className="sort-label">{selectedStatus}</span>
                        <img src={sortArrowDown} alt="Sort" />
                      </span>
                    </div>
                    {isOpen && (
                      <div className="sort-menu">
                        {statusOptions.map((status) => (
                          <div
                            key={status}
                            className="sort-option"
                            onClick={() => selectStatusOption(status)}
                          >
                            {status}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="option-wrapper">
            {loading && <p className="text-center">Loading...</p>}
            {!loading && services.length === 0 && (
              <p className="text-center">No bookings found for {selectedStatus} status</p>
            )}
            {!loading &&
              services.map((item) => (
                <Link
                  key={item.id}
                  to={`/service-tracking/${item.bookingFor}/${item.id}`}
                  className="vendor-card-link"
                >
                  <div className="vendor-card">
                    <div className="service-info">
                      <img src={item.image} alt="Service" className="service-image" />
                      <div className="service-text">
                        <div className="title">{item.businessName}</div>
                        <div className="rating">
                          <i className="fa-solid fa-star star-icon" />
                          {item.rating ?? "N/A"}
                        </div>
                      </div>
                    </div>

                    <div className="price-info">
                      <h6>₹ {item.amount}</h6>
                      <small>Additional charges might apply</small>
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
      </div>
    </div>
  );
}

export default ServiceTracking;
