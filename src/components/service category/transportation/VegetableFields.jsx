import { useTranslation } from "react-i18next";
import DecimalInput from "../../common components/DecimalInput";

export default function VegetableFields({
  vegetableType = "",
  vegetableWeight = "",
  errors = {},
  onChange = () => {},
}) {
  const { t } = useTranslation();

  return (
    <>
      <div className="col-md-6">
        <label className="form-label">
          {t("transportation.vegetableType")}<span className="required">*</span>
        </label>
        <select
          className="form-control"
          value={vegetableType}
          onChange={(e) => onChange("vegetableType", e.target.value)}
        >
          <option value="" disabled>
            {t("transportation.selectVegetableType")}
          </option>
          <option value="leafy_stack" className="form-control">
            {t("transportation.leafyStack")}
          </option>
          <option value="tomato_cucumber_crate" className="form-control">
            {t("transportation.tomatoCucumberCrate")}
          </option>
          <option value="onion_potato_stack" className="form-control">
            {t("transportation.onionPotatoStack")}
          </option>
          <option value="cabbage_cauliflower_mesh_sack" className="form-control">
            {t("transportation.cabbageCauliflowerMeshSack")}
          </option>
          <option value="grains_sack" className="form-control">
            {t("transportation.grainsSack")}
          </option>
        </select>
        {errors.vegetableType && <p className="error-text">{errors.vegetableType}</p>}
      </div>

      <div className="col-md-6">
        <label className="form-label">
          {t("transportation.weightOfVegetable")}<span className="required">*</span>
        </label>
        <DecimalInput
          className="form-control"
          placeholder={t("transportation.weightOfVegetableKg")}
          value={vegetableWeight}
          maxDecimals={2}
          onChange={(val) => onChange("vegetableWeight", val)}
        />
        {errors.vegetableWeight && <p className="error-text">{errors.vegetableWeight}</p>}
      </div>
    </>
  );
}
