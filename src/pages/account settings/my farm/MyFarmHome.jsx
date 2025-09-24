import React from "react";

import Grass from "../../../assets/images/grass.png";
import profile from "../../../assets/images/profile.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import { Link } from "react-router-dom";

function MyFarmHome() {
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal
            titleBox={true}
            title="My Farm"
            navigate="/dashboard"
            profile={profile}
          />
          <div className="dashboard my-farms">
            <div className="d-flex align-items-center justify-content-center">
              <div className="add-field-card">
                <figure>
                  <img src={Grass} alt="" />
                </figure>
                <h6 className="normal-heading">Grow Smarter with Your Farm</h6>
                <p className="grey-para">Personalize your HaritPane experience with your farm info.</p>
                <div className="available-service-btn">
                  <Link to="/farm-home/farm-api-page" className="send-btn">
                    Add Field
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyFarmHome;
