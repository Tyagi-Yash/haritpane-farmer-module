import { useTranslation } from "react-i18next";

function LabourProductInformation({ vendor }) {
  const { t } = useTranslation();
  const labourInfo = vendor?.labourInfo || {};

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
      {renderField(t("labour.labourFor"), t(`labour.${labourInfo?.typeofLabourProvided}`))}
      {renderField(t("labour.numberOfLabour"), labourInfo?.numberofLabour)}
      {renderField(t("harvester.typeOfCrop"), labourInfo?.typeOfCrop)}
      {renderField(t("harvester.areaUnderCultivation"), labourInfo?.areaUnderCultivation)}
    </div>
  );
}

export default LabourProductInformation;
