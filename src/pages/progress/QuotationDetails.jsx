import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getQuotationsForJobOrder } from "../../reduxtoolkit/slices/progress/quotations";
import QuotationCard from "../../components/progress/QuotationDetails/QuotationCard";
import TopbarModal from "../../components/common components/TopbarModal";
import JobInfo from "../../components/progress/QuotationDetails/JobInfo";

const QuotationDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const { quotations, loading } = useSelector((state) => state.services.quotationSlice);

  const { jobOrders } = useSelector((state) => state.services.jobOrderListSlice);

  const job = jobOrders.find((j) => j._id === orderId);

  useEffect(() => {
    dispatch(getQuotationsForJobOrder(orderId));
  }, [orderId, dispatch]);

  if (!job) return <p>Job details not found.</p>;

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal titleBox title="Job Order Details" navigate="/service-tracking" />

        <div className="quotation-wrapper">
          <JobInfo job={job} />

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

export default QuotationDetails;
