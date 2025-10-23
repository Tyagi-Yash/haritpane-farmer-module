import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

import cattleIcon from "../../../assets/images/cattle-icon.png";
import locationBlack from "../../../assets/images/location-black.svg";
import TopbarModal from "../../../components/common components/TopbarModal";
import {
  breedOptions,
  cattleData,
} from "../../../constants/service category/cattle purchase and sale/cattleAndBreedData";
import { useSelector } from "react-redux";

function CattleBookYourServices() {
  const filters = useSelector((state) => state.services.CattleServiceMgmtSlice.filters);
  const defaultForm = {
    lat: "",
    lng: "",
    selectBreed: "",
    sectectCattle: "",
  };
  const [formState, setFormState] = useState({ ...defaultForm, ...filters });
  const { lat, lng, selectBreed, sectectCattle } = formState;

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
    if (!sectectCattle) {
      newErrors.sectectCattle = "*Please select a Cattle";
    }
    if (sectectCattle && breedOptions[sectectCattle]?.length > 0 && !selectBreed) {
      newErrors.selectBreed = "*Please select a Breed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const query = new URLSearchParams(formState).toString();
      navigate(`available-services?${query}`);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title="Cattle Purchase & Sale"
          secImage={cattleIcon}
          navigate="/service-category"
        />
        <div className="dashboard">
          <div className="cattle-purchase">
            <form id="bookingForm" onSubmit={handleSubmit}>
              <div className="option-wrapper">
                <div className="form-section mb-4">
                  <h4 className="book-heading">Book your service</h4>
                  <div className="row g-3">
                    <div className="col-md-4">
                      {/* <div className="location-wrapper">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Farm location*"
                          />
                          <img src={locationBlack} alt="" className="location-icon" />
                        </div> */}

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
                    </div>
                    {/* Cattle Dropdown */}
                    <div className="col-md-4">
                      <Dropdown
                        onSelect={(key) => {
                          setFormState((prev) => ({
                            ...prev,
                            sectectCattle: key,
                            selectBreed: "",
                          }));
                          setErrors((prev) => ({ ...prev, sectectCattle: "" }));
                        }}
                      >
                        <Dropdown.Toggle className="btn w-100 dropdown-toggle">
                          {sectectCattle || "Select Cattle"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {cattleData.map((cattle) => (
                            <Dropdown.Item
                              key={cattle.name}
                              eventKey={cattle.name}
                              className="custom-item"
                            >
                              <span className="Icon">
                                <img src={cattle.image} alt={cattle.name} />
                              </span>
                              <span className="DText">{cattle.name}</span>
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                      {errors.sectectCattle && <p className="error-text">{errors.sectectCattle}</p>}
                    </div>

                    {/* Breed Dropdown */}
                    <div className="col-md-4">
                      <Dropdown
                        onSelect={(key) => {
                          setFormState((prev) => ({ ...prev, selectBreed: key }));
                          setErrors((prev) => ({ ...prev, selectBreed: "" }));
                        }}
                      >
                        <Dropdown.Toggle
                          disabled={!sectectCattle || breedOptions[sectectCattle]?.length === 0}
                          className="btn w-100 dropdown-toggle"
                        >
                          {selectBreed || "Select Breed"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu as="ul">
                          {breedOptions[sectectCattle]?.map((breed) => (
                            <Dropdown.Item
                              as="li"
                              key={breed}
                              eventKey={breed}
                              className="custom-item"
                            >
                              {breed}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                      {errors.selectBreed && <p className="error-text">{errors.selectBreed}</p>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="available-service-btn">
                  <button type="submit">See Available Service</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CattleBookYourServices;
