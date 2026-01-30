import { vehicle } from "../../../constants/service category/transportation service/transportationData";

export default function VehicleSection({ value, error, onChange }) {
  return (
    <div className="col-md-6">
      <label className="form-label">
        Vehicle Type<span className="required">*</span>
      </label>
      <select className="form-control" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled>
          Select vehicle
        </option>
        {vehicle.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
