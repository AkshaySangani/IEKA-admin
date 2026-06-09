import { useState } from "react";
import Button from "../../common/button/Button";
import TextField from "../../common/text-field/TextField";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordApi } from "../../../apis/auth/auth.api";
import { regex } from "../../../constants/validation-regex";

interface Props {}

const ForgotPasswordForm = ({}: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    emailId: "",
  });

  const [errors, setErrors] = useState({
    emailId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {
      emailId: "",
    };

    if (!formData.emailId.trim()) {
      newErrors.emailId = "Email Id is required";
    } else if (!regex.email.test(formData.emailId)) {
      newErrors.emailId = "Please enter a valid Email Id";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const response = await forgotPasswordApi({
      email: formData.emailId,
    });

    setLoading(false);

    if (response?.success) {
      // Navigate OTP screen
      navigate("/verify-otp", {
        state: {
          emailId: formData.emailId,
          userId: response.data.userId,
        },
      });

      console.log(response);
    }
  };

  return (
    <div id="forgot-password-view" className="form-content-container">
      <h2>Forgot Password</h2>
      <p className="subtitle">Enter your registered email id to receive OTP.</p>

      <form id="forgot-password-form" method="POST" onSubmit={handleSubmit}>
        <TextField
          label="Email Id"
          error={errors.emailId}
          name="emailId"
          value={formData.emailId}
          onChange={handleChange}
          type="text"
          placeholder="Enter your registered email id"
        />
        <Button name="Submit" />
        <div className="login-links">
          <Link to="/login" className="backtologin" id="backtologin">
            <i className="fas fa-arrow-left"></i> Back To Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
