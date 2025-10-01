export const validateLat = (lat) => {
  if (!lat.trim()) return "*Latitude is required";
  if (isNaN(lat) || lat < -90 || lat > 90) return "*Latitude must be a number between -90 and 90";
  return "";
};

export const validateLng = (lng) => {
  if (!lng.trim()) return "*Longitude is required";
  if (isNaN(lng) || lng < -180 || lng > 180)
    return "*Longitude must be a number between -180 and 180";
  return "";
};

export const validateEquipmentTypes = (equipmentTypes) => {
  if (!equipmentTypes) return "*Specific Service is required";
  return "";
};

export const validateDates = (fromDate, toDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!fromDate) return { fromDate: "*From date is required" };
  if (new Date(fromDate) < today) return { fromDate: "*From date cannot be in the past" };

  if (!toDate) return { toDate: "*To date is required" };
  if (new Date(toDate) < today) return { toDate: "*To date cannot be in the past" };

  if (new Date(fromDate) > new Date(toDate)) {
    return { toDate: "*To date cannot be earlier than from date" };
  }
  return {};
};

export const validateFromTime = (fromDate, fromTime) => {
  if (!fromTime) return "*From time is required";

  if (fromDate) {
    const selectedDate = new Date(fromDate);
    const now = new Date();
    if (selectedDate.toDateString() === now.toDateString()) {
      const [h, m] = fromTime.split(":");
      const selectedTime = new Date();
      selectedTime.setHours(h, m, 0, 0);
      if (selectedTime <= now) return "*Time must be in the future";
    }
  }
  return "";
};

export const validateDuration = (duration) => {
  if (!duration.trim()) return "*Duration is required";
  if (isNaN(duration) || duration <= 0) return "*Duration must be a positive number";
  return "";
};

export const validateDurationFields = (hours, minutes) => {
  let errors = {};

  if (hours === "" || isNaN(hours) || hours < 0) {
    errors.hours = "Please enter valid hours";
  }

  if (minutes === "" || isNaN(minutes) || minutes < 0 || minutes >= 60) {
    errors.minutes = "Please enter valid minutes (0-59)";
  }

  if ((Number(hours) || 0) === 0 && (Number(minutes) || 0) === 0) {
    errors.hours = "Duration cannot be 0";
  }

  return errors;
};
