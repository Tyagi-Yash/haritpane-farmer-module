import { useTranslation } from "react-i18next";
import Time12HourPicker from "../../common components/Time12HourPicker";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

export default function DateTimeSection({ formState = {}, errors = {}, onChange = () => {} }) {
  const { t } = useTranslation();
  const { fromDate = "", tillDate = "", startTime = "" } = formState || {};

  return (
    <>
      <div className="col-md-6">
        <label className="form-label">
          {t("common.fromDate")}<span className="required">*</span>
        </label>
        <DatePicker
          selected={fromDate ? new Date(fromDate) : null}
          onChange={(selectedDate) => {
            const formatted = format(selectedDate, "yyyy-MM-dd");
            onChange("fromDate", formatted);
          }}
          dateFormat="dd/MM/yyyy"
          placeholderText="DD/MM/YYYY"
          className="form-control custom-datepicker"
          calendarClassName="custom-calendar"
          showPopperArrow={false}
          showOtherMonths
          fixedHeight
        />
        {errors.fromDate && <p className="error-text">{errors.fromDate}</p>}
      </div>

      <div className="col-md-6">
        <label className="form-label">
          {t("common.tillDate")}<span className="required">*</span>
        </label>
        <DatePicker
          selected={tillDate ? new Date(tillDate) : null}
          onChange={(selectedDate) => {
            const formatted = format(selectedDate, "yyyy-MM-dd");
            onChange("tillDate", formatted);
          }}
          dateFormat="dd/MM/yyyy"
          placeholderText="DD/MM/YYYY"
          className="form-control custom-datepicker"
          calendarClassName="custom-calendar"
          showPopperArrow={false}
          showOtherMonths
          fixedHeight
        />
        {errors.tillDate && <p className="error-text">{errors.tillDate}</p>}
      </div>

      <div className="col-md-6">
        <label className="form-label">
          {t("common.startTime")}<span className="required">*</span>
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
