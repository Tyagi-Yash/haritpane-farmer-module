import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import TopbarModal from "../../../components/common components/TopbarModal";
import { addMyFarm, editMyFarm } from "../../../reduxtoolkit/slices/account settings/myFarm";

function FarmForm() {
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
      toast.error("Location coordinates are missing. Please select a location on the map.");
      return;
    }

    if (editData) {
      dispatch(editMyFarm({ ...payload, farmId: editData._id })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Farm updated successfully");
          navigate("/my-farms");
        }
      });
    } else {
      dispatch(addMyFarm(payload)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Farm added successfully");
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
          title="My Farm"
          navigate="/my-farms/map"
          navigateState={{ farm: editData, locationDetails: initialLocation }}
        />
        <div className="dashboard">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="option-wrapper">
              <div className="form-section">
                <h5 className="book-heading">
                  {editData ? "Edit Farm Details" : "Add Location Details"}
                </h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      Farm Name <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Farm Name"
                      {...register("farmName", { required: "Farm Name is required" })}
                    />
                    {errors.farmName && (
                      <small className="text-danger">{errors.farmName.message}</small>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      Tehsil <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Tehsil"
                      {...register("tehsil", { required: "Tehsil is required" })}
                    />
                    {errors.tehsil && (
                      <small className="text-danger">{errors.tehsil.message}</small>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      Postal Address <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Postal Address"
                      {...register("postalAddress", { required: "Postal Address is required" })}
                    />
                    {errors.postalAddress && (
                      <small className="text-danger">{errors.postalAddress.message}</small>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      Village <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Village"
                      {...register("village", { required: "Village is required" })}
                    />
                    {errors.village && (
                      <small className="text-danger">{errors.village.message}</small>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      Pin/postal code <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Pincode"
                      {...register("pincode", { required: "Pincode is required" })}
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
                {loader ? "Saving..." : editData ? "Update Farm" : "Save Farm"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FarmForm;
