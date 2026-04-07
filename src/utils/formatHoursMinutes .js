export const formatHoursMinutes = (decimalHours, t) => {
  const getTranslation = (key, defaultValue) => (t ? t(key) : defaultValue);

  if (!decimalHours || decimalHours <= 0) {
    return `0 ${getTranslation("common.hours", "hours")}`;
  }

  const totalMinutes = Math.round(decimalHours * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const hourLabel =
    hours > 1 ? getTranslation("common.hours", "hours") : getTranslation("common.hour", "hour");
  const minLabel = getTranslation("common.min", "min");

  if (minutes === 0) return `${hours} ${hourLabel}`;
  return `${hours} ${hourLabel} ${minutes} ${minLabel}`;
};
