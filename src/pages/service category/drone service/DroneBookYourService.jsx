import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import droneServiceIcon from "../../../assets/images/DroneService-icon.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import LocationInput from "../../../components/common components/LocationInput";
import {
  validateArea,
  validateCrop,
  validateFromDate,
  validateSelectTime,
} from "../../../utils/formValidators";
import Time12HourPicker from "../../../components/common components/Time12HourPicker";

import DatePicker from "react-datepicker";
import { format } from "date-fns";

function DroneBookYourService() {
  const filters = useSelector((state) => state.services.DroneServiceMgmtSlice.filters);
  const defaultForm = {
    address: "",
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

  const { address, lat, lng, cropUnderCultivation, areaUnderCultivation, date, time } = formState;

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
                  <div className="col-md-12">
                    <LocationInput
                      value={address}
                      onChange={(val) => setFormState((prev) => ({ ...prev, address: val }))}
                      onSelectLocation={handleSelectLocation}
                      error={errors.address}
                      placeholder="Field Location*"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder="Area Under Cultivation(in acre)*"
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
                    <label className="form-label">
                      From date<span className="required">*</span>
                    </label>
                    <DatePicker
                      selected={date ? new Date(date) : null}
                      onChange={(selectedDate) => {
                        const formatted = format(selectedDate, "yyyy-MM-dd");
                        setFormState((prev) => ({ ...prev, date: formatted }));
                        setErrors((prev) => ({ ...prev, date: "" }));
                      }}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="DD/MM/YYYY"
                      className="form-control custom-datepicker"
                      calendarClassName="custom-calendar"
                      showPopperArrow={false}
                      showOtherMonths
                      fixedHeight
                    />
                    {errors.date && <p className="error-text">{errors.date}</p>}{" "}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      Start time<span className="required">*</span>
                    </label>
                    <Time12HourPicker
                      value={time}
                      onChange={(val) => {
                        setFormState((prev) => ({ ...prev, time: val }));
                        setErrors((prev) => ({ ...prev, time: "" }));
                      }}
                      error={errors.time}
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

export default DroneBookYourService;
