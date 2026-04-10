import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import onlyAttachment from "../../../assets/images/only-attachment.png";
import TractorandAttachment from "../../../assets/images/TractorandAttachment.png";
import landManagementTractorServices from "../../../assets/images/land-management-tractor-services.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import {
  validateArea,
  validateDates,
  validateDistance,
  validateSelectTime,
} from "../../../utils/formValidators";
import LocationInput from "../../../components/common components/LocationInput";
import Time12HourPicker from "../../../components/common components/Time12HourPicker";

import DatePicker from "react-datepicker";
import { format } from "date-fns";
import DecimalInput from "../../../components/common components/DecimalInput";
import {
  TRACTOR_ATTACHMENTS,
  TRACTOR_HP_OPTIONS,
} from "../../../constants/service category/land management/tractorOptions";

function LandManagementServicesSubServices() {
  const { t } = useTranslation();
  const filters = useSelector((state) => state.services.LandServiceMgmtSlice.filters);
  const defaultForm = {
    selectSubCategory: "tracktor_attachments",
    address: "",
    lat: "",
    lng: "",
    hpOfTractor: "",
    selectAttachment: "",
    fromDate: "",
    toDate: "",
    fromTime: "",
    farmArea: "",
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
    hpOfTractor,
    selectAttachment,
    fromDate,
    toDate,
    fromTime,
    farmArea,
  } = formState;

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

    if (!address || !lat || !lng) newErrors.address = t("landManagement.selectValidLocation");

    if (!selectAttachment) {
      newErrors.selectAttachment = t("landManagement.selectAttachmentError");
    }

    if (selectSubCategory === "tracktor_attachments" && !hpOfTractor) {
      newErrors.hpOfTractor = t("landManagement.selectTractorCategoryError");
    }

    let areaError;
    if (selectAttachment === "Trolly") {
      areaError = validateDistance(farmArea.trim());
    } else {
      areaError = validateArea(farmArea.trim());
    }
    if (areaError) {
      newErrors.farmArea = areaError;
    }

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
      address,
      selectSubCategory,
      lat: lat.trim(),
      lng: lng.trim(),
      selectAttachment,
      fromDate,
      toDate,
      fromTime,
      farmArea: farmArea.trim(),
      ...(selectSubCategory === "tracktor_attachments" && { hpOfTractor }),
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
          title={t("dashboard.landManagement")}
          secImage={landManagementTractorServices}
          navigate="/service-category"
        />
        <div className="dashboard">
          <form>
            <div className="option-wrapper">
              <h3 className="main-heading">{t("landManagement.subServices")}</h3>
              <div className="sub-service-wrapper">
                <div className="row">
                  <div className="col">
                    <label id="tractorOption" className="tile">
                      <input
                        type="radio"
                        name="selectSubCategory"
                        value="tracktor_attachments"
                        className="radio-input"
                        onChange={handleInputChange}
                        checked={selectSubCategory === "tracktor_attachments"}
                      />
                      <div className="radio-card">
                        <img
                          src={TractorandAttachment}
                          alt={t("landManagement.tractorAndAttachment")}
                        />
                        <span className="radio-label">
                          {t("landManagement.tractorAndAttachment")}
                        </span>
                      </div>
                    </label>
                  </div>
                  <div className="col">
                    {/* <label id="attachmentOption" className="tile">
                      <input
                        type="radio"
                        name="selectSubCategory"
                        value="only_attachments"
                        className="radio-input"
                        onChange={handleInputChange}
                        checked={selectSubCategory === "only_attachments"}
                      />
                      <div className="radio-card">
                        <img src={onlyAttachment} alt="Only Attachment" />
                        <span className="radio-label">Only Attachment</span>
                      </div>
                    </label> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="option-wrapper">
              <div className="form-section">
                <h5 className="book-heading">{t("landManagement.bookYourService")}</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <LocationInput
                      value={address}
                      onChange={(val) => setFormState((prev) => ({ ...prev, address: val }))}
                      onSelectLocation={handleSelectLocation}
                      error={errors.address}
                      placeholder={t("landManagement.farmLocation")}
                    />
                  </div>
                  {selectSubCategory === "tracktor_attachments" && (
                    <div className="col-md-6">
                      <select
                        className="form-control"
                        name="hpOfTractor"
                        value={hpOfTractor}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>
                          {t("landManagement.selectTractorCategory")}
                        </option>
                        {TRACTOR_HP_OPTIONS.map((tractor) => (
                          <option key={tractor.value} value={tractor.value}>
                            {t(`landManagement.${tractor.value}`)}
                          </option>
                        ))}
                      </select>
                      {errors.hpOfTractor && <p className="error-text">{errors.hpOfTractor}</p>}
                    </div>
                  )}
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <select
                      className="form-control"
                      name="selectAttachment"
                      value={selectAttachment}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        {t("landManagement.selectAttachment")}
                      </option>
                      {TRACTOR_ATTACHMENTS.map((attachment) => (
                        <option key={attachment.value} value={attachment.value}>
                          {t(`landManagement.${attachment.value}`)}
                        </option>
                      ))}
                    </select>
                    {errors.selectAttachment && (
                      <p className="error-text">{errors.selectAttachment}</p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <DecimalInput
                      name="farmArea"
                      value={farmArea}
                      maxDecimals={2}
                      className="form-control"
                      placeholder={
                        selectAttachment === "Trolly"
                          ? t("landManagement.enterTripDistance")
                          : t("landManagement.enterFarmArea")
                      }
                      onChange={(val) => setFormState((prev) => ({ ...prev, farmArea: val }))}
                    />
                    {errors.farmArea && <p className="error-text">{errors.farmArea}</p>}
                  </div>
                </div>

                <h5 className="book-heading">{t("landManagement.bookServicesDateTime")}</h5>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">
                      {t("landManagement.fromDate")}
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
                    {errors.fromDate && <p className="error-text">{errors.fromDate}</p>}
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">
                      {t("landManagement.tillDate")}
                      <span className="required">*</span>
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
                      {t("landManagement.startTime")}
                      <span className="required">*</span>
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
              <button type="submit" onClick={handleSubmit} disabled={disable}>
                {t("landManagement.seeAvailableService")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LandManagementServicesSubServices;
