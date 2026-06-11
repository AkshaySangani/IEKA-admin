import { useEffect, useState } from "react";
import Button from "../../../common/button/Button";
import TopBar from "../../../common/topbar/TopBar";
import AccountList from "./AccountTable";
import Modal from "../../../common/modal/Modal";
import TextField from "../../../common/text-field/TextField";
import SelectField from "../../../common/select/SelectField";
import { accountOptions, bankAccount } from "../../../../constants/constants";
import { regex } from "../../../../constants/validation-regex";
import { addBankAccount, getBankAccounts } from "../../../../apis/all-masters/accounts";
import { AccountType, BankAccount, StatusType } from "../../../../types/common-types";
import PageLoader from "../../../common/loader/PageLoader";

interface BankAccountFormData {
  accountType: AccountType;
  accountHolderName: string;
  bankAccountNo: string;
  confirmBankAccountNo: string;
  ifscCode: string;
}

export interface IBankAccount {
  _id: string;
  accountNo: number;
  ifscCode: string;
  accountHolderName: string;
  accountType: AccountType;
  status: StatusType;
  createdAt: string;
  updatedAt: string;
}

const Accounts = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [accountLoading, setAccountLoading] = useState<boolean>(false);

  const [bankAccounts,setBankAccounts] = useState<IBankAccount[]>([]);

  const initialFormData: BankAccountFormData = {
    accountType: "SAVING",
    accountHolderName: "",
    bankAccountNo: "",
    confirmBankAccountNo: "",
    ifscCode: "",
  };

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] =
    useState<BankAccountFormData>(initialFormData);

  const [errors, setErrors] = useState<
    Partial<Record<keyof BankAccountFormData, string>>
  >({});

  useEffect(() => {
    getBankAccountList()
  },[])

  // get all bank accounts
  const getBankAccountList = async () => {
    setAccountLoading(true);
    const response = await getBankAccounts();
    if(response.success){
      setBankAccounts(response?.data);
      setAccountLoading(false);
    } else {
      setBankAccounts([]);
      setAccountLoading(false);
    }
  }
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

  // handle submit for save account detail
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    const payload: BankAccount = {
      accountType: formData.accountType,
      accountHolderName: formData.accountHolderName,
      bankAccountNo: Number(formData.bankAccountNo),
      ifscCode: formData.ifscCode,
    };

    const response = await addBankAccount(payload);
    if (response.success) {
      setIsOpen(false);
      setFormData(initialFormData);
      getBankAccountList();
    }
  };

  // handle open close account
  const handleOpenClose = () => {
    setIsOpen((prev) => !prev);
    setFormData(initialFormData);
    setErrors({});
  };
  return (
    <>
      <TopBar
        title="All Accounts"
        actionButtons={
          <Button
            name="Add New"
            size="sm"
            className="buttoncommon"
            onClick={handleOpenClose}
            leftIcon={<i className="fa-solid fa-plus"></i>}
          />
        }
        isExcel
      />
      <div className="content-area flex flex-col gap-4">
        <PageLoader loading={accountLoading}/>
        <AccountList bankAccounts={bankAccounts} getBankAccountList={getBankAccountList}/>
      </div>
      <Modal
        isOpen={isOpen}
        title={"Add Bank Account"}
        onClose={handleOpenClose}
        loading={loading}
        handleOnConfirm={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <SelectField
            name="accountType"
            label="Account Type"
            required
            placeholder="Enter account type"
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
            onChange={(e) => handleChange("accountHolderName", e.target.value)}
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
      </Modal>
    </>
  );
};

export default Accounts;
