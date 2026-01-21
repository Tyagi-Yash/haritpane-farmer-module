import signupLeft from "../../assets/images/signip-left.png";
import brandLogo from "../../assets/images/brand-logo.png";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "../../components/otpverify/OTPInput";
import { login } from "../../reduxtoolkit/slices/auth/auth";
import OtpResend from "../../components/otpverify/OtpResend";
import { requestNotificationPermission } from "../../utils/notification";

function OtpVerify() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const loginloader = useSelector((state) => state.authMgmtSlice?.loader) || false;

  const phoneNumber = localStorage.getItem("PhoneNumber") || "";

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
    setErrors((prev) => ({ ...prev, otpError: "" }));
  };

  const validate = () => {
    let newErrors = {};
    let valid = true;

    if (!phoneNumber.trim()) {
      newErrors.phoneError = "*Phone number is required.Please enter Phone Number on SignUp Page";
      valid = false;
      setErrors(newErrors);
      return valid;
    } else if (!/^[0-9]{10}$/.test(phoneNumber.trim())) {
      newErrors.phoneError =
        "*Phone number must be a 10-digit number.Please enter a valid Phone Number on SignUp Page";
      valid = false;
      setErrors(newErrors);
      return valid;
    }

    if (!otp.trim()) {
      newErrors.otpError = "*OTP is required";
      valid = false;
    } else if (!/^[0-9]{4}$/.test(otp.trim())) {
      newErrors.otpError = "*Enter a valid 4-digit OTP";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    //remove this after 3rd party otp api implemented
    if (otp != localStorage.getItem("otp")) {
      toast.error("Please Enter correct OTP");
      return;
    }

    setDisable(true);
    try {
      const deviceToken = await requestNotificationPermission();

      const res = await dispatch(
        login({
          phone: phoneNumber.trim(),
          deviceToken,
          deviceType: "web",
        }),
      );
      const status = res?.payload?.status;
      const { message, data: userData } = res?.payload?.data || {};

      const jwtToken = userData?.jwtToken || "";
      const farmerProfile = {
        name: userData?.name ?? "",
        profileImage: userData?.profileImage ?? "",
        languageSelector: userData?.languageSelector ?? "",
      };

      if (status === 200) {
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("farmerProfile", JSON.stringify(farmerProfile));

        localStorage.removeItem("PhoneNumber");

        //remove this after 3rd party otp api implemented
        localStorage.removeItem("otp");

        farmerProfile.languageSelector ? navigate("/dashboard") : navigate("/language");
        toast.success(message || "OTP verified sucessfully");
      } else {
        toast.error(message || "Invalid OTP");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setDisable(false);
    }
  };

  return (
    <div className="signup">
      <div className="signup-container row m-0">
        <section className="signup-left col-7 my-0">
          <img src={signupLeft} alt="" />
        </section>
        <section className="signup-right col-5">
          <div className="brand-logo">
            <figure>
              <img src={brandLogo} alt="" />
            </figure>
          </div>
          <h3>Phone number verification</h3>
          <h4 className="sub-heading">
            Enter the verification code {phoneNumber ? `we send you on: ${phoneNumber}` : ""}
          </h4>
          {errors.phoneError && (
            <div>
              <p className="error-text">{errors.phoneError}</p>
              <Link to="/signup" className="Button">
                → SignUp Page
              </Link>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <OtpInput length={4} value={otp} onChange={handleOtpChange} />

              {errors.otpError && <p className="error-text">{errors.otpError}</p>}

              <OtpResend
                cooldown={30}
                phoneNumber={phoneNumber}
                setErrors={setErrors}
                setOtp={setOtp}
              />

              <button className="Button" disabled={disable}>
                {loginloader ? "Verifying..." : "Verify & Continue"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default OtpVerify;
