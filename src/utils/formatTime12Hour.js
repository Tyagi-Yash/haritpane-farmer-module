export const convertTo12Hour = (time24) => {
  if (!time24) return "";

  try {
    const [hours, minutes] = time24.split(":");
    let hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    const ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;
    hour = hour ? hour : 12;

    const hourStr = String(hour).padStart(2, "0");
    const minuteStr = String(minute).padStart(2, "0");

    return `${hourStr}:${minuteStr} ${ampm}`;
  } catch (error) {
    return time24;
  }
};

export const formatTimeInput = (timeValue) => {
  if (!timeValue || typeof timeValue !== "string") return "";
  return convertTo12Hour(timeValue);
};

export const formatDateTo12Hour = (date) => {
  if (!date) return "";

  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";

    return d.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch (error) {
    return "";
  }
};
