import { useTranslation } from "react-i18next";

function ElectrostaticProductInformation({ vendor }) {
  const { t } = useTranslation();
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
      <h5 className="normal-heading">{t("progress.productInformation")}</h5>
      {renderField(t("electrostatic.serviceAddress"), basicInfo?.adderess)}
      {renderField(t("electrostatic.numberOfEquipments"), basicInfo?.numberofEquipments)}
    </div>
  );
}

export default ElectrostaticProductInformation;
