import { useTranslation } from "react-i18next";

export default function SuccessModal({ onClose }) {
  const { t } = useTranslation();

  return (
    <div className="custom-modal-backdrop">
      <div className="custom-modal">
        <h4>{t("transportation.requestCreated")}</h4>
        <p>{t("transportation.successMessage")}</p>
        <button className="btn btn-primary" onClick={onClose}>
          {t("common.ok")}
        </button>
      </div>
    </div>
  );
}
