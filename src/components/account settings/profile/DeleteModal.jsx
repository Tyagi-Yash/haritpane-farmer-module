import { Modal } from "react-bootstrap";
import deleteEmoji from "../../../assets/images/delete-emoji.png";
import { editFarmerProfile } from "../../../reduxtoolkit/slices/account settings/profile";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function DeleteModal({ show, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const handleDelete = async () => {
    setDisable(true);

    try {
      const res = await dispatch(editFarmerProfile({ status: "deleted" }));
      const status = res?.payload?.status;
      const message = res?.payload?.data?.message;

      if (status === 200) {
        localStorage.clear();
        navigate("/signup");
        toast.success(message || "Account deleted successfully");
      } else {
        toast.error(message || "Failed to delete account");
      }
    } catch (error) {
      toast.error("Something went wrong");
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
        <div className="modal-emoji">
          <img src={deleteEmoji} alt="" />
        </div>
        <div className="modal-title">Are you sure you want to delete your account?</div>
        <p>
          You’ll permanently lose all saved info, orders, and <br />
          access to HaritPane services.
        </p>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-delete-modal"
            onClick={handleDelete}
            disabled={disable}
          >
            {disable ? "Deleting..." : "Delete Account"}
          </button>
          <button type="button" className="btn btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteModal;
