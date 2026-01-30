export function buildPayload(f) {
  const payload = {
    jobOrderFor: "transportation",
    currentLocationCoordinates: {
      type: "Point",
      coordinates: [Number(f.currentLocationLng), Number(f.currentLocationLat)],
    },
    destinationLocationCoordinates: {
      type: "Point",
      coordinates: [Number(f.destinationLocationLng), Number(f.destinationLocationLat)],
    },
    currentLocation: f.currentLocation,
    destinationLocation: f.destinationLocation,
    typeOfVehicle: f.typeOfVehicle,
    fromDate: f.fromDate,
    tillDate: f.tillDate,
    startTime: f.startTime,
    transportItem: f.transportItem,
  };

  if (f.transportItem === "vegitable") {
    payload.vegetableType = f.vegetableType;
    payload.vegetableWeight = f.vegetableWeight;
  }

  if (f.transportItem === "cattle") {
    payload.numberOfCattle = f.numberOfCattle;
    payload.cattleWeight = f.cattleWeight;
  }

  if (f.transportItem === "equipment") {
    payload.equipmentDimensions = f.equipmentDimensions;
    payload.equipmentWeight = f.equipmentWeight;
  }

  if (f.transportItem === "other") {
    payload.otherWeightKg = f.otherWeightKg;
  }

  return payload;
}
