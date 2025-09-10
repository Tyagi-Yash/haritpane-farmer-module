import React from "react";

import profile from "../../../assets/images/profile.png";
import landManagementTractorServices from "../../../assets/images/land-management-tractor-services.png";
import profilePic from "../../../assets/images/profile-pic.png";
import deleteEmoji from "../../../assets/images/delete-emoji.png";
import cameraIcon from "../../../assets/images/camera-icon.svg";
import TopbarModal from "../../../components/common components/TopbarModal";
import { Link } from "react-router-dom";

function MyProfile() {
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal
            titleBox={true}
            title="My Profile"
            secImage={landManagementTractorServices}
            navigate="/dashboard"
            profile={profile}
          />
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
                    <input type="text" className="form-control" placeholder="Enter your full name" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      Phone Number<span className="text-danger">*</span>
                    </label>
                    <input type="tel" className="form-control" placeholder="Enter your phone number" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-control" placeholder="Enter your email address" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      Full Address<span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" placeholder="Enter your full address" />
                  </div>
                </div>
                {/* Buttons */}
                <div className="d-flex justify-content-end align-items-center mt-5">
                  <button
                    type="button"
                    className="btn-delete"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                  >
                    Delete Account?
                  </button>
                  <Link to="profile-edit" type="submit" className="btn-edit">
                    Edit
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="my-profile">
        <div
          className="modal fade"
          id="deleteModal"
          tabIndex={-1}
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="modal-emoji">
                  <img src={deleteEmoji} alt />
                </div>
                <div className="modal-title">Are you sure you want to delete your account?</div>
                <p>
                  You’ll permanently lose all saved info, orders, and <br />
                  access to HaritPane services.
                </p>
                <div className="modal-footer">
                  <button type="button" className="btn btn-delete-modal" data-bs-dismiss="modal">
                    Delete Account
                  </button>
                  <button type="button" className="btn btn-cancel" data-bs-dismiss="modal">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
