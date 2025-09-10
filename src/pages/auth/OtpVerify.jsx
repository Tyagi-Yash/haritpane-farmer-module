import React from "react";
import signupLeft from "../../assets/images/signip-left.png";
import brandLogo from "../../assets/images/brand-logo.png";
import { Link } from "react-router-dom";

function OtpVerify() {
  return (
    <>
      <div className="signup">
        <div className="signup-container row m-0">
          <section className="signup-left col-7 my-0">
            {/* <figure> */}
            <img src={signupLeft} alt="" />
            {/* </figure> */}
          </section>
          <section className="signup-right col-5">
            <div className="brand-logo">
              <figure>
                <img src={brandLogo} alt="" />
              </figure>
            </div>
            <h3>Phone number verification</h3>
            <h4 className="sub-heading">Enter the verification code we send you on: +91 701 714 8769</h4>
            <form>
              <div className="form-group">
                <div className="OTPBox">
                  <input type="text" className="form-controls" maxLength={1} />
                  <input type="text" className="form-controls" maxLength={1} />
                  <input type="text" className="form-controls" maxLength={1} />
                  <input type="text" className="form-controls" maxLength={1} />
                </div>
                <p className="text-center mb-4 mt-4">
                  Didn’t receive code?
                  <a>
                    {" "}
                    <span className="Green">Resend</span>
                  </a>
                </p>
                <p className="text-center mb-4 mt-4">
                  <i className="fa-regular fa-clock" /> 08:59
                </p>
                <Link className="Button" to="/dashboard">
                  Verify &amp; Continue <i className="" />
                </Link>
                <div className="Checkboxs">
                  <label className="CheckBox">
                    By signing up, you agree to the
                    <span className="Green"> terms of service</span> and <br />
                    <span className="Green"> privacy policy</span>.
                    <input type="checkbox" />
                    <span className="checkmark" />
                  </label>
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
