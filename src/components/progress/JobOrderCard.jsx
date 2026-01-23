import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllJobOrders } from "../../reduxtoolkit/slices/progress/jobOrder";
import { useEffect } from "react";

function JobOrderCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = () => {
    navigate(`job-order-details/${data._id}`);
  };

  useEffect(() => {
    dispatch(getAllJobOrders());
  }, []);

  const { jobOrders, loading } = useSelector((state) => state.services.jobOrderListSlice);

  return (
    <div className="dashboard service-tracking">
      <div className="joborder-grid">
        {jobOrders.map((data) => (
          <div className="joborder-card">
            <div className="joborder-row">
              <span className="joborder-label">Date & Time</span>
              <span className="joborder-value">{data.dateTime}</span>
            </div>

            <div className="joborder-row">
              <span className="joborder-label">Vehicle Type</span>
              <span className="joborder-value">{data.vehicleType}</span>
            </div>

            <div className="joborder-row">
              <span className="joborder-label">Goods to be Transported</span>
              <span className="joborder-value">{data.goods}</span>
            </div>

            <div className="joborder-row">
              <span className="joborder-label">End Travel Location</span>
              <span className="joborder-value">{data.location}</span>
            </div>

            <div className="joborder-row">
              <span className="joborder-label">Charges</span>
              <span className="joborder-value">₹ {data.charges}</span>
            </div>

            <div className="joborder-actions">
              <button className="view-btn" onClick={handleNavigate}>
                View Quotation
              </button>
            </div>
            <div className="joborder-actions">
              <button className="accept-btn">Reschedule</button>
              <button className="reject-btn">Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobOrderCard;
