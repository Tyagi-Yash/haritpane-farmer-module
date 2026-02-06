export default function EquipmentFields({
  equipmentDimensions = {},
  equipmentWeight = "",
  errors = {},
  onChange = () => {},
}) {
  const dimensions = {
    lengthCm: "",
    widthCm: "",
    heightCm: "",
    ...equipmentDimensions,
  };

  return (
    <>
      <div className="col-md-6">
        <label className="form-label">
          Equipment Dimension<span className="required">*</span>
        </label>
        <div className="row">
          {["lengthCm", "widthCm", "heightCm"].map((field) => (
            <div className="col-md-4" key={field}>
              <input
                className="form-control"
                placeholder={field.replace("Cm", " (cm)")}
                value={dimensions[field]}
                onChange={(e) => onChange(field, e.target.value)}
              />
              {errors[field] && <p className="error-text">{errors[field]}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="col-md-6">
        <label className="form-label">
          Equipment Weight<span className="required">*</span>
        </label>
        <input
          className="form-control"
          placeholder="Equipment Weight(in Kg)"
          value={equipmentWeight}
          onChange={(e) => onChange("equipmentWeight", e.target.value)}
        />
        {errors.equipmentWeight && <p className="error-text">{errors.equipmentWeight}</p>}
      </div>
    </>
  );
}
