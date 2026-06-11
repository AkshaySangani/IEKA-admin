import React from "react";
import "./button.css";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string;
  loading?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  name,
  loading = false,
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  leftIcon,
  fullWidth,
  ...props
}) => {

  return (
    <button
      disabled={disabled || loading}
      className={`form_btn ${variant} ${className} ${size} ${fullWidth ? "full" : "auto"}`}
      {...props}
    >
      {/* Shine Effect */}
      <span
        className={"form_btn_after"}
      />

      {loading && (
        <i className="fa-solid fa-spinner animate-spin mr-2"></i>
      )}

      {leftIcon && <span className={name ? "mr-2":""}>{leftIcon}</span>}
      {name}
    </button>
  );
};

export default Button;