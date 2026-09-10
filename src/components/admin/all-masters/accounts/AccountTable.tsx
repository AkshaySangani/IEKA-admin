import { ColumnDef, CustomTable } from "../../../common/table";
import {
  accountOptions,
  accountStatusOptions,
  bankAccount,
  statusColor,
  statusEnum,
  statusMessage,
} from "../../../../constants/constants";
import { BankAccountFormData, IBankAccount, initialFormData } from ".";
import { useState } from "react";
import Modal from "../../../common/modal/Modal";
import RadioButton from "../../../common/radio-button";
import { updateBankAccountStatus } from "../../../../apis/all-masters/accounts";
import StatusCell from "../../../common/table-cell/StatusCell";
import TextField from "../../../common/text-field/TextField";
import SelectField from "../../../common/select/SelectField";
import { regex } from "../../../../constants/validation-regex";

interface IAccountListProps {
  bankAccounts: IBankAccount[];
  getBankAccountList: () => void;
}

export default function AccountList({
  bankAccounts,
  getBankAccountList,
}: IAccountListProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const initialState: IBankAccount = {
    _id: "",
    accountNo: 0,
    ifscCode: "",
    accountHolderName: "",
    accountType: "SAVING",
    status: statusEnum.ACTIVE,
    createdAt: "",
    updatedAt: "",
  };
  const [selectedAccount, setSelectedAccount] =
    useState<IBankAccount>(initialState);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [formData, setFormData] =
    useState<BankAccountFormData>(initialFormData);

  const [errors, setErrors] = useState<
    Partial<Record<keyof BankAccountFormData, string>>
  >({});

  // handle open modal for account status change
  const handleOpen = (data: IBankAccount) => {
    setSelectedAccount(data);
    setFormData((prev) => ({
      ...prev,
      accountHolderName: data.accountHolderName,
      accountType: data.accountType,
      bankAccountNo: String(data.accountNo),
      confirmBankAccountNo: String(data.accountNo),
      ifscCode: data.ifscCode,
      status: data.status,
    }));
    setIsOpen(true);
  };

  // handle close modal for account status change
  const handleClose = () => {
    setSelectedAccount(initialState);
    setFormData(initialFormData);
    setIsOpen(false);
  };

  // Define configuration structures with isolated column custom components
  const columns: ColumnDef<any>[] = [
    {
      header: "#",
      className: "",
      render: (_, index) => index + 1,
    },
    {
      header: "Account Type",
      className: "",
      render: (row) => bankAccount[row.accountType],
    },
    {
      header: "Account Name",
      className: "",
      render: (row) => row.accountHolderName,
    },
    {
      header: "Account No.",
      className: "",
      render: (row) => row.accountNo,
    },
    {
      header: "IFC Code",
      className: "",
      render: (row) => row.ifscCode,
    },
    {
      header: "Status",
      className: "",
      render: (row) => {
        return (
          <div className="flex items-center gap-1.5">
            <span className={`font-medium text-sm ${statusColor[row.status]}`}>
              {statusMessage[row.status]}
            </span>
            {/* Info SVG icon asset matching your design layout */}
            <i
              onClick={() => handleOpen(row)}
              className="fa-solid fa-pen-to-square cursor-pointer text-grayText text-lg sm:text-sm"
            ></i>
          </div>
        );
      },
    },
  ];

  // handle change value of fields
  const handleChange = (name: keyof BankAccountFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // validate form fields
  const validateForm = () => {
    const newErrors: Partial<Record<keyof BankAccountFormData, string>> = {};

    if (!formData.accountType) {
      newErrors.accountType = "Account type is required";
    }

    if (!formData.accountHolderName.trim()) {
      newErrors.accountHolderName = "Account holder name is required";
    }

    if (!formData.bankAccountNo.trim()) {
      newErrors.bankAccountNo = "Account number is required";
    } else if (!regex.bankAccount.test(formData.bankAccountNo)) {
      newErrors.bankAccountNo = "Invalid account number";
    }

    if (!formData.confirmBankAccountNo.trim()) {
      newErrors.confirmBankAccountNo = "Confirm account number is required";
    } else if (formData.confirmBankAccountNo !== formData.bankAccountNo) {
      newErrors.confirmBankAccountNo = "Account numbers do not match";
    }

    if (!formData.ifscCode.trim()) {
      newErrors.ifscCode = "IFSC code is required";
    } else if (!regex.ifscCode.test(formData.ifscCode)) {
      newErrors.ifscCode = "Invalid IFSC code";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // handle save for status change
  const handleSave = async () => {
    if (!validateForm()) return;
    setLoading(true);
    const response = await updateBankAccountStatus(
      {
        status: formData.status,
        bankAccountNo: formData.bankAccountNo,
        ifscCode: formData.ifscCode,
        accountHolderName: formData.accountHolderName,
        accountType: formData.accountType,
      },
      selectedAccount?._id,
    );

    if (response.success) {
      setSelectedAccount(initialState);
      setFormData(initialFormData);
      setIsOpen(false);
      getBankAccountList();
    }
    setLoading(false);
  };

  return (
    <>
      <CustomTable columns={columns} data={bankAccounts} />
      <Modal
        isOpen={isOpen}
        title={`${selectedAccount?.accountType} | ${selectedAccount.accountNo}`}
        onClose={handleClose}
        handleOnConfirm={handleSave}
        loading={loading}
      >
        <div className="flex flex-col gap-3">
          <div className="flex justify-center">
            <div className="flex justify-center text-lg font-medium">
              Are u sure want to change change status of this account ?
            </div>
          </div>
          <RadioButton
            label="Account Status"
            name={"accountStatus"}
            value={formData.status}
            options={accountStatusOptions}
            onChange={(value) => handleChange("status", value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <SelectField
              name="accountType"
              label="Account Type"
              required
              placeholder="Select account type"
              value={
                accountOptions.find(
                  (item) => item.value === formData.accountType,
                ) || null
              }
              options={accountOptions}
              error={errors.accountType}
              onChange={(option) =>
                handleChange("accountType", option?.value || "")
              }
            />

            <TextField
              label="Account Holder Name"
              name="accountHolderName"
              value={formData.accountHolderName}
              error={errors.accountHolderName}
              placeholder="Enter account holder name"
              required
              onChange={(e) =>
                handleChange("accountHolderName", e.target.value)
              }
            />

            <TextField
              label="Account Number"
              name="bankAccountNo"
              type="number"
              value={formData.bankAccountNo}
              error={errors.bankAccountNo}
              placeholder="Enter account number"
              required
              onChange={(e) => handleChange("bankAccountNo", e.target.value)}
            />

            <TextField
              label="Confirm Account Number"
              name="confirmBankAccountNo"
              type="number"
              value={formData.confirmBankAccountNo}
              error={errors.confirmBankAccountNo}
              placeholder="Confirm account number"
              required
              onChange={(e) =>
                handleChange("confirmBankAccountNo", e.target.value)
              }
            />

            <TextField
              label="IFSC Code"
              name="ifscCode"
              value={formData.ifscCode}
              error={errors.ifscCode}
              placeholder="Enter IFSC Code"
              required
              onChange={(e) =>
                handleChange("ifscCode", e.target.value.toUpperCase())
              }
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
