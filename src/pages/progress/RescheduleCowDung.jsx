import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import TopbarModal from "../../components/common components/TopbarModal";
import CowDunkSupplyIcon from "../../assets/images/CowDunkSupply-icon.png";
import { validateFromDate, validateSelectTime } from "../../utils/formValidators";
import { rescheduleJobOrder } from "../../reduxtoolkit/slices/progress/jobOrder";
import Time12HourPicker from "../../components/common components/Time12HourPicker";

import DatePicker from "react-datepicker";
import { format } from "date-fns";

function RescheduleCowDung() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { t } = useTranslation();

  const { jobOrders, actionLoading } = useSelector((state) => state.services.jobOrderListSlice);

  const job = jobOrders.find((j) => j._id === orderId);

  const defaultForm = {
    currentLocation: "",
    cowDunkType: "",
    cowDunkQuantity: "",
    fromDate: "",
    startTime: "",
  };

  const [formState, setFormState] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  const { currentLocation, cowDunkType, cowDunkQuantity, fromDate, startTime } = formState;

  useEffect(() => {
    if (job) {
      setFormState({
        currentLocation: job.currentLocation,
        cowDunkType: job.cowDunkType,
        cowDunkQuantity: job.cowDunkQuantity,
        fromDate: job.fromDate,
        startTime: job.startTime,
      });
    }
  }, [job]);

  if (!job) {
    return <p className="text-center">{t("progress.jobNotFound")}</p>;
  }

  const validateForm = () => {
    let newErrors = {};
    const dateErrors = validateFromDate(fromDate);
    if (dateErrors) newErrors.fromDate = dateErrors;
    const timeError = validateSelectTime(fromDate, startTime);
    if (timeError) newErrors.startTime = timeError;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await dispatch(rescheduleJobOrder({ orderId, fromDate, startTime })).unwrap();
      toast.success(t("progress.jobRescheduled"));
      navigate("/service-tracking");
    } catch {
      toast.error(t("progress.jobRescheduleFail"));
    }
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox
          title={t("progress.rescheduleCowDung")}
          secImage={CowDunkSupplyIcon}
          navigate="/service-tracking"
        />

        <div className="dashboard">
          <form onSubmit={handleSubmit}>
            <div className="option-wrapper">
              <div className="form-section">
                <h5 className="book-heading">{t("progress.serviceDetails2")}</h5>

                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label">{t("progress.farmLocation")}</label>
                    <input className="form-control" value={currentLocation} disabled />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">{t("progress.cowDungType")}</label>
                    <input className="form-control" value={cowDunkType} disabled />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">{t("progress.cowDungQuantity")}</label>
                    <input className="form-control" value={cowDunkQuantity} disabled />
                  </div>
                </div>

                <h5 className="book-heading mt-4">{t("progress.rescheduleDateAndTime")}</h5>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      {t("progress.fromDate")}<span className="required">*</span>
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

                  <div className="col-md-6">
                    <label className="form-label">
                      {t("progress.startTime")}<span className="required">*</span>
                    </label>
                    <Time12HourPicker
                      value={startTime}
                      onChange={(val) => {
                        setFormState((prev) => ({ ...prev, startTime: val }));
                        setErrors((prev) => ({ ...prev, startTime: "" }));
                      }}
                      error={errors.startTime}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="available-service-btn">
              <button type="submit" disabled={actionLoading}>
                {actionLoading ? t("progress.rescheduling") : t("progress.rescheduleJob")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RescheduleCowDung;
