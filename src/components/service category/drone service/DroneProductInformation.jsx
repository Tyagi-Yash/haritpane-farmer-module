import { useTranslation } from "react-i18next";

function DroneProductInformation({ vendor }) {
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

  const formatText = (text) => text?.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="option-wrapper mb-0">
      <h5 className="normal-heading">{t("drone.productInformation")}</h5>
      {renderField(t("drone.serviceAddress"), basicInfo?.adderess)}
      {renderField(t("drone.numberOfDrones"), vendor?.numberOfDrones)}
      {renderField(
        t("drone.cropUnderCultivationLabel"),
        vendor?.cropUnderCultivation && formatText(vendor.cropUnderCultivation),
      )}
    </div>
  );
}

export default DroneProductInformation;
