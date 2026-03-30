import { useTranslation } from "react-i18next";
import { vehicle } from "../../../constants/service category/transportation service/transportationData";

export default function VehicleSection({ value = "", error = "", onChange = () => {} }) {
  const { t } = useTranslation();
  const options = Array.isArray(vehicle) ? vehicle : [];

  return (
    <div className="col-md-6">
      <label className="form-label">
        {t("transportation.vehicleType")}<span className="required">*</span>
      </label>
      <select className="form-control" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled>
          {t("transportation.selectVehicle")}
        </option>
        {options.map((v) => {
          let translationKey = "";
          if (v === "Tata Ace ZIP - Mahindra Jeeto (600-715kg)") translationKey = "tataAceZip";
          else if (v === "Tata Ace - Mahindra Maximo (715-750kg)") translationKey = "tataAce";
          else if (v === "Bolero Pickup (750-1700kg)") translationKey = "boleroPickup";
          else if (v === "Tractor-Trolley (1700-3000kg)") translationKey = "tractorTrolley";

          return (
            <option key={v} value={v}>
              {translationKey ? t(`common.${translationKey}`) : v}
            </option>
          );
        })}
      </select>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
