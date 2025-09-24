import React from "react";

import profile from "../../../assets/images/profile.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import { Link } from "react-router-dom";

function MyFarmAddLocation() {
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal
            titleBox={true}
            title="My Farm"
            navigate="/farm-home"
            profile={profile}
          />
          <div className="dashboard">
            <form>
              <div className="option-wrapper">
                <div className="form-section">
                  <h5 className="book-heading">Book your service</h5>
                  <div className="row g-3">
                    {/* Farm Location (Text) */}
                    <div className="col-md-6">
                      <label htmlFor="" className="form-label">
                        Tehsil <span>*</span>
                      </label>
                      <input type="text" className="form-control" placeholder="e.g. Rohini" required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="" className="form-label">
                        Tehsil <span>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. house no 123, main road, Market"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="" className="form-label">
                        Village <span>*</span>
                      </label>
                      <input type="text" className="form-control" placeholder="e.g. Bhagatpur" required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="" className="form-label">
                        Pin/postal code <span>*</span>
                      </label>
                      <input type="text" className="form-control" placeholder="e.g. 110085" required />
                    </div>
                  </div>
                </div>
              </div>
              <div className="available-service-btn">
                <Link to="/farm-home/farm-map-image">Add Manually</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyFarmAddLocation;
