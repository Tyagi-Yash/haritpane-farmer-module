import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import TopbarModal from "../../../components/common components/TopbarModal";
import AugerServiceIcon from "../../../assets/images/AugerService-icon.png";
import {
  validateDurationFields,
  validateFromDate,
  validateLat,
  validateLng,
  validateSelectTime,
} from "../../../utils/formValidators";

function AugerBookYourService() {
  const [formState, setFormState] = useState({
    lat: "",
    lng: "",
    date: "",
    time: "",
    hours: "",
    minutes: "",
  });
  const { lat, lng, date, time, hours, minutes } = formState;
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

    const dateErrors = validateFromDate(date);
    if (dateErrors) newErrors.date = dateErrors;

    const timeError = validateSelectTime(date, time);
    if (timeError) newErrors.time = timeError;

    const durationErrors = validateDurationFields(hours, minutes);
    newErrors = { ...newErrors, ...durationErrors };

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setDisable(true);
    const totalDuration = (Number(hours) || 0) + (Number(minutes) || 0) / 60;
    const formdata = {
      lat: lat.trim(),
      lng: lng.trim(),
      date,
      time,
      estimatedTime: Number(totalDuration).toFixed(2),
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
          title="Auger Service"
          secImage={AugerServiceIcon}
          navigate="/service-category"
        />
        <div className="dashboard">
          <form onSubmit={handleSubmit}>
            <div className="option-wrapper">
              <div className="form-section">
                <h5 className="book-heading">Book your service</h5>
                <div className="row g-3">
                  {/*need to remove this after geo api implemented */}
                  <div className="col-md-6">
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
                  <div className="col-md-6">
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
                  {/* <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Job location*"
                    required
                  />
                </div> */}
                </div>
                <h5 className="book-heading">Estimate Job Duration</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Hours*</label>

                    <input
                      type="number"
                      className="form-control"
                      placeholder="Hours*"
                      name="hours"
                      min="0"
                      value={hours}
                      onChange={handleInputChange}
                    />
                    {errors.hours && <p className="error-text">{errors.hours}</p>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Minutes*</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Minutes (0-59)*"
                      name="minutes"
                      min="0"
                      value={minutes}
                      onChange={handleInputChange}
                    />
                    {errors.minutes && <p className="error-text">{errors.minutes}</p>}
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
                    {errors.date && <p className="error-text">{errors.date}</p>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Select time*</label>
                    <input
                      type="time"
                      className="form-control"
                      name="time"
                      value={time}
                      onChange={handleInputChange}
                    />
                    {errors.time && <p className="error-text">{errors.time}</p>}{" "}
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

export default AugerBookYourService;
