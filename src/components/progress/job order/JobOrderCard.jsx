import CowDungJobCard from "./CowDungJobCard";
import TransportationJobCard from "./TransportationJobCard";

function JobOrderCard({ job }) {
  if (job.jobOrderFor === "transportation") {
    return <TransportationJobCard job={job} />;
  }

  if (job.jobOrderFor === "cowdung") {
    return <CowDungJobCard job={job} />;
  }

  return null;
}

export default JobOrderCard;
