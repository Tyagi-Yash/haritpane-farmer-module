import { Modal } from "react-bootstrap";

const LogoutModal = ({ show, onClose, onLogout }) => {
  return (
    <Modal className="Logout-modal" show={show} onHide={onClose} centered backdrop="static" keyboard={false}>
      <Modal.Body>
        <div className="modal-title">Are you sure you want to Logout ?</div>
        <div className="modal-footer">
          <button className="btn btn-logout-modal" onClick={onClose}>
            No
          </button>
          <button className="btn btn-cancel" onClick={onLogout}>
            Yes
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LogoutModal;
