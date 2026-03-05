import DecimalInput from "../../common components/DecimalInput";

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
              <DecimalInput
                className="form-control"
                placeholder={field.replace("Cm", " (cm)")}
                value={dimensions[field]}
                maxDecimals={2}
                onChange={(val) => onChange(field, val)}
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
        <DecimalInput
          className="form-control"
          placeholder="Equipment Weight(in Kg)"
          value={equipmentWeight}
          maxDecimals={2}
          onChange={(val) => onChange("equipmentWeight", val)}
        />
        {errors.equipmentWeight && <p className="error-text">{errors.equipmentWeight}</p>}
      </div>
    </>
  );
}
