import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import TopbarModal from "../../components/common components/TopbarModal";
import CowDunkSupplyIcon from "../../assets/images/CowDunkSupply-icon.png";
import { validateFromDate, validateSelectTime } from "../../utils/formValidators";
import { rescheduleJobOrder } from "../../reduxtoolkit/slices/progress/jobOrder";

function RescheduleCowDung() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();

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
    return <p className="text-center">Job order not found.</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

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
          title="Reschedule Cow Dung Supply"
          secImage={CowDunkSupplyIcon}
          navigate="/service-tracking"
        />

        <div className="dashboard">
          <form onSubmit={handleSubmit}>
            <div className="option-wrapper">
              <div className="form-section">
                <h5 className="book-heading">Service Details</h5>

                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label">Farm Location</label>
                    <input className="form-control" value={currentLocation} disabled />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Cow Dung Type</label>
                    <input className="form-control" value={cowDunkType} disabled />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Cow Dung Quantity</label>
                    <input className="form-control" value={cowDunkQuantity} disabled />
                  </div>
                </div>

                <h5 className="book-heading mt-4">Reschedule Date & Time</h5>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      From date<span className="required">*</span>
                    </label>
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
                    <label className="form-label">
                      Start time<span className="required">*</span>
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      name="startTime"
                      value={startTime}
                      onChange={handleInputChange}
                    />
                    {errors.startTime && <p className="error-text">{errors.startTime}</p>}
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

export default RescheduleCowDung;
