import profile from "../../assets/images/profile.png";
import closeIcon from "../../assets/images/close-icon.svg";
import ChatsNavbar from "../../components/chats/ChatsNavbar";
import TopbarModal from "../../components/common components/TopbarModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyReviews } from "../../reduxtoolkit/slices/rate and reviews/rateReview";
import AddProviderReview from "../../components/chats/reviews/AddProviderReview";

function ChatsReviewSection() {
  const dispatch = useDispatch();
  const { myReviewList } = useSelector((s) => s.services.reviewSlice);

  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    dispatch(fetchMyReviews());
  }, [dispatch]);

  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal titleBox={false} profile={profile} />
          <div className="chat dashboard">
            <div className="TitleBox top-bar mb-0 mt-0">
              <h4 className="main-heading">Chats</h4>
              <div className="d-flex align-items-center">
                <select className="form-control w-100 me-3">
                  <option>Sort by</option>
                  <option>A-Z</option>
                  <option>Z-A</option>
                </select>
                <div className="yellow-btn">
                  <button onClick={() => setShowReviewModal(true)}>
                    <i className="fa-solid fa-plus me-2" />
                    Share Experience
                  </button>
                </div>
              </div>
            </div>
            <ChatsNavbar />
            <div className="tab-content">
              <div className="tab-pane active" id="review">
                <div className="row">
                  {myReviewList.map((review) => (
                    <div className="col-6" key={review._id}>
                      <div className="review-card">
                        <div className="review-header">
                          <div className="reviewer-info">
                            <img src={review?.provider?.profileImage || profile} alt="User Photo" />
                            <strong>{review?.provider?.name || "N/A"}</strong>
                          </div>
                          <div className="review-date">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </div>
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
            </div>
          </div>
        </div>
      </div>
      <AddProviderReview
        show={showReviewModal}
        onHide={() => setShowReviewModal(false)}
        onSuccess={() => dispatch(fetchMyReviews())}
      />
    </>
  );
}

export default ChatsReviewSection;
