import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import droneServiceIcon from "../../../assets/images/DroneService-icon.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import LocationInput from "../../../components/common components/LocationInput";
import {
  validateArea,
  validateCrop,
  validateFromDate,
  validateSelectTime,
} from "../../../utils/formValidators";
import Time12HourPicker from "../../../components/common components/Time12HourPicker";

import DatePicker from "react-datepicker";
import { add, format } from "date-fns";
import DecimalInput from "../../../components/common components/DecimalInput";

function DroneBookYourService() {
  const { t } = useTranslation();
  const filters = useSelector((state) => state.services.DroneServiceMgmtSlice.filters);
  const defaultForm = {
    address: "",
    lat: "",
    lng: "",
    cropUnderCultivation: "",
    areaUnderCultivation: "",
    fromDate: "",
    time: "",
  };

  const [formState, setFormState] = useState({ ...defaultForm, ...filters });
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { address, lat, lng, cropUnderCultivation, areaUnderCultivation, fromDate, time } = formState;

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

    const cropError = validateCrop(cropUnderCultivation.trim());
    if (cropError) newErrors.cropUnderCultivation = t(cropError);

    const areaError = validateArea(areaUnderCultivation.trim());
    if (areaError) newErrors.areaUnderCultivation = t(areaError);

    const dateErrors = validateFromDate(fromDate);
    if (dateErrors) newErrors.fromDate = t(dateErrors);

    const timeError = validateSelectTime(fromDate, time);
    if (timeError) newErrors.time = t(timeError);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setDisable(true);
    const formdata = {
      address,
      lat: lat.trim(),
      lng: lng.trim(),
      cropUnderCultivation: cropUnderCultivation.trim(),
      areaUnderCultivation: areaUnderCultivation.trim(),
      fromDate,
      time,
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
          title={t("drone.droneService")}
          secImage={droneServiceIcon}
          navigate="/service-category"
        />
        <div className="dashboard">
          <form onSubmit={handleSubmit}>
            <div className="option-wrapper">
              <div className="form-section">
                <h5 className="book-heading">{t("common.bookYourService")}</h5>
                <div className="row g-3">
                  <div className="col-md-12">
                    <LocationInput
                      value={address}
                      onChange={(val) => setFormState((prev) => ({ ...prev, address: val }))}
                      onSelectLocation={handleSelectLocation}
                      error={errors.address}
                      placeholder={t("common.fieldLocation")}
                    />
                  </div>
                  <div className="col-md-6">
                    <DecimalInput
                      className="form-control"
                      placeholder={t("drone.areaUnderCultivationAcre")}
                      value={areaUnderCultivation}
                      maxDecimals={2}
                      onChange={(val) =>
                        setFormState((prev) => ({ ...prev, areaUnderCultivation: val }))
                      }
                    />
                    {errors.areaUnderCultivation && (
                      <p className="error-text">{errors.areaUnderCultivation}</p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder={t("drone.cropUnderCultivation")}
                      className="form-control"
                      name="cropUnderCultivation"
                      value={cropUnderCultivation}
                      onChange={handleInputChange}
                    />
                    {errors.cropUnderCultivation && (
                      <p className="error-text">{errors.cropUnderCultivation}</p>
                    )}
                  </div>
                </div>
                <h5 className="mt-4 book-heading">{t("common.bookServicesDateTime")}</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      {t("common.fromDate")}
                      <span className="required">*</span>
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
                    {errors.fromDate && <p className="error-text">{errors.fromDate}</p>}{" "}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      {t("common.startTime")}
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

export default DroneBookYourService;
