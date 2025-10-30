import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import locationBlack from "../../../assets/images/location-black.svg";
import TopbarModal from "../../../components/common components/TopbarModal";
import CowDunkSupplyIcon from "../../../assets/images/CowDunkSupply-icon.png";
import {
  validateCowDunkType,
  validateFromDate,
  validateQuantity,
  validateSelectTime,
} from "../../../utils/formValidators";

function CowDungBookYourService() {
  const dryDunkOptions = [
    { value: "trolly", name: "1-2 Dry (Trolly)" },
    { value: "truck", name: "5-6 Dry (Truck)" },
  ];
  const wetDunkOptions = [
    { value: "trolly", name: "3-4 Wet (Trolly)" },
    { value: "truck", name: "10-12 Wet (Truck)" },
  ];
  const filters = useSelector((state) => state.services.CowDunkServiceMgmtSlice.filters);
  const defaultForm = {
    address: "",
    lat: "",
    lng: "",
    typeOfCowDunk: "",
    quantity: "",
    date: "",
    time: "",
  };
  const [formState, setFormState] = useState({ ...defaultForm, ...filters });

  const { address, lat, lng, date, time, quantity, typeOfCowDunk } = formState;
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
      ...(name === "typeOfCowDunk" ? { quantity: "" } : {}),
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!address || !lat || !lng) newErrors.address = "Please select a valid location.";

    const typeError = validateCowDunkType(typeOfCowDunk);
    if (typeError) newErrors.typeOfCowDunk = typeError;

    const quantityError = typeOfCowDunk && validateQuantity(quantity);
    if (quantityError) newErrors.quantity = quantityError;

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
      typeOfCowDunk,
      quantity,
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
          title="Cow Dunk Supply"
          secImage={CowDunkSupplyIcon}
          navigate="/service-category"
        />
        <div className="dashboard">
          <form onSubmit={handleSubmit}>
            <div className="option-wrapper">
              <div className="form-section">
                <h5 className="book-heading">Book your service</h5>
                <div className="row g-3">
                  <div className="col-md-12">
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
                    <select
                      className="form-control"
                      name="typeOfCowDunk"
                      value={typeOfCowDunk}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Select type*
                      </option>
                      <option value="dry">Dry</option>
                      <option value="wet">Wet</option>
                    </select>
                    {errors.typeOfCowDunk && <p className="error-text">{errors.typeOfCowDunk}</p>}
                  </div>

                  <div className="col-md-6">
                    <select
                      className="form-control"
                      name="quantity"
                      value={quantity}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Select quantity*
                      </option>
                      {typeOfCowDunk &&
                        (typeOfCowDunk === "dry" ? dryDunkOptions : wetDunkOptions).map((type) => (
                          <option key={type.value} className="form-control" value={type.value}>
                            {type.name}
                          </option>
                        ))}
                    </select>
                    {errors.quantity && <p className="error-text">{errors.quantity}</p>}

                    <span className="note d-block mt-1">
                      {quantity && `You'll get a ${quantity} for the selected quantity.`}
                    </span>
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

export default CowDungBookYourService;
