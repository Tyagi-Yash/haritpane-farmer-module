import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductReviews } from "../../reduxtoolkit/slices/dashboard/classifiedSection";

function ProductReviews({ providerId }) {
  const dispatch = useDispatch();

  const { reviews, reviewStats, reviewsLoading } = useSelector(
    (state) => state.services.ClassifiedSectionMgmtSlice,
  );

  useEffect(() => {
    if (providerId) {
      dispatch(getAllProductReviews({ providerId }));
    }
  }, [providerId, dispatch]);

  if (reviewsLoading) return <p className="grey-para">Loading reviews...</p>;

  if (!reviewStats || !reviews.length) {
    return <p className="grey-para">No reviews available</p>;
  }

  const { totalReviews, averageRating, ratingBreakdown } = reviewStats;

  return (
    <>
      <h5 className="normal-heading">Reviews</h5>

      <div className="row rating-summary mb-4">
        <div className="col-md-10">
          {[5, 4, 3, 2, 1].map((star) => {
            const item = ratingBreakdown?.[`rating${star}`];
            return (
              <div key={star} className="d-flex align-items-center mb-2">
                <div className="rating-label">
                  {star} <span className="star">★</span>
                </div>
                <div className="bar-bg flex-grow-1 mx-2">
                  <div className="rating-bar" style={{ width: `${item?.percentage || 0}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="col-md-2 text-center d-flex flex-column justify-content-center align-items-center">
          <h2 className="fw-bold mb-0">
            {averageRating}
            <span className="text-warning" style={{ fontSize: "30px" }}>
              {" "}
              ★
            </span>
          </h2>
          <div className="review-count mt-1">{totalReviews} Reviews</div>
        </div>
      </div>

      {reviews.map((review) => (
        <div key={review._id}>
          <div className="review-user d-flex align-items-start mb-2">
            <img
              className="me-2"
              src={review?.farmerDetails?.profileImage}
              alt={review?.farmerDetails?.name}
              width={40}
              height={40}
            />
            <div>
              <strong className="normal-text">{review?.farmerDetails?.name || "Anonymous"}</strong>
              <div>
                <span className="text-warning">{"★".repeat(review.rating)}</span>
                <small className="time-text ms-2">
                  {new Date(review.createdAt).toLocaleDateString()}
                </small>
              </div>
            </div>
          </div>

          <p className="grey-para">{review.feedbacks}</p>
          <div className="divider" />
        </div>
      ))}
    </>
  );
}

export default ProductReviews;
