function ProfileFieldGroup({ fields, formState, errors }) {
  return (
    <div className="row g-3">
      {fields.map((field, index) => (
        <div className="col-md-6" key={index}>
          <label className="form-label">
            {field.label}
            {field.required && <span className="text-danger">*</span>}
          </label>
          <input
            type={field.type}
            className="form-control"
            placeholder={field.placeholder}
            value={formState[field.valueKey] || ""}
            disabled={field.disabled}
            onChange={field.onChange ? (e) => field.onChange(e.target.value) : undefined}
          />
          {errors?.[field.error] && (
            <p style={{ color: "red", fontSize: "14px" }}>{errors[field.error]}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProfileFieldGroup;
