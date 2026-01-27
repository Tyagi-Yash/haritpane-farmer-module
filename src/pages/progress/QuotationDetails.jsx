import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getQuotationsForJobOrder } from "../../reduxtoolkit/slices/progress/quotations";
import QuotationCard from "../../components/progress/job order/QuotationCard";
import TopbarModal from "../../components/common components/TopbarModal";

const QuotationDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuotationsForJobOrder(orderId));
  }, [orderId, dispatch]);

  const { quotations, loading } = useSelector((state) => state.services.quotationSlice);

  const { jobOrders } = useSelector((state) => state.services.jobOrderListSlice);

  const job = jobOrders.find((j) => j._id === orderId);

  if (!job) {
    return <p>Job details not found.</p>;
  }

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

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal titleBox title="Job Order Details" navigate="/service-tracking" />

        <div className="quotation-wrapper">
          <div className="job-info">
            <Info label="Service Type" value={job.jobOrderFor} />
            <Info label="Status" value={job.status} />
            <Info label="From Location" value={job.currentLocation} />
            <Info label="To Location" value={job.destinationLocation} />
            <Info label="Schedule" value={`${job.fromDate} – ${job.tillDate}, ${job.startTime}`} />
            <Info label="Vehicle Type" value={job.typeOfVehicle} />
            <Info
              label="Goods"
              value={`${transportItemLabelMap[job.transportItem] || "-"} (${getTransportWeight(job)} kg)`}
            />

            <Info
              label="Goods"
              value={`${job.transportItem === "vegitable"} (${job.vegetableWeight || job.cattleWeight || job.equipmentWeight || job.otherWeightKg} kg)`}
            />
          </div>

          <h3 className="section-title">Quotations</h3>

          {loading ? (
            <p>Loading quotations...</p>
          ) : quotations.length === 0 ? (
            <p>No quotations received yet.</p>
          ) : (
            <div className="quotation-grid">
              {quotations.map((q) => (
                <QuotationCard key={q.quotationId} data={q} jobOrderId={orderId} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="quotation-row">
    <span className="quotation-label">{label}</span>
    <span className="quotation-value">{value || "-"}</span>
  </div>
);

export default QuotationDetails;
