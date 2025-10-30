import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import locationBlack from "../../../assets/images/location-black.svg";
import TractorHarvester from "../../../assets/images/TractorHarvester.png";
import StandardHarvesterCombined from "../../../assets/images/StandardHarvesterCombined.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import harvestorIcon from "../../../assets/images/harvestor-icon.png";
import {
  validateArea,
  validateCrop,
  validateDates,
  validateSelectTime,
} from "../../../utils/formValidators";
import { getAllCroptypes } from "../../../reduxtoolkit/slices/service category/harvestorServices";

function HarvestorSubServices() {
  const filters = useSelector((state) => state.services.HarvestorServiceMgmtSlice.filters);
  const defaultForm = {
    selectSubCategory: "combine_harvester",
    address: "",
    lat: "",
    lng: "",
    typeOfCrop: "",
    areaUnderCultivation: "",
    fromDate: "",
    toDate: "",
    fromTime: "",
  };
  const [formState, setFormState] = useState({ ...defaultForm, ...filters });
  const [cropTypes, setCropTypes] = useState([]);
  const dispatch = useDispatch();
  const fetchCropType = async () => {
    try {
      const res = await dispatch(getAllCroptypes());
      const { status, data } = res?.payload || {};
      if (status === 200) {
        setCropTypes(data?.data || []);
      } else {
        toast(data?.message || "Failed to load Crop Types");
      }
    } catch (error) {
      toast("Something went wrong");
    }
  };
  useEffect(() => {
    fetchCropType();
  }, []);

  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const {
    selectSubCategory,
    address,
    lat,
    lng,
    typeOfCrop,
    areaUnderCultivation,
    fromDate,
    toDate,
    fromTime,
  } = formState;

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

    const cropError = validateCrop(typeOfCrop.trim());
    if (cropError) newErrors.typeOfCrop = cropError;

    const areaError = validateArea(areaUnderCultivation.trim());
    if (areaError) newErrors.areaUnderCultivation = areaError;

    const dateErrors = validateDates(fromDate, toDate);
    newErrors = { ...newErrors, ...dateErrors };

    const timeError = validateSelectTime(fromDate, fromTime);
    if (timeError) newErrors.fromTime = timeError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setDisable(true);
    const formdata = {
      selectSubCategory,
      lat: lat.trim(),
      lng: lng.trim(),
      typeOfCrop: typeOfCrop.trim(),
      areaUnderCultivation: areaUnderCultivation.trim(),
      fromDate,
      toDate,
      fromTime,
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
          title="Harvester"
          secImage={harvestorIcon}
          navigate="/service-category"
        />
        <div className="dashboard">
          <form onSubmit={handleSubmit}>
            <div className="option-wrapper">
              <h3 className="main-heading">Sub Services</h3>
              <div className="sub-service-wrapper">
                <div className="row">
                  <div className="col">
                    <label id="tractorOption" className="tile">
                      <input
                        type="radio"
                        name="selectSubCategory"
                        value="combine_harvester"
                        className="radio-input"
                        onChange={handleInputChange}
                        checked={selectSubCategory === "combine_harvester"}
                      />
                      <div className="radio-card">
                        <img src={StandardHarvesterCombined} alt="Tractor & Attachment" />
                        <span className="radio-label">Standard Harvester Combined</span>
                      </div>
                    </label>
                  </div>
                  <div className="col">
                    <label id="attachmentOption" className="tile">
                      <input
                        type="radio"
                        name="selectSubCategory"
                        value="tractor_harvester"
                        className="radio-input"
                        onChange={handleInputChange}
                        checked={selectSubCategory === "tractor_harvester"}
                      />
                      <div className="radio-card">
                        <img src={TractorHarvester} alt="Only Attachment" />
                        <span className="radio-label">Tractor Harvester</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="option-wrapper">
              <div className="form-section">
                <h5 className="mb-4 book-heading">Book your service</h5>
                <div className="row g-3">
                  <div className="col-md-4">
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
                  <div className="col-md-4">
                    <select
                      className="form-control"
                      name="typeOfCrop"
                      value={typeOfCrop}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Name of Crop under Cultivation*
                      </option>
                      {cropTypes.map((type) => (
                        <option value={type} className="form-control" key={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.typeOfCrop && <p className="error-text">{errors.typeOfCrop}</p>}
                  </div>
                  <div className="col-md-4">
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
                </div>
                <h5 className="mt-5 mb-4 book-heading">Book Services date &amp; time</h5>
                <div className="row g-3">
                  <div className="col-md-4">
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
                  <div className="col-md-4">
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
                  <div className="col-md-4">
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
                </div>
              </div>
            </div>
            <div className="available-service-btn">
              <button type="submit" disabled={disable}>
                See Available Service
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HarvestorSubServices;
