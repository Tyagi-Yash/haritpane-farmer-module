import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const LogoutModal = ({ show, onClose, onLogout }) => {
  const { t } = useTranslation();

  return (
    <Modal className="Logout-modal" show={show} onHide={onClose} centered backdrop="static" keyboard={false}>
      <Modal.Body>
        <div className="modal-title">{t("common.confirmLogout")}</div>
        <div className="modal-footer">
          <button className="btn btn-logout-modal" onClick={onClose}>
            {t("common.no")}
          </button>
          <button className="btn btn-cancel" onClick={onLogout}>
            {t("common.yes")}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LogoutModal;
