import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import sortArrowDown from "../../../assets/images/sort-arrow-down.svg";
import CompoundWallBuilderIcon from "../../../assets/images/CompoundWallBuilder-icon.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import VendorCardSkeleton from "../../../components/skeletons/VendorCardSkeleton";
import { getAllServicesCompoundWall } from "../../../reduxtoolkit/slices/service category/compoundWallServices";

function CompoundWallChangeAvailablity() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    lat: queryParams.get("lat") || "",
    lng: queryParams.get("lng") || "",
    serviceType: queryParams.get("serviceType") || "",
    date: queryParams.get("date") || "",
    time: queryParams.get("time") || "",
  });
  const { date } = filters;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const [services, setServices] = useState([]);

  const validateForm = () => {
    let newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!date) {
      newErrors.date = "*From date is required";
    } else if (new Date(date) < today) {
      newErrors.date = "*From date cannot be in the past";
    }

    // if (!toDate) {
    //   newErrors.toDate = "*To date is required";
    // } else if (new Date(toDate) < today) {
    //   newErrors.toDate = "*To date cannot be in the past";
    // }
    // if (date && toDate && new Date(date) > new Date(toDate)) {
    //   newErrors.toDate = "*To date cannot be earlier than from date";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchServices = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const res = await dispatch(getAllServicesCompoundWall(filters));
      const { status, data } = res?.payload || {};
      if (status === 200) {
        setServices(data?.data?.[0]?.data || []);
      } else {
        toast(data?.message || "Failed to load Services");
      }
    } catch (error) {
      toast("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [date]);
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title="Compound Wall Builder"
          secImage={CompoundWallBuilderIcon}
          navigate="/compound-wall-builder"
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
                      placeholder="Till date*"
                      name="date"
                      value={date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  {/* <label className="form-label">Select End Date</label>
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
                  </div> */}
                </div>
                <div className="col-md-4 mb-3">
                  <div className="sort-box" id="sortBox">
                    <div className="sort-toggle">
                      <span>
                        <span id="sortSelectedLabel" className="sort-label">
                          Sort
                        </span>
                        <img src={sortArrowDown} alt="Sort Icon" />
                      </span>
                    </div>
                    <div className="sort-menu">
                      <div className="sort-option">Top rating</div>
                      <div className="sort-option">Out of Radius</div>
                    </div>
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
                    to={`/landMManagementVendorDetailsPending/${service._id}`}
                    key={service._id}
                  >
                    <div className="vendor-card">
                      <div className="service-info">
                        <img src={service.toolsImges} alt="Service" className="service-image" />
                        <div className="service-text">
                          <div className="title"> {service.equipmentDescription}</div>
                          <div className="rating">
                            <span>
                              <i className="fa-solid fa-star star-icon" />
                            </span>{" "}
                            {service.avgRating}
                          </div>
                        </div>
                      </div>
                      <div className="price-info">
                        <h6>₹ {Number(service.payableAmount).toFixed(2)}</h6>
                        <small>Additional charges might apply</small>
                      </div>
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

export default CompoundWallChangeAvailablity;
