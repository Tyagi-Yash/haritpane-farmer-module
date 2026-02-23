import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import TopbarModal from "../../../components/common components/TopbarModal";
import AugerServiceIcon from "../../../assets/images/AugerService-icon.png";
import LocationInput from "../../../components/common components/LocationInput";
import {
  validateDurationFields,
  validateFromDate,
  validateSelectTime,
} from "../../../utils/formValidators";
import Time12HourPicker from "../../../components/common components/Time12HourPicker";

import DatePicker from "react-datepicker";
import { format } from "date-fns";

function AugerBookYourService() {
  const filters = useSelector((state) => state.services.AugerServiceMgmtSlice.filters);
  const defaultForm = {
    address: "",
    lat: "",
    lng: "",
    date: "",
    time: "",
    hours: "",
    minutes: "",
  };
  const [formState, setFormState] = useState({ ...defaultForm, ...filters });
  const { address, lat, lng, date, time, hours, minutes } = formState;
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

    const dateErrors = validateFromDate(date);
    if (dateErrors) newErrors.date = dateErrors;

    const timeError = validateSelectTime(date, time);
    if (timeError) newErrors.time = timeError;

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
      address,
      lat: lat.trim(),
      lng: lng.trim(),
      date,
      time,
      ...((hours || minutes) && {
        estimatedTime: Number(totalDuration).toFixed(2),
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
          title="Auger Service"
          secImage={AugerServiceIcon}
          navigate="/service-category"
        />
        <div className="dashboard">
          <form onSubmit={handleSubmit}>
            <div className="option-wrapper">
              <div className="form-section">
                <h5 className="book-heading">Book your service</h5>
                <div className="col-md-12 mb-3">
                  <LocationInput
                    value={address}
                    onChange={(val) => setFormState((prev) => ({ ...prev, address: val }))}
                    onSelectLocation={handleSelectLocation}
                    error={errors.address}
                    placeholder="Job Location*"
                  />
                </div>
                <h5 className="book-heading">Estimate Job Duration</h5>
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
                <h5 className="book-heading">Book Services date &amp; time</h5>
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
                    {errors.date && <p className="error-text">{errors.date}</p>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      Select time<span className="required">*</span>
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

export default AugerBookYourService;
