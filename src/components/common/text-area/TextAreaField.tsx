import React from "react";

interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  value: string;

  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;

  rows?: number;
  disabled?: boolean;
  className?: string;
}

const TextAreaField: React.FC<TextAreaProps> = ({
  name,
  value,
  label,
  placeholder,
  required = false,
  error,
  rows = 4,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        {...props}
        className={`
          w-full
          border
          px-3
          py-2
          outline-none
          resize-none
          transition-all
          duration-200
          focus:border-inputFocus
          text-sm
        `}
      />

      {error && (
        <p className="text-error text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextAreaField;