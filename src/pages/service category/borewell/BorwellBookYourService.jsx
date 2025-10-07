import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import locationBlack from "../../../assets/images/location-black.svg";
import TopbarModal from "../../../components/common components/TopbarModal";
import BorewellIcon from "../../../assets/images/Borewell-icon.png";
import {
  validateDates,
  validateLat,
  validateLng,
  validateTime,
} from "../../../utils/formValidators";

function BorwellBookYourService() {
  const [formState, setFormState] = useState({
    lat: "",
    lng: "",
    depthOfBorewell: "",
    casingPipe: "",
    waterMotor: "",
    fromDate: "",
    toDate: "",
    fromTime: "",
    toTime: "",
  });
  const { lat, lng, depthOfBorewell, casingPipe, waterMotor, fromDate, toDate, fromTime, toTime } =
    formState;
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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

    const dateErrors = validateDates(fromDate, toDate);
    newErrors = { ...newErrors, ...dateErrors };

    const timeError = validateTime(fromDate, toDate, fromTime, toTime);
    if (timeError) newErrors[timeError] = timeError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setDisable(true);
    const formdata = {
      lat: lat.trim(),
      lng: lng.trim(),
      depthOfBorewell: depthOfBorewell.trim(),
      casingPipe,
      waterMotor,
      fromDate,
      toDate,
      fromTime,
      toTime,
    };
    try {
      const query = new URLSearchParams(formdata).toString();
      navigate(`available-services?${query}`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setDisable(false);
    }
  };
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title="Borewell"
          secImage={BorewellIcon}
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
                    {/* <div className="location-wrapper">
                      <input type="text" className="form-control" placeholder="Farm location*" />
                      <img src={locationBlack} alt="" className="location-icon" />
                    </div> */}
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Approximate depth of borewell(in feet)*"
                      name="depthOfBorewell"
                      value={depthOfBorewell}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-control"
                      name="casingPipe"
                      value={casingPipe}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Casing Pipe*
                      </option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-control"
                      name="waterMotor"
                      value={waterMotor}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Submersible water motor*
                      </option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
                <h5 className="book-heading">Book Services date &amp; time</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">From date*</label>
                    <input
                      type="date"
                      className="form-control"
                      name="fromDate"
                      value={fromDate}
                      onChange={handleInputChange}
                    />
                    {errors.fromDate && <p className="error-text">{errors.fromDate}</p>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Till date*</label>
                    <input
                      type="date"
                      className="form-control"
                      name="toDate"
                      value={toDate}
                      onChange={handleInputChange}
                    />
                    {errors.toDate && <p className="error-text">{errors.toDate}</p>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Start time*</label>
                    <input
                      type="time"
                      className="form-control"
                      name="fromTime"
                      value={fromTime}
                      onChange={handleInputChange}
                    />
                    {errors.fromTime && (
                      <p className="error-text">{errors.fromTime}</p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">End time*</label>
                    <input
                      type="time"
                      className="form-control"
                      name="toTime"
                      value={toTime}
                      onChange={handleInputChange}
                    />
                    {errors.toTime && (
                      <p className="error-text">{errors.toTime}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="available-service-btn">
              <button type="submit" disabled={disable}>
                {disable ? "Loading..." : "See Available Service"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BorwellBookYourService;
