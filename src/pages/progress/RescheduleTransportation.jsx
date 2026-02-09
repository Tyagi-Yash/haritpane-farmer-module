import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import TopbarModal from "../../components/common components/TopbarModal";
import TransportationIcon from "../../assets/images/Transportation-icon.png";
import { validateDates, validateSelectTime } from "../../utils/formValidators";
import { rescheduleJobOrder } from "../../reduxtoolkit/slices/progress/jobOrder";
import Time12HourPicker from "../../components/common components/Time12HourPicker";

function RescheduleTransportation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();

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
    return <p className="text-center">Job order not found.</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

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
      toast.success("Job order rescheduled successfully");
      navigate("/service-tracking");
    } catch {
      toast.error("Failed to reschedule job order");
    }
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox
          title="Reschedule Transportation"
          secImage={TransportationIcon}
          navigate="/service-tracking"
        />

        <div className="dashboard">
          <form onSubmit={handleSubmit}>
            <div className="option-wrapper">
              <div className="form-section">
                <h5 className="book-heading">Service Details</h5>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Transport Item</label>
                    <input className="form-control" value={transportItem} disabled />
                  </div>

                  {transportItem === "vegitable" && (
                    <>
                      <div className="col-md-6">
                        <label className="form-label">Vegetable Type</label>
                        <input className="form-control" value={vegetableType} disabled />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Vegetable Weight (kg)</label>
                        <input className="form-control" value={vegetableWeight} disabled />
                      </div>
                    </>
                  )}

                  {transportItem === "cattle" && (
                    <>
                      <div className="col-md-6">
                        <label className="form-label">Number of Cattle</label>
                        <input className="form-control" value={numberOfCattle} disabled />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Cattle Weight (kg)</label>
                        <input className="form-control" value={cattleWeight} disabled />
                      </div>
                    </>
                  )}

                  {transportItem === "equipment" && (
                    <>
                      <div className="col-md-6">
                        <label className="form-label">Equipment Dimensions</label>
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
                        <label className="form-label">Equipment Weight</label>
                        <input className="form-control" value={equipmentWeight} disabled />
                      </div>
                    </>
                  )}

                  {transportItem === "other" && (
                    <div className="col-md-6">
                      <label className="form-label">Other Weight (kg)</label>
                      <input className="form-control" value={otherWeightKg} disabled />
                    </div>
                  )}

                  <div className="col-md-6">
                    <label className="form-label">Current Location</label>
                    <input className="form-control" value={currentLocation} disabled />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Destination Location</label>
                    <input className="form-control" value={destinationLocation} disabled />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Vehicle Type</label>
                    <input className="form-control" value={typeOfVehicle} disabled />
                  </div>
                </div>

                <h5 className="book-heading mt-4">Reschedule Date & Time</h5>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">From Date *</label>
                    <input
                      type="date"
                      className="form-control"
                      name="fromDate"
                      value={fromDate}
                      onChange={handleInputChange}
                    />
                    {errors.fromDate && <p className="error-text">{errors.fromDate}</p>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Till Date *</label>
                    <input
                      type="date"
                      className="form-control"
                      name="tillDate"
                      value={tillDate}
                      onChange={handleInputChange}
                    />
                    {errors.toDate && <p className="error-text">{errors.toDate}</p>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Start Time *</label>
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
                {actionLoading ? "Rescheduling..." : "Reschedule Job"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RescheduleTransportation;
