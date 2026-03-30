import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import TractorHarvester from "../../../assets/images/TractorHarvester.png";
import StandardHarvesterCombined from "../../../assets/images/StandardHarvesterCombined.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import harvestorIcon from "../../../assets/images/harvestor-icon.png";
import LocationInput from "../../../components/common components/LocationInput";
import {
  validateArea,
  validateCrop,
  validateDates,
  validateSelectTime,
} from "../../../utils/formValidators";
import Time12HourPicker from "../../../components/common components/Time12HourPicker";

import DatePicker from "react-datepicker";
import { format } from "date-fns";
import DecimalInput from "../../../components/common components/DecimalInput";

function HarvestorSubServices() {
  const { t } = useTranslation();
  const filters = useSelector((state) => state.services.HarvestorServiceMgmtSlice.filters);
  const defaultForm = {
    selectSubCategory: "combine_harvester",
    address: "",
    lat: "",
    lng: "",
    typeOfCrop: "",
    areaUnderCultivation: "",
    fromDate: "",
    toDate: "",
    fromTime: "",
  };
  const [formState, setFormState] = useState({ ...defaultForm, ...filters });

  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const {
    selectSubCategory,
    address,
    lat,
    lng,
    typeOfCrop,
    areaUnderCultivation,
    fromDate,
    toDate,
    fromTime,
  } = formState;

  const handleSelectLocation = ({ address, lat, lng }) => {
    setFormState((prev) => ({ ...prev, address, lat, lng }));
    setErrors((prev) => ({ ...prev, address: "" }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "selectSubCategory") {
      setFormState((prev) => ({ ...prev, areaUnderCultivation: "" }));
    }
    setFormState((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!address || !lat || !lng) newErrors.address = t("harvester.selectValidLocation");

    const cropError = validateCrop(typeOfCrop.trim());
    if (cropError) newErrors.typeOfCrop = cropError;

    const areaError = validateArea(areaUnderCultivation.trim());
    if (areaError) newErrors.areaUnderCultivation = areaError;

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
      typeOfCrop: typeOfCrop.trim(),
      areaUnderCultivation: areaUnderCultivation.trim(),
      fromDate,
      toDate,
      fromTime,
      address,
    };
    try {
      const query = new URLSearchParams(formdata).toString();
      navigate(`available-services?${query}`);
    } catch (error) {
      toast.error(t("dashboard.somethingWentWrong"));
    } finally {
      setDisable(false);
    }
  };
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title={t("dashboard.harvester")}
          secImage={harvestorIcon}
          navigate="/service-category"
        />
        <div className="dashboard">
          <form onSubmit={handleSubmit}>
            <div className="option-wrapper">
              <h3 className="main-heading">{t("harvester.subServices")}</h3>
              <div className="sub-service-wrapper">
                <div className="row">
                  <div className="col">
                    <label id="tractorOption" className="tile">
                      <input
                        type="radio"
                        name="selectSubCategory"
                        value="combine_harvester"
                        className="radio-input"
                        onChange={handleInputChange}
                        checked={selectSubCategory === "combine_harvester"}
                      />
                      <div className="radio-card">
                        <img src={StandardHarvesterCombined} alt={t("harvester.standardHarvester")} />
                        <span className="radio-label">{t("harvester.standardHarvester")}</span>
                      </div>
                    </label>
                  </div>
                  <div className="col">
                    <label id="attachmentOption" className="tile">
                      <input
                        type="radio"
                        name="selectSubCategory"
                        value="tractor_harvester"
                        className="radio-input"
                        onChange={handleInputChange}
                        checked={selectSubCategory === "tractor_harvester"}
                      />
                      <div className="radio-card">
                        <img src={TractorHarvester} alt={t("harvester.tractorHarvester")} />
                        <span className="radio-label">{t("harvester.tractorHarvester")}</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="option-wrapper">
              <div className="form-section">
                <h5 className="mb-4 book-heading">{t("harvester.bookYourService")}</h5>
                <div className="row g-3">
                  <div className="col-md-4">
                    <LocationInput
                      value={address}
                      onChange={(val) => setFormState((prev) => ({ ...prev, address: val }))}
                      onSelectLocation={handleSelectLocation}
                      error={errors.address}
                      placeholder={t("harvester.farmLocation")}
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      placeholder={t("harvester.nameOfCrop")}
                      className="form-control"
                      name="typeOfCrop"
                      value={typeOfCrop}
                      onChange={handleInputChange}
                    />
                    {errors.typeOfCrop && <p className="error-text">{errors.typeOfCrop}</p>}
                  </div>
                  <div className="col-md-4">
                    <DecimalInput
                      name="areaUnderCultivation"
                      value={areaUnderCultivation}
                      maxDecimals={2}
                      className="form-control"
                      placeholder={
                        selectSubCategory === "combine_harvester"
                          ? t("harvester.areaUnderCultivation")
                          : t("harvester.weightInQuintal")
                      }
                      onChange={(val) =>
                        setFormState((prev) => ({ ...prev, areaUnderCultivation: val }))
                      }
                    />
                    {errors.areaUnderCultivation && (
                      <p className="error-text">{errors.areaUnderCultivation}</p>
                    )}
                  </div>
                </div>
                <h5 className="mt-5 mb-4 book-heading">{t("harvester.bookServicesDateTime")}</h5>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">
                      {t("harvester.fromDate")}<span className="required">*</span>
                    </label>
                    <DatePicker
                      selected={fromDate ? new Date(fromDate) : null}
                      onChange={(selectedDate) => {
                        const formatted = format(selectedDate, "yyyy-MM-dd");
                        setFormState((prev) => ({ ...prev, fromDate: formatted }));
                        setErrors((prev) => ({ ...prev, fromDate: "" }));
                      }}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="DD/MM/YYYY"
                      className="form-control custom-datepicker"
                      calendarClassName="custom-calendar"
                      showPopperArrow={false}
                      showOtherMonths
                      fixedHeight
                    />
                    {errors.fromDate && <p className="error-text">{errors.fromDate}</p>}
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">
                      {t("harvester.tillDate")}<span className="required">*</span>
                    </label>
                    <DatePicker
                      selected={toDate ? new Date(toDate) : null}
                      onChange={(selectedDate) => {
                        const formatted = format(selectedDate, "yyyy-MM-dd");
                        setFormState((prev) => ({ ...prev, toDate: formatted }));
                        setErrors((prev) => ({ ...prev, toDate: "" }));
                      }}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="DD/MM/YYYY"
                      className="form-control custom-datepicker"
                      calendarClassName="custom-calendar"
                      showPopperArrow={false}
                      showOtherMonths
                      fixedHeight
                    />
                    {errors.toDate && <p className="error-text">{errors.toDate}</p>}
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">
                      {t("harvester.startTime")}<span className="required">*</span>
                    </label>
                    <Time12HourPicker
                      value={fromTime}
                      onChange={(val) => {
                        setFormState((prev) => ({ ...prev, fromTime: val }));
                        setErrors((prev) => ({ ...prev, fromTime: "" }));
                      }}
                      error={errors.fromTime}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="available-service-btn">
              <button type="submit" disabled={disable}>
                {t("harvester.seeAvailableService")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HarvestorSubServices;
