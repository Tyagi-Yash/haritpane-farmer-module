import { formatDate } from "../../../utils/dateFormatter";
import { formatPrice } from "../../../utils/formatPrice";
import { convertTo12Hour } from "../../../utils/formatTime12Hour";
import JobOrderActions from "./JobOrderActions";
import Row from "./Row";

const transportItemLabelMap = {
  vegitable: "Vegetable",
  cattle: "Cattle",
  equipment: "Equipment",
  other: "Other",
};
const getTransportWeight = (job) =>
  job.vegetableWeight || job.cattleWeight || job.equipmentWeight || job.otherWeightKg || "-";

function TransportationJobCard({ job }) {
  return (
    <div className="joborder-card">
      <div className="joborder-header">
        <span className="joborder-service">Service Name: Transportation</span>
        <span className={`status-badge ${job.status}`}>{job.status.toUpperCase()}</span>
      </div>

      <Row label="Start Location" value={job.currentLocation} />
      <Row label="End Location" value={job.destinationLocation} />
      <Row label="From Date" value={formatDate(job.fromDate)} />
      <Row label="Till Date" value={formatDate(job.tillDate)} />
      <Row label="Start Time" value={convertTo12Hour(job.startTime)} />
      <Row label="Vehicle" value={job.typeOfVehicle} />
      <Row
        label="Goods"
        value={`${transportItemLabelMap[job.transportItem]} (${formatPrice(getTransportWeight(job))} kg)`}
      />

      <JobOrderActions job={job} />
    </div>
  );
}

export default TransportationJobCard;
