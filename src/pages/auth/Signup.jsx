import signupLeft from "../../assets/images/signip-left.png";
import brandLogo from "../../assets/images/brand-logo.png";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "../../reduxtoolkit/slices/auth/auth";

function Signup() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [check, setCheck] = useState(false);
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const loader = useSelector((state) => state.authMgmtSlice?.loader);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = () => {
    let newErrors = {};
    let valid = true;

    if (!phoneNumber.trim()) {
      newErrors.phoneError = "*Phone number is required";
      valid = false;
    } else if (!/^[0-9]{10}$/.test(phoneNumber.trim())) {
      newErrors.phoneError = "*Enter a valid 10-digit phone number";
      valid = false;
    }

    if (!check) {
      newErrors.checkError = "*You must agree to terms and privacy policy";
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
      const res = await dispatch(sendOtp({ phone: phoneNumber.trim() }));
      const status = res?.payload?.status;
      const message = res?.payload?.data?.message;

      if (status === 200) {
        navigate("/otp-verify");
        toast.success(`${message} (Otp: ${res.payload.data.data})` || "OTP sent sucessfully");
      } else {
        toast.error(message || "Signup failed");
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
          <img src={signupLeft} alt="signup banner" />
        </section>
        <section className="signup-right col-5">
          <div className="brand-logo">
            <figure>
              <img src={brandLogo} alt="brand logo" />
            </figure>
          </div>
          <h2 className="Green">Sign In</h2>
          <h6>Welcome to the Haritpane app</h6>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="phoneNumber">
                Enter Mobile Number <sup>*</sup>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                className="form-control-white"
                placeholder="Enter your mobile number"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setErrors((prev) => ({ ...prev, phoneError: "" }));
                }}
              />
              {errors.phoneError && <p style={{ color: "red" }}>{errors.phoneError}</p>}
            </div>

            <button className="Button" disabled={disable}>
              {loader ? "Submitting..." : "Submit"}
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
              {errors.checkError && <p style={{ color: "red" }}>{errors.checkError}</p>}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
export default Signup;
