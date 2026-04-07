import { useTranslation } from "react-i18next";

export default function SuccessModal({ onClose }) {
  const { t } = useTranslation();

  return (
    <div className="custom-modal-backdrop">
      <div className="custom-modal">
        <h4>{t("common.requestCreated")}</h4>
        <p>{t("common.bookingOrderCreated")}</p>
        <button className="btn btn-primary" onClick={onClose}>
          {t("common.ok", { defaultValue: "OK" })}
        </button>
      </div>
    </div>
  );
}
