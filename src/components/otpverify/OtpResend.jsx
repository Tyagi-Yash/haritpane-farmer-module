import { useState, useEffect } from "react";

function OtpResend({ cooldown = 30, onResend, loader }) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Countdown effect
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

  // Handle resend
  const handleResend = async () => {
    const success = await onResend();
    if (success) {
      setIsActive(true);
      setTimeLeft(cooldown);
    }
  };

  const formatTime = (secs) => {
    const minutes = String(Math.floor(secs / 60)).padStart(2, "0");
    const seconds = String(secs % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
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
          onClick={handleResend}
        >
          {loader ? "Resending..." : "Resend"}
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
