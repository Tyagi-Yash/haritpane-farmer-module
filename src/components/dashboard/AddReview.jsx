import closeIcon from "../../assets/images/close-icon.svg";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addReview } from "../../reduxtoolkit/slices/dashboard/classifiedSection";

function AddReview({ show, onHide, onSuccess, providerId }) {
  const dispatch = useDispatch();
  const { addLoading } = useSelector((s) => s.services.ClassifiedSectionMgmtSlice);

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async () => {
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }

    if (!feedback.trim()) {
      toast.error("Please write a review");
      return;
    }
    try {
      const payload = { providerId, rating, feedbacks: feedback.trim() };

      await dispatch(addReview(payload)).unwrap();
      toast.success("Review added successfully");
      onSuccess?.();
      handleClose();
    } catch (err) {
      toast.error(err?.message || "Failed to submit review");
    }
  };

  const handleClose = () => {
    setRating(0);
    setFeedback("");
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="modal share-experience">
      <div className="modal-header">
        <img src={closeIcon} alt="close" onClick={handleClose} />
      </div>

      <div className="modal-body">
        <h4 className="modal-title text-center main-heading mb-4">How is the Product</h4>

        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <i
              key={star}
              className={`fa-star fa-solid fs-3 mx-1 ${
                rating >= star ? "text-warning" : "text-muted"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        <div className="mt-3">
          <textarea
            disabled={addLoading}
            className="form-control"
            rows={4}
            maxLength={100}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write a Review..."
          />
          <div className="text-end small mt-1">{feedback.length}/100</div>
        </div>
      </div>

      <div className="modal-footer yellow-btn">
        <button onClick={handleSubmit} disabled={addLoading}>
          {addLoading ? "Posting..." : "Post Review"}
        </button>
      </div>
    </Modal>
  );
}

export default AddReview;
