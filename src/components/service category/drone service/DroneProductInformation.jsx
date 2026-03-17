function DroneProductInformation({ vendor }) {
  const basicInfo = vendor?.basicInfo || {};

  const renderField = (label, value) => {
    if (!value && value !== 0) return null;

    return (
      <p>
        {label}: {value}
      </p>
    );
  };

  const formatText = (text) => text?.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="option-wrapper mb-0">
      <h5 className="normal-heading">Product Information</h5>
      {renderField("Service Address", basicInfo?.adderess)}
      {renderField("Number of Drones", vendor?.numberOfDrones)}
      {renderField(
        "Crop Under Cultivation",
        vendor?.cropUnderCultivation && formatText(vendor.cropUnderCultivation),
      )}
    </div>
  );
}

export default DroneProductInformation;
