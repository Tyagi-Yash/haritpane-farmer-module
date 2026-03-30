import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import TopbarModal from "../../../components/common components/TopbarModal";
import ExcavationIcon from "../../../assets/images/Excavation-icon.png";
import { equipmentTypesOption } from "../../../constants/service category/excavation service/equipmentOption";
import LocationInput from "../../../components/common components/LocationInput";
import {
  validateDates,
  validateDurationFields,
  validateEquipmentTypes,
  validateSelectTime,
} from "../../../utils/formValidators";
import Time12HourPicker from "../../../components/common components/Time12HourPicker";

import DatePicker from "react-datepicker";
import { format } from "date-fns";

function ExcavationBookYourService() {
  const { t } = useTranslation();
  const filters = useSelector((state) => state.services.ExcavationServiceMgmtSlice.filters);
  const defaultForm = {
    address: "",
    lat: "",
    lng: "",
    sectectEquipmentType: "",
    fromDate: "",
    toDate: "",
    fromTime: "",
    hours: "",
    minutes: "",
  };
  const [formState, setFormState] = useState({ ...defaultForm, ...filters });

  const { address, lat, lng, sectectEquipmentType, fromDate, toDate, fromTime, hours, minutes } =
    formState;
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSelectLocation = ({ address, lat, lng }) => {
    setFormState((prev) => ({ ...prev, address, lat, lng }));
    setErrors((prev) => ({ ...prev, address: "" }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!address || !lat || !lng) newErrors.address = t("harvester.selectValidLocation");

    const equipmentError = validateEquipmentTypes(sectectEquipmentType);
    if (equipmentError) newErrors.sectectEquipmentType = t("validation.specificServiceRequired");

    const dateErrors = validateDates(fromDate, toDate);
    // Note: validateDates returns keys like fromDate, toDate with English error messages
    // We should ideally translate these in the validator or here.
    // For now I'll use the returned errors but we should check if they can be localized.
    newErrors = { ...newErrors, ...dateErrors };

    const timeError = validateSelectTime(fromDate, fromTime);
    if (timeError) newErrors.fromTime = timeError;

    const durationErrors = validateDurationFields(hours, minutes);
    newErrors = { ...newErrors, ...durationErrors };

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setDisable(true);
    const totalDuration = (Number(hours) || 0) + (Number(minutes) || 0) / 60;
    const formdata = {
      address,
      lat: lat.trim(),
      lng: lng.trim(),
      sectectEquipmentType: sectectEquipmentType,
      fromDate,
      toDate,
      fromTime,
      duration: Number(totalDuration).toFixed(2),
    };
    try {
      const query = new URLSearchParams(formdata).toString();
      navigate(`available-services?${query}`);
    } catch (error) {
      toast.error(t("common.somethingWentWrong"));
    } finally {
      setDisable(false);
    }
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title={t("excavation.earthMovers")}
          secImage={ExcavationIcon}
          navigate="/service-category"
        />
        <div className="dashboard">
          <form onSubmit={handleSubmit}>
            <div className="option-wrapper">
              <div className="form-section" id="tractorForm" style={{ display: "block" }}>
                <h5 className="book-heading">{t("excavation.bookYourService")}</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <LocationInput
                      value={address}
                      onChange={(val) => setFormState((prev) => ({ ...prev, address: val }))}
                      onSelectLocation={handleSelectLocation}
                      error={errors.address}
                      placeholder={t("excavation.farmLocation")}
                    />
                  </div>
                  <div className="col-md-6 excavation-types">
                    <Dropdown
                      onSelect={(key) => {
                        setFormState((prev) => ({ ...prev, sectectEquipmentType: key }));
                        setErrors((prev) => ({ ...prev, sectectEquipmentType: "" }));
                      }}
                    >
                      <Dropdown.Toggle className="btn w-100 dropdown-toggle">
                        {sectectEquipmentType
                          ? t(`excavation.${sectectEquipmentType.toLowerCase().replace(/\s+/g, '')}`) || 
                            equipmentTypesOption.find((o) => o.value === sectectEquipmentType)?.name
                          : t("excavation.selectSpecificService")}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {equipmentTypesOption.map((option) => (
                          <Dropdown.Item
                            key={option.name}
                            eventKey={option.value}
                            className="custom-item"
                          >
                            <span className="Icon">
                              <img src={option.image} alt={t(`excavation.${option.value.toLowerCase().replace(/\s+/g, '')}`)} />
                            </span>
                            <span className="DText">{t(`excavation.${option.value.toLowerCase().replace(/\s+/g, '')}`)}</span>
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    {errors.sectectEquipmentType && (
                      <p className="error-text">{errors.sectectEquipmentType}</p>
                    )}
                  </div>
                </div>
                <h5 className="book-heading">{t("excavation.bookServicesDateTime")}</h5>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">
                      {t("excavation.fromDate")}<span className="required">*</span>
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
                      {t("excavation.tillDate")}<span className="required">*</span>
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
                      {t("excavation.startTime")}<span className="required">*</span>
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
                <h5 className="book-heading">{t("excavation.tentativeDuration")}</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder={t("excavation.hours")}
                      name="hours"
                      min="0"
                      value={hours}
                      onChange={handleInputChange}
                    />
                    {errors.hours && <p className="error-text">{errors.hours}</p>}
                  </div>
                  <div className="col-md-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder={`${t("excavation.minutes")} (0-59)`}
                      name="minutes"
                      min="0"
                      value={minutes}
                      onChange={handleInputChange}
                    />
                    {errors.minutes && <p className="error-text">{errors.minutes}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="available-service-btn">
              <button type="submit" disabled={disable}>
                {disable ? t("common.loading") : t("excavation.seeAvailableService")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ExcavationBookYourService;
