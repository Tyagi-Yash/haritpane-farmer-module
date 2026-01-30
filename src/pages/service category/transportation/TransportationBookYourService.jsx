import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

import { useTransportationForm } from "../../../hooks/useTransportationForm";
import { createTransportationJobOrder } from "../../../reduxtoolkit/slices/service category/transportationService";
import TransportItemFields from "../../../components/service category/transportation/TransportItemFields";
import TransportItemSelect from "../../../components/service category/transportation/TransportItemSelect";
import LocationSection from "../../../components/service category/transportation/LocationSection";
import VehicleSection from "../../../components/service category/transportation/VehicleSection";
import DateTimeSection from "../../../components/service category/transportation/DateTimeSection";
import SuccessModal from "../../../components/service category/transportation/SuccessModal";
import TopbarModal from "../../../components/common components/TopbarModal";
import TransportationIcon from "../../../assets/images/Transportation-icon.png";
import { buildPayload } from "../../../utils/buildPayload";

function TransportationBookYourService() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { formState, setFormState, errors, handleChange, validateForm, setErrors } =
    useTransportationForm();

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await dispatch(createTransportationJobOrder(buildPayload(formState)));
      if (res?.payload?.status === 200) {
        toast.success("Booking created");
        setShowSuccess(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title="Transportation"
          secImage={TransportationIcon}
          navigate="/service-category"
        />
        <div className="dashboard">
          <form onSubmit={handleSubmit}>
            <div className="option-wrapper">
              <div className="form-section">
                <h5 className="book-heading">Book your service</h5>
                <div className="row g-3">
                  <TransportItemSelect
                    value={formState.transportItem}
                    error={errors.transportItem}
                    onChange={(v) => handleChange("transportItem", v)}
                  />

                  <TransportItemFields {...formState} errors={errors} onChange={handleChange} />

                  <LocationSection
                    formState={formState}
                    setFormState={setFormState}
                    errors={errors}
                    setErrors={setErrors}
                  />

                  <VehicleSection
                    value={formState.typeOfVehicle}
                    error={errors.typeOfVehicle}
                    onChange={(v) => handleChange("typeOfVehicle", v)}
                  />
                </div>
                <h5 className="book-heading">Book Services date &amp; time</h5>
                <div className="row g-3">
                  <DateTimeSection formState={formState} errors={errors} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="available-service-btn">
              <button disabled={loading}>{loading ? "Sending..." : "Send Booking Request"}</button>
            </div>
          </form>
        </div>
        {showSuccess && <SuccessModal onClose={() => navigate("/dashboard")} />}
      </div>
    </div>
  );
}

export default TransportationBookYourService;

// import { useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// import TopbarModal from "../../../components/common components/TopbarModal";
// import TransportationIcon from "../../../assets/images/Transportation-icon.png";
// import {
//   validateDates,
//   validateHeight,
//   validateItemType,
//   validateLength,
//   validateNumberOfCattle,
//   validateSelectTime,
//   validateVegeType,
//   validateVehicleType,
//   validateWeight,
//   validateWeightOfCattle,
//   validateWeightOfVegetable,
//   validateWidth,
// } from "../../../utils/formValidators";
// import { vehicle } from "../../../constants/service category/transportation service/transportationData";
// import { useDispatch } from "react-redux";
// import { createTransportationJobOrder } from "../../../reduxtoolkit/slices/service category/transportationService";
// import LocationInput from "../../../components/common components/LocationInput";

// function TransportationBookYourService() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const defaultForm = {
//     currentLocationLat: "",
//     currentLocationLng: "",
//     destinationLocationLat: "",
//     destinationLocationLng: "",
//     currentLocation: "",
//     destinationLocation: "",
//     transportItem: "",
//     vegetableType: "",
//     vegetableWeight: "",
//     numberOfCattle: "",
//     cattleWeight: "",
//     equipmentDimensions: { lengthCm: "", widthCm: "", heightCm: "" },
//     equipmentWeight: "",
//     otherWeightKg: "",
//     typeOfVehicle: "",
//     fromDate: "",
//     tillDate: "",
//     startTime: "",
//   };

