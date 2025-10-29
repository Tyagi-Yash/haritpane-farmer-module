import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import cattleIcon from "../../../assets/images/cattle-icon.png";
import MilkProductionSupport from "../../../assets/images/MilkProductionSupport.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import { getAllServicesOfCattle } from "../../../reduxtoolkit/slices/service category/cattlePurchaseServices";
import VendorCardSkeleton from "../../../components/skeletons/VendorCardSkeleton";

function CattleChangeAvailablity() {
  const dispatch = useDispatch();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterValues = Object.fromEntries(queryParams.entries());
  const [filters, setFilters] = useState(filterValues);

  const { services, loading } = useSelector((state) => state.services.CattleServiceMgmtSlice);

  const fetchServices = async () => {
    try {
      await dispatch(getAllServicesOfCattle(filters)).unwrap();
    } catch {
      toast("Failed to load services");
    }
  };
  useEffect(() => {
    fetchServices();
  }, [filters]);

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
                          src={service?.basicInfo?.images?.[0] || MilkProductionSupport}
                          alt="Service"
                          className="service-image"
                        />

                        <div className="service-text">
                          <div className="title">
                            {service?.basicInfo?.animalDescription || "No description"}
                          </div>
                          <div className="rating">
                            <span>
                              <i className="fa-solid fa-star star-icon" />
                            </span>{" "}
                            {service?.rating ?? "N/A"}
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
        </div>
      </div>
    </div>
  );
}

export default CattleChangeAvailablity;
