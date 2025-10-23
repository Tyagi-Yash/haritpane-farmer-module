import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import locationBlack from "../../../assets/images/location-black.svg";
import TopbarModal from "../../../components/common components/TopbarModal";
import labouricon from "../../../assets/images/labour-icon.png";
import {
  validateArea,
  validateCrop,
  validateDates,
  validateLabourType,
  validateLat,
  validateLng,
  validateNumberOfLabour,
  validateTime,
} from "../../../utils/formValidators";
import {
  cropValueEnable,
  LabourTypes,
} from "../../../constants/service category/labor requirement/labour type data";
import { useSelector } from "react-redux";

function LaborBookYourService() {
  const filters = useSelector((state) => state.services.LabourServiceMgmtSlice.filters);
  const defaultForm = {
    lat: "",
    lng: "",
    labourType: "",
    numberOfLabour: "",
    typeOfCrop: "",
    areaUnderCultivation: "",
    fromDate: "",
    toDate: "",
    fromTime: "",
    toTime: "",
  };
  const [formState, setFormState] = useState({ ...defaultForm, ...filters });

  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});

  const {
    lat,
    lng,
    labourType,
    numberOfLabour,
    typeOfCrop,
    areaUnderCultivation,
    fromDate,
    toDate,
    fromTime,
    toTime,
  } = formState;

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

    const numberOfLabourError = validateNumberOfLabour(numberOfLabour.trim());
    if (numberOfLabourError) newErrors.numberOfLabour = numberOfLabourError;

    const labourTypeError = validateLabourType(labourType);
    if (labourTypeError) newErrors.labourType = labourTypeError;

    const areaError =
      cropValueEnable.includes(labourType) && validateArea(areaUnderCultivation.trim());
    if (areaError) newErrors.areaUnderCultivation = areaError;

    const cropError = cropValueEnable.includes(labourType) && validateCrop(typeOfCrop.trim());
    if (cropError) newErrors.typeOfCrop = cropError;

    const dateErrors = validateDates(fromDate, toDate);
    newErrors = { ...newErrors, ...dateErrors };

    const timeError = validateTime(fromDate, toDate, fromTime, toTime);
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
      labourType,
      numberOfLabour,
      fromDate,
      toDate,
      fromTime,
      toTime,
      ...(cropValueEnable.includes(labourType) && { typeOfCrop: typeOfCrop.trim() }),
      ...(cropValueEnable.includes(labourType) && {
        areaUnderCultivation: areaUnderCultivation.trim(),
      }),
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
          title="Labor Requirement"
          secImage={labouricon}
          navigate="/service-category"
        />
        <div className="dashboard">
          <form onSubmit={handleSubmit}>
            <div className="option-wrapper">
              <div className="form-section">
                <h5 className="book-heading">Book your service</h5>
                <div className="row g-3">
                  <div className="col-md-4">
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
                  <div className="col-md-4">
                    <select
                      className="form-control"
                      name="labourType"
                      value={labourType}
                      onChange={handleInputChange}
                    >
                      <option className="form-control" value="" disabled>
                        Labour for?
                      </option>
                      {LabourTypes.map((type) => (
                        <option key={type.value} className="form-control" value={type.value}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                    {errors.labourType && <p className="error-text">{errors.labourType}</p>}
                  </div>
                  <div className="col-md-4">
                    <input
                      type="number"
                      min={1}
                      placeholder="Number Of Labour*"
                      className="form-control"
                      value={numberOfLabour}
                      name="numberOfLabour"
                      onChange={handleInputChange}
                    />
                    {errors.numberOfLabour && <p className="error-text">{errors.numberOfLabour}</p>}
                  </div>{" "}
                  {cropValueEnable.includes(labourType) && (
                    <>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Crop Under Cultivation*"
                          value={typeOfCrop}
                          name="typeOfCrop"
                          onChange={handleInputChange}
                        />
                        {errors.typeOfCrop && <p className="error-text">{errors.typeOfCrop}</p>}
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Area Under Cultivation(per acre)*"
                          value={areaUnderCultivation}
                          name="areaUnderCultivation"
                          onChange={handleInputChange}
                        />
                        {errors.areaUnderCultivation && (
                          <p className="error-text">{errors.areaUnderCultivation}</p>
                        )}
                      </div>
                    </>
                  )}
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
                    />{" "}
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
                    />{" "}
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

export default LaborBookYourService;
