import { useTranslation } from "react-i18next";
import DecimalInput from "../../common components/DecimalInput";

export default function OtherFields({ otherWeightKg = "", errors = {}, onChange = () => {} }) {
  const { t } = useTranslation();

  return (
    <div className="col-md-6">
      <label className="form-label">
        {t("transportation.objectWeight")}<span className="required">*</span>
      </label>
      <DecimalInput
        className="form-control"
        placeholder={t("transportation.objectWeightKg")}
        value={otherWeightKg}
        maxDecimals={2}
        onChange={(val) => onChange("otherWeightKg", val)}
      />
      {errors.otherWeightKg && <p className="error-text">{errors.otherWeightKg}</p>}
    </div>
  );
}
