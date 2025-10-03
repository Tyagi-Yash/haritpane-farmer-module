import React, { useEffect } from "react";
import { Link } from "react-router-dom";

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
import cowDunkSupply from "../../assets/images/cow-dunk-supply.png";
import compundbuilder from "../../assets/images/compund-builder.png";
import droneServices from "../../assets/images/drone-services.png";
import augerServices from "../../assets/images/auger-services.png";
import cowImageRecent from "../../assets/images/cow-image-recent.png";

import DashboardCarousel from "../../components/dashboard/DashboardCarousel";
import TopbarModal from "../../components/common components/TopbarModal";

function Dashboard() {
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal />
          <div className="dashboard-page">
            <div className="dashboard">
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="heading">Classified Section</h4>
                  <div className="hide d-flex">
                    <select className="form-control w-100">
                      <option>Sort by</option>
                      <option>A-Z</option>
                      <option>Z-A</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-9">
                    <section className="mb-3">
                      <div className="Classified-Tiles">
                        <div className="ClassifiedBox">
                          <Link to="local-shops">
                            <figure>
                              <span>
                                <img src={localShop} alt="" />
                              </span>
                            </figure>
                            <p className="">View Local Shop</p>
                          </Link>
                        </div>
                        <div className="ClassifiedBox">
                          <Link to="local-manufacturers">
                            <figure>
                              <span>
                                <img src={localManufacturer} alt="" />
                              </span>
                            </figure>
                            <p>View Local Manufacturer</p>
                          </Link>
                        </div>
                      </div>
                    </section>

                    <DashboardCarousel />

                    <section>
                      <div className="row m-0">
                        <div className="col-sm-12">
                          <div className="headline-sort">
                            <div>
                              <h4 className="heading">Service Category</h4>
                            </div>
                            <div>
                              <Link className="seemore" to="/service-category">
                                See More
                              </Link>
                            </div>
                          </div>
                          <div className="service-section">
                            <div className="service-header" />
                            <div className="service-grid">
                              <Link to="/land-management" className="service-card">
                                <div className="card-image-part">
                                  <img src={landManagementTractorServices} alt="Tractor" />
                                </div>
                                <div className="label">Land Management / Tractor Services</div>
                              </Link>
                              <div className="service-card">
                                <Link to="/harvestor">
                                  <div className="card-image-part">
                                    <img src={harvester} alt="Harvester" />
                                  </div>
                                  <div className="label">Harvester</div>
                                </Link>
                              </div>
                              <div className="service-card">
                                <Link to="/cattle-purchase-sale">
                                  <div className="card-image-part">
                                    <img src={cattlePurchageSale} alt="Cattle" />
                                  </div>
                                  <div className="label">Cattle Purchase &amp; Sale</div>
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
                                <Link to="/excavation">
                                  <div className="card-image-part">
                                    <img src={excavation} alt="Excavation" />
                                  </div>
                                  <div className="label">Excavation</div>
                                </Link>
                              </div>
                              <div className="service-card">
                                <Link to="/electrostatic-spraying">
                                  <div className="card-image-part">
                                    <img src={electrostatic} alt="Electrostatic Spraying" />
                                  </div>
                                  <div className="label">Electrostatic Spraying</div>
                                </Link>
                              </div>
                              <div className="service-card">
                                <Link to="/labor-requirement">
                                  <div className="card-image-part">
                                    <img src={laborRequirement} alt="Cattle" />
                                  </div>
                                  <div className="label">Labor Requirement</div>
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
                                <div className="card-image-part">
                                  <img src={transportation} alt="Transportation" />
                                </div>
                                <div className="label">Transportation</div>
                              </div>
                              <div className="service-card">
                                <Link to="/borewell">
                                  <div className="card-image-part">
                                    <img src={borewellConstruction} alt="Borewell Construction" />
                                  </div>
                                  <div className="label">Borewell Construction</div>
                                </Link>
                              </div>
                              <div className="service-card">
                                <div className="card-image-part">
                                  <img src={cowDunkSupply} alt="Cow Dunk Supply" />
                                </div>
                                <div className="label">Cow Dunk Supply</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="hide row m-0">
                        <div className="col-sm-12">
                          <div className="service-section">
                            <div className="service-header mt-2"></div>
                            <div className="service-grid">
                              <div className="service-card">
                                <div className="card-image-part">
                                  <img src={compundbuilder} alt="Compound Wall Builder" />
                                </div>
                                <div className="label">Compound Wall Builder</div>
                              </div>
                              <div className="service-card">
                                <div className="card-image-part">
                                  <img src={droneServices} alt="Drone Services" />
                                </div>
                                <div className="label">Drone Services</div>
                              </div>
                              <div className="service-card">
                                <div className="card-image-part">
                                  <img src={augerServices} alt="Auger Services" />
                                </div>
                                <div className="label">Auger Services</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                  <div className="col-md-3">
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <div className="recent-activity">
                          <div className="product-card">
                            <div className="image-part">
                              <img src={cowImageRecent} alt="" />
                            </div>
                            <div className="card-text-part">
                              <h6 className="normal-heading mb-1">Natural field fertilization</h6>
                              <p className="normal-text m-0">Gramin Cattle Hub</p>
                              <p className="grey-para m-0">Meerut, Uttar Pradesh</p>
                            </div>
                          </div>
                          <div className="product-card">
                            <div className="image-part">
                              <img src={cowImageRecent} alt="" />
                            </div>
                            <div className="card-text-part">
                              <h6 className="normal-heading mb-1">Natural field fertilization</h6>
                              <p className="normal-text m-0">Gramin Cattle Hub</p>
                              <p className="grey-para m-0">Meerut, Uttar Pradesh</p>
                            </div>
                          </div>
                          <div className="product-card">
                            <div className="image-part">
                              <img src={cowImageRecent} alt="" />
                            </div>
                            <div className="card-text-part">
                              <h6 className="normal-heading mb-1">Natural field fertilization</h6>
                              <p className="normal-text m-0">Gramin Cattle Hub</p>
                              <p className="grey-para m-0">Meerut, Uttar Pradesh</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
