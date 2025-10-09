import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import locationBlack from "../../../assets/images/location-black.svg";
import droneServiceIcon from "../../../assets/images/DroneService-icon.png";
import TopbarModal from "../../../components/common components/TopbarModal";

function DroneBookYourService() {
  const [formState, setFormState] = useState({
    lat: "",
    lng: "",
    cropUnderCultivation: "",
    areaUnderCultivation: "",
    date: "",
    time: "",
  });
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { lat, lng, cropUnderCultivation, areaUnderCultivation, date, time } = formState;

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

    if (!cropUnderCultivation.trim()) {
      newErrors.cropUnderCultivation = "*Name of Crop Under Cultivation is required";
    }

    if (!areaUnderCultivation.trim()) {
      newErrors.areaUnderCultivation = "*Area Under Cultivation is required";
    }

    if (!date) {
      newErrors.date = "*From date is required";
    } else if (new Date(date) < today) {
      newErrors.date = "*From date cannot be in the past";
    }

    if (!time) {
      newErrors.time = "*Start time is required";
    } else if (date) {
      const selectedDate = new Date(date);
      const now = new Date();
      if (selectedDate.toDateString() === now.toDateString()) {
        const [h, m] = time.split(":");
        const selectedTime = new Date();
        selectedTime.setHours(h, m, 0, 0);
        if (selectedTime <= now) {
          newErrors.time = "*Time must be in the future";
        }
      }
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
                  {/*need to remove this after geo api implemented */}
                  <div className="col-md-6">
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
                  <div className="col-md-6">
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
                  {/* <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Farm location*"
                    required
                  />
                </div> */}
                  <div className="col-md-6">
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
                    <label className="form-label">From date*</label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={date}
                      onChange={handleInputChange}
                    />
                    {errors.date && <p className="error-text">{errors.date}</p>}{" "}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Start time*</label>
                    <input
                      type="time"
                      className="form-control"
                      name="time"
                      value={time}
                      onChange={handleInputChange}
                    />
                    {errors.time && <p className="error-text">{errors.time}</p>}
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
