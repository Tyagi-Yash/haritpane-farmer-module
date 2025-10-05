function SkeletonProductCard() {
  return (
    <div className="col-md-4 mb-3">
      <div className="product-card">
        <div className="skeleton skeleton-image-part"></div>
        <div className="card-text-part">
          <h6 className="skeleton skeleton-heading mb-3"></h6>
          <p className="skeleton skeleton-label mb-2"></p>
          <p className="skeleton skeleton-label mb-2"></p>
        </div>
        <div className="available-service-btn">
          <button className="skeleton skeleton-btn"></button>
        </div>
      </div>
    </div>
  );
}

export default SkeletonProductCard;
