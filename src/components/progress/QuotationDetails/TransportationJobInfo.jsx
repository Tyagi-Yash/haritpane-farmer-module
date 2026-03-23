import { useTranslation } from "react-i18next";
import { formatDate } from "../../../utils/dateFormatter";
import { formatPrice } from "../../../utils/formatPrice";
import { convertTo12Hour } from "../../../utils/formatTime12Hour";
import Info from "./Info";

function TransportationJobInfo({ job }) {
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
    <div className="job-info">
      <Info label={t("progress.serviceType")} value={t("progress.transportation")} />
      <Info label={t("progress.status")} value={t(`progress.${job.status}`)} />
      <Info label={t("progress.fromLocation")} value={job.currentLocation} />
      <Info label={t("progress.toLocation")} value={job.destinationLocation} />
      <Info
        label={t("progress.schedule")}
        value={`${formatDate(job.fromDate)} – ${formatDate(job.tillDate)}, ${convertTo12Hour(job.startTime)}`}
      />

      <Info label={t("progress.vehicleType")} value={job.typeOfVehicle} />
      <Info
        label={t("progress.goods")}
        value={`${transportItemLabelMap[job.transportItem]} (${formatPrice(getTransportWeight(job))} ${t("progress.kg")})`}
      />
    </div>
  );
}

export default TransportationJobInfo;
