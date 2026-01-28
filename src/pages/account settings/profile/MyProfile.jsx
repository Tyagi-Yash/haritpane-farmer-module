import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import profilePic from "../../../assets/images/profile.svg";
import TopbarModal from "../../../components/common components/TopbarModal";
import ProfileSkeleton from "../../../components/skeletons/ProfileSkeleton";
import DeleteModal from "../../../components/account settings/profile/DeleteModal";
import ProfileFieldGroup from "../../../components/account settings/profile/ProfileFieldGroup";
import { getFarmerProfile } from "../../../reduxtoolkit/slices/account settings/profile";
import { profileFields } from "../../../constants/profile/myprofile/profileFields";

function MyProfile() {
  const [formState, setFormState] = useState({
    farmerName: "",
    phone: "",
    email: "",
    address: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchFarmerProfile = async () => {
    try {
      const res = await dispatch(getFarmerProfile());
      const { status, data } = res?.payload || {};
      const farmerProfile = {
        name: data?.data?.name ?? "",
        profileImage: data?.data?.profileImage ?? "",
        languageSelector: data?.data?.languageSelector ?? "",
      };
      if (status === 200) {
        localStorage.setItem("farmerProfile", JSON.stringify(farmerProfile));
        setFormState({
          farmerName: data?.data?.name || "",
          phone: data?.data?.phone || "",
          email: data?.data?.email || "",
          address: data?.data?.address || "",
          profileImage: data?.data?.profileImage || "",
        });
        setLoading(false);
      } else {
        toast(data?.message || "Failed to load Profile");
      }
    } catch (err) {
      toast("Something went wrong");
    }
  };

  useEffect(() => {
    fetchFarmerProfile();
  }, []);

  const { farmerName, profileImage } = formState;

  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal titleBox={true} title="My Profile" navigate="/dashboard" />
          <div className="dashboard">
            {loading ? (
              <ProfileSkeleton />
            ) : (
              <div>
                <div className="d-flex align-items-center mb-2 position-relative">
                  <img
                    src={profileImage ? profileImage : profilePic}
                    alt="Profile"
                    className="profile-img me-3"
                  />
                </div>
                <h4 className="main-heading mb-3">{farmerName ? farmerName : "Farmer"}</h4>
                <h6 className="radio-label mb-3">Personal Details</h6>
                <ProfileFieldGroup fields={profileFields} formState={formState} />
                <div className="d-flex justify-content-end align-items-center mt-5">
                  <button
                    className="btn-delete"
                    onClick={() => setShowDeleteModal(true)}
                    type="button"
                  >
                    Delete Account?
                  </button>
                  <Link to="profile-edit" className="btn-edit">
                    Edit
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="my-profile">
        <DeleteModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} />
      </div>
    </>
  );
}

export default MyProfile;
