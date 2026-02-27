import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import profilePic from "../../../assets/images/profile.svg";
import cameraIcon from "../../../assets/images/camera-icon.svg";
import TopbarModal from "../../../components/common components/TopbarModal";
import {
  editFarmerProfile,
  getFarmerProfile,
  uploadImage,
} from "../../../reduxtoolkit/slices/account settings/profile";
import ProfileSkeleton from "../../../components/skeletons/ProfileSkeleton";
import ProfileFieldGroup from "../../../components/account settings/profile/ProfileFieldGroup";
import { useNavigate } from "react-router-dom";
import { profileFields } from "../../../constants/profile/myprofile edit/profileFields";

function MyProfileSaveContinue() {
  const [formState, setFormState] = useState({
    farmerName: "",
    phone: "",
    email: "",
    address: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});

  const Imageloader = useSelector((state) => state.profileMgmtSlice?.loader) || false;

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const { farmerName, profileImage, phone, address, email } = formState;

  const fields = profileFields.map((f) => ({
    ...f,
    onChange: (val) => {
      setFormState((prev) => ({ ...prev, [f.valueKey]: val }));
      setErrors((prev) => ({ ...prev, [f.error]: "" }));
    },
  }));

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size must be under 10MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await dispatch(uploadImage(formData));
      const { status, data } = res?.payload || {};
      if (status === 200) {
        setFormState((prev) => ({
          ...prev,
          profileImage: data?.data[0] || "",
        }));
        toast.success("Image uploaded successfully");
      } else {
        toast.error(data.message || "Failed to upload Image");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const validate = () => {
    let newErrors = {};
    let valid = true;

    if (!farmerName.trim()) {
      newErrors.nameError = "*Name is required";
      valid = false;
    }

    if (!phone.trim()) {
      newErrors.phoneError = "*Phone number is required";
      valid = false;
    } else if (!/^[0-9]{10}$/.test(phone.trim())) {
      newErrors.phoneError = "*Enter a valid 10-digit phone number";
      valid = false;
    }

    if (!address.trim()) {
      newErrors.addressError = "*Address is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setDisable(true);
    const data = {
      name: farmerName.trim(),
      email: email.trim(),
      address: address.trim(),
      profileImage: profileImage,
    };
    try {
      const res = await dispatch(editFarmerProfile(data));
      const status = res?.payload?.status;
      const { message, data: userData } = res?.payload?.data || {};
      const farmerProfile = {
        name: userData?.name ?? "",
        profileImage: userData?.profileImage ?? "",
        languageSelector: userData?.languageSelector ?? "",
        phone: userData?.phone ?? "",
        email: userData?.email ?? "",
        address: userData?.address ?? "",
        pushNotification: userData?.pushNotification ?? "",
        chatNotification: userData?.chatNotification ?? "",
      };
      if (status === 200) {
        localStorage.setItem("farmerProfile", JSON.stringify(farmerProfile));
        navigate("/profile");
        toast.success(message || "Profile Updated successfully");
      } else {
        toast.error(message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setDisable(false);
    }
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal titleBox={false} />
        <div className="dashboard">
          {loading ? (
            <ProfileSkeleton />
          ) : (
            <form onSubmit={handleSubmit}>
              <div>
                <div className="d-flex align-items-center mb-2 position-relative">
                  <img
                    src={profileImage || profilePic}
                    alt="Profile"
                    className="profile-img me-3"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    id="profile-upload"
                    style={{ display: "none" }}
                    onChange={handleChange}
                    disabled={Imageloader}
                  />
                  <label
                    htmlFor="profile-upload"
                    className="camera-icon translate-middle"
                    style={{ cursor: "pointer" }}
                  >
                    {Imageloader ? (
                      <div className="spinner" role="status" aria-label="Saving..."></div>
                    ) : (
                      <img src={cameraIcon} width={15} alt="Edit" />
                    )}
                  </label>
                </div>
                <h4 className="main-heading mb-3">{farmerName || "Farmer"}</h4>
                <h6 className="radio-label mb-3">Personal Details</h6>
                <ProfileFieldGroup fields={fields} formState={formState} errors={errors} />
                <div className="d-flex justify-content-end align-items-center mt-5">
                  <button type="submit" className="btn-edit" disabled={disable}>
                    {disable ? (
                      <div className="d-flex align-items-center gap-2">
                        <span>Saving</span>
                        <div className="spinner" role="status" aria-label="Saving..."></div>
                      </div>
                    ) : (
                      "Save & Continue"
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfileSaveContinue;
