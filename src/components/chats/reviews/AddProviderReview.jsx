import closeIcon from "../../../assets/images/close-icon.svg";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  fetchProviders,
  addProviderReview,
} from "../../../reduxtoolkit/slices/rate and reviews/rateReview";
import { toast } from "react-toastify";

function AddProviderReview({ show, onHide, onSuccess }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { providers, addLoading } = useSelector((s) => s.services.reviewSlice);

  const [rating, setRating] = useState(0);
  const [providerId, setProviderId] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (show) dispatch(fetchProviders());
  }, [show, dispatch]);

  const handleSubmit = async () => {
    if (!rating) {
      toast.error(t("chats.selectRatingError"));
      return;
    }
    if (!providerId) {
      toast.error(t("chats.selectVendorError"));
      return;
    }
    if (!feedback.trim()) {
      toast.error(t("chats.writeReviewError"));
      return;
    }
    try {
      const payload = { serviceId: providerId, rating, review: feedback.trim() };
      await dispatch(addProviderReview(payload)).unwrap();
      toast.success(t("chats.reviewAddedSuccess"));
      onSuccess?.();
      handleClose();
    } catch (err) {
      toast.error(t("chats.failedToSubmitReview"));
    }
  };

  const handleClose = () => {
    setRating(0);
    setProviderId("");
    setFeedback("");
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="modal share-experience">
      <div className="modal-header">
        <img src={closeIcon} alt="close" onClick={handleClose} />
      </div>

      <div className="modal-body">
        <h4 className="modal-title text-center main-heading mb-4">{t("chats.howWasService")}</h4>

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

        <select
          className="form-control mb-3"
          value={providerId}
          onChange={(e) => setProviderId(e.target.value)}
        >
          <option value="">{t("chats.selectFromVendors")}</option>
          {providers.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <div className="mt-3">
          <textarea
            disabled={addLoading}
            className="form-control"
            rows={4}
            maxLength={100}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder={t("chats.writeReview")}
          />
          <div className="text-end small mt-1">{feedback.length}/100</div>
        </div>
      </div>

      <div className="modal-footer yellow-btn">
        <button onClick={handleSubmit} disabled={addLoading}>
          {addLoading ? t("chats.posting") : t("chats.postRatingReview")}
        </button>
      </div>
    </Modal>
  );
}

export default AddProviderReview;
