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

export const validateTime = (fromDate, toDate, fromTime, toTime) => {
  if (!fromTime) return { fromTime: "*Start time is required" };
  if (!toTime) return { toTime: "*End time is required" };

  const fromDateTime = new Date(`${fromDate}T${fromTime}`);
  const toDateTime = new Date(`${toDate}T${toTime}`);
  const now = new Date();

  if (fromDateTime.toDateString() === now.toDateString() && fromDateTime <= now) {
    return { fromTime: "*Start time must be in the future" };
  }

  if (toDateTime <= fromDateTime) {
    return { toTime: "*End time must be after start time" };
  }

  return {};
};

export const validateSelectTime = (fromDate, fromTime) => {
  if (!fromTime) return "*Start time is required";

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

export const validateFromDate = (fromDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!fromDate) return "*From date is required";
  if (new Date(fromDate) < today) return "*From date cannot be in the past";
  return "";
};

export const validateEquipmentTypes = (equipmentTypes) => {
  if (!equipmentTypes) return "*Specific Service is required";
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

export const validateDepthOfBorewell = (depthOfBorewell) => {
  if (depthOfBorewell === "") return "Depth of Borewell is required";

  const num = Number(depthOfBorewell);
  if (isNaN(num) || num <= 0) return "Please enter a number greater than 0";

  return "";
};

export const validateCasingPipe = (casingPipe) => {
  if (!casingPipe || casingPipe === "") {
    return "*Casing Pipe is required";
  }
  return "";
};

export const validateWaterMotor = (waterMotor) => {
  if (!waterMotor || waterMotor === "") {
    return "*Water Motor is required";
  }
  return "";
};

export const validateNumberOfLabour = (numberOfLabour) => {
  if (numberOfLabour === "") return "Number Of Labour is required";

  const num = Number(numberOfLabour);
  if (isNaN(num) || num <= 0) return "Please enter a number greater than 0";

  return "";
};

export const validateLabourType = (labourType) => {
  if (!labourType || labourType === "") {
    return "*Labour Type is required";
  }
  return "";
};

export const validateArea = (areaUnderCultivation) => {
  if (areaUnderCultivation === "") return "Area Under Cultivation is required";

  const num = Number(areaUnderCultivation);
  if (isNaN(num) || num <= 0) return "Please enter a number greater than 0";

  return "";
};

export const validateCrop = (typeOfCrop) => {
  if (typeOfCrop === "") return "Crop Under Cultivation is required";

  return "";
};

export const validateWallserviceType = (serviceType) => {
  if (!serviceType || serviceType === "") {
    return "*Service Type is required";
  }
  return "";
};
