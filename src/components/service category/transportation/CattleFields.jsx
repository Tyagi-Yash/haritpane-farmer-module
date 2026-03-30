import { useTranslation } from "react-i18next";
import DecimalInput from "../../common components/DecimalInput";
import IntegerInput from "../../common components/IntegerInput";

export default function CattleFields({
  numberOfCattle = "",
  cattleWeight = "",
  errors = {},
  onChange = () => {},
}) {
  const { t } = useTranslation();

  return (
    <>
      <div className="col-md-6">
        <label className="form-label">
          {t("transportation.numberOfCattle")}<span className="required">*</span>
        </label>
        <IntegerInput
          className="form-control"
          placeholder={t("transportation.numberOfCattle")}
          value={numberOfCattle}
          onChange={(val) => onChange("numberOfCattle", val)}
        />
        {errors.numberOfCattle && <p className="error-text">{errors.numberOfCattle}</p>}
      </div>

      <div className="col-md-6">
        <label className="form-label">
          {t("transportation.weightOfCattle")}<span className="required">*</span>
        </label>
        <DecimalInput
          className="form-control"
          placeholder={t("transportation.weightOfCattleKg")}
          value={cattleWeight}
          maxDecimals={2}
          onChange={(val) => onChange("cattleWeight", val)}
        />
        {errors.cattleWeight && <p className="error-text">{errors.cattleWeight}</p>}
      </div>
    </>
  );
}
