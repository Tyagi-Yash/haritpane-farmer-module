import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import locationBlack from "../../../assets/images/location-black.svg";
import CompoundWallBuilderIcon from "../../../assets/images/CompoundWallBuilder-icon.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import {
  validateFromDate,
  validateLat,
  validateLng,
  validateSelectTime,
  validateWallserviceType,
} from "../../../utils/formValidators";
import { getCompoundWallServiceTypes } from "../../../reduxtoolkit/slices/service category/compoundWallServices";

function CompoundWallBookYourService() {
  const [formState, setFormState] = useState({
    lat: "",
    lng: "",
    serviceType: "",
    date: "",
    time: "",
  });
  const { lat, lng, serviceType, date, time } = formState;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const [serviceTypesOption, setserviceTypesOption] = useState([]);

  useEffect(() => {
    const fetchServiceType = async () => {
      try {
        const res = await dispatch(getCompoundWallServiceTypes());
        const { status, data } = res?.payload || {};
        if (status === 200) {
          setserviceTypesOption(data?.data);
        } else {
          toast(data?.message || "Failed to service type");
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
    };

    fetchServiceType();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};

    const latError = validateLat(lat);
    if (latError) newErrors.lat = latError;

    const lngError = validateLng(lng);
    if (lngError) newErrors.lng = lngError;

    const serviceTypeErrors = validateWallserviceType(serviceType);
    if (serviceTypeErrors) newErrors.serviceType = serviceTypeErrors;

    const dateErrors = validateFromDate(date);
    if (dateErrors) newErrors.date = dateErrors;

    const timeError = validateSelectTime(date, time);
    if (timeError) newErrors.time = timeError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setDisable(true);
    const query = new URLSearchParams({
      lat: lat.trim(),
      lng: lng.trim(),
      serviceType,
      date,
      time,
    }).toString();

    navigate(`available-services?${query}`);
    setDisable(false);
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title="Compound Wall Builder"
          secImage={CompoundWallBuilderIcon}
          navigate="/service-category"
        />
        <div className="dashboard">
          <form onSubmit={handleSubmit}>
            <div className="option-wrapper">
              <div className="form-section">
                <h5 className="book-heading">Book your service</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    {/*need to remove this after geo api implemented */}
                    <div className="location-wrapper">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Latitude*"
                        name="lat"
                        value={lat}
                        onChange={handleInputChange}
                      />
                      {errors.lat && <p className="error-text">{errors.lat}</p>}
                    </div>
                    <div className="location-wrapper">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Longitude*"
                        name="lng"
                        value={lng}
                        onChange={handleInputChange}
                      />
                      {errors.lng && <p className="error-text">{errors.lng}</p>}
                    </div>
                    {/* <input
                      type="text"
                      className="form-control"
                      placeholder="Farm location*"
                      required
                    /> */}
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-control"
                      name="serviceType"
                      value={serviceType}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Select Specific Service*
                      </option>
                      {serviceTypesOption.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    {errors.serviceType && <p className="error-text">{errors.serviceType}</p>}
                  </div>
                </div>
                <h5 className="book-heading">Book Services date &amp; time</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">From date*</label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={date}
                      onChange={handleInputChange}
                    />
                    {errors.date && <p className="error-text">{errors.date}</p>}{" "}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Start time*</label>
                    <input
                      type="time"
                      className="form-control"
                      name="time"
                      value={time}
                      onChange={handleInputChange}
                    />
                    {errors.time && <p className="error-text">{errors.time}</p>}
                  </div>
                  <div className="end-item">
                    <a href="#">Measure wall length now?</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="available-service-btn">
              <button type="submit" disabled={disable}>
                {disable ? "Loading..." : "See Available Service"}
              </button>{" "}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompoundWallBookYourService;
