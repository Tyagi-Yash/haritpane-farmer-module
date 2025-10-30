import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import locationBlack from "../../../assets/images/location-black.svg";
import CompoundWallBuilderIcon from "../../../assets/images/CompoundWallBuilder-icon.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import {
  validateFromDate,
  validateSelectTime,
  validateWallserviceType,
} from "../../../utils/formValidators";
import { getCompoundWallServiceTypes } from "../../../reduxtoolkit/slices/service category/compoundWallServices";

function CompoundWallBookYourService() {
  const filters = useSelector((state) => state.services.CompoundWallServiceMgmtSlice.filters);
  const defaultForm = {
    address: "",
    lat: "",
    lng: "",
    serviceType: "",
    date: "",
    time: "",
  };
  const [formState, setFormState] = useState({ ...defaultForm, ...filters });

  const { address, lat, lng, serviceType, date, time } = formState;
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
                                placeholder: "Field location*",
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
                    <label className="form-label">
                      From date<span className="required">*</span>
                    </label>
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
                    <label className="form-label">
                      Start time<span className="required">*</span>
                    </label>
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
