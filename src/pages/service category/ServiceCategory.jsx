import landManagementTractorServices from "../../assets/images/land-management-tractor-services.png";
import harvester from "../../assets/images/harvester.png";
import cattlePurchageSale from "../../assets/images/cattle-purchage-sale.png";
import excavation from "../../assets/images/excavation.png";
import electrostatic from "../../assets/images/electrostatic.png";
import laborRequirement from "../../assets/images/labor-requirement.png";
import transportation from "../../assets/images/transportation.png";
import borewellConstruction from "../../assets/images/borewell-construction.png";
import cowDunkSupply from "../../assets/images/cow-dunk-supply.png";
import compundBuilder from "../../assets/images/compund-builder.png";
import DroneServices from "../../assets/images/drone-services.png";
import augerServices from "../../assets/images/auger-services.png";
import TopbarModal from "../../components/common components/TopbarModal";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function ServiceCategory() {
  const { t } = useTranslation();
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal />
        <div className="dashboard service-category">
          <section>
            <div className="headline-sort">
              <div>
                <h4 className="heading">{t("dashboard.serviceCategory")}</h4>
              </div>
              <div>
                <a className="hide seemore" href="#">
                  {t("dashboard.seeMore")}
                </a>
              </div>
            </div>
            <div className="row m-0">
              <div className="col-sm-12">
                <div className="service-section">
                  <div className="service-header"></div>
                  <div className="service-grid">
                    <div className="service-card">
                      <Link to="land-management">
                        <div className="card-image-part">
                          <img src={landManagementTractorServices} alt={t("dashboard.landManagement")} />
                        </div>
                        <div className="label">{t("dashboard.landManagement")}</div>
                      </Link>
                    </div>
                    <div className="service-card">
                      <Link to="harvestor">
                        <div className="card-image-part">
                          <img src={harvester} alt={t("dashboard.harvester")} />
                        </div>
                        <div className="label">{t("dashboard.harvester")}</div>
                      </Link>
                    </div>
                    <div className="service-card">
                      <Link to="cattle-purchase-sale">
                        <div className="card-image-part">
                          <img src={cattlePurchageSale} alt={t("dashboard.cattlePurchaseSale")} />
                        </div>
                        <div className="label">{t("dashboard.cattlePurchaseSale")}</div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row m-0">
              <div className="col-sm-12">
                <div className="service-section">
                  <div className="service-header mt-2"></div>
                  <div className="service-grid">
                    <div className="service-card">
                      <Link to="earth-movers">
                        <div className="card-image-part">
                          <img src={excavation} alt={t("dashboard.earthMovers")} />
                        </div>
                        <div className="label">{t("dashboard.earthMovers")}</div>
                      </Link>
                    </div>
                    <div className="service-card">
                      <Link to="electrostatic-spraying">
                        <div className="card-image-part">
                          <img src={electrostatic} alt={t("dashboard.electrostaticSpraying")} />
                        </div>
                        <div className="label">{t("dashboard.electrostaticSpraying")}</div>
                      </Link>
                    </div>
                    <div className="service-card">
                      <Link to="labour-requirement">
                        <div className="card-image-part">
                          <img src={laborRequirement} alt={t("dashboard.labourRequirement")} />
                        </div>
                        <div className="label">{t("dashboard.labourRequirement")}</div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row m-0">
              <div className="col-sm-12">
                <div className="service-section">
                  <div className="service-header mt-2"></div>
                  <div className="service-grid">
                    <div className="service-card">
                      <Link to="transportation">
                        <div className="card-image-part">
                          <img src={transportation} alt={t("dashboard.transportation")} />
                        </div>
                        <div className="label">{t("dashboard.transportation")}</div>
                      </Link>
                    </div>
                    <div className="service-card">
                      <Link to="borewell">
                        <div className="card-image-part">
                          <img src={borewellConstruction} alt={t("dashboard.borewellConstruction")} />
                        </div>
                        <div className="label">{t("dashboard.borewellConstruction")}</div>
                      </Link>
                    </div>
                    <div className="service-card">
                      <Link to="cow-dung-supply">
                        <div className="card-image-part">
                          <img src={cowDunkSupply} alt={t("dashboard.cowDungPoultryWaste")} />
                        </div>
                        <div className="label">{t("dashboard.cowDungPoultryWaste")}</div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row m-0">
              <div className="col-sm-12">
                <div className="service-section">
                  <div className="service-header mt-2"></div>
                  <div className="service-grid">
                    <div className="service-card compound-wall">
                      <Link to="compound-wall-builder">
                        <div className="card-image-part">
                          <img src={compundBuilder} alt={t("dashboard.compoundWallBuilder")} />
                        </div>
                        <div className="label">{t("dashboard.compoundWallBuilder")}</div>
                      </Link>
                    </div>
                    <div className="service-card">
                      <Link to="drone-service">
                        <div className="card-image-part">
                          <img src={DroneServices} alt={t("dashboard.droneServices")} />
                        </div>
                        <div className="label">{t("dashboard.droneServices")}</div>
                      </Link>
                    </div>
                    <div className="service-card">
                      <Link to="auger-service">
                        <div className="card-image-part">
                          <img src={augerServices} alt={t("dashboard.augerServices")} />
                        </div>
                        <div className="label">{t("dashboard.augerServices")}</div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ServiceCategory;
