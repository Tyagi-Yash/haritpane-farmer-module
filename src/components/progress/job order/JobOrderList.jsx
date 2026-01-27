import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobOrders } from "../../reduxtoolkit/slices/progress/jobOrder";
import JobOrderCard from "./JobOrderCard";
import { Commonpagination } from "../common components/Commonpagination";

function JobOrderList() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const { jobOrders, loading, paginationData } = useSelector(
    (state) => state.services.jobOrderListSlice,
  );

  useEffect(() => {
    dispatch(getAllJobOrders({ page }));
  }, [dispatch, page]);

  if (loading) return <p>Loading job orders...</p>;
  if (!jobOrders?.length) return <p>No job orders found.</p>;

  return (
    <div className="dashboard service-tracking">
      <div className="joborder-grid">
        {jobOrders.map((job) => (
          <JobOrderCard key={job._id} job={job} />
        ))}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <Commonpagination
          ActivePage={paginationData?.page || 1}
          ItemsCountPerPage={10}
          TotalItemsCount={paginationData?.total || 0}
          pageRangeDisplayed={3}
          Onchange={setPage}
        />
      </div>
    </div>
  );
}

export default JobOrderList;
