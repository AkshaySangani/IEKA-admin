import { useState } from "react";
import Button from "../../common/button/Button";
import TextField from "../../common/text-field/TextField";
import { resetPasswordApi } from "../../../apis/auth/auth.api";

// import { resetPassword } from "../../../services/apis/auth";

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      password: "",
      confirmPassword: "",
    });

  const [errors, setErrors] =
    useState({
      password: "",
      confirmPassword: "",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
      password: "",
      confirmPassword: "",
    };

    if (!formData.password.trim()) {
      newErrors.password =
        "Password is required";
    } else if (
      formData.password.length < 6
    ) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    if (
      !formData.confirmPassword.trim()
    ) {
      newErrors.confirmPassword =
        "Confirm Password is required";
    } else if (
      formData.password !==
      formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return !Object.values(
      newErrors
    ).some(Boolean);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const response =
      await resetPasswordApi({
        email: "formData.emailId",
        password: formData.password,
      });

    setLoading(false);

    if (response?.success) {
      // navigate("/login");

      console.log(
        "Password reset successful"
      );
    }
  };

  return (
    <div
      id="new-password"
      className="form-content-container"
    >
      <h2>Create New Password</h2>

      <p className="subtitle">
        Please enter new password
      </p>

      <form
        id="new-password-form"
        onSubmit={handleSubmit}
      >
        <TextField
          label="New Password"
          id="password"
          name="password"
          type={
            showPassword
              ? "text"
              : "password"
          }
          placeholder="Enter New Password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          icon={
            <span
              className="fieldicon"
              onClick={() =>
                setShowPassword(
                  (prev) => !prev
                )
              }
            >
              <i
                className={`fa-solid ${
                  showPassword
                    ? "fa-eye"
                    : "fa-eye-slash"
                }`}
              ></i>
            </span>
          }
        />

        <TextField
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          type={
            showConfirmPassword
              ? "text"
              : "password"
          }
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={
            errors.confirmPassword
          }
          icon={
            <span
              className="fieldicon"
              onClick={() =>
                setShowConfirmPassword(
                  (prev) => !prev
                )
              }
            >
              <i
                className={`fa-solid ${
                  showConfirmPassword
                    ? "fa-eye"
                    : "fa-eye-slash"
                }`}
              ></i>
            </span>
          }
        />

        <Button
          type="submit"
          name={
            loading
              ? "Submitting..."
              : "Submit"
          }
          loading={loading}
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default ResetPasswordForm;