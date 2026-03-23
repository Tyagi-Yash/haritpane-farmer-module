import { useTranslation } from "react-i18next";
import { formatDate } from "../../../utils/dateFormatter";
import { formatPrice } from "../../../utils/formatPrice";
import { convertTo12Hour } from "../../../utils/formatTime12Hour";
import JobOrderActions from "./JobOrderActions";
import Row from "./Row";

function CowDungJobCard({ job }) {
  const { t } = useTranslation();

  return (
    <div className="joborder-card">
      <div className="joborder-header">
        <span className="joborder-service">
          {t("progress.serviceName")}: {t("progress.cowDung")}
        </span>
        <span className={`status-badge ${job.status}`}>{t(`progress.${job.status}`)}</span>
      </div>

      <Row label={t("progress.deliveryLocation")} value={job.currentLocation} />
      <Row label={t("progress.fromDate")} value={formatDate(job.fromDate)} />
      <Row label={t("progress.startTime")} value={convertTo12Hour(job.startTime)} />
      <Row label={t("progress.cowDungType")} value={job.cowDunkType} />
      <Row
        label={t("progress.cowDungQuantity")}
        value={`${formatPrice(job.cowDunkQuantity)} ${t("progress.tons")}`}
      />

      <JobOrderActions job={job} />
    </div>
  );
}

export default CowDungJobCard;
