import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import CompoundWallBuilderIcon from "../../../assets/images/CompoundWallBuilder-icon.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import { getCompoundWallServiceTypes } from "../../../reduxtoolkit/slices/service category/compoundWallServices";
import LocationInput from "../../../components/common components/LocationInput";
import {
  validateFromDate,
  validateHeight,
  validateLength,
  validateSelectTime,
  validateWallserviceType,
} from "../../../utils/formValidators";

function CompoundWallBookYourService() {
  const filters = useSelector((state) => state.services.CompoundWallServiceMgmtSlice.filters);
  const defaultForm = {
    address: "",
    lat: "",
    lng: "",
    serviceType: "",
    heightOfWall: "",
    lengthOfWall: "",
    date: "",
    time: "",
  };
  const [formState, setFormState] = useState({ ...defaultForm, ...filters });

  const { address, lat, lng, serviceType, date, time, heightOfWall, lengthOfWall } = formState;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const [serviceTypesOption, setserviceTypesOption] = useState([]);

  useEffect(() => {
    const fetchServiceType = async () => {
      try {
        const res = await dispatch(getCompoundWallServiceTypes());
        const { status, data } = res?.payload || {};
        if (status === 200) {
          setserviceTypesOption(data?.data || []);
        } else {
          toast(data?.message || "Failed to service type");
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
    };

    fetchServiceType();
  }, []);

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

    const serviceTypeErrors = validateWallserviceType(serviceType);
    if (serviceTypeErrors) newErrors.serviceType = serviceTypeErrors;

    const dateErrors = validateFromDate(date);
    if (dateErrors) newErrors.date = dateErrors;

    const timeError = validateSelectTime(date, time);
    if (timeError) newErrors.time = timeError;

    const lengthError = validateLength(lengthOfWall);
    if (lengthError) newErrors.lengthOfWall = lengthError;
    const hieghtError = validateHeight(heightOfWall);
    if (hieghtError) newErrors.heightOfWall = hieghtError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setDisable(true);
    const query = new URLSearchParams({
      lat: lat.trim(),
      lng: lng.trim(),
      serviceType,
      date,
      time,
      heightOfWall: heightOfWall,
      lengthOfWall: lengthOfWall,
    }).toString();

    navigate(`available-services?${query}`);
    setDisable(false);
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title="Compound Wall Builder"
          secImage={CompoundWallBuilderIcon}
          navigate="/service-category"
        />
        <div className="dashboard">
          <form onSubmit={handleSubmit}>
            <div className="option-wrapper">
              <div className="form-section">
                <h5 className="book-heading">Book your service</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <LocationInput
                      value={address}
                      onChange={(val) => setFormState((prev) => ({ ...prev, address: val }))}
                      onSelectLocation={handleSelectLocation}
                      error={errors.address}
                      placeholder="Field Location*"
                    />
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-control"
                      name="serviceType"
                      value={serviceType}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Select Specific Service*
                      </option>
                      {serviceTypesOption.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    {errors.serviceType && <p className="error-text">{errors.serviceType}</p>}
                  </div>
                </div>
                <h5 className="book-heading">Wall Dimension</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      Wall Height<span className="required">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter wall height (in ft)"
                      name="heightOfWall"
                      value={heightOfWall}
                      onChange={handleInputChange}
                    />
                    {errors.heightOfWall && (
                      <p className="error-text">{errors.heightOfWall}</p>
                    )}{" "}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      Wall Length<span className="required">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter wall length (in ft)"
                      name="lengthOfWall"
                      value={lengthOfWall}
                      onChange={handleInputChange}
                    />
                    {errors.lengthOfWall && (
                      <p className="error-text">{errors.lengthOfWall}</p>
                    )}{" "}
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
                      name="date"
                      value={date}
                      onChange={handleInputChange}
                    />
                    {errors.date && <p className="error-text">{errors.date}</p>}{" "}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      Start time<span className="required">*</span>
                    </label>
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
              </button>{" "}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompoundWallBookYourService;
