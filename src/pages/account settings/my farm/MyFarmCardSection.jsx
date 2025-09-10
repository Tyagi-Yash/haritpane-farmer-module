import React from "react";

import landManagementTractorServices from "../../../assets/images/land-management-tractor-services.png";
import profile from "../../../assets/images/profile.png";
import miniMap from "../../../assets/images/mini-map.png";
import editRectangle from "../../../assets/images/edit-rectangle.svg";
import view from "../../../assets/images/view.svg";
import TopbarModal from "../../../components/common components/TopbarModal";
import { Link } from "react-router-dom";

function MyFarmCardSection() {
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal
            titleBox={true}
            title="My Farm"
            secImage={landManagementTractorServices}
            navigate="/farm-home"
            profile={profile}
          />
          <div className="dashboard my-farms-cards my-maps-card-sections">
            <div className="option-wrapper">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div className="farm-card-view">
                    <figure className="maps-scroll">
                      <img src={miniMap} alt />
                      <div className="tap-view">
                        <h4>Tap to view on map</h4>
                      </div>
                    </figure>
                    <div className="name-icon">
                      <h4 className="normal-text">RK Farms Field</h4>
                      <div>
                        <img src={view} alt />
                        <img src={editRectangle} alt />
                      </div>
                    </div>
                    <div className="available-service-btn">
                      <Link to="/farm-home/farm-details" className="send-btn">
                        View detailed forecast
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="farm-card-view">
                    <figure className="maps-scroll">
                      <img src={miniMap} alt />
                      <div className="tap-view">
                        <h4>Tap to view on map</h4>
                      </div>
                    </figure>
                    <div className="name-icon">
                      <h4 className="normal-text">RK Farms Field</h4>
                      <div>
                        <img src={view} alt />
                        <img src={editRectangle} alt />
                      </div>
                    </div>
                    <div className="available-service-btn">
                      <Link to="/farm-home/farm-details" className="send-btn">
                        View detailed forecast
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="farm-card-view">
                    <figure className="maps-scroll">
                      <img src={miniMap} alt />
                      <div className="tap-view">
                        <h4>Tap to view on map</h4>
                      </div>
                    </figure>
                    <div className="name-icon">
                      <h4 className="normal-text">RK Farms Field</h4>
                      <div>
                        <img src={view} alt />
                        <img src={editRectangle} alt />
                      </div>
                    </div>
                    <div className="available-service-btn">
                      <Link to="/farm-home/farm-details" className="send-btn">
                        View detailed forecast
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="farm-card-view">
                    <figure className="maps-scroll">
                      <img src={miniMap} alt />
                      <div className="tap-view">
                        <h4>Tap to view on map</h4>
                      </div>
                    </figure>
                    <div className="name-icon">
                      <h4 className="normal-text">RK Farms Field</h4>
                      <div>
                        <img src={view} alt />
                        <img src={editRectangle} alt />
                      </div>
                    </div>
                    <div className="available-service-btn">
                      <Link to="/farm-home/farm-details" className="send-btn">
                        View detailed forecast
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="farm-card-view">
                    <figure className="maps-scroll">
                      <img src={miniMap} alt />
                      <div className="tap-view">
                        <h4>Tap to view on map</h4>
                      </div>
                    </figure>
                    <div className="name-icon">
                      <h4 className="normal-text">RK Farms Field</h4>
                      <div>
                        <img src={view} alt />
                        <img src={editRectangle} alt />
                      </div>
                    </div>
                    <div className="available-service-btn">
                      <Link to="/farm-home/farm-details" className="send-btn">
                        View detailed forecast
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="farm-card-view">
                    <figure className="maps-scroll">
                      <img src={miniMap} alt />
                      <div className="tap-view">
                        <h4>Tap to view on map</h4>
                      </div>
                    </figure>
                    <div className="name-icon">
                      <h4 className="normal-text">RK Farms Field</h4>
                      <div>
                        <img src={view} alt />
                        <img src={editRectangle} alt />
                      </div>
                    </div>
                    <div className="available-service-btn">
                      <Link to="/farm-home/farm-details" className="send-btn">
                        View detailed forecast
                      </Link>
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

export default MyFarmCardSection;
