import { useTranslation } from "react-i18next";

const BookingSummary = ({ businessName, serviceName }) => {
  const { t } = useTranslation();
  return (
    <div className="option-wrapper mb-0">
      <h5 className="normal-heading">{t("common.bookingDetails")}</h5>
      <p>{t("common.serviceName")}: {serviceName}</p>
      <p>{t("common.businessName")}: {businessName || "N/A"}</p>
    </div>
  );
};

export default BookingSummary;
