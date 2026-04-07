import { useTranslation } from "react-i18next";

function ProfileFieldGroup({ fields, formState, errors }) {
  const { t } = useTranslation();
  return (
    <div className="row g-3">
      {fields.map((field, index) => (
        <div className="col-md-6" key={index}>
          <label className="form-label">
            {t(field.label)}
            {field.required && <span className="text-danger">*</span>}
          </label>
          <input
            type={field.type}
            className="form-control"
            placeholder={t(field.placeholder)}
            value={formState[field.valueKey] || ""}
            disabled={field.disabled}
            onChange={field.onChange ? (e) => field.onChange(e.target.value) : undefined}
          />
          {errors?.[field.error] && (
            <p className="error-text">
              {errors[field.error].startsWith("*")
                ? t(errors[field.error])
                : errors[field.error]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProfileFieldGroup;
