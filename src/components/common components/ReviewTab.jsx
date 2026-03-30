import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import profilePic from "../../assets/images/user-icon.svg";
import { fetchServiceReviews } from "../../reduxtoolkit/slices/rate and reviews/rateReview";
import ReviewTabSkeleton from "../skeletons/ReviewTabSkeleton";
import { useTranslation } from "react-i18next";

const ReviewTab = ({ serviceId }) => {
  const dispatch = useDispatch();
  const { reviewList = [], loading } = useSelector((state) => state.services.reviewSlice || {});
  const { t } = useTranslation();

  useEffect(() => {
    if (serviceId) {
      dispatch(fetchServiceReviews(serviceId));
    }
  }, [dispatch, serviceId]);

  if (loading) return <ReviewTabSkeleton />;

  return (
    <div className="tab-pane active">
      <div className="row">
        {reviewList.length === 0 && <p>{t("progress.noReviewsFound")}</p>}

        {reviewList.map((review, index) => {
          const rating = Math.max(0, Math.min(5, Number(review?.rating) || 0));
          const reviewDate = review?.updatedAt
            ? new Date(review.updatedAt).toLocaleDateString()
            : "N/A";

          return (
            <div className="col-6" key={review?._id || index}>
              <div className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <img src={review?.farmer?.profileImage || profilePic} alt="User" />
                    <strong>{review?.farmer?.name || t("progress.anonymous")}</strong>
                  </div>
                  <div className="review-date">{reviewDate}</div>
                </div>

                <div className="stars">
                  {"★".repeat(rating)}
                  {"☆".repeat(5 - rating)}
                </div>

                <div className="review-text">{review?.feedbacks || t("progress.noFeedbackProvided")}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewTab;
