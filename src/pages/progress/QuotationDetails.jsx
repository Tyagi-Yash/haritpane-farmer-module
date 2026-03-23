import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getQuotationsForJobOrder } from "../../reduxtoolkit/slices/progress/quotations";
import QuotationCard from "../../components/progress/QuotationDetails/QuotationCard";
import TopbarModal from "../../components/common components/TopbarModal";
import JobInfo from "../../components/progress/QuotationDetails/JobInfo";

const QuotationDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { quotations, loading } = useSelector((state) => state.services.quotationSlice);

  const { jobOrders } = useSelector((state) => state.services.jobOrderListSlice);

  const job = jobOrders.find((j) => j._id === orderId);

  useEffect(() => {
    dispatch(getQuotationsForJobOrder(orderId));
  }, [orderId, dispatch]);

  if (!job) return <p>{t("progress.jobDetailsNotFound")}</p>;

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal titleBox title={t("progress.jobOrderDetails")} navigate="/service-tracking" />

        <div className="quotation-wrapper">
          <JobInfo job={job} />

          <h3 className="section-title">{t("progress.quotations")}</h3>

          {loading ? (
            <p>{t("progress.loadingQuotations")}</p>
          ) : quotations.length === 0 ? (
            <p>{t("progress.noQuotations")}</p>
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
