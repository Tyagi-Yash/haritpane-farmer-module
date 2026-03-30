import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import TopbarModal from "../../../components/common components/TopbarModal";
import AugerServiceIcon from "../../../assets/images/AugerService-icon.png";
import LocationInput from "../../../components/common components/LocationInput";
import {
  validateDurationFields,
  validateFromDate,
  validateSelectTime,
} from "../../../utils/formValidators";
import Time12HourPicker from "../../../components/common components/Time12HourPicker";

import DatePicker from "react-datepicker";
import { format } from "date-fns";

function AugerBookYourService() {
  const { t } = useTranslation();
  const filters = useSelector((state) => state.services.AugerServiceMgmtSlice.filters);
  const defaultForm = {
    address: "",
    lat: "",
    lng: "",
    date: "",
    time: "",
    hours: "",
    minutes: "",
  };
  const [formState, setFormState] = useState({ ...defaultForm, ...filters });
  const { address, lat, lng, date, time, hours, minutes } = formState;
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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

    if (!address || !lat || !lng) newErrors.address = t("common.selectValidLocation");

    const dateErrors = validateFromDate(date);
    if (dateErrors) newErrors.date = t(`validation.${dateErrors}`);

    const timeError = validateSelectTime(date, time);
    if (timeError) newErrors.time = t(`validation.${timeError}`);

    const durationErrors = validateDurationFields(hours, minutes);
    if (durationErrors.hours) newErrors.hours = t(`validation.${durationErrors.hours}`);
    if (durationErrors.minutes) newErrors.minutes = t(`validation.${durationErrors.minutes}`);

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
      date,
      time,
      ...((hours || minutes) && {
        estimatedTime: Number(totalDuration).toFixed(2),
      }),
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
          title={t("auger.augerService")}
          secImage={AugerServiceIcon}
          navigate="/service-category"
        />
        <div className="dashboard">
          <form onSubmit={handleSubmit}>
            <div className="option-wrapper">
              <div className="form-section">
                <h5 className="book-heading">{t("common.bookYourService")}</h5>
                <div className="col-md-12 mb-3">
                  <LocationInput
                    value={address}
                    onChange={(val) => setFormState((prev) => ({ ...prev, address: val }))}
                    onSelectLocation={handleSelectLocation}
                    error={errors.address}
                    placeholder={t("common.jobLocation")}
                  />
                </div>
                <h5 className="book-heading">{t("auger.estimateJobDuration")}</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder={t("common.hours")}
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
                      placeholder={`${t("common.minutes")} (0-59)`}
                      name="minutes"
                      min="0"
                      value={minutes}
                      onChange={handleInputChange}
                    />
                    {errors.minutes && <p className="error-text">{errors.minutes}</p>}
                  </div>
                </div>
                <h5 className="book-heading">{t("common.bookServicesDateTime")}</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      {t("common.fromDate")}
                      <span className="required">*</span>
                    </label>
                    <DatePicker
                      selected={date ? new Date(date) : null}
                      onChange={(selectedDate) => {
                        const formatted = format(selectedDate, "yyyy-MM-dd");
                        setFormState((prev) => ({ ...prev, date: formatted }));
                        setErrors((prev) => ({ ...prev, date: "" }));
                      }}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="DD/MM/YYYY"
                      className="form-control custom-datepicker"
                      calendarClassName="custom-calendar"
                      showPopperArrow={false}
                      showOtherMonths
                      fixedHeight
                    />
                    {errors.date && <p className="error-text">{errors.date}</p>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      {t("common.selectTime")}
                      <span className="required">*</span>
                    </label>
                    <Time12HourPicker
                      value={time}
                      onChange={(val) => {
                        setFormState((prev) => ({ ...prev, time: val }));
                        setErrors((prev) => ({ ...prev, time: "" }));
                      }}
                      error={errors.time}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="available-service-btn">
              <button type="submit" disabled={disable}>
                {disable ? t("common.loading") : t("common.seeAvailableService")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AugerBookYourService;
