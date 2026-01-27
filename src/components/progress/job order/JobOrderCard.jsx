import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cancelJobOrder, getAllJobOrders } from "../../../reduxtoolkit/slices/progress/jobOrder";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Commonpagination } from "../../common components/Commonpagination";

function JobOrderCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllJobOrders({ page }));
  }, [dispatch, page]);

  const { jobOrders, loading, actionLoading, paginationData } = useSelector(
    (state) => state.services.jobOrderListSlice,
  );

  const handleCancelJob = async (jobId) => {
    try {
      await dispatch(cancelJobOrder(jobId)).unwrap();
      toast.success("Job order cancelled successfully");
    } catch (error) {
      toast.error("Failed to cancel job order");
    }
  };

  const handleNavigate = (job) => navigate(`job-order-details/${job._id}`);

  const handleReschedule = (job) => navigate(`job-order-reschedule/${job._id}`);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const transportItemLabelMap = {
    vegitable: "Vegetable",
    cattle: "Cattle",
    equipment: "Equipment",
    other: "Other",
  };

  const getTransportWeight = (job) => {
    return (
      job.vegetableWeight || job.cattleWeight || job.equipmentWeight || job.otherWeightKg || "-"
    );
  };

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
                {transportItemLabelMap[job.transportItem] || "-"} ({getTransportWeight(job)} kg)
              </span>
            </div>
            {job.status === "cancelled" ? (
              <div className="joborder-cancelled">
                ❌ {job.cancellationReason || "Job cancelled"}
              </div>
            ) : (
              <>
                <div className="joborder-actions">
                  <button className="view-btn" onClick={() => handleNavigate(job)}>
                    View Quotations
                  </button>
                </div>

                {job.status === "pending" && (
                  <div className="joborder-actions">
                    <button className="accept-btn" onClick={() => handleReschedule(job)}>
                      Reschedule
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() => handleCancelJob(job._id)}
                      disabled={actionLoading}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {!loading && jobOrders.length > 0 && (
        <div className="d-flex justify-content-center mt-4">
          <Commonpagination
            ActivePage={paginationData?.page || 1}
            ItemsCountPerPage={10}
            TotalItemsCount={paginationData?.total || 0}
            pageRangeDisplayed={3}
            Onchange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default JobOrderCard;
