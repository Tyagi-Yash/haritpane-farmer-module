import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TopbarModal from "../../../components/common components/TopbarModal";
import mobileIcon from "../../../assets/images/mobile.svg";
import locationIcon from "../../../assets/images/location-icon.png";
import userIcon from "../../../assets/images/user-icon.svg";
import landstatus from "../../../assets/images/landstatus.png";
import RamPrasadSingh from "../../../assets/images/RamPrasadSingh.svg";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  createBooking,
  cancelBooking,
  getBookingStatus,
} from "../../../reduxtoolkit/slices/service category/bookingSlice";
import { toast } from "react-toastify";

function LandManagementVendorDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("service");

  const { services, filters } = useSelector((state) => state.services.LandServiceMgmtSlice);

  const vendor = services.find((v) => v.Info?._id === id);

  const dispatch = useDispatch();

  const { isBooking, bookingData, loading } = useSelector((state) => state.services.bookingSlice);
  const [bookingId, setBookingId] = useState(null);

  // useEffect(async () => {
  //   if (vendor?.Info?._id && vendor?.provider?._id) {
  //     try {
  //       const res = await dispatch(
  //         getBookingStatus({
  //           bookingFor: "land_management",
  //           providerId: vendor.providerId,
  //           serviceId: vendor._id,
  //           categoryId: vendor.categoryId,
  //           tractorInfoId: vendor.Info._id,
  //         })
  //       ).unwrap();
  //       console.log(res);
  //       setBookingId(res.data.bookingId);
  //     } catch (error) {
  //       toast.error("Failed to fetch status");
  //     }
  //   }
  // }, [vendor]);

  useEffect(() => {
    const fetchStatus = async () => {
      if (vendor?.Info?._id && vendor?.provider?._id) {
        try {
          const res = await dispatch(
            getBookingStatus({
              bookingFor: "land_management",
              providerId: vendor.providerId,
              serviceId: vendor._id,
              categoryId: vendor.categoryId,
              tractorInfoId: vendor.Info._id,
            })
          ).unwrap();
          setBookingId(res?.data?.bookingId || null);
        } catch (error) {
          toast.error("Failed to fetch booking status");
        }
      }
    };

    fetchStatus();
  }, [vendor]);

  const handleBookService = async () => {
    const payload = {
      bookingFor: "land_management",
      serviceId: vendor._id,
      providerId: vendor.providerId,
      categoryId: vendor.categoryId,
      tractorInfoId: vendor.Info._id,
      hpOfTractor: filters.hpOfTractor,
      bookingFromDate: filters.fromDate,
      bookingTillDate: filters.toDate,
    };
    try {
      const res = await dispatch(createBooking(payload)).unwrap();
      setBookingId(res?.data?.bookingId || null);
      toast.success(res?.message || "Booking created successfully");
    } catch (err) {
      toast.error(err?.message || "Failed to create booking");
    }
  };

  const handleCancelBooking = async () => {
    try {
      const res = await dispatch(
        cancelBooking({
          bookingId: bookingId,
          status: "cancelled",
          reasonForRejection: "User cancelled booking",
        })
      ).unwrap();

      toast.success(res?.message || "Booking cancelled successfully");
    } catch (err) {
      toast.error(err?.message || "Failed to cancel booking");
    }
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title="Vendor Details"
          navigate={`/service-category/land-management/available-services?${new URLSearchParams(
            filters
          ).toString()}`}
        />
        <div className="dashboard">
          {!vendor ? (
            <p style={{ color: "gray", marginTop: "10px" }}>
              No vendor data available. Please go back and select a vendor again.
            </p>
          ) : (
            <>
              <figure className="status-image-tag" style={{ minHeight: "200px" }}>
                <img src={vendor?.Info?.images?.[0] || landstatus} alt="Service Image" />

                {isBooking && <div className="status-tag-pending">Pending</div>}
              </figure>
              <div className="CommonTabs mt-0">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "service" ? "active" : ""}`}
                      onClick={() => setActiveTab("service")}
                    >
                      Service Details
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "review" ? "active" : ""}`}
                      onClick={() => setActiveTab("review")}
                    >
                      Review &amp; Rating
                    </button>
                  </li>
                </ul>
              </div>
              <div className="tab-content">
                {activeTab === "service" && (
                  <div className="tab-pane active" id="service">
                    <div className="option-wrapper">
                      <h5 className="normal-heading">Vendor Information</h5>
                      <h6>
                        <span>
                          <img src={userIcon} alt="" />
                        </span>
                        {vendor?.provider?.name || "N/A"}
                      </h6>
                      <h6>
                        <span>
                          <img src={locationIcon} alt="" />
                        </span>
                        {vendor?.provider?.address || "N/A"}
                      </h6>
                      <h6>
                        <span>
                          <img src={mobileIcon} alt="" />
                        </span>
                        {vendor?.provider?.phone
                          ? `+91 ${vendor.provider.phone.slice(0, -6) + "X".repeat(6)}`
                          : "N/A"}
                      </h6>
                    </div>
                    <div>
                      <div className="row align-items-center">
                        <div className="col align-items-center">
                          <div className="option-wrapper booking-area">
                            <h5 className="normal-heading">Booking Details</h5>
                            <p>Service Name: Land Management Services</p>
                            <p>Business Name: {vendor?.businessName || "N/A"}</p>
                          </div>
                        </div>
                        <div className="col">
                          <div className="bookingPriceTableParent">
                            <div className="option-wrapper bookingPriceTable">
                              <h5 className="normal-heading">Total Booking Price</h5>
                              <table className="table table-borderless">
                                <tbody>
                                  <tr>
                                    <td>Service Cost({vendor?.Info?.priceType})</td>
                                    <td>₹ {Number(vendor?.Info?.price ?? 0).toFixed(2)}</td>
                                  </tr>
                                  {vendor.extrachages === true && (
                                    <tr>
                                      <td>Transportation Charges</td>
                                      <td>₹ {Number(vendor?.additionalCharges ?? 0).toFixed(2)}</td>
                                    </tr>
                                  )}
                                </tbody>
                                <tfoot>
                                  <tr>
                                    <td>Total Payable Amount</td>
                                    <td>₹ {Number(vendor?.payableAmount ?? 0).toFixed(2)}</td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end align-items-center mt-5">
                      {!isBooking ? (
                        <button onClick={handleBookService} disabled={loading} className="btn-edit">
                          {loading ? "Booking..." : "Book this Service"}
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            className="btn-delete"
                            disabled={loading}
                            onClick={handleCancelBooking}
                          >
                            {loading ? "Cancelling..." : "Cancel Booking"}
                          </button>

                          <button type="submit" className="btn-edit">
                            Raise Enquiry
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
                {activeTab === "review" && (
                  <div className="tab-pane active" id="review">
                    <div className="row">
                      <div className="col-6">
                        <div className="review-card">
                          <div className="review-header">
                            <div className="reviewer-info">
                              <img src={RamPrasadSingh} alt="User Photo" />
                              <strong>Ram Prasad Singh</strong>
                            </div>
                            <div className="review-date">20/05/2025</div>
                          </div>
                          <div className="stars">★ ★ ★ ★ ★</div>
                          <div className="review-text">
                            “Booked a tractor through HaritPane for ploughing my field. The driver
                            arrived on time, and the work was done smoothly. Highly reliable
                            service!”
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="review-card">
                          <div className="review-header">
                            <div className="reviewer-info">
                              <img src={RamPrasadSingh} alt="User Photo" />
                              <strong>Bhagwan Singh Rathore</strong>
                            </div>
                            <div className="review-date">20/05/2025</div>
                          </div>
                          <div className="stars">★ ★ ★ ★ ★</div>
                          <div className="review-text">
                            “Booked a tractor through HaritPane for ploughing my field. The driver
                            arrived on time, and the work was done smoothly. Highly reliable
                            service!”
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="review-card">
                          <div className="review-header">
                            <div className="reviewer-info">
                              <img src={RamPrasadSingh} alt="User Photo" />
                              <strong>Ram Prasad Singh</strong>
                            </div>
                            <div className="review-date">20/05/2025</div>
                          </div>
                          <div className="stars">★ ★ ★ ★ ★</div>
                          <div className="review-text">
                            “Booked a tractor through HaritPane for ploughing my field. The driver
                            arrived on time, and the work was done smoothly. Highly reliable
                            service!”
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="review-card">
                          <div className="review-header">
                            <div className="reviewer-info">
                              <img src={RamPrasadSingh} alt="User Photo" />
                              <strong>Bhagwan Singh Rathore</strong>
                            </div>
                            <div className="review-date">20/05/2025</div>
                          </div>
                          <div className="stars">★ ★ ★ ★ ★</div>
                          <div className="review-text">
                            “Booked a tractor through HaritPane for ploughing my field. The driver
                            arrived on time, and the work was done smoothly. Highly reliable
                            service!”
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandManagementVendorDetails;
