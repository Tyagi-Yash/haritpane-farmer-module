import { useTranslation } from "react-i18next";

function CompoundWallProductInformation({ vendor }) {
  const { t } = useTranslation();
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
      <h5 className="normal-heading">{t("compoundWall.productInformation")}</h5>
      {renderField(t("compoundWall.serviceAddress"), addressInfo?.street)}
      {renderField(t("compoundWall.materialType"), materialInfo?.materialName)}
    </div>
  );
}

export default CompoundWallProductInformation;
