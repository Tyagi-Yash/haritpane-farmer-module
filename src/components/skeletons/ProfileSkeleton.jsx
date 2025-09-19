import SkeletonWrapper from "./SkeletonWrapper";
import SkeletonAvatar from "./SkeletonAvatar";
import SkeletonHeading from "./SkeletonHeading";
import SkeletonInput from "./SkeletonInput";
import SkeletonButtonGroup from "./SkeletonButtonGroup";

function ProfileSkeleton() {
  return (
    <SkeletonWrapper>
      <SkeletonAvatar />
      <SkeletonHeading subheading />

      <div className="row g-3">
        <div className="col-md-6">
          <SkeletonInput />
        </div>
        <div className="col-md-6">
          <SkeletonInput />
        </div>
        <div className="col-md-6">
          <SkeletonInput />
        </div>
        <div className="col-md-6">
          <SkeletonInput />
        </div>
      </div>

      <SkeletonButtonGroup count={2} />
    </SkeletonWrapper>
  );
}
export default ProfileSkeleton;
