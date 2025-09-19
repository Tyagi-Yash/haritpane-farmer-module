function SkeletonButtonGroup({ count = 2 }) {
  return (
    <div className="d-flex justify-content-end align-items-center mt-5">
      {[...Array(count)].map((_, i) => (
        <div key={i} className={`skeleton skeleton-btn ${i < count - 1 ? "me-3" : ""}`}></div>
      ))}
    </div>
  );
}
export default SkeletonButtonGroup;
