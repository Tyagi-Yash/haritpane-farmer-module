import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import locationBlack from "../../../assets/images/location-black.svg";
import droneServiceIcon from "../../../assets/images/DroneService-icon.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import {
  validateArea,
  validateCrop,
  validateFromDate,
  validateLat,
  validateLng,
  validateSelectTime,
} from "../../../utils/formValidators";
import { useSelector } from "react-redux";

function DroneBookYourService() {
  const filters = useSelector((state) => state.services.DroneServiceMgmtSlice.filters);
  const defaultForm = {
    lat: "",
    lng: "",
    cropUnderCultivation: "",
    areaUnderCultivation: "",
    date: "",
    time: "",
  };
  const [formState, setFormState] = useState({ ...defaultForm, ...filters });
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { lat, lng, cropUnderCultivation, areaUnderCultivation, date, time } = formState;

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

    const cropError = validateCrop(cropUnderCultivation.trim());
    if (cropError) newErrors.cropUnderCultivation = cropError;

    const areaError = validateArea(areaUnderCultivation.trim());
    if (areaError) newErrors.areaUnderCultivation = areaError;

    const dateErrors = validateFromDate(date);
    if (dateErrors) newErrors.date = dateErrors;

    const timeError = validateSelectTime(date, time);
    if (timeError) newErrors.time = timeError;

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
      cropUnderCultivation: cropUnderCultivation.trim(),
      areaUnderCultivation: areaUnderCultivation.trim(),
      date,
      time,
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
          title="Drone Service"
          secImage={droneServiceIcon}
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
                    placeholder="Farm location*"
                    required
                  />
                </div> */}
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder="Area Under Cultivation(per acre)*"
                      className="form-control"
                      name="areaUnderCultivation"
                      value={areaUnderCultivation}
                      onChange={handleInputChange}
                    />
                    {errors.areaUnderCultivation && (
                      <p className="error-text">{errors.areaUnderCultivation}</p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder="Name of Crop under Cultivation*"
                      className="form-control"
                      name="cropUnderCultivation"
                      value={cropUnderCultivation}
                      onChange={handleInputChange}
                    />
                    {errors.cropUnderCultivation && (
                      <p className="error-text">{errors.cropUnderCultivation}</p>
                    )}
                  </div>
                </div>
                <h5 className="mt-4 book-heading">Book Services date &amp; time</h5>
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

export default DroneBookYourService;
