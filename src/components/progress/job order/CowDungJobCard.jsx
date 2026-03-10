import { formatDate } from "../../../utils/dateFormatter";
import { formatPrice } from "../../../utils/formatPrice";
import { convertTo12Hour } from "../../../utils/formatTime12Hour";
import JobOrderActions from "./JobOrderActions";
import Row from "./Row";

function CowDungJobCard({ job }) {
  return (
    <div className="joborder-card">
      <div className="joborder-header">
        <span className="joborder-service">Service Name: Cow Dung</span>
        <span className={`status-badge ${job.status}`}>{job.status.toUpperCase()}</span>
      </div>

      <Row label="Delivery Location" value={job.currentLocation} />
      <Row label="From Date" value={formatDate(job.fromDate)} />
      <Row label="Start Time" value={convertTo12Hour(job.startTime)} />
      <Row label="Cow Dung Type" value={job.cowDunkType} />
      <Row label="Cow Dung Quantity" value={`${formatPrice(job.cowDunkQuantity)} tons`} />

      <JobOrderActions job={job} />
    </div>
  );
}

export default CowDungJobCard;
