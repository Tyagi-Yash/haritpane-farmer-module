import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import locationBlack from "../../../assets/images/location-black.svg";
import TopbarModal from "../../../components/common components/TopbarModal";
import BorewellIcon from "../../../assets/images/Borewell-icon.png";
import {
  validateCasingPipe,
  validateDates,
  validateDepthOfBorewell,
  validateFromTimeOnly,
  validateWaterMotor,
} from "../../../utils/formValidators";

function BorwellBookYourService() {
  const filters = useSelector((state) => state.services.BorewellServiceMgmtSlice.filters);
  const defaultForm = {
    address: "",
    lat: "",
    lng: "",
    depthOfBorewell: "",
    casingPipe: "",
    waterMotor: "",
    fromDate: "",
    toDate: "",
    fromTime: "",
    toTime: "",
  };
  const [formState, setFormState] = useState({ ...defaultForm, ...filters });

  const {
    address,
    lat,
    lng,
    depthOfBorewell,
    casingPipe,
    waterMotor,
    fromDate,
    toDate,
    fromTime,
    toTime,
  } = formState;
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSelect = async (value) => {
    try {
      const results = await geocodeByAddress(value);
      const { lat, lng } = await getLatLng(results[0]);
      setFormState((prev) => ({
        ...prev,
        address: value,
        lat: lat.toString(),
        lng: lng.toString(),
      }));
      setErrors((prev) => ({ ...prev, address: "" }));
    } catch (error) {
      toast.error("Failed to fetch location coordinates");
    }
  };

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

    if (!address || !lat || !lng) newErrors.address = "Please select a valid location.";

    const depthError = validateDepthOfBorewell(depthOfBorewell.trim());
    if (depthError) newErrors.depthOfBorewell = depthError;

    const waterMotorError = validateWaterMotor(waterMotor);
    if (waterMotorError) newErrors.waterMotor = waterMotorError;

    const casingPipeError = validateCasingPipe(casingPipe);
    if (casingPipeError) newErrors.casingPipe = casingPipeError;

    const dateErrors = validateDates(fromDate, toDate);
    newErrors = { ...newErrors, ...dateErrors };

    const timeError = validateFromTimeOnly(fromDate, toDate, fromTime, toTime);
    newErrors = { ...newErrors, ...timeError };

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
                      <PlacesAutocomplete
                        value={address}
                        onChange={(value) => setFormState((prev) => ({ ...prev, address: value }))}
                        onSelect={handleSelect}
                      >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                          <div>
                            <input
                              {...getInputProps({
                                placeholder: "Farm location*",
                                className: "form-control",
                              })}
                            />
                            <div className="autocomplete-dropdown-container">
                              {loading && <div>Loading...</div>}
                              {suggestions.map((suggestion) => {
                                const className = suggestion.active
                                  ? "suggestion-item--active"
                                  : "suggestion-item";
                                return (
                                  <div
                                    {...getSuggestionItemProps(suggestion, {
                                      className,
                                    })}
                                    key={suggestion.placeId}
                                  >
                                    <span>{suggestion.description}</span>
                                  </div>
                                );
                              })}
                            </div>
                            {errors.address && <p className="error-text">{errors.address}</p>}
                          </div>
                        )}
                      </PlacesAutocomplete>
                      <img src={locationBlack} alt="" className="location-icon" />
                    </div>
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
                    {errors.depthOfBorewell && (
                      <p className="error-text">{errors.depthOfBorewell}</p>
                    )}
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
                    {errors.casingPipe && <p className="error-text">{errors.casingPipe}</p>}
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
                    {errors.waterMotor && <p className="error-text">{errors.waterMotor}</p>}
                  </div>
                </div>
                <h5 className="book-heading">Book Services date &amp; time</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      From date<span className="required">*</span>
                    </label>
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
                    <label className="form-label">
                      Till date<span className="required">*</span>
                    </label>
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
                    <label className="form-label">
                      Start time<span className="required">*</span>
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      name="fromTime"
                      value={fromTime}
                      onChange={handleInputChange}
                    />
                    {errors.fromTime && <p className="error-text">{errors.fromTime}</p>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">End time</label>
                    <input
                      type="time"
                      className="form-control"
                      name="toTime"
                      value={toTime}
                      onChange={handleInputChange}
                    />
                    {errors.toTime && <p className="error-text">{errors.toTime}</p>}
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
