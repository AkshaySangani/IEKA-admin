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
  onChange,
}: SelectFieldProps) => {

  return (
    <div className="form-group w-full">
      {label && (
        <div className="label font-medium">
          {label}
        </div>
      )}

      <Select
        classNamePrefix="custom-select"
        options={options}
        value={value}
        placeholder={placeholder}
        name={name}
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
        <div className="error-text">
          {error}
        </div>
      )}
    </div>
  );
};

export default SelectField;