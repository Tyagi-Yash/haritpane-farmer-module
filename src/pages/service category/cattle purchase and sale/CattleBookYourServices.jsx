import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import cattleIcon from "../../../assets/images/cattle-icon.png";
import locationBlack from "../../../assets/images/location-black.svg";
import TopbarModal from "../../../components/common components/TopbarModal";
import {
  breedOptions,
  cattleData,
} from "../../../constants/service category/cattle purchase and sale/cattleAndBreedData";

function CattleBookYourServices() {
  const filters = useSelector((state) => state.services.CattleServiceMgmtSlice.filters);
  const defaultForm = {
    address: "",
    lat: "",
    lng: "",
    selectBreed: "",
    sectectCattle: "",
  };
  const [formState, setFormState] = useState({ ...defaultForm, ...filters });
  const { address, lat, lng, selectBreed, sectectCattle } = formState;

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSelect = async (value) => {
    try {
      const results = await geocodeByAddress(value);
      const { lat, lng } = await getLatLng(results[0]);
      setFormState((prev) => ({
        ...prev,
        address: value,
        lat: lat.toString(),
        lng: lng.toString(),
      }));
      setErrors((prev) => ({ ...prev, address: "" }));
    } catch (error) {
      toast.error("Failed to fetch location coordinates");
    }
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
                      <div className="location-wrapper">
                        <PlacesAutocomplete
                          value={address}
                          onChange={(value) =>
                            setFormState((prev) => ({ ...prev, address: value }))
                          }
                          onSelect={handleSelect}
                        >
                          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                              <input
                                {...getInputProps({
                                  placeholder: "Farm location*",
                                  className: "form-control",
                                })}
                              />
                              <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map((suggestion) => {
                                  const className = suggestion.active
                                    ? "suggestion-item--active"
                                    : "suggestion-item";
                                  return (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        className,
                                      })}
                                      key={suggestion.placeId}
                                    >
                                      <span>{suggestion.description}</span>
                                    </div>
                                  );
                                })}
                              </div>
                              {errors.address && <p className="error-text">{errors.address}</p>}
                            </div>
                          )}
                        </PlacesAutocomplete>
                        <img src={locationBlack} alt="" className="location-icon" />
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
