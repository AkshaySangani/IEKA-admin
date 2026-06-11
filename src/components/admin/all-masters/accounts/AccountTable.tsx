import { ColumnDef, CustomTable } from "../../../common/table";
import {
  accountStatusOptions,
  bankAccount,
  statusColor,
  statusMessage,
} from "../../../../constants/constants";
import { IBankAccount } from ".";
import { useState } from "react";
import Modal from "../../../common/modal/Modal";
import RadioButton from "../../../common/radio-button";
import { updateBankAccountStatus } from "../../../../apis/all-masters/accounts";

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
    status: "ACTIVE",
    createdAt: "",
    updatedAt: "",
  };
  const [selectedAccount, setSelectedAccount] =
    useState<IBankAccount>(initialState);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // handle open modal for account status change
  const handleOpen = (data: IBankAccount) => {
    console.log("data",data)
    setSelectedAccount(data);
    setIsOpen(true);
  };

  // handle close modal for account status change
  const handleClose = () => {
    setSelectedAccount(initialState);
    setIsOpen(false);
  };

  // Define configuration structures with isolated column custom components
  const columns: ColumnDef<any>[] = [
    {
      header: "Sr. No.",
      className: "w-[10%] text-center text-gray-500",
      render: (_, index) => index + 1,
    },
    {
      header: "Account Type",
      className: "w-[20%]",
      render: (row) => bankAccount[row.accountType],
    },
    {
      header: "Account Name",
      className: "w-[25%]",
      render: (row) => row.accountHolderName,
    },
    {
      header: "Account No.",
      className: "w-[20%]",
      render: (row) => row.accountNo,
    },
    {
      header: "IFC Code",
      className: "w-[12%]",
      render: (row) => row.ifscCode,
    },
    {
      header: "Status",
      className: "w-[12%]",
      render: (row) => {
        return (
          <div className="flex items-center gap-1.5">
            {/* Info SVG icon asset matching your design layout */}
            <i
              onClick={() => handleOpen(row)}
              className="fa-solid fa-pen-to-square cursor-pointer text-gray-400 hover:text-gray-500"
            ></i>

            <span
              className={`font-semibold text-sm ${statusColor[row.status]}`}
            >
              {statusMessage[row.status]}
            </span>
          </div>
        );
      },
    },
  ];

  // handle status change
  const handleStatusChange = (value: any) => {
    setSelectedAccount((prev) => ({ ...prev, status: value }));
  };

  // handle save for status change
  const handleSave = async () => {
    setLoading(true);
    const response = await updateBankAccountStatus({
        id: selectedAccount?._id,
        status: selectedAccount.status
    });

    if(response.success){
        setSelectedAccount(initialState);
        setIsOpen(false);
        setLoading(false);
        getBankAccountList();
    }
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
            <div className="flex justify-center text-lg font-semibold">
              Are u sure want to change change status of this account ?
            </div>
          </div>
          <RadioButton
            label="Account Status"
            name={"accountStatus"}
            value={selectedAccount.status}
            options={accountStatusOptions}
            onChange={handleStatusChange}
          />
        </div>
      </Modal>
    </>
  );
}
