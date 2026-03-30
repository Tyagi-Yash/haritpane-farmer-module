import { useTranslation } from "react-i18next";

function ExcavationProductInformation({ vendor }) {
  const { t } = useTranslation();
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
      <h5 className="normal-heading">{t("excavation.productInformation")}</h5>
      {renderField(t("excavation.equipmentType"), t(`excavation.${excavationInfo?.equipmentTypes?.toLowerCase().replace(/\s+/g, '')}`) || excavationInfo?.equipmentTypes)}
      {renderField(t("excavation.numberOfEquipment"), vendor?.numberOfEquipment)}
      {renderField(t("excavation.priceType"), priceInfo?.priceType)}
    </div>
  );
}

export default ExcavationProductInformation;
