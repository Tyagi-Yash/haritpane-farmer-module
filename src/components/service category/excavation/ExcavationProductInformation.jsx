function ExcavationProductInformation({ vendor }) {
  const excavationInfo = vendor?.excavationInfo || {};
  const priceInfo = vendor?.priceInfo || {};

  const renderField = (label, value) => {
    if (!value) return null;
    return (
      <p>
        {label}: {value}
      </p>
    );
  };

  return (
    <div className="option-wrapper mb-0">
      <h5 className="normal-heading">Product Information</h5>
      {renderField("Equipment Type", excavationInfo?.equipmentTypes)}
      {renderField("Number of Equipment", vendor?.numberOfEquipment)}
      {renderField("Price Type", priceInfo?.priceType)}
    </div>
  );
}

export default ExcavationProductInformation;
