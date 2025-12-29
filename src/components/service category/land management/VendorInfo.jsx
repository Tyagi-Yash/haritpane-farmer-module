import userIcon from "../../../assets/images/user-icon.svg";
import locationIcon from "../../../assets/images/location-icon.png";
import mobileIcon from "../../../assets/images/mobile.svg";

const VendorInfo = ({ provider }) => {
  return (
    <div className="option-wrapper">
      <h5 className="normal-heading">Vendor Information</h5>

      <h6>
        <span>
          <img src={userIcon} alt="" />
        </span>
        {provider?.name || "N/A"}
      </h6>

      <h6>
        <span>
          <img src={locationIcon} alt="" />
        </span>
        {provider?.address || "N/A"}
      </h6>

      <h6>
        <span>
          <img src={mobileIcon} alt="" />
        </span>
        {provider?.phone ? `+91 ${provider.phone.slice(0, -6) + "X".repeat(6)}` : "N/A"}
      </h6>
    </div>
  );
};

export default VendorInfo;
