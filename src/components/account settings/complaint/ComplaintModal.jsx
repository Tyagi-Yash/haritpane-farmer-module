import { useTranslation } from "react-i18next";

const ComplaintModal = ({ onClose, loading, onSubmit, form, errors, handleChange, title, sub }) => {
  const { t } = useTranslation();

  return (
    <div
      className="complaint-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="complaint-modal">
        <div className="complaint-modal__head">
          <div>
            <h4 className="complaint-modal__heading">{title}</h4>
            <p className="complaint-modal__sub">{sub}</p>
          </div>
          <button className="complaint-modal__close" onClick={onClose} disabled={loading}>
            <i className="fa fa-times" />
          </button>
        </div>

        <form className="complaint-modal__body" onSubmit={onSubmit}>
          <div className="complaint-field">
            <label className="complaint-field__label">{t("complaint.complainLabel")}</label>
            <input
              type="text"
              name="complain"
              value={form.complain}
              onChange={handleChange}
              placeholder={t("complaint.complainPlaceholder")}
              className={`complaint-field__input ${
                errors.complain ? "complaint-field__input--error" : ""
              }`}
            />
            {errors.complain && <p className="complaint-field__error">{errors.complain}</p>}
          </div>

          <div className="complaint-field">
            <label className="complaint-field__label">{t("complaint.descriptionLabel")}</label>
            <textarea
              rows={5}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder={t("complaint.descriptionPlaceholder")}
              className={`complaint-field__input complaint-field__textarea ${
                errors.description ? "complaint-field__input--error" : ""
              }`}
            />
            {errors.description && <p className="complaint-field__error">{errors.description}</p>}
          </div>

          <div className="complaint-modal__actions">
            <button type="button" className="complaint-modal__cancel" onClick={onClose}>
              {t("complaint.cancel")}
            </button>
            <button type="submit" className="complaint-modal__submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="complaint-spinner" />
                  {t("complaint.submitting")}
                </>
              ) : (
                t("complaint.submitBtn")
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintModal;
