import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import TopbarModal from "../../../components/common components/TopbarModal";
import { addMyFarm, editMyFarm } from "../../../reduxtoolkit/slices/account settings/myFarm";

function FarmForm() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.services.myFarmMgmtSlice);

  const editData = location.state?.farm;
  const initialLocation = location.state?.locationDetails;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      farmName: editData?.farmName || "",
      tehsil: editData?.tehsil || "",
      postalAddress: initialLocation?.address || editData?.postalAddress || "",
      village: initialLocation?.village || editData?.village || "",
      pincode: initialLocation?.pincode || editData?.pincode || "",
    },
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      location: initialLocation
        ? { type: "Point", coordinates: [initialLocation.lng, initialLocation.lat] }
        : editData?.location || null,
    };

    if (!payload.location && !editData) {
      toast.error(t("myFarm.locationCoordinatesMissing"));
      return;
    }

    if (editData) {
      dispatch(editMyFarm({ ...payload, farmId: editData._id })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success(t("myFarm.farmUpdatedSuccess"));
          navigate("/my-farms");
        }
      });
    } else {
      dispatch(addMyFarm(payload)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success(t("myFarm.farmAddedSuccess"));
          navigate("/my-farms");
        }
      });
    }
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title={t("myFarm.title")}
          navigate="/my-farms/map"
          navigateState={{ farm: editData, locationDetails: initialLocation }}
        />
        <div className="dashboard">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="option-wrapper">
              <div className="form-section">
                <h5 className="book-heading">
                  {editData ? t("myFarm.editFarmDetails") : t("myFarm.addLocationDetails")}
                </h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      {t("myFarm.farmName")} <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={t("myFarm.enterFarmName")}
                      {...register("farmName", { required: t("myFarm.farmNameRequired") })}
                    />
                    {errors.farmName && (
                      <small className="text-danger">{errors.farmName.message}</small>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      {t("myFarm.tehsil")} <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={t("myFarm.enterTehsil")}
                      {...register("tehsil", { required: t("myFarm.tehsilRequired") })}
                    />
                    {errors.tehsil && (
                      <small className="text-danger">{errors.tehsil.message}</small>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      {t("myFarm.postalAddress")} <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={t("myFarm.enterPostalAddress")}
                      {...register("postalAddress", { required: t("myFarm.postalAddressRequired") })}
                    />
                    {errors.postalAddress && (
                      <small className="text-danger">{errors.postalAddress.message}</small>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      {t("myFarm.village")} <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={t("myFarm.enterVillage")}
                      {...register("village", { required: t("myFarm.villageRequired") })}
                    />
                    {errors.village && (
                      <small className="text-danger">{errors.village.message}</small>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      {t("myFarm.pinPostalCode")} <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={t("myFarm.enterPincode")}
                      {...register("pincode", { required: t("myFarm.pincodeRequired") })}
                    />
                    {errors.pincode && (
                      <small className="text-danger">{errors.pincode.message}</small>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="available-service-btn d-flex justify-content-center mt-4">
              <button type="submit" className="send-btn" disabled={loader}>
                {loader ? t("myFarm.saving") : editData ? t("myFarm.updateFarm") : t("myFarm.saveFarm")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FarmForm;

