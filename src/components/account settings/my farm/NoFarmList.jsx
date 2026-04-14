import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Grass from "../../../assets/images/grass.png";

function NoFarmList() {
  const { t } = useTranslation();

  return (
    <div className="dashboard my-farms">
      <div className="d-flex align-items-center justify-content-center">
        <div className="add-field-card">
          <figure>
            <img src={Grass} alt="" />
          </figure>
          <h6 className="normal-heading">{t("myFarm.growSmarter")}</h6>
          <p className="grey-para">{t("myFarm.personalizeExperience")}</p>
          <div className="available-service-btn">
            <Link to="/my-farms/map" className="send-btn">
              {t("myFarm.addField")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoFarmList;

