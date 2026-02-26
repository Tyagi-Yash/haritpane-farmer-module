import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import TopbarModal from "../../../components/common components/TopbarModal";
import labouricon from "../../../assets/images/labour-icon.png";
import LocationInput from "../../../components/common components/LocationInput";
import {
  validateArea,
  validateCrop,
  validateDates,
  validateFromTimeOnly,
  validateLabourType,
  validateNumberOfLabour,
} from "../../../utils/formValidators";
import {
  cropValueEnable,
  LabourTypes,
} from "../../../constants/service category/labor requirement/labour type data";
import Time12HourPicker from "../../../components/common components/Time12HourPicker";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

function LaborBookYourService() {
  const navigate = useNavigate();
  const filters = useSelector((state) => state.services.LabourServiceMgmtSlice.filters);
  const defaultForm = {
    address: "",
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
    address,
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

  const handleSelectLocation = ({ address, lat, lng }) => {
    setFormState((prev) => ({ ...prev, address, lat, lng }));
    setErrors((prev) => ({ ...prev, address: "" }));
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
      address,
      lat: lat.trim(),
      lng: lng.trim(),
      labourType,
      numberOfLabour: numberOfLabour.trim(),
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
          title="Labour Requirement"
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
                    <LocationInput
                      value={address}
                      onChange={(val) => setFormState((prev) => ({ ...prev, address: val }))}
                      onSelectLocation={handleSelectLocation}
                      error={errors.address}
                      placeholder="Farm Location*"
                    />
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
                  </div>
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
                          placeholder="Area Under Cultivation(in acre)*"
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
                    <label className="form-label">
                      From date<span className="required">*</span>
                    </label>
                    <DatePicker
                      selected={fromDate ? new Date(fromDate) : null}
                      onChange={(selectedDate) => {
                        const formatted = format(selectedDate, "yyyy-MM-dd");
                        setFormState((prev) => ({ ...prev, fromDate: formatted }));
                        setErrors((prev) => ({ ...prev, fromDate: "" }));
                      }}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="DD/MM/YYYY"
                      className="form-control custom-datepicker"
                      calendarClassName="custom-calendar"
                      showPopperArrow={false}
                      showOtherMonths
                      fixedHeight
                    />
                    {errors.fromDate && <p className="error-text">{errors.fromDate}</p>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      Till date<span className="required">*</span>
                    </label>
                    <DatePicker
                      selected={toDate ? new Date(toDate) : null}
                      onChange={(selectedDate) => {
                        const formatted = format(selectedDate, "yyyy-MM-dd");
                        setFormState((prev) => ({ ...prev, toDate: formatted }));
                        setErrors((prev) => ({ ...prev, toDate: "" }));
                      }}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="DD/MM/YYYY"
                      className="form-control custom-datepicker"
                      calendarClassName="custom-calendar"
                      showPopperArrow={false}
                      showOtherMonths
                      fixedHeight
                    />
                    {errors.toDate && <p className="error-text">{errors.toDate}</p>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      Start time<span className="required">*</span>
                    </label>
                    <Time12HourPicker
                      value={fromTime}
                      onChange={(val) => {
                        setFormState((prev) => ({ ...prev, fromTime: val }));
                        setErrors((prev) => ({ ...prev, fromTime: "" }));
                      }}
                      error={errors.fromTime}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">End time</label>
                    <Time12HourPicker
                      value={toTime}
                      onChange={(val) => {
                        setFormState((prev) => ({ ...prev, toTime: val }));
                        setErrors((prev) => ({ ...prev, toTime: "" }));
                      }}
                      error={errors.toTime}
                    />
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
