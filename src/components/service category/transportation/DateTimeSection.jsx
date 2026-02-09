import Time12HourPicker from "../../common components/Time12HourPicker";

export default function DateTimeSection({ formState = {}, errors = {}, onChange = () => {} }) {
  const { fromDate = "", tillDate = "", startTime = "" } = formState || {};

  return (
    <>
      <div className="col-md-6">
        <label className="form-label">
          From date<span className="required">*</span>
        </label>
        <input
          type="date"
          className="form-control"
          value={fromDate}
          onChange={(e) => onChange("fromDate", e.target.value)}
        />
        {errors.fromDate && <p className="error-text">{errors.fromDate}</p>}
      </div>

      <div className="col-md-6">
        <label className="form-label">
          Till date<span className="required">*</span>
        </label>
        <input
          type="date"
          className="form-control"
          value={tillDate}
          onChange={(e) => onChange("tillDate", e.target.value)}
        />
        {errors.tillDate && <p className="error-text">{errors.tillDate}</p>}
      </div>

      <div className="col-md-6">
        <label className="form-label">
          Start time<span className="required">*</span>
        </label>
        <Time12HourPicker
          value={startTime}
          onChange={(val) => onChange("startTime", val)}
          error={errors.startTime}
        />
      </div>
    </>
  );
}
