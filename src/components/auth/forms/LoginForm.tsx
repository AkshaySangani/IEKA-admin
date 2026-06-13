import { useState } from "react";
import AppStoreButtons from "../AppStoreButtons/AppStoreButtons";
import Button from "../../common/button/Button";
import TextField from "../../common/text-field/TextField";
import { Link } from "react-router-dom";
import { loginApi } from "../../../apis/auth/auth.api";
import { useAuthStore } from "../../../store/auth-store";

interface Props {}

interface LoginFormData {
  userId: string;
  password: string;
}

interface LoginFormErrors {
  userId?: string;
  password?: string;
}

const LoginForm = ({}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const {setToken, setProfile} = useAuthStore();

  const [formData, setFormData] = useState<LoginFormData>({
    userId: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [loading, setLoading] = useState(false);

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
    const newErrors: LoginFormErrors = {};

    if (!formData.userId.trim()) {
      newErrors.userId = "User Id is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const payload = {
      email: formData.userId,
      password: formData.password,
    };

    const response = await loginApi(payload);

    setLoading(false);

    if (!response) return;

    // Handle success response only
    if (response.success) {
      setToken(response?.data?.token)
      setProfile(response?.data);
    }
  };

  return (
    <div className="form-content-container">
      <h2>Login to Your Account</h2>
      <p className="subtitle">
        Signin to create, discover and connect with team.
      </p>

      <form className="flex flex-col gap-3" id="signin-form" method="POST" onSubmit={handleSubmit}>
        <TextField
          label="User Id"
          id="userId"
          name="userId"
          type="text"
          placeholder="Enter your User Id"
          value={formData.userId}
          onChange={handleChange}
          error={errors.userId}
          icon={<span className="fieldicon">
            <i className="fa-solid fa-user"></i>
          </span>}
        />
        <TextField
          label="Password"
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your Password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          icon={
            <span
              className="fieldicon"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <i
                className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
              ></i>
            </span>
          }
        />
        <Button fullWidth variant="primaryGradient" name="Login" loading={loading} type="submit"/>

        <AppStoreButtons />
      </form>

      {/* <div className="login-links">
        <Link
          to="/forgot-password"
          className="forgotpass"
          id="forgot-password-link"
        >
          Forgot password?
        </Link>
      </div> */}
    </div>
  );
};

export default LoginForm;
