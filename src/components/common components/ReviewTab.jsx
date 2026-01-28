import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import profilePic from "../../assets/images/user-icon.svg";
import { fetchServiceReviews } from "../../reduxtoolkit/slices/rate and reviews/rateReview";
import ReviewTabSkeleton from "../skeletons/ReviewTabSkeleton";

const ReviewTab = ({ serviceId }) => {
  const dispatch = useDispatch();
  const { reviewList, loading } = useSelector((state) => state.services.reviewSlice);

  useEffect(() => {
    if (serviceId) {
      dispatch(fetchServiceReviews(serviceId));
    }
  }, [dispatch, serviceId]);

  if (loading) return <ReviewTabSkeleton/>;

  return (
    <div className="tab-pane active">
      <div className="row">
        {reviewList.length === 0 && <p>No reviews found</p>}

        {reviewList.map((review) => (
          <div className="col-6" key={review._id}>
            <div className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <img src={review?.farmer?.profileImage || profilePic} alt="User" />
                  <strong>{review?.farmer?.name || "Anonymous"}</strong>
                </div>
                <div className="review-date">{new Date(review.updatedAt).toLocaleDateString()}</div>
              </div>

              <div className="stars">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>

              <div className="review-text">{review.feedbacks}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewTab;
