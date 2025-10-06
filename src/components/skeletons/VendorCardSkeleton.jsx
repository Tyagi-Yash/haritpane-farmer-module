import SkeletonWrapper from "./SkeletonWrapper";

function VendorCardSkeleton({ count = 5 }) {
  return (
    <SkeletonWrapper>
      <h3 className="main-heading">Available Vendor</h3>
      <h6 className="form-label-max">Choose from in your radius</h6>
      {[...Array(count)].map((_, i) => (
        <div className="vendor-card skeleton-vendor-card" key={i}>
          <div className="service-info d-flex align-items-center">
            <div className="skeleton skeleton-service-image"></div>
            <div className="service-text">
              <div className="skeleton skeleton-subheading mb-2"></div>
              <div className="skeleton skeleton-rating"></div>
            </div>
          </div>
          <div className="price-info">
            <div className="skeleton skeleton-price mb-2"></div>
            <div className="skeleton skeleton-small-text"></div>
          </div>
        </div>
      ))}
    </SkeletonWrapper>
  );
}

export default VendorCardSkeleton;
