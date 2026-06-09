import React from "react";
import styles from "./text-field.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: any;
}

const TextField: React.FC<InputProps> = ({
  label,
  error,
  icon = <></>,
  className,
  ...props
}) => {
  return (
    <div className={styles.form_group}>
      {label && (
        <label className={styles.labelname}>
          {label}
        </label>
      )}

      <div className={styles.field_set}>
        <input
          {...props}
          className={styles.input_field}
        />

        <span className={styles.fieldicon}>{icon}</span>
      </div>

      {error && <p className={styles.error_message}>{error}</p>}
    </div>
  );
};

export default TextField;
