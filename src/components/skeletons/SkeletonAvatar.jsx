function SkeletonAvatar({ withIcon = false }) {
  return (
    <div className="d-flex align-items-center mb-2 position-relative">
      <div className="skeleton skeleton-avatar me-3"></div>
      {withIcon && <div className="skeleton skeleton-icon"></div>}
    </div>
  );
}
export default SkeletonAvatar;
