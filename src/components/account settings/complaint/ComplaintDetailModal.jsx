import { useTranslation } from "react-i18next";

const ComplaintDetailModal = ({ onClose, complaint, loader, formatDate }) => {
  const { t } = useTranslation();

  return (
    <div
      className="complaint-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="complaint-modal complaint-modal--detail">
        <div className="complaint-modal__head">
          <div>
            <h4 className="complaint-modal__heading">{t("complaint.detailsModalTitle")}</h4>
            <p className="complaint-modal__sub">{t("complaint.trackStatus")}</p>
          </div>
          <button className="complaint-modal__close" onClick={onClose}>
            <i className="fa fa-times" />
          </button>
        </div>

        <div className="complaint-modal__body complaint-modal__body--detail">
          {loader && !complaint ? (
            <div className="complaint-detail-loader">
              <div className="complaint-spinner-large" />
            </div>
          ) : complaint ? (
            <div className="complaint-detail">
              <div className="complaint-detail__top">
                <span className={`complaint-status complaint-status--${complaint.status}`}>
                  {complaint.status}
                </span>
                <h2 className="complaint-detail__title">{complaint.complain}</h2>
              </div>

              <div className="complaint-detail__info-grid">
                <div className="complaint-info-item">
                  <label>{t("complaint.createdOn")}</label>
                  <p>{formatDate(complaint.createdAt)}</p>
                </div>
                <div className="complaint-info-item">
                  <label>{t("complaint.status")}</label>
                  <p>{complaint.status}</p>
                </div>
              </div>

              <div className="complaint-detail__box">
                <label>{t("complaint.descriptionLabel")}</label>
                <p>{complaint.description}</p>
              </div>

              {(complaint.status === "resolved" || complaint.status === "rejected") && (
                <div className="complaint-detail__box complaint-detail__resolution">
                  <label>{t("complaint.adminResponse")}</label>
                  <p>{complaint.resolution || t("complaint.noResponseYet")}</p>
                </div>
              )}
            </div>
          ) : (
            <p>{t("complaint.failedToLoad")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailModal;
