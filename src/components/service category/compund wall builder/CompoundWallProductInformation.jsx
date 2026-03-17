function CompoundWallProductInformation({ vendor }) {
  const addressInfo = vendor?.addressInfo || {};
  const materialInfo = vendor?.compoundMaterialsInfo || {};

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
      {renderField("Service Address", addressInfo?.street)}
      {renderField("Material Type", materialInfo?.materialName)}
    </div>
  );
}

export default CompoundWallProductInformation;
