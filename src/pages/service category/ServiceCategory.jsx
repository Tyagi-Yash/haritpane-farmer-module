import profile from "../../assets/images/profile.png";
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

import { Link } from "react-router-dom";

function ServiceCategory() {
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal profile={profile} />
        <div className="dashboard service-category">
          <section>
            <div className="headline-sort">
              <div>
                <h4 className="heading">Service Category</h4>
              </div>
              <div>
                <a className="hide seemore" href="#">
                  See More
                </a>
              </div>
            </div>
            <div className="row m-0">
              <div className="col-sm-12">
                <div className="service-section">
                  <div className="service-header"></div>
                  <div className="service-grid">
                    <div className="service-card">
                      <Link to="/land-management">
                        <div className="card-image-part">
                          <img src={landManagementTractorServices} alt="Tractor" />
                        </div>
                        <div className="label">Land Management / Tractor Services</div>
                      </Link>
                    </div>
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
                      <a href="transportation-book-your-service.html">
                        <div className="card-image-part">
                          <img src={transportation} alt="Transportation" />
                        </div>
                        <div className="label">Transportation</div>
                      </a>
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
                      <a href="Cow-dung-book-your-service.html">
                        <div className="card-image-part">
                          <img src={cowDunkSupply} alt="Cow Dunk Supply" />
                        </div>
                        <div className="label">Cow Dunk Supply</div>
                      </a>
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
                      <a href="compound-wall-book-your-service.html">
                        <div className="card-image-part">
                          <img src={compundBuilder} alt="Compound Wall Builder" />
                        </div>
                        <div className="label">Compound Wall Builder</div>
                      </a>
                    </div>
                    <div className="service-card">
                      <a href="drone-book-your-service.html">
                        <div className="card-image-part">
                          <img src={DroneServices} alt="Drone Services" />
                        </div>
                        <div className="label">Drone Services</div>
                      </a>
                    </div>
                    <div className="service-card">
                      <Link to="/auger-service">
                        <div className="card-image-part">
                          <img src={augerServices} alt="Auger Services" />
                        </div>
                        <div className="label">Auger Services</div>
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
