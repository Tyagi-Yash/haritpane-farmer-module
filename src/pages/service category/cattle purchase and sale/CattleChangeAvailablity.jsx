import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import cattleIcon from "../../../assets/images/cattle-icon.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import { getAllServicesOfCattle } from "../../../reduxtoolkit/slices/service category/cattlePurchaseServices";
import VendorCardSkeleton from "../../../components/skeletons/VendorCardSkeleton";

function CattleChangeAvailablity() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    lat: queryParams.get("lat") || "",
    lng: queryParams.get("lng") || "",
    selectBreed: queryParams.get("selectBreed") || "",
    sectectCattle: queryParams.get("sectectCattle") || "",
  });

  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await dispatch(getAllServicesOfCattle(filters));
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
  }, []);

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title="Cattle Purchase & Sale"
          secImage={cattleIcon}
          navigate="/cattle-purchase-sale"
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
                    to={`/cattleVendorDetailsPending/${service._id}`}
                    key={service._id}
                  >
                    <div className="vendor-card">
                      <div className="service-info">
                        <img src={service.images[0]} alt="Service" className="service-image" />
                        <div className="service-text">
                          <div className="title"> {service.basicInfo.animalDescription}</div>
                          <div className="rating">
                            <span>
                              <i className="fa-solid fa-star star-icon" />
                            </span>{" "}
                            {service.rating}
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

export default CattleChangeAvailablity;
