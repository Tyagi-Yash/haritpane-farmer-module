import React from "react";

import landManagementTractorServices from "../../../assets/images/land-management-tractor-services.png";
import profile from "../../../assets/images/profile.png";
import TopbarModal from "../../../components/common components/TopbarModal";

function MyFarmDetails() {
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
          <div className="dashboard my-farms-details">
            <div>
              {/* Header */}
              <div className="mb-3">
                <h4 className="main-heading">RK Farm Field</h4>
                <div className="metadata">
                  <span>🕒</span>
                  <span>Friday, 18 May</span>
                  <span>•</span>
                  <span>Updated 6 min ago</span>
                </div>
              </div>
              {/* Cards Row */}
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="card-box">
                    <div className="card-title-text">
                      Show Next 6 hour
                      <br />
                      prediction
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card-box d-flex justify-content-between align-items-start">
                    <div className="card-title-text">Show Weather</div>
                  </div>
                </div>
              </div>
              {/* Info Message */}
              <p className="info-text">
                This Screen will be design at time of API implementation (Weather API)
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyFarmDetails;
