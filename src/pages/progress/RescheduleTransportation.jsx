import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import TopbarModal from "../../components/common components/TopbarModal";
import TransportationIcon from "../../assets/images/Transportation-icon.png";
import { validateDates, validateSelectTime } from "../../utils/formValidators";
import { rescheduleJobOrder } from "../../reduxtoolkit/slices/progress/jobOrder";
import Time12HourPicker from "../../components/common components/Time12HourPicker";

import DatePicker from "react-datepicker";
import { format } from "date-fns";

function RescheduleTransportation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { t } = useTranslation();

  const { jobOrders, actionLoading } = useSelector((state) => state.services.jobOrderListSlice);

  const job = jobOrders.find((j) => j._id === orderId);

  const defaultForm = {
    currentLocation: "",
    destinationLocation: "",
    transportItem: "",
    vegetableType: "",
    vegetableWeight: "",
    numberOfCattle: "",
    cattleWeight: "",
    equipmentDimensions: { lengthCm: "", widthCm: "", heightCm: "" },
    equipmentWeight: "",
    otherWeightKg: "",
    typeOfVehicle: "",
    fromDate: "",
    tillDate: "",
    startTime: "",
  };

  const [formState, setFormState] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  const {
    currentLocation,
    destinationLocation,
    transportItem,
    vegetableType,
    vegetableWeight,
    numberOfCattle,
    cattleWeight,
    equipmentDimensions,
    equipmentWeight,
    otherWeightKg,
    typeOfVehicle,
    fromDate,
    tillDate,
    startTime,
  } = formState;

  const { lengthCm, widthCm, heightCm } = equipmentDimensions;

  useEffect(() => {
    if (job) {
      setFormState({
        currentLocation: job.currentLocation,
        destinationLocation: job.destinationLocation,
        transportItem: job.transportItem,
        vegetableType: job.vegetableType || "",
        vegetableWeight: job.vegetableWeight || "",
        numberOfCattle: job.numberOfCattle || "",
        cattleWeight: job.cattleWeight || "",
        equipmentDimensions: job.equipmentDimensions || {
          lengthCm: "",
          widthCm: "",
          heightCm: "",
        },
        equipmentWeight: job.equipmentWeight || "",
        otherWeightKg: job.otherWeightKg || "",
        typeOfVehicle: job.typeOfVehicle,
        fromDate: job.fromDate,
        tillDate: job.tillDate,
        startTime: job.startTime,
      });
    }
  }, [job]);

  if (!job) {
    return <p className="text-center">{t("progress.jobNotFound")}</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    const dateErrors = validateDates(fromDate, tillDate);
    newErrors = { ...newErrors, ...dateErrors };
    const timeError = validateSelectTime(fromDate, startTime);
    if (timeError) newErrors.startTime = timeError;
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await dispatch(rescheduleJobOrder({ orderId, fromDate, tillDate, startTime })).unwrap();
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
          title={t("progress.rescheduleTransportation")}
          secImage={TransportationIcon}
          navigate="/service-tracking"
        />

        <div className="dashboard">
          <form onSubmit={handleSubmit}>
            <div className="option-wrapper">
              <div className="form-section">
                <h5 className="book-heading">{t("progress.serviceDetails2")}</h5>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">{t("progress.transportItem")}</label>
                    <input className="form-control" value={transportItem} disabled />
                  </div>

                  {transportItem === "vegitable" && (
                    <>
                      <div className="col-md-6">
                        <label className="form-label">{t("progress.vegetableType")}</label>
                        <input className="form-control" value={vegetableType} disabled />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">{t("progress.vegetableWeight")}</label>
                        <input className="form-control" value={vegetableWeight} disabled />
                      </div>
                    </>
                  )}

                  {transportItem === "cattle" && (
                    <>
                      <div className="col-md-6">
                        <label className="form-label">{t("progress.numberOfCattle")}</label>
                        <input className="form-control" value={numberOfCattle} disabled />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">{t("progress.cattleWeight")}</label>
                        <input className="form-control" value={cattleWeight} disabled />
                      </div>
                    </>
                  )}

                  {transportItem === "equipment" && (
                    <>
                      <div className="col-md-6">
                        <label className="form-label">{t("progress.equipmentDimensions")}</label>
                        <div className="row">
                          <div className="col-md-4">
                            <input className="form-control" value={lengthCm} disabled />
                          </div>
                          <div className="col-md-4">
                            <input className="form-control" value={widthCm} disabled />
                          </div>
                          <div className="col-md-4">
                            <input className="form-control" value={heightCm} disabled />
                          </div>
                        </div>
                      </div>
 
                      <div className="col-md-6">
                        <label className="form-label">{t("progress.equipmentWeight")}</label>
                        <input className="form-control" value={equipmentWeight} disabled />
                      </div>
                    </>
                  )}

                  {transportItem === "other" && (
                    <div className="col-md-6">
                      <label className="form-label">{t("progress.otherWeight")}</label>
                      <input className="form-control" value={otherWeightKg} disabled />
                    </div>
                  )}

                  <div className="col-md-6">
                    <label className="form-label">{t("progress.currentLocation")}</label>
                    <input className="form-control" value={currentLocation} disabled />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">{t("progress.destinationLocation")}</label>
                    <input className="form-control" value={destinationLocation} disabled />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">{t("progress.vehicleType")}</label>
                    <input className="form-control" value={typeOfVehicle} disabled />
                  </div>
                </div>

                <h5 className="book-heading mt-4">{t("progress.rescheduleDateAndTime")}</h5>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">{t("progress.fromDate")} *</label>
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
                    <label className="form-label">{t("progress.tillDate")} *</label>
                    <DatePicker
                      selected={tillDate ? new Date(tillDate) : null}
                      onChange={(selectedDate) => {
                        const formatted = format(selectedDate, "yyyy-MM-dd");
                        setFormState((prev) => ({ ...prev, tillDate: formatted }));
                        setErrors((prev) => ({ ...prev, tillDate: "" }));
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

                  <div className="col-md-6">
                    <label className="form-label">{t("progress.startTime")} *</label>
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

export default RescheduleTransportation;
