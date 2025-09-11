import { useRef, useState } from "react";

function OtpInput({ length = 6, onChange }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, length).split("");
    const newOtp = [...otp];
    pasteData.forEach((char, i) => {
      if (/^[0-9]$/.test(char)) {
        newOtp[i] = char;
      }
    });
    setOtp(newOtp);
    onChange(newOtp.join(""));
    if (inputsRef.current[pasteData.length - 1]) {
      inputsRef.current[pasteData.length - 1].focus();
    }
  };

  return (
    <div className="OTPBox" onPaste={handlePaste}>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          aria-label={`Digit ${index + 1} of ${length}`}
          className="form-controls"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputsRef.current[index] = el)}
        />
      ))}
    </div>
  );
}

export default OtpInput;
