function LabourProductInformation({ vendor }) {
  const basicInfo = vendor?.basicInfo || {};
  const labourInfo = vendor?.labourInfo || {};

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
      {renderField("Service Address", basicInfo?.address)}
      {renderField(
        "Type of Labour",
        labourInfo?.typeofLabourProvided && formatText(labourInfo.typeofLabourProvided),
      )}
      {renderField("Role Type", vendor?.selectRole && formatText(vendor.selectRole))}
      {renderField("Number of Labour Supervision", labourInfo?.numberofLabourSupervision)}
    </div>
  );
}

export default LabourProductInformation;
