import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import locationBlack from "../../../assets/images/location-black.svg";
import TopbarModal from "../../../components/common components/TopbarModal";
import ExcavationIcon from "../../../assets/images/Excavation-icon.png";

function ExcavationBookYourService() {
  const equipmentTypesOption = [
    "JCB",
    "Excavator",
    "Wheel Loader",
    "Dozer",
    "Dump",
    "Mini Excavator",
    "Long Reach Excavator",
  ];

  const [formState, setFormState] = useState({
    lat: "",
    lng: "",
    equipmentTypes: "",
    fromDate: "",
    toDate: "",
    fromTime: "",
    duration: "",
  });
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { lat, lng, equipmentTypes, fromDate, toDate, fromTime, duration } = formState;

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
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!lat.trim()) {
      newErrors.lat = "*Latitude is required";
    } else if (isNaN(lat) || lat < -90 || lat > 90) {
      newErrors.lat = "*Latitude must be a number between -90 and 90";
    }

    if (!lng.trim()) {
      newErrors.lng = "*Longitude is required";
    } else if (isNaN(lng) || lng < -180 || lng > 180) {
      newErrors.lng = "*Longitude must be a number between -180 and 180";
    }

    if (!equipmentTypes) {
      newErrors.equipmentTypes = "*Specific Service is required";
    }

    if (!fromDate) {
      newErrors.fromDate = "*From date is required";
    } else if (new Date(fromDate) < today) {
      newErrors.fromDate = "*From date cannot be in the past";
    }

    if (!toDate) {
      newErrors.toDate = "*To date is required";
    } else if (new Date(toDate) < today) {
      newErrors.toDate = "*To date cannot be in the past";
    }

    if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
      newErrors.toDate = "*To date cannot be earlier than from date";
    }

    if (!fromTime) {
      newErrors.fromTime = "*From time is required";
    } else if (fromDate) {
      const selectedDate = new Date(fromDate);
      const now = new Date();
      if (selectedDate.toDateString() === now.toDateString()) {
        const [h, m] = fromTime.split(":");
        const selectedTime = new Date();
        selectedTime.setHours(h, m, 0, 0);
        if (selectedTime <= now) {
          newErrors.fromTime = "*Time must be in the future";
        }
      }
    }

    if (!duration.trim()) {
      newErrors.duration = "*Duration is required";
    } else if (isNaN(duration) || duration <= 0) {
      newErrors.duration = "*Duration must be a positive number";
    }

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
      equipmentTypes: equipmentTypes,
      fromDate,
      toDate,
      fromTime,
      duration: duration.trim(),
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
          title="Excavation"
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
                  <div className="col-md-6">
                    <select
                      className="form-control"
                      name="equipmentTypes"
                      value={equipmentTypes}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Select Specific Service*
                      </option>
                      {equipmentTypesOption.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    {errors.equipmentTypes && <p className="error-text">{errors.equipmentTypes}</p>}
                  </div>
                </div>
                <h5 className="book-heading">Book Services date &amp; time</h5>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">From date</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="From date*"
                      name="fromDate"
                      value={fromDate}
                      onChange={handleInputChange}
                    />
                    {errors.fromDate && <p className="error-text">{errors.fromDate}</p>}
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Till date</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Till date*"
                      name="toDate"
                      value={toDate}
                      onChange={handleInputChange}
                    />
                    {errors.toDate && <p className="error-text">{errors.toDate}</p>}
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">From time</label>
                    <input
                      type="time"
                      className="form-control"
                      placeholder="From time*"
                      name="fromTime"
                      value={fromTime}
                      onChange={handleInputChange}
                    />
                    {errors.fromTime && <p className="error-text">{errors.fromTime}</p>}
                  </div>
                </div>
                <h5 className="book-heading">Tentative Duration</h5>
                <div className="row">
                  <div className="col-md-12">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter tentative hours(In hours)*"
                      name="duration"
                      value={duration}
                      onChange={handleInputChange}
                    />
                    {errors.duration && <p className="error-text">{errors.duration}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="available-service-btn">
              <button disabled={disable}>See Available Service</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ExcavationBookYourService;
