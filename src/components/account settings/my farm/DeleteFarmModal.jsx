import { Modal } from "react-bootstrap";

const DeleteFarmModal = ({ show, onClose, onDelete, farmName }) => {
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
        <div className="modal-title">Delete Field?</div>
        <div className="text-center mb-4 text-muted">
          Are you sure you want to delete '{farmName}'?
        </div>
        <div className="modal-footer">
          <button className="btn btn-logout-modal" onClick={onClose}>
            No
          </button>
          <button className="btn btn-cancel" onClick={onDelete}>
            Yes
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteFarmModal;
