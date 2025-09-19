import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import profilePic from "../../../assets/images/profile.svg";
import landManagementTractorServices from "../../../assets/images/land-management-tractor-services.png";
import cameraIcon from "../../../assets/images/camera-icon.svg";
import TopbarModal from "../../../components/common components/TopbarModal";
import ProfileSkeleton from "../../../components/skeletons/ProfileSkeleton";
import DeleteModal from "../../../components/account settings/profile/DeleteModal";
import ProfileFieldGroup from "../../../components/account settings/profile/ProfileFieldGroup";
import { getFarmerProfile } from "../../../reduxtoolkit/slices/account settings/profile";

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
      if (status === 200) {
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

  const profileFields = [
    {
      label: "Full Name",
      required: true,
      type: "text",
      placeholder: "You haven’t added your name yet",
      valueKey: "farmerName",
    },
    {
      label: "Phone Number",
      required: true,
      type: "tel",
      placeholder: "You haven’t added a phone number yet",
      valueKey: "phone",
    },
    {
      label: "Email Address",
      required: false,
      type: "email",
      placeholder: "You haven’t added an email yet",
      valueKey: "email",
    },
    {
      label: "Full Address",
      required: true,
      type: "text",
      placeholder: "You haven’t added your address yet",
      valueKey: "address",
    },
  ];

  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal
            titleBox={true}
            title="My Profile"
            secImage={landManagementTractorServices}
            navigate="/dashboard"
          />
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
                  <span className="camera-icon translate-middle">
                    <img src={cameraIcon} width={15} alt="Edit" />
                  </span>
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
