import Info from "./Info";

const transportItemLabelMap = {
  vegitable: "Vegetable",
  cattle: "Cattle",
  equipment: "Equipment",
  other: "Other",
};

const getTransportWeight = (job) =>
  job.vegetableWeight || job.cattleWeight || job.equipmentWeight || job.otherWeightKg || "-";

function TransportationJobInfo({ job }) {
  return (
    <div className="job-info">
      <Info label="Service Type" value="Transportation" />
      <Info label="Status" value={job.status} />
      <Info label="From Location" value={job.currentLocation} />
      <Info label="To Location" value={job.destinationLocation} />
      <Info label="Schedule" value={`${job.fromDate} – ${job.tillDate}, ${job.startTime}`} />
      <Info label="Vehicle Type" value={job.typeOfVehicle} />
      <Info
        label="Goods"
        value={`${transportItemLabelMap[job.transportItem]} (${getTransportWeight(job)} kg)`}
      />
    </div>
  );
}

export default TransportationJobInfo;
