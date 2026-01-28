import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { cancelJobOrder } from "../../../reduxtoolkit/slices/progress/jobOrder";

function JobOrderActions({ job }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { actionLoading } = useSelector((state) => state.services.jobOrderListSlice);

  const handleReschedule = () => {
    if (job.jobOrderFor === "transportation") {
      navigate(`transport-reschedule/${job._id}`);
    } else if (job.jobOrderFor === "cowdung") {
      navigate(`cowdung-reschedule/${job._id}`);
    }
  };

  const handleCancel = async () => {
    try {
      await dispatch(cancelJobOrder(job._id)).unwrap();
      toast.success("Job order cancelled");
    } catch {
      toast.error("Failed to cancel job order");
    }
  };

  if (job.status === "cancelled") {
    return <div className="joborder-cancelled">❌ {job.cancellationReason || "Job cancelled"}</div>;
  }

  return (
    <>
      <div className="joborder-actions" style={{marginTop:"auto"}}>
        <button className="view-btn" onClick={() => navigate(`job-order-details/${job._id}`)}>
          View Quotations
        </button>
      </div>

      {job.status === "pending" && (
        <div className="joborder-actions">
          <button className="accept-btn" onClick={handleReschedule}>
            Reschedule
          </button>

          <button className="reject-btn" onClick={handleCancel} disabled={actionLoading}>
            Cancel
          </button>
        </div>
      )}
    </>
  );
}

export default JobOrderActions;
