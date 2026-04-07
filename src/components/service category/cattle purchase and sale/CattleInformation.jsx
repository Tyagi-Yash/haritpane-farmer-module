import { useTranslation } from "react-i18next";

function CattleInformation({ vendor }) {
  const { t } = useTranslation();
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
      <h6 className="normal-heading">{t("cattle.cattleInformation")}</h6>

      {renderField(t("cattle.cattleName"), cattleInfo?.cattleName && t(`cattle.${cattleInfo.cattleName.toLowerCase()}`))}
      {renderField(t("cattle.breed"), cattleInfo?.cattleBreed && t(`cattle.breeds.${cattleInfo.cattleBreed.toLowerCase().replace(/ - /g, "_").replace(/ /g, "_").replace(/-/g, "_")}`, { defaultValue: cattleInfo.cattleBreed }))}
      {renderField(t("cattle.gender"), cattleInfo?.cattleGender && t(`cattle.${cattleInfo.cattleGender.toLowerCase()}`))}

      {renderField(t("cattle.age"), basicInfo?.age)}
      {renderField(t("cattle.weight"), basicInfo?.weight && `${basicInfo.weight} ${t("cattle.kg")}`)}

      {basicInfo?.calf && renderField(t("cattle.calfAvailable"), t("cattle.yes"))}

      {renderField(t("cattle.numberOfCalf"), basicInfo?.numberOfCalf)}

      {renderField(t("cattle.milkPerDay"), basicInfo?.milkPerDay && `${basicInfo.milkPerDay} ${t("cattle.liters")}`)}

      {renderField(t("cattle.lactation"), basicInfo?.lactation)}

      {renderField(t("progress.description"), basicInfo?.animalDescription)}
    </div>
  );
}

export default CattleInformation;
