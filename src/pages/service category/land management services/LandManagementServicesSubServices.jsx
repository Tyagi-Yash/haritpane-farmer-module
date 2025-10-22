import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import locationBlack from "../../../assets/images/location-black.svg";
import onlyAttachment from "../../../assets/images/only-attachment.png";
import TractorandAttachment from "../../../assets/images/TractorandAttachment.png";
import landManagementTractorServices from "../../../assets/images/land-management-tractor-services.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import {
  validateDates,
  validateLat,
  validateLng,
  validateSelectTime,
} from "../../../utils/formValidators";

function LandManagementServicesSubServices() {
  const [formState, setFormState] = useState({
    selectSubCategory: "trackter_attachments",
    lat: "",
    lng: "",
    hpOfTractor: "",
    selectAttachment: "",
    fromDate: "",
    toDate: "",
    fromTime: "",
  });
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { selectSubCategory, lat, lng, hpOfTractor, selectAttachment, fromDate, toDate, fromTime } =
    formState;

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

    if (!selectAttachment) {
      newErrors.selectAttachment = "*Please select an attachment";
    }

    if (selectSubCategory === "trackter_attachments" && !hpOfTractor) {
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
      selectSubCategory,
      lat: lat.trim(),
      lng: lng.trim(),
      selectAttachment,
      fromDate,
      toDate,
      fromTime,
      ...(selectSubCategory === "trackter_attachments" && { hpOfTractor }),
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
                        value="trackter_attachments"
                        className="radio-input"
                        onChange={handleInputChange}
                        defaultChecked
                      />
                      <div className="radio-card">
                        <img src={TractorandAttachment} alt="Tractor & Attachment" />
                        <span className="radio-label">Tractor &amp; Attachment</span>
                      </div>
                    </label>
                  </div>
                  <div className="col">
                    <label id="attachmentOption" className="tile">
                      <input
                        type="radio"
                        name="selectSubCategory"
                        value="only_attachments"
                        className="radio-input"
                        onChange={handleInputChange}
                      />
                      <div className="radio-card">
                        <img src={onlyAttachment} alt="Only Attachment" />
                        <span className="radio-label">Only Attachment</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
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
                  {selectSubCategory === "trackter_attachments" && (
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
                  <div className="col-md-4">
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
                  <div className="col-md-4">
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
