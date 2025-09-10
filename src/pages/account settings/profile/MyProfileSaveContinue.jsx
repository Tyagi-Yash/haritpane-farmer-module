import React from "react";

import profile from "../../../assets/images/profile.png";
import profilePic from "../../../assets/images/profile-pic.png";
import cameraIcon from "../../../assets/images/camera-icon.svg";
import TopbarModal from "../../../components/common components/TopbarModal";
import { Link } from "react-router-dom";

function MyProfileSaveContinue() {
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal titleBox={false} profile={profile} />
          <div className="dashboard">
            <div>
              {/* Profile Info */}
              <div className="d-flex align-items-center mb-2 position-relative">
                <img src={profilePic} alt="Profile" className="profile-img me-3" />
                <span className="camera-icon translate-middle">
                  <img src={cameraIcon} width={15} alt="Edit" />
                </span>
              </div>
              {/* Personal Details */}
              <h4 className="main-heading mb-3">Ramesh</h4>
              <h6 className="radio-label mb-3">Personal Details</h6>
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      Full Name<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your full name"
                      defaultValue="Shubham Sharma"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      Phone Number<span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Enter your phone number"
                      defaultValue="+91 7017148769"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email address"
                      defaultValue="12345@gmail.com"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      Full Address<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your full address"
                      defaultValue="1/117 Rakahapuram, Meerut"
                    />
                  </div>
                </div>
                {/* Buttons */}
                <div className="d-flex justify-content-end align-items-center mt-5">
                  <Link to="/profile" type="submit" className="btn-edit">
                    Save &amp; Continue
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfileSaveContinue;
