import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";

import TopbarModal from "../../../components/common components/TopbarModal";
import ExcavationIcon from "../../../assets/images/Excavation-icon.png";
import { equipmentTypesOption } from "../../../constants/service category/excavation service/equipmentOption";
import LocationInput from "../../../components/common components/LocationInput";
import {
  validateDates,
  validateDurationFields,
  validateEquipmentTypes,
  validateSelectTime,
} from "../../../utils/formValidators";
import Time12HourPicker from "../../../components/common components/Time12HourPicker";

function ExcavationBookYourService() {
  const filters = useSelector((state) => state.services.ExcavationServiceMgmtSlice.filters);
  const defaultForm = {
    address: "",
    lat: "",
    lng: "",
    sectectEquipmentType: "",
    fromDate: "",
    toDate: "",
    fromTime: "",
    hours: "",
    minutes: "",
  };
  const [formState, setFormState] = useState({ ...defaultForm, ...filters });

  const { address, lat, lng, sectectEquipmentType, fromDate, toDate, fromTime, hours, minutes } =
    formState;
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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

    const equipmentError = validateEquipmentTypes(sectectEquipmentType);
    if (equipmentError) newErrors.sectectEquipmentType = equipmentError;

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
      sectectEquipmentType: sectectEquipmentType,
      fromDate,
      toDate,
      fromTime,
      duration: Number(totalDuration).toFixed(2),
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
          title="Earth Movers"
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
                    <LocationInput
                      value={address}
                      onChange={(val) => setFormState((prev) => ({ ...prev, address: val }))}
                      onSelectLocation={handleSelectLocation}
                      error={errors.address}
                      placeholder="Farm Location*"
                    />
                  </div>
                  <div className="col-md-6 excavation-types">
                    <Dropdown
                      onSelect={(key) => {
                        setFormState((prev) => ({ ...prev, sectectEquipmentType: key }));
                        setErrors((prev) => ({ ...prev, sectectEquipmentType: "" }));
                      }}
                    >
                      <Dropdown.Toggle className="btn w-100 dropdown-toggle">
                        {sectectEquipmentType
                          ? equipmentTypesOption.find((o) => o.value === sectectEquipmentType)?.name
                          : "Select Specific Service*"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {equipmentTypesOption.map((option) => (
                          <Dropdown.Item
                            key={option.name}
                            eventKey={option.value}
                            className="custom-item"
                          >
                            <span className="Icon">
                              <img src={option.image} alt={option.name} />
                            </span>
                            <span className="DText">{option.name}</span>
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    {errors.sectectEquipmentType && (
                      <p className="error-text">{errors.sectectEquipmentType}</p>
                    )}
                  </div>
                </div>
                <h5 className="book-heading">Book Services date &amp; time</h5>
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
                    <Time12HourPicker
                      value={fromTime}
                      onChange={(val) => {
                        setFormState((prev) => ({ ...prev, fromTime: val }));
                        setErrors((prev) => ({ ...prev, fromTime: "" }));
                      }}
                      error={errors.fromTime}
                    />
                  </div>
                </div>
                <h5 className="book-heading">Tentative Duration</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Hours"
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
                      placeholder="Minutes (0-59)"
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
