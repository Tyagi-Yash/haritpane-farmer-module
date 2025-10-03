import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import locationBlack from "../../../assets/images/location-black.svg";
import ElectrostaticSprayingIcon from "../../../assets/images/Electrostatic-Spraying-icon.png";
import TopbarModal from "../../../components/common components/TopbarModal";

function ElectrostaticBookYourService() {
  const [formState, setFormState] = useState({
    lat: "",
    lng: "",
    areaUnderCultivation: "",
    fromDate: "",
    fromTime: "",
  });
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { lat, lng, areaUnderCultivation, fromDate, fromTime } = formState;

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

    if (!areaUnderCultivation.trim()) {
      newErrors.areaUnderCultivation = "*Area Under Cultivation is required";
    }

    if (!fromDate) {
      newErrors.fromDate = "*From date is required";
    } else if (new Date(fromDate) < today) {
      newErrors.fromDate = "*From date cannot be in the past";
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
      areaUnderCultivation: areaUnderCultivation.trim(),
      fromDate,
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
          title="Electrostatic Spraying"
          secImage={ElectrostaticSprayingIcon}
          navigate="/service-category"
        />
        <div className="dashboard">
          <form onSubmit={handleSubmit}>
            <div className="option-wrapper">
              <div className="form-section">
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
                <h5 className="book-heading">Book Services date &amp; time</h5>
                <div className="row g-3">
                  <div className="col-md-6">
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
                  <div className="col-md-6">
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

export default ElectrostaticBookYourService;
