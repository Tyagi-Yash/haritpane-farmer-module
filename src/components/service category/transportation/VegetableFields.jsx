export default function VegetableFields({
  vegetableType = "",
  vegetableWeight = "",
  errors = {},
  onChange = () => {},
}) {
  return (
    <>
      <div className="col-md-6">
        <label className="form-label">
          Vegetable Type<span className="required">*</span>
        </label>
        <select
          className="form-control"
          value={vegetableType}
          onChange={(e) => onChange("vegetableType", e.target.value)}
        >
          <option value="" disabled>
            Select type of vegetable
          </option>
          <option value="leafy_stack" className="form-control">
            Leafy Vegetable- Stack
          </option>
          <option value="tomato_cucumber_crate" className="form-control">
            Tomato, Cucumber- Crate
          </option>
          <option value="onion_potato_stack" className="form-control">
            Onion, Potato- Stack
          </option>
          <option value="cabbage_cauliflower_mesh_sack" className="form-control">
            Cabbage, Cauliflower- Mesh Sack
          </option>
          <option value="grains_sack" className="form-control">
            Grains- Sack
          </option>
        </select>
        {errors.vegetableType && <p className="error-text">{errors.vegetableType}</p>}
      </div>

      <div className="col-md-6">
        <label className="form-label">
          Weight of Vegetable<span className="required">*</span>
        </label>
        <input
          className="form-control"
          placeholder="Weight of Vegetable"
          value={vegetableWeight}
          onChange={(e) => onChange("vegetableWeight", e.target.value)}
        />
        {errors.vegetableWeight && <p className="error-text">{errors.vegetableWeight}</p>}
      </div>
    </>
  );
}
