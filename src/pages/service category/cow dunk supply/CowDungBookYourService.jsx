import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import TopbarModal from "../../../components/common components/TopbarModal";
import CowDunkSupplyIcon from "../../../assets/images/CowDunkSupply-icon.png";
import LocationInput from "../../../components/common components/LocationInput";
import {
  validateCowDunkType,
  validateFromDate,
  validateQuantity,
  validateSelectTime,
} from "../../../utils/formValidators";
import {
  dryDungOptions,
  wetDungOptions,
} from "../../../constants/service category/cow dung service/cowDungOptions";
import { createCowDungJobOrder } from "../../../reduxtoolkit/slices/service category/cowDunkServices";

function CowDungBookYourService() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultForm = {
    currentLocation: "",
    lat: "",
    lng: "",
    cowDunkType: "",
    cowDunkVehicleType: "",
    fromDate: "",
    startTime: "",
  };

  const [formState, setFormState] = useState(defaultForm);

  const { currentLocation, lat, lng, fromDate, startTime, cowDunkVehicleType, cowDunkType } =
    formState;
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSelectLocation = ({ address, lat, lng }) => {
    setFormState((prev) => ({
      ...prev,
      currentLocation: address,
      lat,
      lng,
    }));
    setErrors((prev) => ({ ...prev, currentLocation: "" }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormState((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "cowDunkType" ? { cowDunkVehicleType: "" } : {}),
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!currentLocation || !lat || !lng)
      newErrors.currentLocation = "Please select a valid location.";

    const typeError = validateCowDunkType(cowDunkType);
    if (typeError) newErrors.cowDunkType = typeError;

    const quantityError = cowDunkType && validateQuantity(cowDunkVehicleType);
    if (quantityError) newErrors.cowDunkVehicleType = quantityError;

    const dateErrors = validateFromDate(fromDate);
    if (dateErrors) newErrors.fromDate = dateErrors;

    const timeError = validateSelectTime(fromDate, startTime);
    if (timeError) newErrors.startTime = timeError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setDisable(true);

    let cowDunkQuantity = "";
    if (cowDunkType === "Dry") {
      cowDunkQuantity = cowDunkVehicleType === "Trolley" ? "1-2" : "5-6";
    } else if (cowDunkType === "Wet") {
      cowDunkQuantity = cowDunkVehicleType === "Trolley" ? "3-4" : "10-12";
    }
    const formdata = {
      jobOrderFor: "cowdung",
      currentLocationCoordinates: {
        type: "Point",
        coordinates: [Number(lng), Number(lat)],
      },
      currentLocation,
      cowDunkType,
      cowDunkVehicleType,
      cowDunkQuantity,
      fromDate,
      startTime,
    };
    try {
      const res = await dispatch(createCowDungJobOrder(formdata));
      const { status, data } = res?.payload || {};
      if (status === 200) {
        toast.success(data?.message || "Booking Request Created successfully");
        setShowSuccessModal(true);
      } else {
        toast.error(data?.message || "Failed to Send Booking Request");
      }
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
          title="Cow Dung Supply"
          secImage={CowDunkSupplyIcon}
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
                      value={currentLocation}
                      onChange={(val) =>
                        setFormState((prev) => ({ ...prev, currentLocation: val }))
                      }
                      onSelectLocation={handleSelectLocation}
                      error={errors.currentLocation}
                      placeholder="Farm Location*"
                    />
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-control"
                      name="cowDunkType"
                      value={cowDunkType}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Select type*
                      </option>
                      <option value="Dry">Dry</option>
                      <option value="Wet">Wet</option>
                    </select>
                    {errors.cowDunkType && <p className="error-text">{errors.cowDunkType}</p>}
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-control"
                      name="cowDunkVehicleType"
                      value={cowDunkVehicleType}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Select quantity(in tons)*
                      </option>
                      {cowDunkType &&
                        (cowDunkType === "Dry" ? dryDungOptions : wetDungOptions).map((type) => (
                          <option key={type.value} className="form-control" value={type.value}>
                            {type.name}
                          </option>
                        ))}
                    </select>
                    {errors.cowDunkVehicleType && (
                      <p className="error-text">{errors.cowDunkVehicleType}</p>
                    )}

                    <span className="note d-block mt-1">
                      {cowDunkVehicleType &&
                        `You'll get a ${cowDunkVehicleType} for the selected quantity.`}
                    </span>
                  </div>
                </div>
                <h5 className="book-heading">Book Services date &amp; time</h5>
                <div className="row g-3">
                  <div className="col-md-6">
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
                    {errors.fromDate && <p className="error-text">{errors.fromDate}</p>}{" "}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      Start time<span className="required">*</span>
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      name="startTime"
                      value={startTime}
                      onChange={handleInputChange}
                    />
                    {errors.startTime && <p className="error-text">{errors.startTime}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="available-service-btn">
              <button type="submit" disabled={disable}>
                {disable ? "Sending Request..." : "Send Booking Request"}
              </button>
            </div>
          </form>
        </div>
        {showSuccessModal && (
          <div className="custom-modal-backdrop">
            <div className="custom-modal">
              <h4>Request Created </h4>
              <p>Your cow dung supply booking request has been created successfully.</p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/dashboard");
                }}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CowDungBookYourService;
