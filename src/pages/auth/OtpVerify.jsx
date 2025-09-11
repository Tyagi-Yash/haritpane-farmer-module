import signupLeft from "../../assets/images/signip-left.png";
import brandLogo from "../../assets/images/brand-logo.png";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "../../components/auth/OTPInput";
import { login } from "../../reduxtoolkit/slices/auth/auth";

function OtpVerify() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [check, setCheck] = useState(false);
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const loader = useSelector((state) => state.authMgmtSlice?.loader) || false;

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
    setDisable(true);
    try {
      const res = await dispatch(login({ phone: phoneNumber.trim() }));
      const status = res?.payload?.status;
      const message = res?.payload?.data?.message;
      const jwtToken = res?.payload?.data?.data?.jwtToken;

      if (status === 200) {
        localStorage.setItem("token", jwtToken);
        localStorage.removeItem("PhoneNumber");
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
              <>
                <p style={{ color: "red", fontSize: "14px" }}>{errors.phoneError}</p>
                <Link
                  to="/signup"
                  style={{
                    backgroundColor: "#eab308",
                    color: "white",
                    padding: "5px",
                    borderRadius: "10px",
                    marginBottom: "10px",
                    textDecoration: "none",
                    fontSize: "14px",
                  }}
                >
                  → SignUp
                </Link>
              </>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <OtpInput length={4} onChange={handleOtpChange} />
                {errors.otpError && (
                  <p style={{ color: "red", fontSize: "14px" }}>{errors.otpError}</p>
                )}
                <p className="text-center mb-4 mt-4">
                  Didn’t receive code?
                  <a>
                    {" "}
                    <button style={{ border: "none", background: "none" }}>
                      <span className="Green">Resend</span>
                    </button>
                  </a>
                </p>
                <p className="text-center mb-4 mt-4">
                  <i className="fa-regular fa-clock" /> 08:59
                </p>
                <button className="Button" disabled={disable}>
                  {loader ? "Verifying..." : "Verify & Continue"}
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
