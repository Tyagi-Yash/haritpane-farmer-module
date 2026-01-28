import TransportationJobInfo from "./TransportationJobInfo";
import CowDungJobInfo from "./CowDungJobInfo";

function JobInfo({ job }) {
  if (job.jobOrderFor === "transportation") {
    return <TransportationJobInfo job={job} />;
  }

  if (job.jobOrderFor === "cowdung") {
    return <CowDungJobInfo job={job} />;
  }

  return null;
}

export default JobInfo;
