import { convertTo12Hour } from "../../../utils/formatTime12Hour";
import Info from "./Info";

function CowDungJobInfo({ job }) {
  return (
    <div className="job-info">
      <Info label="Service Type" value="Cow Dung" />
      <Info label="Status" value={job.status} />
      <Info label="Delivery Location" value={job.currentLocation} />
      <Info label="From Date" value={job.fromDate} />
      <Info label="Start Time" value={convertTo12Hour(job.startTime)} />
      <Info label="Cow Dung Type" value={job.cowDunkType} />
      <Info label="Cow Dung Quantity" value={job.cowDunkQuantity + " tons"} />
    </div>
  );
}

export default CowDungJobInfo;
