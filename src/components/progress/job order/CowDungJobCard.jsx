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
      <Row label="From Date" value={job.fromDate} />
      <Row label="Start Time" value={job.startTime} />
      <Row label="Cow Dunk Type" value={job.cowDunkType} />
      <Row label="Cow Dunk Quantity" value={job.cowDunkQuantity + " tons"} />

      <JobOrderActions job={job} />
    </div>
  );
}

export default CowDungJobCard;
