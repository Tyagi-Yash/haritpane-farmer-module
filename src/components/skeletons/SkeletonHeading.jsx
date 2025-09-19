function SkeletonHeading({ subheading = false }) {
  return (
    <>
      <div className="skeleton skeleton-heading mb-3"></div>
      {subheading && <div className="skeleton skeleton-subheading mb-3"></div>}
    </>
  );
}
export default SkeletonHeading;
