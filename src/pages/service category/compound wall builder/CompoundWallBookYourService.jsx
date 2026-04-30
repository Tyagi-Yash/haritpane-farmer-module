import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

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
import Time12HourPicker from "../../../components/common components/Time12HourPicker";

import DatePicker from "react-datepicker";
import { format } from "date-fns";
import DecimalInput from "../../../components/common components/DecimalInput";

function CompoundWallBookYourService() {
  const { t } = useTranslation();
  const filters = useSelector((state) => state.services.CompoundWallServiceMgmtSlice.filters);
  const defaultForm = {
    address: "",
    lat: "",
    lng: "",
    serviceType: "",
    height: "",
    length: "",
    date: "",
    time: "",
  };
  const [formState, setFormState] = useState({ ...defaultForm, ...filters });

  const { address, lat, lng, serviceType, date, time, height, length } = formState;
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
          toast( t("compoundWall.failedToGetServiceType"));
        }
      } catch (err) {
        toast.error(t("common.somethingWentWrong"));
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
    setFormState((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!address || !lat || !lng) newErrors.address = t("common.selectValidLocation");

    const serviceTypeErrors = validateWallserviceType(serviceType);
    if (serviceTypeErrors) newErrors.serviceType = t(serviceTypeErrors);

    const dateErrors = validateFromDate(date);
    if (dateErrors) newErrors.date = t(dateErrors);

    const timeError = validateSelectTime(date, time);
    if (timeError) newErrors.time = t(timeError);

    const lengthError = validateLength(length);
    if (lengthError) newErrors.length = t(lengthError);
    const hieghtError = validateHeight(height);
    if (hieghtError) newErrors.height = t(hieghtError);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setDisable(true);
    const query = new URLSearchParams({
      address,
      lat: lat.trim(),
      lng: lng.trim(),
      serviceType,
      date,
      time,
      height: height,
      length: length,
    }).toString();

    navigate(`available-services?${query}`);
    setDisable(false);
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title={t("compoundWall.compoundWallBuilder")}
          secImage={CompoundWallBuilderIcon}
          navigate="/service-category"
        />
        <div className="dashboard">
          <form onSubmit={handleSubmit}>
            <div className="option-wrapper">
              <div className="form-section">
                <h5 className="book-heading">{t("common.bookYourService")}</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <LocationInput
                      value={address}
                      onChange={(val) => setFormState((prev) => ({ ...prev, address: val }))}
                      onSelectLocation={handleSelectLocation}
                      error={errors.address}
                      placeholder={t("common.fieldLocation")}
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
                        {t("compoundWall.selectSpecificService")}
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
                <h5 className="book-heading">{t("compoundWall.wallDimension")}</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      {t("compoundWall.wallHeight")}
                      <span className="required">*</span>
                    </label>
                    <DecimalInput
                      className="form-control"
                      placeholder={t("compoundWall.enterWallHeight")}
                      value={height}
                      maxDecimals={2}
                      onChange={(val) => setFormState((prev) => ({ ...prev, height: val }))}
                    />
                    {errors.height && <p className="error-text">{errors.height}</p>}{" "}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      {t("compoundWall.wallLength")}
                      <span className="required">*</span>
                    </label>
                    <DecimalInput
                      className="form-control"
                      placeholder={t("compoundWall.enterWallLength")}
                      value={length}
                      maxDecimals={2}
                      onChange={(val) => setFormState((prev) => ({ ...prev, length: val }))}
                    />
                    {errors.length && <p className="error-text">{errors.length}</p>}{" "}
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
                    {errors.date && <p className="error-text">{errors.date}</p>}{" "}
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
              </button>{" "}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompoundWallBookYourService;
