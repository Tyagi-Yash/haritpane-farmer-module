import React from "react";

import landManagementTractorServices from "../../../assets/images/land-management-tractor-services.png";
import profile from "../../../assets/images/profile.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import { Link } from "react-router-dom";

function MyFarmAPIPage() {
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
          <div className="dashboard my-farm-api">
            <div className="d-flex align-items-center justify-content-center">
              <div className="add-field-card">
                This screen will be design at time of API implementation(geo fencing API)
              </div>
            </div>
            <div className="available-service-btn">
              <Link to="/farm-home/farm-add-location">Add Field</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyFarmAPIPage;
