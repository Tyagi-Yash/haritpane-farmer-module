import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

const CancelBookingModal = ({ show, onClose, onCancel }) => {
  const [reason, setReason] = useState("");
  const { loading } = useSelector((state) => state.services.bookingSlice);

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
        <div className="text-muted modal-title">Cancelling this booking cannot be undone.</div>
        <textarea
          className="cancilation-input"
          rows={3}
          name="reason"
          placeholder="Please tell us why you want to cancel*"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="modal-footer">
          <button
            className="btn btn-logout-modal"
            disabled={loading || !reason.trim()}
            onClick={() => {
              onCancel(reason);
              setReason("");
            }}
            style={{ width: "200px" }}
          >
            {loading ? "Cancelling..." : "Cancel Booking"}
          </button>
          <button className="btn btn-cancel" onClick={onClose}>
            Keep Booking
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CancelBookingModal;
