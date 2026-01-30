export default function TransportItemSelect({ value, error, onChange }) {
  return (
    <div className="col-md-6">
      <label className="form-label">
        Transport Item<span className="required">*</span>
      </label>
      <select className="form-control" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled>
          Select goods for your transport
        </option>
        <option value="vegitable" className="form-control">
          Vegetable
        </option>
        <option value="cattle" className="form-control">
          Cattle
        </option>
        <option value="equipment" className="form-control">
          Equipment
        </option>
        <option value="other" className="form-control">
          Other
        </option>
      </select>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
