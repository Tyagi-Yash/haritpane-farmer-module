import { useTranslation } from "react-i18next";

export default function TransportItemSelect({ value, error, onChange }) {
  const { t } = useTranslation();

  return (
    <div className="col-md-6">
      <label className="form-label">
        {t("transportation.transportItem")}<span className="required">*</span>
      </label>
      <select className="form-control" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled>
          {t("transportation.selectGoods")}
        </option>
        <option value="vegitable" className="form-control">
          {t("transportation.vegetable")}
        </option>
        <option value="cattle" className="form-control">
          {t("transportation.cattle")}
        </option>
        <option value="equipment" className="form-control">
          {t("transportation.equipment")}
        </option>
        <option value="other" className="form-control">
          {t("transportation.other")}
        </option>
      </select>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
