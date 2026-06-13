import React, { useEffect, useState } from "react";
import ImageUpload from "../../common/image-upload";
import TextField from "../../common/text-field/TextField";
import { AddCompanyFormData } from ".";
import TextAreaField from "../../common/text-area/TextAreaField";
import SelectField from "../../common/select/SelectField";
import { getBankAccounts } from "../../../apis/all-masters/accounts";
import { bankAccount, statusEnum } from "../../../constants/constants";
import { IBankAccount } from "../all-masters/accounts";
import { IOption } from "../../../types/common-types";

export interface PersonDetailsForm {
  profileImage: File | string | null;
  personName: string;
  personEmail: string;
  phone: string;
  gender: string;
  invoiceEmail: string;
  address: string;
}

interface CompanyDetailsCardProps {
  value: AddCompanyFormData;
  errors: Record<string, string>;
  onChange: (name: keyof AddCompanyFormData, value: any) => void;
}

const CompanyDetailsCard: React.FC<CompanyDetailsCardProps> = ({
  value,
  errors,
  onChange,
}) => {
  const [bankAccounts, setBankAccounts] = useState<IOption[]>([]);

  useEffect(() => {
      getBankAccountList()
    },[])
  
    // get all bank accounts
    const getBankAccountList = async () => {
      const response = await getBankAccounts(statusEnum.ACTIVE);
      if(response.success){
        const options = response?.data?.map((ele: IBankAccount) => ({value: ele?._id, label: `${bankAccount[ele.accountType]} | ${ele.accountNo}`}))
        setBankAccounts(options);
      } else {
        setBankAccounts([]);
      }
    }
  return (
    <div className="content-card border p-5">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-400 pb-2 mb-4">
        <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white">
          <i className="fa-solid fa-building"></i>
        </div>

        <h3 className="text-[18px] font-medium text-gray-800">
          Company Information
        </h3>
      </div>

      <div className="space-y-4">
        {/* Profile Image */}
        <div className="grid grid-cols-[200px_1fr] gap-6 items-start">
          <label className="font-medium text-[15px]">
            Company Logo <span className="text-error">*</span>
          </label>

          <div className="max-w-[500px]">
            <ImageUpload
              label=""
              name={"companyLogo"}
              value={value.companyLogo}
              onChange={(file) => onChange("companyLogo", file)}
              error={errors.profileImage}
            />
          </div>
        </div>

        {/* Name */}
        <div className="grid grid-cols-[200px_1fr] gap-6 items-start">
          <label className="font-medium text-[15px]">
            Company Name <span className="text-error">*</span>
          </label>

          <div className="max-w-[650px]">
            <TextField
              name="companyName"
              placeholder="Enter Company Name"
              value={value.companyName}
              error={errors.companyName}
              onChange={(e) => onChange("companyName", e.target.value)}
            />
          </div>
        </div>

        {/* Email */}
        <div className="grid grid-cols-[200px_1fr] gap-6 items-start">
          <label className="font-medium text-[15px]">
            Company Email <span className="text-error">*</span>
          </label>

          <div className="max-w-[500px]">
            <TextField
              name={"companyEmail"}
              placeholder="Enter Company Email"
              value={value.companyEmail}
              error={errors.companyEmail}
              onChange={(e) => onChange("companyEmail", e.target.value)}
            />
          </div>
        </div>

        {/* Phone */}
        <div className="grid grid-cols-[200px_1fr] gap-6 items-start">
          <label className="font-medium text-[15px]">
            Company Phone No. <span className="text-error">*</span>
          </label>

          <div className="max-w-[250px]">
            <TextField
              name={"companyPhone"}
              placeholder="Enter Company Phone No."
              type="number"
              value={value.companyPhone}
              error={errors.companyPhone}
              onChange={(e) => onChange("companyPhone", e.target.value)}
            />
          </div>
        </div>

        {/* Address */}
        <div className="grid grid-cols-[200px_1fr] gap-6 items-start">
          <label className="font-medium text-[15px]">
            Company Address <span className="text-error">*</span>
          </label>

          <div className="max-w-[650px]">
            <TextAreaField
              rows={4}
              name={"companyAddress"}
              value={value.companyAddress}
              onChange={(e) => onChange("companyAddress", e.target.value)}
              error={errors.companyAddress}
              placeholder="Enter company address"
            />
          </div>
        </div>

        {/* GST IN No. */}
        <div className="grid grid-cols-[200px_1fr] gap-6 items-start">
          <label className="font-medium text-[15px]">
            GST IN No.
          </label>

          <div className="max-w-[250px]">
            <TextField
              name={"gstin"}
              placeholder="Enter GST IN No."
              value={value.gstin}
              error={errors.gstin}
              onChange={(e) => onChange("gstin", e.target.value)}
            />
          </div>
        </div>

        {/* Assign Bank Account */}
        <div className="grid grid-cols-[200px_1fr] gap-6 items-start">
          <label className="font-medium text-[15px]">
            Assign Bank Account <span className="text-error">*</span>
          </label>

          <div className="max-w-[250px]">
            <SelectField
              name="assignedBankAccount"
              options={bankAccounts}
              value={bankAccounts.find((ele: IOption) => ele.value === value.assignedBankAccount) || ""}
              placeholder="Select Account"
              error={errors.assignedBankAccount}
              onChange={(option) => onChange("assignedBankAccount", option?.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsCard;
