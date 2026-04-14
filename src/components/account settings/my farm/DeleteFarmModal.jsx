import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const DeleteFarmModal = ({ show, onClose, onDelete, farmName }) => {
  const { t } = useTranslation();

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
        <div className="modal-title">{t("myFarm.deleteFarm")}</div>
        <div className="text-center mb-4 text-muted">
          {t("myFarm.confirmDeleteFarm", { name: farmName })}
        </div>
        <div className="modal-footer">
          <button className="btn btn-logout-modal" onClick={onClose}>
            {t("common.no")}
          </button>
          <button className="btn btn-cancel" onClick={onDelete}>
            {t("common.yes")}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteFarmModal;

