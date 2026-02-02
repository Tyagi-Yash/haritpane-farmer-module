import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import TopbarModal from "../../../components/common components/TopbarModal";
import CowDunkSupplyIcon from "../../../assets/images/CowDunkSupply-icon.png";
import LocationInput from "../../../components/common components/LocationInput";
import {
  validateCowDunkType,
  validateDate,
  validateQuantity,
  validateSelectTime,
} from "../../../utils/formValidators";
import { createCowDungJobOrder } from "../../../reduxtoolkit/slices/service category/cowDunkServices";

function CowDungBookYourService() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filters = useSelector((state) => state.services.CowDungServiceMgmtSlice.filters);

  const defaultForm = {
    currentLocation: "",
    lat: "",
    lng: "",
    cowDunkType: "",
    cowDunkQuantity: "",
    fromDate: "",
    startTime: "",
  };

  const [selectedService, setSelectedService] = useState("");
  const [formState, setFormState] = useState({ ...defaultForm, ...filters });
  const [errors, setErrors] = useState({});
  const [disable, setDisable] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { currentLocation, lat, lng, cowDunkType, cowDunkQuantity, fromDate, startTime } =
    formState;

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
    setFormState(defaultForm);
    setErrors({});
  };

  const handleSelectLocation = ({ address, lat, lng }) => {
    setFormState((prev) => ({ ...prev, currentLocation: address, lat, lng }));
    setErrors((prev) => ({ ...prev, currentLocation: "" }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!currentLocation || !lat || !lng) {
      newErrors.currentLocation = "Please select a valid location.";
    }

    const dateErrors = validateDate(fromDate);
    if (dateErrors) newErrors.fromDate = dateErrors;

    if (selectedService === "cowDungDelivery") {
      const typeError = validateCowDunkType(cowDunkType);
      if (typeError) newErrors.cowDunkType = typeError;

      const quantityError = cowDunkType && validateQuantity(cowDunkQuantity);
      if (quantityError) newErrors.cowDunkQuantity = quantityError;

      const timeError = validateSelectTime(fromDate, startTime);
      if (timeError) newErrors.startTime = timeError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setDisable(true);

    try {
      if (selectedService === "cowDungDelivery") {
        const payload = {
          jobOrderFor: "cowdung",
          currentLocation,
          currentLocationCoordinates: {
            type: "Point",
            coordinates: [Number(lng), Number(lat)],
          },
          cowDunkType,
          cowDunkQuantity,
          fromDate,
          startTime,
        };

        const res = await dispatch(createCowDungJobOrder(payload));
        const { status, data } = res?.payload || {};

        if (status === 200) {
          toast.success(data?.message || "Booking Request Created successfully");
          setShowSuccessModal(true);
        } else {
          toast.error(data?.message || "Failed to Send Booking Request");
        }
      } else {
        const formdata = {
          lat: lat.trim(),
          lng: lng.trim(),
          type: selectedService,
          fromDate: fromDate,
        };
        const query = new URLSearchParams(formdata).toString();
        navigate(`available-services?${query}`);
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
          titleBox
          title="Cow Dung Supply"
          secImage={CowDunkSupplyIcon}
          navigate="/service-category"
        />

        <div className="dashboard">
          <div className="option-wrapper mb-0 py-0">
            <div className="form-section">
              <h5 className="book-heading">What service would you like to book?</h5>
              <select
                className="form-control"
                value={selectedService}
                onChange={handleServiceChange}
              >
                <option value="" disabled>
                  Select a service*
                </option>
                <option value="cowDungDelivery">Cow dung delivery to my farm</option>
                <option value="dairy_farmers_cow_dunk">Cow dung pickup from vendor location</option>
                <option value="poultry">Poultry waste pickup from vendor location</option>
              </select>
            </div>
          </div>

          {selectedService === "cowDungDelivery" && (
            <form onSubmit={handleSubmit}>
              <div className="option-wrapper pt-0">
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
                      <input
                        type="number"
                        className="form-control"
                        name="cowDunkQuantity"
                        value={cowDunkQuantity}
                        onChange={handleInputChange}
                        placeholder="Quantity (in tons)*"
                      />

                      {errors.cowDunkQuantity && (
                        <p className="error-text">{errors.cowDunkQuantity}</p>
                      )}
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
                      {errors.fromDate && <p className="error-text">{errors.fromDate}</p>}
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
                <button type="submit" disabled={!selectedService || disable}>
                  {disable ? "Sending Request..." : "Send Booking Request"}
                </button>
              </div>
            </form>
          )}

          {(selectedService === "dairy_farmers_cow_dunk" ||
            selectedService === "poultry") && (
            <form onSubmit={handleSubmit}>
              <div className="option-wrapper pt-0">
                <div className="form-section">
                  <h5 className="book-heading">Book your service</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">
                        Farm location<span className="required">*</span>
                      </label>
                      <LocationInput
                        value={currentLocation}
                        onChange={(val) =>
                          setFormState((prev) => ({ ...prev, currentLocation: val }))
                        }
                        onSelectLocation={handleSelectLocation}
                        error={errors.currentLocation}
                        placeholder="Enter Farm Location*"
                      />
                    </div>
                  </div>
                  <h5 className="book-heading">Book Services date &amp; time</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">
                        Pickup date<span className="required">*</span>
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
                  </div>
                </div>
              </div>
              <div className="available-service-btn">
                <button type="submit" disabled={!selectedService || disable}>
                  {disable ? "Loading..." : "See Available Service"}
                </button>
              </div>
            </form>
          )}
        </div>

        {showSuccessModal && (
          <div className="custom-modal-backdrop">
            <div className="custom-modal">
              <h4>Request Created</h4>
              <p>
                Your Cow dung requirement order has been generated, we will notify you with the
                vendor's offer, you can then select the best offer.
              </p>
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
