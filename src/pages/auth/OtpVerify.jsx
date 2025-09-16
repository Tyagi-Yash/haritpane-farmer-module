import signupLeft from "../../assets/images/signip-left.png";
import brandLogo from "../../assets/images/brand-logo.png";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "../../components/otpverify/OTPInput";
import { login, sendOtp } from "../../reduxtoolkit/slices/auth/auth";
import OtpResend from "../../components/otpverify/OtpResend";

function OtpVerify() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [check, setCheck] = useState(false);
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const loginloader = useSelector((state) => state.authMgmtSlice?.loader) || false;
  const otploader = useSelector((state) => state.authMgmtSlice?.otploader) || false;

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
    if (!check) {
      newErrors.checkError = "*You must agree to terms and privacy policy";
      valid = false;
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
      toast.error("Please Enter correct OPT");
      return;
    }

    setDisable(true);

    try {
      const res = await dispatch(login({ phone: phoneNumber.trim() }));

      const status = res?.payload?.status;

      const data = res?.payload?.data;
      const message = data.message;
      const jwtToken = data.data.jwtToken;
      const farmerProfile = {
        phone: data.data.phone,
        languageSelector: data.data.languageSelector,
        name: data.data.name,
        profileImage: data.data.profileImage,
      };

      if (status === 200) {
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("farmerProfile", JSON.stringify(farmerProfile));
        localStorage.removeItem("PhoneNumber");

        //remove this after 3rd party otp api implemented
        localStorage.removeItem("otp");

        navigate("/dashboard");
        toast.success(message || "OTP verified sucessfully");
      } else {
        toast.error(message || "Verification failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setDisable(false);
    }
  };

  const validateNumber = () => {
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
    setErrors(newErrors);
    return valid;
  };

  const resendOtp = async (e) => {
    if (!validateNumber()) return;
    try {
      const res = await dispatch(sendOtp({ phone: phoneNumber.trim() }));
      const status = res?.payload?.status;
      const message = res?.payload?.data?.message;

      if (status === 200) {
        //remove this after 3rd party otp api implemented
        localStorage.setItem("otp", res?.payload?.data?.data);

        toast.success(`${message} (Otp: ${res.payload.data.data})` || "OTP sent sucessfully");
        return true;
      } else {
        toast.error(message || "Failed to send OTP");
        return false;
      }
    } catch (error) {
      toast.error("Something went wrong");
      return false;
    }
  };

  return (
    <>
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
                <p style={{ color: "red", fontSize: "14px" }}>{errors.phoneError}</p>
                <Link to="/signup" className="Button">
                  → SignUp Page
                </Link>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <OtpInput length={4} onChange={handleOtpChange} />
                {errors.otpError && (
                  <p style={{ color: "red", fontSize: "14px" }}>{errors.otpError}</p>
                )}

                <OtpResend cooldown={30} onResend={resendOtp} loader={otploader} />

                <button className="Button" disabled={disable}>
                  {loginloader ? "Verifying..." : "Verify & Continue"}
                </button>
                <div className="Checkboxs">
                  <label className="CheckBox" htmlFor="check">
                    <input
                      type="checkbox"
                      id="check"
                      checked={check}
                      onChange={(e) => {
                        setCheck(e.target.checked);
                        setErrors((prev) => ({ ...prev, checkError: "" }));
                      }}
                    />
                    By signing up, you agree to the
                    <span className="Green"> terms of service</span> and
                    <br />
                    <span className="Green"> privacy policy</span>.
                    <span className="checkmark" />
                  </label>
                  {errors.checkError && (
                    <p style={{ color: "red", fontSize: "14px" }}>{errors.checkError}</p>
                  )}
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}

export default OtpVerify;
