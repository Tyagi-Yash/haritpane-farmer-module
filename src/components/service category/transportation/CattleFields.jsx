import DecimalInput from "../../common components/DecimalInput";
import IntegerInput from "../../common components/IntegerInput";

export default function CattleFields({
  numberOfCattle = "",
  cattleWeight = "",
  errors = {},
  onChange = () => {},
}) {
  return (
    <>
      <div className="col-md-6">
        <label className="form-label">
          Number of cattle<span className="required">*</span>
        </label>
        <IntegerInput
          className="form-control"
          placeholder="Number of cattle"
          value={numberOfCattle}
          onChange={(val) => onChange("numberOfCattle", val)}
        />
        {errors.numberOfCattle && <p className="error-text">{errors.numberOfCattle}</p>}
      </div>

      <div className="col-md-6">
        <label className="form-label">
          Weight of cattle<span className="required">*</span>
        </label>
        <DecimalInput
          className="form-control"
          placeholder="Weight of cattle(in Kg)"
          value={cattleWeight}
          maxDecimals={2}
          onChange={(val) => onChange("cattleWeight", val)}
        />
        {errors.cattleWeight && <p className="error-text">{errors.cattleWeight}</p>}
      </div>
    </>
  );
}