//   const [formState, setFormState] = useState(defaultForm);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   const {
//     currentLocationLat,
//     currentLocationLng,
//     destinationLocationLat,
//     destinationLocationLng,
//     currentLocation,
//     destinationLocation,
//     transportItem,
//     vegetableType,
//     vegetableWeight,
//     numberOfCattle,
//     cattleWeight,
//     equipmentDimensions,
//     equipmentWeight,
//     otherWeightKg,
//     typeOfVehicle,
//     fromDate,
//     tillDate,
//     startTime,
//   } = formState;
//   const { lengthCm, widthCm, heightCm } = equipmentDimensions;

//   const [disable, setDisable] = useState(false);
//   const [errors, setErrors] = useState({});

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "transportItem") {
//       setFormState((prev) => ({
//         ...prev,
//         [name]: value,
//         vegetableType: "",
//         vegetableWeight: "",
//         numberOfCattle: "",
//         cattleWeight: "",
//         equipmentDimensions: { lengthCm: "", widthCm: "", heightCm: "" },
//         equipmentWeight: "",
//         otherWeightKg: "",
//       }));
//     } else if (["lengthCm", "widthCm", "heightCm"].includes(name)) {
//       setFormState((prev) => ({
//         ...prev,
//         equipmentDimensions: { ...prev.equipmentDimensions, [name]: value },
//       }));
//     } else {
//       setFormState((prev) => ({ ...prev, [name]: value }));
//     }

//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const validateForm = () => {
//     let newErrors = {};

//     const transportItemError = validateItemType(transportItem.trim());
//     if (transportItemError) newErrors.transportItem = transportItemError;

//     if (!transportItemError) {
//       if (!currentLocation || !currentLocationLat || !currentLocationLng)
//         newErrors.currentLocation = "Please select a valid location.";

//       if (!destinationLocation || !destinationLocationLat || !destinationLocationLng)
//         newErrors.destinationLocation = "Please select a valid location.";

//       const vehicleTypeError = validateVehicleType(typeOfVehicle.trim());
//       if (vehicleTypeError) newErrors.typeOfVehicle = vehicleTypeError;

//       const dateErrors = validateDates(fromDate, tillDate);
//       newErrors = { ...newErrors, ...dateErrors };

//       const timeError = validateSelectTime(fromDate, startTime);
//       if (timeError) newErrors.startTime = timeError;

//       if (transportItem === "vegitable") {
//         const vegeTypeError = validateVegeType(vegetableType.trim());
//         if (vegeTypeError) newErrors.vegetableType = vegeTypeError;

//         const vegetableWeightError = validateWeightOfVegetable(vegetableWeight.trim());
//         if (vegetableWeightError) newErrors.vegetableWeight = vegetableWeightError;
//       }

//       if (transportItem === "cattle") {
//         const cattleError = validateNumberOfCattle(numberOfCattle.trim());
//         if (cattleError) newErrors.numberOfCattle = cattleError;

//         const cattleWeightError = validateWeightOfCattle(cattleWeight.trim());
//         if (cattleWeightError) newErrors.cattleWeight = cattleWeightError;
//       }

//       if (transportItem === "equipment") {
//         const lengthError = validateLength(lengthCm.trim());
//         if (lengthError) newErrors.lengthCm = lengthError;

//         const widthError = validateWidth(widthCm.trim());
//         if (widthError) newErrors.widthCm = widthError;

//         const heightError = validateHeight(heightCm.trim());
//         if (heightError) newErrors.heightCm = heightError;

//         const equipWeightError = validateWeight(equipmentWeight.trim());
//         if (equipWeightError) newErrors.equipmentWeight = equipWeightError;
//       }

//       if (transportItem === "other") {
//         const objWeightError = validateWeight(otherWeightKg.trim());
//         if (objWeightError) newErrors.otherWeightKg = objWeightError;
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     setDisable(true);
//     let formdata = {
//       jobOrderFor: "transportation",
//       currentLocationCoordinates: {
//         type: "Point",
//         coordinates: [Number(currentLocationLng), Number(currentLocationLat)],
//       },
//       destinationLocationCoordinates: {
//         type: "Point",
//         coordinates: [Number(destinationLocationLng), Number(destinationLocationLat)],
//       },
//       currentLocation,
//       destinationLocation,
//       typeOfVehicle,
//       fromDate,
//       tillDate,
//       startTime,
//       transportItem,
//     };
//     if (transportItem === "vegitable") {
//       formdata.vegetableType = vegetableType;
//       formdata.vegetableWeight = vegetableWeight;
//     } else if (transportItem === "cattle") {
//       formdata.numberOfCattle = numberOfCattle;
//       formdata.cattleWeight = cattleWeight;
//     } else if (transportItem === "equipment") {
//       formdata.equipmentDimensions = {
//         lengthCm: lengthCm,
//         widthCm: widthCm,
//         heightCm: heightCm,
//       };
//       formdata.equipmentWeight = equipmentWeight;
//     } else if (transportItem === "other") {
//       formdata.otherWeightKg = otherWeightKg;
//     }
//     try {
//       const res = await dispatch(createTransportationJobOrder(formdata));
//       const { status, data } = res?.payload || {};
//       if (status === 200) {
//         toast.success(data?.message || "Booking Request Created successfully");
//         setShowSuccessModal(true);
//       } else {
//         toast.error(data?.message || "Failed to Send Booking Request");
//       }
//     } catch (error) {
//       toast.error("Something went wrong");
//     } finally {
//       setDisable(false);
//     }
//   };

//   const handleSelectCurrentLocation = ({ address, lat, lng }) => {
//     setFormState((prev) => ({
//       ...prev,
//       currentLocation: address,
//       currentLocationLat: lat,
//       currentLocationLng: lng,
//     }));
//     setErrors((prev) => ({ ...prev, currentLocation: "" }));
//   };
//   const handleSelectTravelLocation = ({ address, lat, lng }) => {
//     setFormState((prev) => ({
//       ...prev,
//       destinationLocation: address,
//       destinationLocationLat: lat,
//       destinationLocationLng: lng,
//     }));
//     setErrors((prev) => ({ ...prev, destinationLocation: "" }));
//   };

//   return (
//     <div className="WrapperArea">
//       <div className="WrapperBox">
//         <TopbarModal
//           titleBox={true}
//           title="Transportation"
//           secImage={TransportationIcon}
//           navigate="/service-category"
//         />
//         <div className="dashboard">
//           <form onSubmit={handleSubmit}>
//             <div className="option-wrapper">
//               <div className="form-section">
//                 <h5 className="book-heading">Book your service</h5>
//                 <div className="row g-3">
//                   <div className="col-md-6">
//                     <label className="form-label">
//                       Transport Item<span className="required">*</span>
//                     </label>
//                     <select
//                       className="form-control"
//                       name="transportItem"
//                       value={transportItem}
//                       onChange={handleInputChange}
//                     >
//                       <option value="" disabled>
//                         Select goods for your transport
//                       </option>
//                       <option value="vegitable" className="form-control">
//                         Vegetable
//                       </option>
//                       <option value="cattle" className="form-control">
//                         Cattle
//                       </option>
//                       <option value="equipment" className="form-control">
//                         Equipment's
//                       </option>
//                       <option value="other" className="form-control">
//                         Other
//                       </option>
//                     </select>
//                     {errors.transportItem && <p className="error-text">{errors.transportItem}</p>}
//                   </div>
//                   {transportItem === "vegitable" && (
//                     <>
//                       <div className="col-md-6">
//                         <label className="form-label">
//                           Vegetable Type<span className="required">*</span>
//                         </label>
//                         <select
//                           className="form-control"
//                           name="vegetableType"
//                           value={vegetableType}
//                           onChange={handleInputChange}
//                         >
//                           <option value="" disabled>
//                             Select type of vegetable
//                           </option>
//                           <option value="leafy_stack" className="form-control">
//                             Leafy Vegetable- Stack
//                           </option>
//                           <option value="tomato_cucumber_crate" className="form-control">
//                             Tomato, Cucumber- Crate
//                           </option>
//                           <option value="onion_potato_stack" className="form-control">
//                             Onion, Potato- Stack
//                           </option>
//                           <option value="cabbage_cauliflower_mesh_sack" className="form-control">
//                             Cabbage, Cauliflower- Mesh Sack
//                           </option>
//                           <option value="grains_sack" className="form-control">
//                             Grains- Sack
//                           </option>
//                         </select>
//                         {errors.vegetableType && (
//                           <p className="error-text">{errors.vegetableType}</p>
//                         )}
//                       </div>
//                       <div className="col-md-6">
//                         <label className="form-label">
//                           Weight of Vegetable<span className="required">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           placeholder="Weight of Vegetable"
//                           name="vegetableWeight"
//                           value={vegetableWeight}
//                           onChange={handleInputChange}
//                         />
//                         {errors.vegetableWeight && (
//                           <p className="error-text">{errors.vegetableWeight}</p>
//                         )}
//                       </div>
//                     </>
//                   )}
//                   {transportItem === "cattle" && (
//                     <>
//                       <div className="col-md-6">
//                         <label className="form-label">
//                           Number of cattle<span className="required">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           placeholder="Number of cattle"
//                           name="numberOfCattle"
//                           value={numberOfCattle}
//                           onChange={handleInputChange}
//                         />
//                         {errors.numberOfCattle && (
//                           <p className="error-text">{errors.numberOfCattle}</p>
//                         )}
//                       </div>
//                       <div className="col-md-6">
//                         <label className="form-label">
//                           Weight of cattle<span className="required">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           placeholder="Weight of cattle"
//                           name="cattleWeight"
//                           value={cattleWeight}
//                           onChange={handleInputChange}
//                         />
//                         {errors.cattleWeight && <p className="error-text">{errors.cattleWeight}</p>}
//                       </div>
//                     </>
//                   )}
//                   {transportItem === "equipment" && (
//                     <>
//                       <div className="col-md-6">
//                         <label className="form-label">
//                           Equipment Dimension<span className="required">*</span>
//                         </label>
//                         <div className="row">
//                           <div className="col-md-4">
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="Length (cm)"
//                               name="lengthCm"
//                               value={lengthCm}
//                               onChange={handleInputChange}
//                             />
//                             {errors.lengthCm && <p className="error-text">{errors.lengthCm}</p>}
//                           </div>
//                           <div className="col-md-4">
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="Width (cm)"
//                               name="widthCm"
//                               value={widthCm}
//                               onChange={handleInputChange}
//                             />
//                             {errors.widthCm && <p className="error-text">{errors.widthCm}</p>}
//                           </div>
//                           <div className="col-md-4">
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="Height (cm)"
//                               name="heightCm"
//                               value={heightCm}
//                               onChange={handleInputChange}
//                             />
//                             {errors.heightCm && <p className="error-text">{errors.heightCm}</p>}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <label className="form-label">
//                           Equipment Weight<span className="required">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           placeholder="Equipment Weight(in Kg)"
//                           name="equipmentWeight"
//                           value={equipmentWeight}
//                           onChange={handleInputChange}
//                         />
//                         {errors.equipmentWeight && (
//                           <p className="error-text">{errors.equipmentWeight}</p>
//                         )}
//                       </div>
//                     </>
//                   )}
//                   {transportItem === "other" && (
//                     <div className="col-md-6">
//                       <label className="form-label">
//                         Object Weight<span className="required">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Weight of Object(in Kg)"
//                         name="otherWeightKg"
//                         value={otherWeightKg}
//                         onChange={handleInputChange}
//                       />
//                       {errors.otherWeightKg && <p className="error-text">{errors.otherWeightKg}</p>}
//                     </div>
//                   )}
//                   <div className="col-md-3">
//                     <label className="form-label">
//                       Current location<span className="required">*</span>
//                     </label>
//                     <LocationInput
//                       value={currentLocation}
//                       onChange={(val) =>
//                         setFormState((prev) => ({
//                           ...prev,
//                           currentLocation: val,
//                           currentLocationLat: "",
//                           currentLocationLng: "",
//                         }))
//                       }
//                       onSelectLocation={handleSelectCurrentLocation}
//                       error={errors.currentLocation}
//                       placeholder="Enter Current Location"
//                     />
//                   </div>
//                   <div className="col-md-3">
//                     <label className="form-label">
//                       Travel location<span className="required">*</span>
//                     </label>
//                     <LocationInput
//                       value={destinationLocation}
//                       onChange={(val) =>
//                         setFormState((prev) => ({
//                           ...prev,
//                           destinationLocation: val,
//                           destinationLocationLat: "",
//                           destinationLocationLng: "",
//                         }))
//                       }
//                       onSelectLocation={handleSelectTravelLocation}
//                       error={errors.destinationLocation}
// placeholder="Enter Travel Location"
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <label className="form-label">
//                       Vehicle Type<span className="required">*</span>
//                     </label>
//                     <select
//                       className="form-control"
//                       name="typeOfVehicle"
//                       value={typeOfVehicle}
//                       onChange={handleInputChange}
//                     >
//                       <option value="" disabled>
//                         Type of vehicle*
//                       </option>
//                       {vehicle.map((type) => (
//                         <option value={type} className="form-control" key={type}>
//                           {type}
//                         </option>
//                       ))}
//                     </select>
//                     {errors.typeOfVehicle && <p className="error-text">{errors.typeOfVehicle}</p>}
//                   </div>
//                 </div>
//                 <h5 className="book-heading">Book Services date &amp; time</h5>
//                 <div className="row g-3">
//                   <div className="col-md-6">
//                     <label className="form-label">
//                       From date<span className="required">*</span>
//                     </label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       name="fromDate"
//                       value={fromDate}
//                       onChange={handleInputChange}
//                     />
//                     {errors.fromDate && <p className="error-text">{errors.fromDate}</p>}
//                   </div>
//                   <div className="col-md-6">
//                     <label className="form-label">
//                       Till date<span className="required">*</span>
//                     </label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       name="tillDate"
//                       value={tillDate}
//                       onChange={handleInputChange}
//                     />
//                     {errors.toDate && <p className="error-text">{errors.toDate}</p>}
//                   </div>
//                   <div className="col-md-6">
//                     <label className="form-label">
//                       Start time<span className="required">*</span>
//                     </label>
//                     <input
//                       type="time"
//                       className="form-control"
//                       name="startTime"
//                       value={startTime}
//                       onChange={handleInputChange}
//                     />
//                     {errors.startTime && <p className="error-text">{errors.startTime}</p>}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="available-service-btn">
//               <button type="submit" disabled={disable}>
//                 {disable ? "Sending Request..." : "Send Booking Request"}
//               </button>
//             </div>
//           </form>
//         </div>
//         {showSuccessModal && (
//           <div className="custom-modal-backdrop">
//             <div className="custom-modal">
//               <h4>Request Created </h4>
//               <p>
//                 Your transportation service request has been generated, we will notify you with the
//                 driver’s offers, you can then select the best offer.
//               </p>
//               <button
//                 className="btn btn-primary"
//                 onClick={() => {
//                   setShowSuccessModal(false);
//                   navigate("/dashboard");
//                 }}
//               >
//                 OK
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default TransportationBookYourService;
