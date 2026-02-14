import { useState } from "react";
import {
  validateDates,
  validateFromTillDates,
  validateHeight,
  validateItemType,
  validateLength,
  validateNumberOfCattle,
  validateSelectTime,
  validateVegeType,
  validateVehicleType,
  validateWeight,
  validateWeightOfCattle,
  validateWeightOfVegetable,
  validateWidth,
} from "../utils/formValidators";

export function useTransportationForm() {
  const defaultForm = {
    currentLocationLat: "",
    currentLocationLng: "",
    destinationLocationLat: "",
    destinationLocationLng: "",
    currentLocation: "",
    destinationLocation: "",
    transportItem: "",
    vegetableType: "",
    vegetableWeight: "",
    numberOfCattle: "",
    cattleWeight: "",
    equipmentDimensions: { lengthCm: "", widthCm: "", heightCm: "" },
    equipmentWeight: "",
    otherWeightKg: "",
    typeOfVehicle: "",
    fromDate: "",
    tillDate: "",
    startTime: "",
  };

  const [formState, setFormState] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  // const handleChange = (name, value) => {
  //   if (["lengthCm", "widthCm", "heightCm"].includes(name)) {
  //     setFormState((p) => ({
  //       ...p,
  //       equipmentDimensions: { ...p.equipmentDimensions, [name]: value },
  //     }));
  //   } else {
  //     setFormState((p) => ({ ...p, [name]: value }));
  //   }
  //   setErrors((p) => ({ ...p, [name]: "" }));
  // };

  const handleChange = (name, value) => {
    if (name === "transportItem") {
      setFormState((p) => ({
        ...p,
        transportItem: value,
        vegetableType: "",
        vegetableWeight: "",
        numberOfCattle: "",
        cattleWeight: "",
        equipmentDimensions: { lengthCm: "", widthCm: "", heightCm: "" },
        equipmentWeight: "",
        otherWeightKg: "",
      }));
      setErrors({});
      return;
    }

    if (["lengthCm", "widthCm", "heightCm"].includes(name)) {
      setFormState((p) => ({
        ...p,
        equipmentDimensions: { ...p.equipmentDimensions, [name]: value },
      }));
    } else {
      setFormState((p) => ({ ...p, [name]: value }));
    }

    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    let e = {};
    const f = formState;

    const itemErr = validateItemType(f.transportItem.trim());
    if (itemErr) e.transportItem = itemErr;

    if (!itemErr) {
      if (!f.currentLocation || !f.currentLocationLat || !f.currentLocationLng)
        e.currentLocation = "Select valid location";
      if (!f.destinationLocation || !f.destinationLocationLat || !f.destinationLocationLng)
        e.destinationLocation = "Select valid location";

      const vehicleErr = validateVehicleType(f.typeOfVehicle.trim());
      if (vehicleErr) e.typeOfVehicle = vehicleErr;

      Object.assign(e, validateFromTillDates(f.fromDate, f.tillDate));

      const timeErr = validateSelectTime(f.fromDate, f.startTime);
      if (timeErr) e.startTime = timeErr;

      if (f.transportItem === "vegitable") {
        const vegeTypeError = validateVegeType(f.vegetableType.trim());
        if (vegeTypeError) e.vegetableType = vegeTypeError;
        const vegetableWeightError = validateWeightOfVegetable(f.vegetableWeight.trim());
        if (vegetableWeightError) e.vegetableWeight = vegetableWeightError;
      }

      if (f.transportItem === "cattle") {
        const cattleError = validateNumberOfCattle(f.numberOfCattle.trim());
        if (cattleError) e.numberOfCattle = cattleError;
        const cattleWeightError = validateWeightOfCattle(f.cattleWeight.trim());
        if (cattleWeightError) e.cattleWeight = cattleWeightError;
      }

      if (f.transportItem === "equipment") {
        const lengthError = validateLength(f.equipmentDimensions.lengthCm.trim());
        if (lengthError) e.lengthCm = lengthError;
        const widthError = validateWidth(f.equipmentDimensions.widthCm.trim());
        if (widthError) e.widthCm = widthError;
        const heightError = validateHeight(f.equipmentDimensions.heightCm.trim());
        if (heightError) e.heightCm = heightError;
        const equipWeightError = validateWeight(f.equipmentWeight.trim());
        if (equipWeightError) e.equipmentWeight = equipWeightError;
      }

      if (f.transportItem === "other") {
        const objWeightError = validateWeight(f.otherWeightKg.trim());
        if (objWeightError) e.otherWeightKg = objWeightError;
      }
    }

    Object.keys(e).forEach((k) => e[k] === undefined && delete e[k]);
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return { formState, setFormState, errors, handleChange, validateForm, setErrors };
}
