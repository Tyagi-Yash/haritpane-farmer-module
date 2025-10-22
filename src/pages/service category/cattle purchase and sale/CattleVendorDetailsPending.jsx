// import React from "react";
// import TopbarModal from "../../../components/common components/TopbarModal";
// import { useLocation } from "react-router-dom";

// function CattleVendorDetailsPending() {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const filters = Object.fromEntries(queryParams.entries());

//   return (
//     <div className="WrapperArea">
//       <div className="WrapperBox">
//         <div className="topbar">
//           <TopbarModal
//             titleBox={true}
//             title="Vendor Details"
//             navigate={`/cattle-purchase-sale/available-services?${new URLSearchParams(
//               filters
//             ).toString()}`}
//           />
//           <div className="right-section">
//             <div className="search-box">
//               <input className="form-control" type="text" placeholder="Search Services..." />
//               <i className="fas fa-search search-icon" />
//             </div>
//             <i className="far fa-bell bell-icon" />
//             <div className="profile">
//               <img src="assets/images/profile.png" alt="Profile" />
//               <span className="username">Ramesh</span>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default CattleVendorDetailsPending;

import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TopbarModal from "../../../components/common components/TopbarModal";

function CattleVendorDetailsPending() {
  const { id } = useParams();
  const navigate = useNavigate();

  const services = useSelector((state) => state.services.CattleServiceMgmtSlice.services);
  const filters = useSelector((state) => state.services.CattleServiceMgmtSlice.filters);

  const vendor = services.find((v) => v._id === id);

  const handleBack = () => {
    if (filters) {
      navigate(
        `/auger-service/auger-change-availablity?${new URLSearchParams(filters).toString()}`
      );
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title="Vendor Details"
          navigate={`/cattle-purchase-sale/available-services?${new URLSearchParams(
            filters
          ).toString()}`}
        />
        <div className="dashboard">
          {!vendor ? (
            <p style={{ color: "gray", marginTop: "10px" }}>
              No vendor data available. Please go back and select a vendor again.
            </p>
          ) : (
            <>
              <figure className="status-image-tag">
                <img src={vendor.augerImg} alt="Service" />
                <div className="status-tag-pending">Pending</div>
              </figure>

              <div className="option-wrapper">
                <h5 className="normal-heading">Vendor Information</h5>
                <h6>
                  <img src="assets/images/user-icon.svg" alt="" /> {vendor.vendorName || "N/A"}
                </h6>
                <h6>
                  <img src="assets/images/location-icon.png" alt="" /> {vendor.location || "N/A"}
                </h6>
                <h6>
                  <img src="assets/images/mobile.svg" alt="" /> {vendor.phone || "N/A"}
                </h6>
              </div>

              <div className="option-wrapper booking-area">
                <h5 className="normal-heading">Booking Details</h5>
                <p>Service Name: {vendor.equipmentDescription}</p>
                <p>Rating: {vendor.rating}</p>
                <p>Total Price: ₹ {Number(vendor.payableAmount).toFixed(2)}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CattleVendorDetailsPending;
