import { Modal } from "react-bootstrap";
import deleteEmoji from "../../../assets/images/delete-emoji.png";
import { editFarmerProfile } from "../../../reduxtoolkit/slices/account settings/profile";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { disconnectSocket } from "../../../socket/socket";
import { resetReviewList } from "../../../reduxtoolkit/slices/rate and reviews/rateReview";
import i18n from "../../../i18n";
import { clearBookingList } from "../../../reduxtoolkit/slices/progress/bookingList";
import { resetChatState } from "../../../reduxtoolkit/slices/chats/chats";

function DeleteModal({ show, onClose }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const handleDelete = async () => {
    setDisable(true);

    try {
      const res = await dispatch(editFarmerProfile({ status: "deleted" }));
      const status = res?.payload?.status;

      if (status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("farmerProfile");
        localStorage.removeItem("i18nextLng");
        localStorage.removeItem("fcmToken");
        dispatch(resetChatState());
        dispatch(clearBookingList());
        dispatch(resetReviewList());
        disconnectSocket();

        i18n.changeLanguage("en");
        navigate("/signup");
        toast.success(t("account.accountDeletedSuccess"));
      } else {
        toast.error(t("account.accountDeleteFail"));
      }
    } catch (error) {
      toast.error(t("common.somethingWentWrong"));
    } finally {
      setDisable(false);
      onClose();
    }
  };
  return (
    <Modal
      className="Logout-modal"
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        <div className="my-profile">
          <div className="modal-emoji">
            <img src={deleteEmoji} alt="" />
          </div>
          <div className="modal-title">{t("account.confirmDeleteAccount")}</div>
          <p>{t("account.deleteAccountDesc")}</p>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-delete-modal"
              onClick={handleDelete}
              disabled={disable}
            >
              {disable ? t("account.deleting") : t("account.deleteAccount")}
            </button>
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              {t("common.cancel")}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteModal;
