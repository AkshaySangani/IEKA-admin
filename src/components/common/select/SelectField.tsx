import Select, {
    MultiValue,
  SingleValue,
} from "react-select";
import "./Select.css";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps {
  label?: string;
  value: any;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  isDisabled?: boolean;
  isMulti?: boolean;
  required?: boolean;
  onChange: (value: any) => void;
}

const SelectField = ({
  label,
  value,
  name,
  options,
  placeholder = "Select an option",
  error,
  isDisabled,
  isMulti,
  required,
  onChange,
}: SelectFieldProps) => {

  return (
    <div className="" id={`field-${name}`}>
      {label && (
        <div className="text-sm text-inputLabel font-medium mb-2">
          {label} {required && <span className="text-error">*</span>}
        </div>
      )}

      <Select
        classNamePrefix="custom-select"
        options={options}
        value={value}
        placeholder={placeholder}
        isSearchable
        isClearable
        isDisabled={isDisabled}
        isMulti={isMulti}
        onChange={(
          option: SingleValue<SelectOption> | MultiValue<SelectOption>
        ) =>
          onChange(
            option || ""
          )
        }
      />

      {error && (
        <div className="text-error text-xs">
          {error}
        </div>
      )}
    </div>
  );
};

export default SelectField;