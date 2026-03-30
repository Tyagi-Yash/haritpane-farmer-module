import i18n from "../i18n";

export const validateDates = (fromDate, toDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!fromDate) return { fromDate: i18n.t("validation.fromDateRequired") };
  if (new Date(fromDate) < today) return { fromDate: i18n.t("validation.fromDatePast") };

  if (!toDate) return { toDate: i18n.t("validation.toDateRequired") };
  if (new Date(toDate) < today) return { toDate: i18n.t("validation.toDatePast") };

  if (new Date(fromDate) > new Date(toDate)) {
    return { toDate: i18n.t("validation.toDateEarlier") };
  }
  return {};
};
export const validateFromTillDates = (fromDate, tillDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!fromDate) return { fromDate: i18n.t("validation.fromDateRequired") };
  if (new Date(fromDate) < today) return { fromDate: i18n.t("validation.fromDatePast") };

  if (!tillDate) return { tillDate: i18n.t("validation.toDateRequired") };
  if (new Date(tillDate) < today) return { tillDate: i18n.t("validation.toDatePast") };

  if (new Date(fromDate) > new Date(tillDate)) {
    return { tillDate: i18n.t("validation.toDateEarlier") };
  }
  return {};
};

export const validateFromDateRequired = (fromDate, toDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!fromDate) return { fromDate: i18n.t("validation.fromDateRequired") };
  if (new Date(fromDate) < today) return { fromDate: i18n.t("validation.fromDatePast") };

  if (toDate) {
    if (new Date(toDate) < today) return { toDate: i18n.t("validation.toDatePast") };

    if (new Date(fromDate) > new Date(toDate)) {
      return { toDate: i18n.t("validation.toDateEarlier") };
    }
  }
  return {};
};

export const validateTime = (fromDate, toDate, fromTime, toTime) => {
  if (!fromTime) return { fromTime: i18n.t("validation.startTimeRequired") };
  if (!toTime) return { toTime: i18n.t("validation.endTimeRequired") };

  const fromDateTime = new Date(`${fromDate}T${fromTime}`);
  const toDateTime = new Date(`${toDate}T${toTime}`);
  const now = new Date();

  if (fromDateTime.toDateString() === now.toDateString() && fromDateTime <= now) {
    return { fromTime: i18n.t("validation.startTimeFuture") };
  }

  if (toDateTime <= fromDateTime) {
    return { toTime: i18n.t("validation.endTimeAfterStart") };
  }

  return {};
};

export const validateFromTimeOnly = (fromDate, toDate, fromTime, toTime) => {
  if (!fromTime) return { fromTime: i18n.t("validation.startTimeRequired") };

  const fromDateTime = new Date(`${fromDate}T${fromTime}`);
  const now = new Date();

  if (fromDateTime.toDateString() === now.toDateString() && fromDateTime <= now) {
    return { fromTime: i18n.t("validation.startTimeFuture") };
  }

  if (toTime) {
    const toDateTime = new Date(`${toDate}T${toTime}`);

    if (toDateTime <= fromDateTime) {
      return { toTime: i18n.t("validation.endTimeAfterStart") };
    }
  }

  return {};
};

export const validateSelectTime = (fromDate, fromTime) => {
  if (!fromTime) return i18n.t("validation.startTimeRequired");

  if (fromDate) {
    const selectedDate = new Date(fromDate);
    const now = new Date();
    if (selectedDate.toDateString() === now.toDateString()) {
      const [h, m] = fromTime.split(":");
      const selectedTime = new Date();
      selectedTime.setHours(h, m, 0, 0);
      if (selectedTime <= now) return i18n.t("validation.timeFuture");
    }
  }
  return "";
};

export const validateFromDate = (fromDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!fromDate) return i18n.t("validation.fromDateRequired");
  if (new Date(fromDate) < today) return i18n.t("validation.fromDatePast");
  return "";
};
export const validateDate = (fromDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!fromDate) return i18n.t("validation.dateRequired");
  if (new Date(fromDate) < today) return i18n.t("validation.datePast");
  return "";
};

export const validateEquipmentTypes = (equipmentTypes) => {
  if (!equipmentTypes) return i18n.t("validation.specificServiceRequired");
  return "";
};

export const validateDurationFields = (hours, minutes) => {
  let errors = {};

  if (hours === "" && minutes === "") {
    return errors;
  }

  if (hours !== "" && (isNaN(hours) || hours < 0)) {
    errors.hours = i18n.t("validation.validHours");
  }

  if (minutes !== "" && (isNaN(minutes) || minutes < 0 || minutes >= 60)) {
    errors.minutes = i18n.t("validation.validMinutes");
  }

  if ((Number(hours) || 0) === 0 && (Number(minutes) || 0) === 0) {
    errors.hours = i18n.t("validation.durationZero");
  }

  return errors;
};

