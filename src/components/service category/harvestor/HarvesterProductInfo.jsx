import { useTranslation } from "react-i18next";

function HarvesterProductInfo({ vendor }) {
  const { t } = useTranslation();
  const info = vendor?.Info;
  const priceInfo = vendor?.priceInfo || [];

  const equipmentType = info?.equipmentType || info?.harvesterManufacture || "N/A";

  const equipmentModel = info?.equipmentModel || info?.harvesterModel || "N/A";

  const cropTypes = priceInfo.map((item) => item.cropType).join(", ");

  const formatText = (text) => text?.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="option-wrapper mb-0">
      <h5 className="normal-heading">{t("common.productInformation")}</h5>
      <p>
        {t("common.typeOfCrop")}: {formatText(cropTypes)}
      </p>
      <p>
        {t("common.equipmentType")}: {formatText(equipmentType)}
      </p>
      <p>
        {t("common.equipmentModel")}: {equipmentModel}
      </p>
    </div>
  );
}

export default HarvesterProductInfo;
