import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "../../reduxtoolkit/slices/auth/auth";
import { toast } from "react-toastify";

function OtpResend({ cooldown = 30, phoneNumber, setErrors, setOtp }) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const otploader = useSelector((state) => state.authMgmtSlice?.otploader) || false;
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const formatTime = (secs) => {
    const minutes = String(Math.floor(secs / 60)).padStart(2, "0");
    const seconds = String(secs % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
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

        setOtp("");
        setIsActive(true);
        setTimeLeft(cooldown);
      } else {
        toast.error(message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <p className="text-center mb-4 mt-4">
        Didn’t receive code?
        <button
          type="button"
          style={{ border: "none", background: "none" }}
          className="Green"
          disabled={isActive}
          onClick={resendOtp}
        >
          {otploader ? "Resending..." : "Resend"}
        </button>
      </p>

      {isActive && (
        <p className="text-center mb-4 mt-4">
          <i className="fa-regular fa-clock" /> {formatTime(timeLeft)}
        </p>
      )}
    </>
  );
}

export default OtpResend;
