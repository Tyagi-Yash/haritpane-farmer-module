function CattleInformation({ vendor }) {
  const cattleInfo = vendor?.cattleInfo || {};
  const basicInfo = vendor?.basicInfo || {};

  const renderField = (label, value) => {
    if (!value) return null;
    return (
      <p>
        {label}: {value}
      </p>
    );
  };

  const formatText = (text) => text?.charAt(0).toUpperCase() + text?.slice(1);

  return (
    <div className="option-wrapper booking-area mb-0">
      <h6 className="normal-heading">Cattle Information</h6>

      {renderField("Cattle Name", cattleInfo?.cattleName)}
      {renderField("Breed", cattleInfo?.cattleBreed)}
      {renderField("Gender", cattleInfo?.cattleGender && formatText(cattleInfo.cattleGender))}

      {renderField("Age", basicInfo?.age)}
      {renderField("Weight", basicInfo?.weight && `${basicInfo.weight} Kg`)}

      {basicInfo?.calf && renderField("Calf Available", "Yes")}

      {renderField("Number of Calf", basicInfo?.numberOfCalf)}

      {renderField("Milk Per Day", basicInfo?.milkPerDay && `${basicInfo.milkPerDay} Liters`)}

      {renderField("Lactation", basicInfo?.lactation)}

      {renderField("Description", basicInfo?.animalDescription)}
    </div>
  );
}

export default CattleInformation;
