import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import locationBlack from "../../../assets/images/location-black.svg";
import TopbarModal from "../../../components/common components/TopbarModal";
import ExcavationIcon from "../../../assets/images/Excavation-icon.png";
import {
  validateDates,
  validateDurationFields,
  validateEquipmentTypes,
  validateLat,
  validateLng,
  validateSelectTime,
} from "../../../utils/formValidators";
import { equipmentTypesOption } from "../../../constants/service category/excavation service/equipmentOption";
import { useSelector } from "react-redux";

function ExcavationBookYourService() {
  const filters = useSelector((state) => state.services.ExcavationServiceMgmtSlice.filters);
  const defaultForm = {
    lat: "",
    lng: "",
    equipmentTypes: "",
    fromDate: "",
    toDate: "",
    fromTime: "",
    hours: "",
    minutes: "",
  };
  const [formState, setFormState] = useState({ ...defaultForm, ...filters });

  const { lat, lng, equipmentTypes, fromDate, toDate, fromTime, hours, minutes } = formState;
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

    const equipmentError = validateEquipmentTypes(equipmentTypes);
    if (equipmentError) newErrors.equipmentTypes = equipmentError;

    const dateErrors = validateDates(fromDate, toDate);
    newErrors = { ...newErrors, ...dateErrors };

    const timeError = validateSelectTime(fromDate, fromTime);
    if (timeError) newErrors.fromTime = timeError;

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
      equipmentTypes: equipmentTypes,
      fromDate,
      toDate,
      fromTime,
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
          title="Excavation"
          secImage={ExcavationIcon}
          navigate="/service-category"
        />
        <div className="dashboard">
          <form onSubmit={handleSubmit}>
            <div className="option-wrapper">
              <div className="form-section" id="tractorForm" style={{ display: "block" }}>
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
                    <select
                      className="form-control"
                      name="equipmentTypes"
                      value={equipmentTypes}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Select Specific Service*
                      </option>
                      {equipmentTypesOption.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    {errors.equipmentTypes && <p className="error-text">{errors.equipmentTypes}</p>}
                  </div>
                </div>
                <h5 className="book-heading">Book Services date &amp; time</h5>
                <div className="row g-3">
                  <div className="col-md-4">
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
                  <div className="col-md-4">
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
                  <div className="col-md-4">
                    <label className="form-label">Start time*</label>
                    <input
                      type="time"
                      className="form-control"
                      name="fromTime"
                      value={fromTime}
                      onChange={handleInputChange}
                    />
                    {errors.fromTime && <p className="error-text">{errors.fromTime}</p>}
                  </div>
                </div>
                <h5 className="book-heading">Tentative Duration</h5>
                <div className="row g-3">
                  <div className="col-md-6">
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

export default ExcavationBookYourService;
