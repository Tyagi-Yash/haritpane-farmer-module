import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import localShop from "../../assets/images/Local-shop.svg";
import localManufacturer from "../../assets/images/local-manufacturer.svg";
import landManagementTractorServices from "../../assets/images/land-management-tractor-services.png";
import harvester from "../../assets/images/harvester.png";
import cattlePurchageSale from "../../assets/images/cattle-purchage-sale.png";
import excavation from "../../assets/images/excavation.png";
import electrostatic from "../../assets/images/electrostatic.png";
import laborRequirement from "../../assets/images/labor-requirement.png";
import transportation from "../../assets/images/transportation.png";
import borewellConstruction from "../../assets/images/borewell-construction.png";
import compundBuilder from "../../assets/images/compund-builder.png";
import DroneServices from "../../assets/images/drone-services.png";
import augerServices from "../../assets/images/auger-services.png";
import cowDunkSupply from "../../assets/images/cow-dunk-supply.png";
import cowImageRecent from "../../assets/images/cow-image-recent.png";

import DashboardCarousel from "../../components/dashboard/DashboardCarousel";
import TopbarModal from "../../components/common components/TopbarModal";
import { useState } from "react";
import SideAds from "../../components/dashboard/SideAds";

function Dashboard() {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);
  const toggleShow = () => {
    setShowAll((prev) => !prev);
  };
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal />
        <div className="dashboard-page">
          <div className="dashboard">
            <div>
              <div className="row">
                <div className="col-md-9">
                  <section className="mb-3">
                    <div className="row m-0">
                      <div className="col-sm-12">
                        <div className="headline-sort">
                          <div>
                            <h4 className="heading">{t("dashboard.serviceCategory")}</h4>
                          </div>
                          <div>
                            <div className="seemore" onClick={toggleShow}>
                              {showAll ? t("dashboard.seeLess") : t("dashboard.seeMore")}
                            </div>
                          </div>
                        </div>
                        <div className="service-section">
                          <div className="service-header" />
                          <div className="service-grid">
                            <Link to="/service-category/land-management" className="service-card">
                              <div className="card-image-part">
                                <img src={landManagementTractorServices} alt="Tractor" />
                              </div>
                              <div className="label">{t("dashboard.landManagement")}</div>
                            </Link>
                            <div className="service-card">
                              <Link to="/service-category/harvestor">
                                <div className="card-image-part">
                                  <img src={harvester} alt="Harvester" />
                                </div>
                                <div className="label">{t("dashboard.harvester")}</div>
                              </Link>
                            </div>
                            <div className="service-card">
                              <Link to="/service-category/cattle-purchase-sale">
                                <div className="card-image-part">
                                  <img src={cattlePurchageSale} alt="Cattle" />
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
                              <Link to="/service-category/earth-movers">
                                <div className="card-image-part">
                                  <img src={excavation} alt="Earth Movers" />
                                </div>
                                <div className="label">{t("dashboard.earthMovers")}</div>
                              </Link>
                            </div>
                            <div className="service-card">
                              <Link to="/service-category/electrostatic-spraying">
                                <div className="card-image-part">
                                  <img src={electrostatic} alt="Electrostatic Spraying" />
                                </div>
                                <div className="label">{t("dashboard.electrostaticSpraying")}</div>
                              </Link>
                            </div>
                            <div className="service-card">
                              <Link to="/service-category/labour-requirement">
                                <div className="card-image-part">
                                  <img src={laborRequirement} alt="Cattle" />
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
                              <Link to="/service-category/transportation">
                                <div className="card-image-part">
                                  <img src={transportation} alt="Transportation" />
                                </div>
                                <div className="label">{t("dashboard.transportation")}</div>
                              </Link>
                            </div>
                            <div className="service-card">
                              <Link to="/service-category/borewell">
                                <div className="card-image-part">
                                  <img src={borewellConstruction} alt="Borewell Construction" />
                                </div>
                                <div className="label">{t("dashboard.borewellConstruction")}</div>
                              </Link>
                            </div>
                            <div className="service-card">
                              <Link to="/service-category/cow-dung-supply">
                                <div className="card-image-part">
                                  <img src={cowDunkSupply} alt="Cow Dung Supply" />
                                </div>
                                <div className="label">{t("dashboard.cowDungPoultryWaste")}</div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {showAll && (
                      <div className="row m-0">
                        <div className="col-sm-12">
                          <div className="service-section">
                            <div className="service-header mt-2"></div>
                            <div className="service-grid">
                              <div className="service-card">
                                <Link to="/service-category/compound-wall-builder">
                                  <div className="card-image-part">
                                    <img src={compundBuilder} alt="Compound Wall Builder" />
                                  </div>
                                  <div className="label">{t("dashboard.compoundWallBuilder")}</div>
                                </Link>
                              </div>
                              <div className="service-card">
                                <Link to="/service-category/drone-service">
                                  <div className="card-image-part">
                                    <img src={DroneServices} alt="Drone Services" />
                                  </div>
                                  <div className="label">{t("dashboard.droneServices")}</div>
                                </Link>
                              </div>
                              <div className="service-card">
                                <Link to="/service-category/auger-service">
                                  <div className="card-image-part">
                                    <img src={augerServices} alt="Auger Services" />
                                  </div>
                                  <div className="label">{t("dashboard.augerServices")}</div>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </section>

                  <DashboardCarousel />

                  <section className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="heading">{t("dashboard.classifiedSection")}</h4>
                    </div>
                    <div className="Classified-Tiles">
                      <div className="ClassifiedBox">
                        <Link to="local-shops">
                          <figure>
                            <span>
                              <img src={localShop} alt="" />
                            </span>
                          </figure>
                          <p className="">{t("dashboard.localBusinesses")}</p>
                        </Link>
                      </div>
                      <div className="ClassifiedBox">
                        <Link to="local-manufacturers">
                          <figure>
                            <span>
                              <img src={localManufacturer} alt="" />
                            </span>
                          </figure>
                          <p>{t("dashboard.viewManufacturers")}</p>
                        </Link>
                      </div>
                    </div>
                  </section>
                </div>

                <SideAds />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
