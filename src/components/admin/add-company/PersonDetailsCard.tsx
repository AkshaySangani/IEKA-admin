import React from "react";
import ImageUpload from "../../common/image-upload";
import TextField from "../../common/text-field/TextField";
import SelectField from "../../common/select/SelectField";
import { AddCompanyFormData } from ".";
import TextAreaField from "../../common/text-area/TextAreaField";
import { genderOptions } from "../../../constants/constants";

interface PersonDetailsCardProps {
  value: AddCompanyFormData;
  errors: Record<string, string>;
  onChange: (name: keyof AddCompanyFormData, value: any) => void;
}



const PersonDetailsCard: React.FC<PersonDetailsCardProps> = ({
  value,
  errors,
  onChange,
}) => {
  const getOptionLabel: any = (gender: string) => {
    return genderOptions.find(ele => ele?.value === gender)?.label??value?.gender;
  }
  return (
    <div className="content-card p-5">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-400 pb-4 mb-8">
        <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white">
          <i className="fa-solid fa-user-tie"></i>
        </div>

        <h3 className="text-[18px] font-medium text-gray-800">
          Person Details
        </h3>
      </div>

      <div className="space-y-4">
        {/* Profile Image */}
        <div className="grid grid-cols-[200px_1fr] gap-6 items-start">
          <label className="font-medium text-[15px]">
            Person Picture <span className="text-error">*</span>
          </label>

          <div className="max-w-[500px]">
            <ImageUpload
              name={"profileImage"}
              label=""
              value={value.profileImage}
              onChange={(file) => onChange("profileImage", file)}
              error={errors.profileImage}
            />
          </div>
        </div>

        {/* First Name */}
        <div className="grid grid-cols-[200px_1fr] gap-6 items-start">
          <label className="font-medium text-[15px]">
            Person First Name <span className="text-error">*</span>
          </label>

          <div className="max-w-[650px]">
            <TextField
              name={"firstName"}
              placeholder="Enter First Name"
              value={value.firstName}
              error={errors.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
            />
          </div>
        </div>

        {/* Last Name */}
        <div className="grid grid-cols-[200px_1fr] gap-6 items-start">
          <label className="font-medium text-[15px]">
            Person Last Name <span className="text-error">*</span>
          </label>

          <div className="max-w-[650px]">
            <TextField
              name={"lastName"}
              placeholder="Enter Last Name"
              value={value.lastName}
              error={errors.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
            />
          </div>
        </div>

        {/* Email */}
        <div className="grid grid-cols-[200px_1fr] gap-6 items-start">
          <label className="font-medium text-[15px]">
            Person Email <span className="text-error">*</span>
          </label>

          <div className="max-w-[500px]">
            <TextField
              name={"email"}
              placeholder="Enter Email"
              value={value.email}
              error={errors.email}
              onChange={(e) => onChange("email", e.target.value)}
            />
          </div>
        </div>

        {/* Phone */}
        <div className="grid grid-cols-[200px_1fr] gap-6 items-start">
          <label className="font-medium text-[15px]">
            Person Phone No. <span className="text-error">*</span>
          </label>

          <div className="max-w-[250px]">
            <TextField
              name={"phone"}
              placeholder="Enter Phone No."
              value={value.phone}
              error={errors.phone}
              onChange={(e) => onChange("phone", e.target.value)}
            />
          </div>
        </div>

        {/* Gender */}
        <div className="grid grid-cols-[200px_1fr] gap-6 items-start">
          <label className="font-medium text-[15px]">
            Gender <span className="text-error">*</span>
          </label>

          <div className="max-w-[250px]">
            <SelectField
              name="gender"
              options={genderOptions}
              value={value.gender ? [{value: value.gender, label: getOptionLabel(value.gender)}]:""}
              placeholder="Select Gender"
              error={errors.gender}
              onChange={(option) => onChange("gender", option?.value)}
            />
          </div>
        </div>

        {/* Address */}
        <div className="grid grid-cols-[200px_1fr] gap-6 items-start">
          <label className="font-medium text-[15px]">
            Address <span className="text-error">*</span>
          </label>

          <div className="max-w-[650px]">
            <TextAreaField
              name={"address"}
              rows={4}
              value={value.address}
              onChange={(e:any) => onChange("address", e.target.value)}
              error={errors.address}
              placeholder="Enter address"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetailsCard;
