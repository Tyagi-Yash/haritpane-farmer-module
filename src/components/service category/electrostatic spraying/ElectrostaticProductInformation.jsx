function ElectrostaticProductInformation({ vendor }) {
  const basicInfo = vendor?.basicInfo || {};

  const renderField = (label, value) => {
    if (!value && value !== 0) return null;

    return (
      <p>
        {label}: {value}
      </p>
    );
  };

  return (
    <div className="option-wrapper mb-0">
      <h5 className="normal-heading">Product Information</h5>
      {renderField("Service Address", basicInfo?.adderess)}
      {renderField("Number of Equipments", basicInfo?.numberofEquipments)}
    </div>
  );
}

export default ElectrostaticProductInformation;
