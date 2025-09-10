import React from "react";

import Maps from "../../../assets/images/Maps.png";
import landManagementTractorServices from "../../../assets/images/land-management-tractor-services.png";
import profile from "../../../assets/images/profile.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import { Link } from "react-router-dom";

function MyFarmMapImage() {
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
          <div className="dashboard">
            <div className="option-wrapper">
              <img src={Maps} alt />
            </div>
            <div className="available-service-btn">
              <Link to="/farm-home/farm-select-map">Navigation Temproary button</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyFarmMapImage;
