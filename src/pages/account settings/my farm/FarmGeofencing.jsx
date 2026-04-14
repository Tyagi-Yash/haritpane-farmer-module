import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import TopbarModal from "../../../components/common components/TopbarModal";

function FarmGeofencing() {
  const { t } = useTranslation();

  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal titleBox={true} title={t("myFarm.title")} navigate="/my-farms" />
          <div className="dashboard my-farm-api">
            <div className="d-flex align-items-center justify-content-center">
              <div className="add-field-card">
                {t("myFarm.geoFencingPlaceholder")}
              </div>
            </div>
            <div className="available-service-btn">
              <Link to="/my-farms/form">{t("myFarm.addField")}</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FarmGeofencing;

