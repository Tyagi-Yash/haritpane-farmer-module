import Info from "./Info";

function CowDungJobInfo({ job }) {
  return (
    <div className="job-info">
      <Info label="Service Type" value="Cow Dung" />
      <Info label="Status" value={job.status} />
      <Info label="Delivery Location" value={job.currentLocation} />
      <Info label="From Date" value={job.fromDate} />
      <Info label="Start Time" value={job.startTime} />
      <Info label="Cow Dunk Type" value={job.cowDunkType} />
      <Info label="Cow Dunk Quantity" value={job.cowDunkQuantity + " tons"} />
    </div>
  );
}

export default CowDungJobInfo;
