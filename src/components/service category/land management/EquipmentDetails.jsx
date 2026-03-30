import { useTranslation } from "react-i18next";
import {
  TRACTOR_ATTACHMENTS,
  TRACTOR_HP_OPTIONS,
} from "../../../constants/service category/land management/tractorOptions";

function EquipmentDetails({ vendor }) {
  const { t } = useTranslation();
  const info = vendor?.Info;
  const getLabel = (options, value) => {
    const match = options.find((item) => item.value === value);
    return match ? match.label : value;
  };

  const hpLabel = getLabel(TRACTOR_HP_OPTIONS, info?.hpOfTractor);
  const equipmentLabel = getLabel(TRACTOR_ATTACHMENTS, info?.equipmentInformation);

  return (
    <div className="option-wrapper mb-0">
      <h5 className="normal-heading">{t("common.productInformation")}</h5>

      <p>{t("progress.tractorBrand")}: {info?.brandOfTractor}</p>
      <p>{t("progress.tractorModel")}: {info?.modelOfTractor}</p>
      <p>{t("progress.tractorHP")}: {hpLabel}</p>
      <p>{t("progress.equipmentType")}: {equipmentLabel}</p>
      <p>{t("progress.variant")}: {info?.equipmentVariant}</p>
      <p>{t("progress.description")}: {info?.equipmentDescription}</p>
    </div>
  );
}

export default EquipmentDetails;
