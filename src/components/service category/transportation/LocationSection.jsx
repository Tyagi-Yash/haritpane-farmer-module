import LocationInput from "../../../components/common components/LocationInput";

export default function LocationSection({ formState, setFormState, errors, setErrors }) {
  return (
    <>
      <div className="col-md-3">
        <label className="form-label">
          Current location<span className="required">*</span>
        </label>
        <LocationInput
          value={formState.currentLocation}
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
          placeholder="Enter Current Location"
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">
          Travel location<span className="required">*</span>
        </label>
        <LocationInput
          value={formState.destinationLocation}
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
          placeholder="Enter Travel Location"
        />
      </div>
    </>
  );
}