export const validateDepthOfBorewell = (depthOfBorewell) => {
  if (depthOfBorewell === "") return i18n.t("validation.depthOfBorewellRequired");

  const num = Number(depthOfBorewell);
  if (isNaN(num) || num <= 0) return i18n.t("validation.greaterThanZero");

  return "";
};

export const validateCasingPipe = (casingPipe) => {
  if (!casingPipe || casingPipe === "") {
    return i18n.t("validation.casingPipeRequired");
  }
  return "";
};

export const validateWaterMotor = (waterMotor) => {
  if (!waterMotor || waterMotor === "") {
    return i18n.t("validation.waterMotorRequired");
  }
  return "";
};

export const validateNumberOfLabour = (numberOfLabour) => {
  if (numberOfLabour === "") return i18n.t("validation.numberOfLabourRequired");

  const num = Number(numberOfLabour);
  if (isNaN(num) || num <= 0) return i18n.t("validation.greaterThanZero");

  return "";
};

export const validateLabourType = (labourType) => {
  if (!labourType || labourType === "") {
    return i18n.t("validation.labourTypeRequired");
  }
  return "";
};

export const validateArea = (areaUnderCultivation) => {
  if (areaUnderCultivation === "") return i18n.t("validation.areaUnderCultivationRequired");

  const num = Number(areaUnderCultivation);
  if (isNaN(num) || num <= 0) return i18n.t("validation.greaterThanZero");

  return "";
};
export const validateDistance = (distance) => {
  if (distance === "") return i18n.t("validation.distanceRequired");

  const num = Number(distance);
  if (isNaN(num) || num <= 0) return i18n.t("validation.greaterThanZero");

  return "";
};

export const validateCrop = (typeOfCrop) => {
  if (typeOfCrop === "") return i18n.t("validation.cropRequired");

  return "";
};

export const validateWallserviceType = (serviceType) => {
  if (!serviceType || serviceType === "") {
    return i18n.t("validation.serviceTypeRequired");
  }
  return "";
};

export const validateCowDunkType = (typeOfCowDunk) => {
  if (!typeOfCowDunk || typeOfCowDunk === "") {
    return i18n.t("validation.typeRequired");
  }
  return "";
};

export const validateQuantity = (quantity) => {
  if (!quantity || quantity === "") {
    return i18n.t("validation.quantityRequired");
  }
  const num = Number(quantity);
  if (isNaN(num) || num <= 0) return i18n.t("validation.greaterThanZeroStar");

  return "";
};

export const validateCurrentLocation = (location) => {
  if (location === "") return i18n.t("validation.currentLocationRequired");

  return "";
};

export const validateDestinationLocation = (location) => {
  if (location === "") return i18n.t("validation.travelLocationRequired");

  return "";
};

export const validateItemType = (item) => {
  if (!item || item === "") {
    return i18n.t("validation.transportItemRequired");
  }
  return "";
};
export const validateVegeType = (item) => {
  if (!item || item === "") {
    return i18n.t("validation.vegetableTypeRequired");
  }
  return "";
};
export const validateVehicleType = (item) => {
  if (!item || item === "") {
    return i18n.t("validation.vehicleTypeRequired");
  }
  return "";
};
export const validateLength = (number) => {
  if (!number || number === "") {
    return i18n.t("validation.lengthRequired");
  }
  const num = Number(number);
  if (isNaN(num) || num <= 0) return i18n.t("validation.greaterThanZeroStar");

  return "";
};
export const validateWidth = (number) => {
  if (!number || number === "") {
    return i18n.t("validation.widthRequired");
  }
  const num = Number(number);
  if (isNaN(num) || num <= 0) return i18n.t("validation.greaterThanZeroStar");

  return "";
};

export const validateHeight = (number) => {
  if (!number || number === "") {
    return i18n.t("validation.heightRequired");
  }
  const num = Number(number);
  if (isNaN(num) || num <= 0) return i18n.t("validation.greaterThanZeroStar");

  return "";
};

export const validateNumberOfCattle = (number) => {
  if (number === "") return i18n.t("validation.numberOfCattleRequired");

  const num = Number(number);
  if (isNaN(num) || num <= 0) return i18n.t("validation.greaterThanZeroStar");

  return "";
};

export const validateWeightOfCattle = (number) => {
  if (number === "") return i18n.t("validation.weightOfCattleRequired");

  const num = Number(number);
  if (isNaN(num) || num <= 0) return i18n.t("validation.greaterThanZeroStar");

  return "";
};

export const validateWeightOfVegetable = (number) => {
  if (number === "") return i18n.t("validation.weightOfVegetableRequired");

  const num = Number(number);
  if (isNaN(num) || num <= 0) return i18n.t("validation.greaterThanZeroStar");

  return "";
};

export const validateWeight = (number) => {
  if (number === "") return i18n.t("validation.weightRequired");

  const num = Number(number);
  if (isNaN(num) || num <= 0) return i18n.t("validation.greaterThanZeroStar");

  return "";
};
