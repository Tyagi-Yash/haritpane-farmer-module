export default function CattleFields({ numberOfCattle, cattleWeight, errors, onChange }) {
  return (
    <>
      <div className="col-md-6">
        <label className="form-label">
          Number of cattle<span className="required">*</span>
        </label>
        <input
          className="form-control"
          placeholder="Number of cattle"
          value={numberOfCattle}
          onChange={(e) => onChange("numberOfCattle", e.target.value)}
        />
        {errors.numberOfCattle && <p className="error-text">{errors.numberOfCattle}</p>}
      </div>

      <div className="col-md-6">
        <label className="form-label">
          Weight of cattle<span className="required">*</span>
        </label>
        <input
          className="form-control"
          placeholder="Weight of cattle"
          value={cattleWeight}
          onChange={(e) => onChange("cattleWeight", e.target.value)}
        />
        {errors.cattleWeight && <p className="error-text">{errors.cattleWeight}</p>}
      </div>
    </>
  );
}
