import DecimalInput from "../../common components/DecimalInput";

export default function OtherFields({ otherWeightKg = "", errors = {}, onChange = () => {} }) {
  return (
    <div className="col-md-6">
      <label className="form-label">
        Object Weight<span className="required">*</span>
      </label>
      <DecimalInput
        className="form-control"
        placeholder="Weight of Object(in Kg)"
        value={otherWeightKg}
        maxDecimals={2}
        onChange={(val) => onChange("otherWeightKg", val)}
      />
      {errors.otherWeightKg && <p className="error-text">{errors.otherWeightKg}</p>}
    </div>
  );
}
