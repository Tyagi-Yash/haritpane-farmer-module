import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import cattleIcon from "../../../assets/images/cattle-icon.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import LocationInput from "../../../components/common components/LocationInput";
import {
  breedOptions,
  cattleData,
} from "../../../constants/service category/cattle purchase and sale/cattleAndBreedData";

function CattleBookYourServices() {
  const { t } = useTranslation();
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

  const handleSelectLocation = ({ address, lat, lng }) => {
    setFormState((prev) => ({ ...prev, address, lat, lng }));
    setErrors((prev) => ({ ...prev, address: "" }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!address || !lat || !lng) newErrors.address = t("harvester.selectValidLocation");

    if (!sectectCattle) {
      newErrors.sectectCattle = t("validation.specificServiceRequired");
    }
    if (sectectCattle && breedOptions[sectectCattle]?.length > 0 && !selectBreed) {
      newErrors.selectBreed = t("cattle.selectBreedRequired") || "*Please select a Breed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formdata = {
      address,
      lat: lat.trim(),
      lng: lng.trim(),
      selectBreed,
      sectectCattle,
    };
    try {
      const query = new URLSearchParams(formdata).toString();
      navigate(`available-services?${query}`);
    } catch (error) {
      toast.error(t("common.somethingWentWrong"));
    }
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title={t("cattle.cattlePurchaseSale")}
          secImage={cattleIcon}
          navigate="/service-category"
        />
        <div className="dashboard">
          <div className="cattle-purchase">
            <form id="bookingForm" onSubmit={handleSubmit}>
              <div className="option-wrapper">
                <div className="form-section mb-4">
                  <h4 className="book-heading">{t("cattle.bookYourService")}</h4>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <LocationInput
                        value={address}
                        onChange={(val) => setFormState((prev) => ({ ...prev, address: val }))}
                        onSelectLocation={handleSelectLocation}
                        error={errors.address}
                        placeholder={t("cattle.farmLocation")}
                      />
                    </div>
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
                          {sectectCattle ? t(`cattle.${sectectCattle.toLowerCase()}`) : t("cattle.selectCattle")}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {cattleData.map((cattle) => (
                            <Dropdown.Item
                              key={cattle.name}
                              eventKey={cattle.name}
                              className="custom-item"
                            >
                              <span className="Icon">
                                <img src={cattle.image} alt={t(`cattle.${cattle.name.toLowerCase()}`)} />
                              </span>
                              <span className="DText">{t(`cattle.${cattle.name.toLowerCase()}`)}</span>
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                      {errors.sectectCattle && <p className="error-text">{errors.sectectCattle}</p>}
                    </div>
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
                          {selectBreed || t("cattle.selectBreed")}
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
                  <button type="submit">{t("cattle.seeAvailableService")}</button>
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
