import { useTranslation } from "react-i18next";
import LocationInput from "../../../components/common components/LocationInput";

export default function LocationSection({
  formState = {},
  setFormState = () => {},
  errors = {},
  setErrors = () => {},
}) {
  const { t } = useTranslation();
  const currentLocation = formState?.currentLocation || "";
  const destinationLocation = formState?.destinationLocation || "";

  return (
    <>
      <div className="col-md-3">
        <label className="form-label">
          {t("common.currentLocation")}<span className="required">*</span>
        </label>
        <LocationInput
          value={currentLocation}
          onSelectLocation={({ address, lat, lng }) => {
            setFormState((p) => ({
              ...p,
              currentLocation: address,
              currentLocationLat: lat,
              currentLocationLng: lng,
            }));
            setErrors((prev) => ({ ...prev, currentLocation: "" }));
          }}
          onChange={(val) =>
            setFormState((prev) => ({
              ...prev,
              currentLocation: val,
              currentLocationLat: "",
              currentLocationLng: "",
            }))
          }
          error={errors.currentLocation}
          placeholder={t("common.enterCurrentLocation")}
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">
          {t("common.travelLocation")}<span className="required">*</span>
        </label>
        <LocationInput
          value={destinationLocation}
          onSelectLocation={({ address, lat, lng }) => {
            setFormState((p) => ({
              ...p,
              destinationLocation: address,
              destinationLocationLat: lat,
              destinationLocationLng: lng,
            }));
            setErrors((prev) => ({ ...prev, destinationLocation: "" }));
          }}
          onChange={(val) =>
            setFormState((prev) => ({
              ...prev,
              destinationLocation: val,
              destinationLocationLat: "",
              destinationLocationLng: "",
            }))
          }
          error={errors.destinationLocation}
          placeholder={t("common.enterTravelLocation")}
        />
      </div>
    </>
  );
}
