import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import TopbarModal from "../../../components/common components/TopbarModal";
import TransportationIcon from "../../../assets/images/Transportation-icon.png";
import { getVehicleTypesForTransportation } from "../../../reduxtoolkit/slices/service category/transportationService";
import {
  validateCurrentLocation,
  validateDates,
  validateDestinationLocation,
  validateHeight,
  validateItemType,
  validateLength,
  validateNumberOfCattle,
  validateTime,
  validateVegeType,
  validateVehicleType,
  validateWeight,
  validateWidth,
} from "../../../utils/formValidators";

function TransportationBookYourService() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [vehicle, setVehicle] = useState([]);
  const fetchVehicle = async () => {
    try {
      const res = await dispatch(getVehicleTypesForTransportation());
      const { status, data } = res?.payload || {};
      if (status === 200) {
        setVehicle(data?.data || []);
      } else {
        toast(data?.message || "Failed to load Vehicle");
      }
    } catch (error) {
      toast("Something went wrong");
    }
  };
  useEffect(() => {
    fetchVehicle();
  }, []);

  const filters = useSelector((state) => state.services.TransportationServiceMgmtSlice.filters);
  const defaultForm = {
    lat: "",
    lng: "",
    currentLocationOfTransportation: "",
    destinationLocationOfTransportation: "",
    transportItem: "",
    vegetableType: "",
    numberOfCattle: "",
    equipmentDimensions: { lengthCm: "", widthCm: "", heightCm: "" },
    equipmentWeight: "",
    otherWeightKg: "",
    typeOfVehicle: "",
    fromDate: "",
    toDate: "",
    fromTime: "",
    toTime: "",
  };
  const [formState, setFormState] = useState({ ...defaultForm, ...filters });
  const {
    lat,
    lng,
    currentLocationOfTransportation,
    destinationLocationOfTransportation,
    transportItem,
    vegetableType,
    numberOfCattle,
    equipmentDimensions,
    equipmentWeight,
    otherWeightKg,
    typeOfVehicle,
    fromDate,
    toDate,
    fromTime,
    toTime,
  } = formState;
  const { lengthCm, widthCm, heightCm } = equipmentDimensions;

  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "transportItem") {
      setFormState((prev) => ({
        ...prev,
        [name]: value,
        vegetableType: "",
        numberOfCattle: "",
        equipmentDimensions: { lengthCm: "", widthCm: "", heightCm: "" },
        equipmentWeight: "",
        otherWeightKg: "",
      }));
    } else if (["lengthCm", "widthCm", "heightCm"].includes(name)) {
      setFormState((prev) => ({
        ...prev,
        equipmentDimensions: { ...prev.equipmentDimensions, [name]: value },
      }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};

    const transportItemError = validateItemType(transportItem.trim());
    if (transportItemError) newErrors.transportItem = transportItemError;

    if (!transportItemError) {
      const currentLocationError = validateCurrentLocation(currentLocationOfTransportation.trim());
      if (currentLocationError) newErrors.currentLocationOfTransportation = currentLocationError;

      const targetLocationError = validateDestinationLocation(
        destinationLocationOfTransportation.trim()
      );
      if (targetLocationError) newErrors.destinationLocationOfTransportation = targetLocationError;

      const vehicleTypeError = validateVehicleType(typeOfVehicle.trim());
      if (vehicleTypeError) newErrors.typeOfVehicle = vehicleTypeError;

      const dateErrors = validateDates(fromDate, toDate);
      newErrors = { ...newErrors, ...dateErrors };

      const timeError = validateTime(fromDate, toDate, fromTime, toTime);
      newErrors = { ...newErrors, ...timeError };

      if (transportItem === "vegitable") {
        const vegeTypeError = validateVegeType(vegetableType.trim());
        if (vegeTypeError) newErrors.vegetableType = vegeTypeError;
      }

      if (transportItem === "cattle") {
        const cattleError = validateNumberOfCattle(numberOfCattle.trim());
        if (cattleError) newErrors.numberOfCattle = cattleError;
      }

      if (transportItem === "equipment") {
        const lengthError = validateLength(lengthCm.trim());
        if (lengthError) newErrors.lengthCm = lengthError;

        const widthError = validateWidth(widthCm.trim());
        if (widthError) newErrors.widthCm = widthError;

        const heightError = validateHeight(heightCm.trim());
        if (heightError) newErrors.heightCm = heightError;

        const equipWeightError = validateWeight(equipmentWeight.trim());
        if (equipWeightError) newErrors.equipmentWeight = equipWeightError;
      }

      if (transportItem === "other") {
        const objWeightError = validateWeight(otherWeightKg.trim());
        if (objWeightError) newErrors.otherWeightKg = objWeightError;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setDisable(true);
    try {
      let formdata = {
        lat,
        lng,
        currentLocationOfTransportation,
        destinationLocationOfTransportation,
        typeOfVehicle,
        fromDate,
        toDate,
        fromTime,
        toTime,
        transportItem,
      };
      if (transportItem === "vegitable") {
        formdata.vegetableType = vegetableType;
      } else if (transportItem === "cattle") {
        formdata.numberOfCattle = numberOfCattle;
      } else if (transportItem === "equipment") {
        formdata.lengthCm = lengthCm;
        formdata.widthCm = widthCm;
        formdata.heightCm = heightCm;
        formdata.equipmentWeight = equipmentWeight;
      } else if (transportItem === "other") {
        formdata.otherWeightKg = otherWeightKg;
      }
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
          title="Transportation"
          secImage={TransportationIcon}
          navigate="/service-category"
        />
        <div className="dashboard">
          <form onSubmit={handleSubmit}>
            <div className="option-wrapper">
              <div className="form-section">
                <h5 className="book-heading">Book your service</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Transport Item*</label>
                    <select
                      className="form-control"
                      name="transportItem"
                      value={transportItem}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Select goods for your transport
                      </option>
                      <option value="vegitable" className="form-control">
                        Vegetable
                      </option>
                      <option value="cattle" className="form-control">
                        Cattle
                      </option>
                      <option value="equipment" className="form-control">
                        Equipment's
                      </option>
                      <option value="other" className="form-control">
                        Other
                      </option>
                    </select>
                    {errors.transportItem && <p className="error-text">{errors.transportItem}</p>}
                  </div>
                  {transportItem === "vegitable" && (
                    <div className="col-md-6">
                      <label className="form-label">Vegetable Type*</label>
                      <select
                        className="form-control"
                        name="vegetableType"
                        value={vegetableType}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>
                          Select type of vegetable
                        </option>
                        <option value="leafy_stack" className="form-control">
                          Leafy Vegetable- Stack
                        </option>
                        <option value="tomato_cucumber_crate" className="form-control">
                          Tomato, Cucumber- Crate
                        </option>
                        <option value="onion_potato_stack" className="form-control">
                          Onion, Potato- Stack
                        </option>
                        <option value="cabbage_cauliflower_mesh_sack" className="form-control">
                          Cabbage, Cauliflower- Mesh Sack
                        </option>
                        <option value="grains_sack" className="form-control">
                          Grains- Sack
                        </option>
                      </select>
                      {errors.vegetableType && <p className="error-text">{errors.vegetableType}</p>}
                    </div>
                  )}
                  {transportItem === "cattle" && (
                    <div className="col-md-6">
                      <label className="form-label">Number of cattle*</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Number of cattle"
                        name="numberOfCattle"
                        value={numberOfCattle}
                        onChange={handleInputChange}
                      />
                      {errors.numberOfCattle && (
                        <p className="error-text">{errors.numberOfCattle}</p>
                      )}
                    </div>
                  )}
                  {transportItem === "equipment" && (
                    <>
                      <div className="col-md-6">
                        <label className="form-label">Equipment Dimension*</label>
                        <div className="row">
                          <div className="col-md-4">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Length (cm)"
                              name="lengthCm"
                              value={lengthCm}
                              onChange={handleInputChange}
                            />
                            {errors.lengthCm && <p className="error-text">{errors.lengthCm}</p>}
                          </div>
                          <div className="col-md-4">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Width (cm)"
                              name="widthCm"
                              value={widthCm}
                              onChange={handleInputChange}
                            />
                            {errors.widthCm && <p className="error-text">{errors.widthCm}</p>}
                          </div>
                          <div className="col-md-4">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Height (cm)"
                              name="heightCm"
                              value={heightCm}
                              onChange={handleInputChange}
                            />
                            {errors.heightCm && <p className="error-text">{errors.heightCm}</p>}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Equipment Weight*</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Equipment Weight(in Kg)"
                          name="equipmentWeight"
                          value={equipmentWeight}
                          onChange={handleInputChange}
                        />
                        {errors.equipmentWeight && (
                          <p className="error-text">{errors.equipmentWeight}</p>
                        )}
                      </div>
                    </>
                  )}
                  {transportItem === "other" && (
                    <div className="col-md-6">
                      <label className="form-label">Object Weight*</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Weight of Object(in Kg)"
                        name="otherWeightKg"
                        value={otherWeightKg}
                        onChange={handleInputChange}
                      />
                      {errors.otherWeightKg && <p className="error-text">{errors.otherWeightKg}</p>}
                    </div>
                  )}
                  <div className="col-md-3">
                    <label className="form-label">Current location*</label>
                    <PlacesAutocomplete
                      value={currentLocationOfTransportation}
                      onChange={(address) =>
                        setFormState((prev) => ({
                          ...prev,
                          currentLocationOfTransportation: address,
                        }))
                      }
                      onSelect={async (address) => {
                        try {
                          const results = await geocodeByAddress(address);
                          const { lat, lng } = await getLatLng(results[0]);
                          setFormState((prev) => ({
                            ...prev,
                            currentLocationOfTransportation: address,
                            lat,
                            lng,
                          }));
                          setErrors((prev) => ({ ...prev, currentLocationOfTransportation: "" }));
                        } catch (error) {
                          console.error("Error getting location details:", error);
                        }
                      }}
                    >
                      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                          <input
                            {...getInputProps({
                              placeholder: "Enter current location",
                              className: "form-control",
                              name: "currentLocationOfTransportation",
                            })}
                          />
                          <div className="autocomplete-dropdown">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion, index) => {
                              const className = suggestion.active
                                ? "suggestion-item--active"
                                : "suggestion-item";
                              return (
                                <div
                                  key={index}
                                  {...getSuggestionItemProps(suggestion, { className })}
                                  style={{
                                    backgroundColor: suggestion.active ? "#f0f0f0" : "#fff",
                                    padding: "8px",
                                    cursor: "pointer",
                                  }}
                                >
                                  {suggestion.description}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                    {errors.currentLocationOfTransportation && (
                      <p className="error-text">{errors.currentLocationOfTransportation}</p>
                    )}
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Travel location*</label>
                    <PlacesAutocomplete
                      value={destinationLocationOfTransportation}
                      onChange={(address) =>
                        setFormState((prev) => ({
                          ...prev,
                          destinationLocationOfTransportation: address,
                        }))
                      }
                      onSelect={(address) => {
                        setFormState((prev) => ({
                          ...prev,
                          destinationLocationOfTransportation: address,
                        }));
                        setErrors((prev) => ({ ...prev, destinationLocationOfTransportation: "" }));
                      }}
                    >
                      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                          <input
                            {...getInputProps({
                              placeholder: "Enter Travel location",
                              className: "form-control",
                              name: "destinationLocationOfTransportation",
                            })}
                          />
                          <div className="autocomplete-dropdown">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion, index) => {
                              const className = suggestion.active
                                ? "suggestion-item--active"
                                : "suggestion-item";
                              return (
                                <div
                                  key={index}
                                  {...getSuggestionItemProps(suggestion, { className })}
                                  style={{
                                    backgroundColor: suggestion.active ? "#f0f0f0" : "#fff",
                                    padding: "8px",
                                    cursor: "pointer",
                                  }}
                                >
                                  {suggestion.description}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                    {errors.destinationLocationOfTransportation && (
                      <p className="error-text">{errors.destinationLocationOfTransportation}</p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Vehicle Type*</label>
                    <select
                      className="form-control"
                      name="typeOfVehicle"
                      value={typeOfVehicle}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Type of vehicle*
                      </option>
                      {vehicle.map((type) => (
                        <option value={type} className="form-control" key={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.typeOfVehicle && <p className="error-text">{errors.typeOfVehicle}</p>}
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
                    {errors.fromTime && <p className="error-text">{errors.fromTime}</p>}
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

export default TransportationBookYourService;
