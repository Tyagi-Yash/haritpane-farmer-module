import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllJobOrders } from "../../reduxtoolkit/slices/progress/jobOrder";
import { useEffect } from "react";

function JobOrderCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobOrders());
  }, [dispatch]);

  const { jobOrders, loading } = useSelector((state) => state.services.jobOrderListSlice);

  const handleNavigate = (job) => navigate(`job-order-details/${job._id}`);

  if (loading) return <p>Loading job orders...</p>;

  if (!jobOrders.length) return <p>No job orders found.</p>;

  return (
    <div className="dashboard service-tracking">
      <div className="joborder-grid">
        {jobOrders.map((job) => (
          <div className="joborder-card" key={job._id}>
            <div className="joborder-header">
              <span className="joborder-service">
                Service Name: {job.jobOrderFor.charAt(0).toUpperCase() + job.jobOrderFor.slice(1)}
              </span>

              <span className={`status-badge ${job.status}`} title={job.cancellationReason || ""}>
                {job.status.toUpperCase()}
              </span>
            </div>

            <div className="joborder-row">
              <span className="joborder-label">Start Location</span>
              <span className="joborder-value">{job.currentLocation}</span>
            </div>
            <div className="joborder-row">
              <span className="joborder-label">End Location</span>
              <span className="joborder-value">{job.destinationLocation}</span>
            </div>
            <div className="joborder-row">
              <span className="joborder-label">From date</span>
              <span className="joborder-value">{job.fromDate}</span>
            </div>
            <div className="joborder-row">
              <span className="joborder-label">End date</span>
              <span className="joborder-value">{job.tillDate}</span>
            </div>
            <div className="joborder-row">
              <span className="joborder-label">Start time</span>
              <span className="joborder-value">{job.startTime}</span>
            </div>
            <div className="joborder-row">
              <span className="joborder-label">Vehicle</span>
              <span className="joborder-value">{job.typeOfVehicle}</span>
            </div>
            <div className="joborder-row">
              <span className="joborder-label">Goods</span>
              <span className="joborder-value">
                {job.transportItem} (
                {job.vegetableWeight || job.cattleWeight || job.equipmentWeight || job.otherWeightKg} kg)
              </span>
            </div>
            {job.status === "cancelled" || job.status === "rejected" ? (
              <div className="joborder-cancelled">❌ {job.cancellationReason || "Job cancelled"}</div>
            ) : (
              <>
                <div className="joborder-actions">
                  <button className="view-btn" onClick={() => handleNavigate(job)}>
                    View Quotations
                  </button>
                </div>

                {job.status === "pending" && (
                  <div className="joborder-actions">
                    <button className="accept-btn">Reschedule</button>
                    <button className="reject-btn">Cancel</button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobOrderCard;
