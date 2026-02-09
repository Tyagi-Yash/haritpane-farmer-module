import SkeletonWrapper from "./SkeletonWrapper";

function JobOrderSkeleton({ count = 6 }) {
  return (
    <SkeletonWrapper>
      <div className="dashboard service-tracking">
        <div className="joborder-grid">
          {[...Array(count)].map((_, i) => (
            <div className="joborder-card" key={i}>
              <div className="joborder-header d-flex justify-content-between align-items-center mb-3">
                <div className="skeleton skeleton-service-name"></div>
                <div className="skeleton skeleton-status-badge"></div>
              </div>
              {[...Array(5)].map((_, rowIndex) => (
                <div className="joborder-row mb-2" key={rowIndex}>
                  <div className="skeleton skeleton-job-label"></div>
                  <div className="skeleton skeleton-value"></div>
                </div>
              ))}
              <div className="joborder-actions mt-3">
                <div className="skeleton skeleton-button full-width"></div>
              </div>
              <div className="joborder-actions ">
                <div className="skeleton skeleton-button"></div>
                <div className="skeleton skeleton-button"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SkeletonWrapper>
  );
}

export default JobOrderSkeleton;
