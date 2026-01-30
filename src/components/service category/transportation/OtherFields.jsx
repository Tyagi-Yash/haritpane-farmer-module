export default function OtherFields({ otherWeightKg, errors, onChange }) {
  return (
    <div className="col-md-6">
      <label className="form-label">
        Object Weight<span className="required">*</span>
      </label>
      <input
        className="form-control"
        placeholder="Weight of Object(in Kg)"
        value={otherWeightKg}
        onChange={(e) => onChange("otherWeightKg", e.target.value)}
      />
      {errors.otherWeightKg && <p className="error-text">{errors.otherWeightKg}</p>}
    </div>
  );
}
