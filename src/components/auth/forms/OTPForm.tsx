import { useEffect, useState } from "react";
import Button from "../../common/button/Button";
import OTPInputField from "../../common/otp-field/OtpField";
import { forgotPasswordApi, verifyOtp } from "../../../apis/auth/auth.api";
import { Link, useNavigate } from "react-router-dom";
import { maskEmail } from "../../../utils/helper";

const OTP_LENGTH = 4;

const OTPForm = () => {
    const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(
    Array(OTP_LENGTH).fill("")
  );

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const validateForm = () => {
    const otpValue = otp.join("");

    if (
      !otpValue ||
      otpValue.length !== OTP_LENGTH
    ) {
      setError(
        `Please enter ${OTP_LENGTH} digit OTP`
      );
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const response = await verifyOtp({
      otp: otp.join(""),
    });

    setLoading(false);

    if (response?.success) {
      navigate("/reset-password", {
        state: {
          email: "formData.emailId",
        },
      });
    }
  };

  const handleResendOTP = async (
    e: React.MouseEvent
  ) => {
    e.preventDefault();

    if (seconds > 0) return;

    const response = await forgotPasswordApi({
      email: "formData.emailId",
    });

    if (response?.success) {
      setOtp(
        Array(OTP_LENGTH).fill("")
      );
      setError("");
      setSeconds(60);
    }
  };

  return (
    <div
      id="otp-view"
      className="form-content-container"
    >
      <h2>OTP Verification</h2>

      <p className="subtitle">
        Please enter received OTP here
        for login
      </p>

      <div className="otp-info-box mobile">
        <i className="fas fa-mobile-alt"></i>
        OTP has been sent to the
        registered email id. 
        {maskEmail("hirenbhuva@gmail.com")}
      </div>

      <form
        id="otp-form"
        onSubmit={handleSubmit}
      >
        <OTPInputField
          length={OTP_LENGTH}
          value={otp}
          onChange={(value) => {
            setOtp(value);

            if (error) {
              setError("");
            }
          }}
        />

        {error && (
          <div className="field-error">
            {error}
          </div>
        )}

        <div className="otp-timer-resend">
          <span id="countdown">
            {seconds > 0
              ? `${seconds} Seconds`
              : "Expired"}
          </span>

          <a
            href="#"
            id="resend-otp-link"
            onClick={handleResendOTP}
            style={{
              pointerEvents:
                seconds > 0
                  ? "none"
                  : "auto",
              opacity:
                seconds > 0
                  ? 0.5
                  : 1,
            }}
          >
            Resend OTP
          </a>
        </div>

        <Button
          type="submit"
          name={
            loading
              ? "Verifying..."
              : "Verify OTP"
          }
          disabled={loading}
        />
      </form>

      <div className="login-links">
        <Link
          to="/login"
          className="backtologin"
          state={{
            email: ""
          }}
        >
          <i className="fas fa-arrow-left"></i>
          Back
        </Link>
      </div>
    </div>
  );
};

export default OTPForm;