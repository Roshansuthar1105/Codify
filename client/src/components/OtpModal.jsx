import React, { useRef } from "react";

const OtpModal = ({
  isDark,
  show,
  otp,
  setOtp,
  otpLength = 6,
  verifyOtp,
  resending,
  handleResendOtp, //Move resend,verify logic to parent
}) => {
  const otpRefs = useRef([]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otpLength - 1) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < otpLength - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, otpLength);
    const chars = pasted.split("");
    const newOtp = [...otp];
    chars.forEach((char, idx) => {
      if (!isNaN(char)) newOtp[idx] = char;
    });
    setOtp(newOtp);

    // ✅ Focus last filled input
    const lastIndex = chars.length - 1;
    if (lastIndex >= 0 && lastIndex < otpLength) {
      otpRefs.current[lastIndex]?.focus();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`rounded-xl p-6 w-96 shadow-xl text-center transition-all ${
          isDark
            ? "bg-dark-bg-secondary text-dark-text-primary border border-dark-border"
            : "bg-light-bg-secondary text-light-text-primary border border-light-border"
        }`}
      >
        <h3 className="text-2xl font-righteous mb-6 text-primary">Enter OTP</h3>

        {/* OTP Inputs */}
        <div className="flex justify-between mb-6">
          {Array.from({ length: otpLength }).map((_, index) => (
            <input
              key={index}
              ref={(el) => (otpRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={otp[index] || ""}
              onChange={(e) => handleOtpChange(e, index)}
              onKeyDown={(e) => handleOtpKeyDown(e, index)}
              onPaste={index === 0 ? handleOtpPaste : null}
              className={`w-12 h-14 text-center text-xl rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary ${
                isDark
                  ? "bg-dark-bg-tertiary text-dark-text-primary border-dark-border"
                  : "bg-light-bg-tertiary text-light-text-primary border-light-border"
              }`}
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={verifyOtp}
          className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-all duration-300 mb-4"
        >
          Verify OTP
        </button>

        {/* Resend Button */}
        <button
          onClick={handleResendOtp}
          disabled={resending}
          className="text-primary hover:underline font-medium"
        >
          {resending ? "Resending..." : "Resend OTP"}
        </button>
      </div>
    </div>
  );
};

export default OtpModal;
