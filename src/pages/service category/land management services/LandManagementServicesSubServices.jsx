import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import onlyAttachment from "../../../assets/images/only-attachment.png";
import TractorandAttachment from "../../../assets/images/TractorandAttachment.png";
import landManagementTractorServices from "../../../assets/images/land-management-tractor-services.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import { validateDates, validateSelectTime } from "../../../utils/formValidators";
import LocationInput from "../../../components/common components/LocationInput";
import Time12HourPicker from "../../../components/common components/Time12HourPicker";

import DatePicker from "react-datepicker";
import { format } from "date-fns";

function LandManagementServicesSubServices() {
  const filters = useSelector((state) => state.services.LandServiceMgmtSlice.filters);
  const defaultForm = {
    selectSubCategory: "tracktor_attachments",
    address: "",
    lat: "",
    lng: "",
    hpOfTractor: "",
    selectAttachment: "",
    fromDate: "",
    toDate: "",
    fromTime: "",
  };
  const [formState, setFormState] = useState({ ...defaultForm, ...filters });
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const {
    selectSubCategory,
    address,
    lat,
    lng,
    hpOfTractor,
    selectAttachment,
    fromDate,
    toDate,
    fromTime,
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

    if (!selectAttachment) {
      newErrors.selectAttachment = "*Please select an attachment";
    }

    if (selectSubCategory === "tracktor_attachments" && !hpOfTractor) {
      newErrors.hpOfTractor = "*Please select tractor category";
    }

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
      address,
      selectSubCategory,
      lat: lat.trim(),
      lng: lng.trim(),
      selectAttachment,
      fromDate,
      toDate,
      fromTime,
      ...(selectSubCategory === "tracktor_attachments" && { hpOfTractor }),
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
          title="Land Management Services"
          secImage={landManagementTractorServices}
          navigate="/service-category"
        />
        <div className="dashboard">
          <form>
            <div className="option-wrapper">
              <h3 className="main-heading">Sub Services</h3>
              <div className="sub-service-wrapper">
                <div className="row">
                  <div className="col">
                    <label id="tractorOption" className="tile">
                      <input
                        type="radio"
                        name="selectSubCategory"
                        value="tracktor_attachments"
                        className="radio-input"
                        onChange={handleInputChange}
                        checked={selectSubCategory === "tracktor_attachments"}
                      />
                      <div className="radio-card">
                        <img src={TractorandAttachment} alt="Tractor & Attachment" />
                        <span className="radio-label">Tractor &amp; Attachment</span>
                      </div>
                    </label>
                  </div>
                  <div className="col">
                    {/* <label id="attachmentOption" className="tile">
                      <input
                        type="radio"
                        name="selectSubCategory"
                        value="only_attachments"
                        className="radio-input"
                        onChange={handleInputChange}
                        checked={selectSubCategory === "only_attachments"}
                      />
                      <div className="radio-card">
                        <img src={onlyAttachment} alt="Only Attachment" />
                        <span className="radio-label">Only Attachment</span>
                      </div>
                    </label> */}
                  </div>
                </div>
              </div>
            </div>
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
                  {selectSubCategory === "tracktor_attachments" && (
                    <div className="col-md-4">
                      <select
                        className="form-control"
                        name="hpOfTractor"
                        value={hpOfTractor}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>
                          Select Tractor Category*
                        </option>
                        <option value="Under_20">Under 20 hp</option>
                        <option value="21-30">21-30 hp</option>
                        <option value="31-40">31-40 hp</option>
                        <option value="41-45">41-45 hp</option>
                        <option value="46-50">46-50 hp</option>
                        <option value="Above_50">Above 50 hp</option>
                      </select>
                      {errors.hpOfTractor && <p className="error-text">{errors.hpOfTractor}</p>}
                    </div>
                  )}
                  <div className="col-md-4">
                    <select
                      className="form-control"
                      name="selectAttachment"
                      value={selectAttachment}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Select attachment*
                      </option>
                      <option value="Plough">Plough</option>
                      <option value="Cultivator">Cultivator</option>
                      <option value="Sprayer">Sprayer</option>
                      <option value="Power_Tiller">Power Tiller</option>
                      <option value="Rotavator">Rotavator</option>
                      <option value="Baler">Baler</option>
                      <option value="Harrow">Harrow</option>
                      <option value="Super_Seeder">Super Seeder</option>
                      <option value="Seed_Drill">Seed Drill</option>
                      <option value="Trolly">Trolly</option>
                      <option value="Thresher">Thresher</option>
                    </select>
                    {errors.selectAttachment && (
                      <p className="error-text">{errors.selectAttachment}</p>
                    )}
                  </div>
                </div>
                <h5 className="book-heading">Book Services date &amp; time</h5>
                <div className="row g-3">
                  <div className="col-md-4">
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
                  <div className="col-md-4">
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
              </div>
            </div>
            <div className="available-service-btn">
              <button type="submit" onClick={handleSubmit} disabled={disable}>
                See Available Service
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LandManagementServicesSubServices;
