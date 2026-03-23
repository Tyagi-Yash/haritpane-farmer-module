import { useTranslation } from "react-i18next";
import { formatDate } from "../../../utils/dateFormatter";
import { formatPrice } from "../../../utils/formatPrice";
import { convertTo12Hour } from "../../../utils/formatTime12Hour";
import JobOrderActions from "./JobOrderActions";
import Row from "./Row";

function TransportationJobCard({ job }) {
  const { t } = useTranslation();

  const transportItemLabelMap = {
    vegitable: t("progress.vegetable"),
    cattle: t("progress.cattle"),
    equipment: t("progress.equipment"),
    other: t("progress.other"),
  };

  const getTransportWeight = (job) =>
    job.vegetableWeight || job.cattleWeight || job.equipmentWeight || job.otherWeightKg || "-";

  return (
    <div className="joborder-card">
      <div className="joborder-header">
        <span className="joborder-service">
          {t("progress.serviceName")}: {t("progress.transportation")}
        </span>
        <span className={`status-badge ${job.status}`}>{t(`progress.${job.status}`)}</span>
      </div>

      <Row label={t("progress.startLocation")} value={job.currentLocation} />
      <Row label={t("progress.endLocation")} value={job.destinationLocation} />
      <Row label={t("progress.fromDate")} value={formatDate(job.fromDate)} />
      <Row label={t("progress.tillDate")} value={formatDate(job.tillDate)} />
      <Row label={t("progress.startTime")} value={convertTo12Hour(job.startTime)} />
      <Row label={t("progress.vehicle")} value={job.typeOfVehicle} />
      <Row
        label={t("progress.goods")}
        value={`${transportItemLabelMap[job.transportItem]} (${formatPrice(getTransportWeight(job))} ${t("progress.kg")})`}
      />

      <JobOrderActions job={job} />
    </div>
  );
}

export default TransportationJobCard;
