import { useTranslation } from "react-i18next";
import { formatDate } from "../../../utils/dateFormatter";
import { formatPrice } from "../../../utils/formatPrice";
import { convertTo12Hour } from "../../../utils/formatTime12Hour";
import Info from "./Info";

function CowDungJobInfo({ job }) {
  const { t } = useTranslation();

  return (
    <div className="job-info">
      <Info label={t("progress.serviceType")} value={t("progress.cowDung")} />
      <Info label={t("progress.status")} value={t(`progress.${job.status}`)} />
      <Info label={t("progress.deliveryLocation")} value={job.currentLocation} />
      <Info label={t("progress.fromDate")} value={formatDate(job.fromDate)} />
      <Info label={t("progress.startTime")} value={convertTo12Hour(job.startTime)} />
      <Info label={t("progress.cowDungType")} value={job.cowDunkType} />
      <Info
        label={t("progress.cowDungQuantity")}
        value={`${formatPrice(job.cowDunkQuantity)} ${t("progress.tons")}`}
      />
    </div>
  );
}

export default CowDungJobInfo;
