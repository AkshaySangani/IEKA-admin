import { IOption, ObjectType } from "../types/common-types";
import { MenuItem } from "../types/sidebar-types";

export const storageKeys = {
  authStorage: "authStorage",
};

export const menuItems: MenuItem[] = [
  {
    key: "all-companies",
    label: "All Companies",
    icon: "fas fa-users",
    path: "/",
  },
  {
    key: "generated-invoice",
    label: "Generated Invoice",
    icon: "fas fa-file",
    path: "/generated-invoice",
  },
  {
    key: "payments",
    label: "All Payments",
    icon: "fa-solid fa-money-bill",
    path: "/all-payments",
  },
  {
    key: "masters",
    label: "All Masters",
    icon: "fas fa-briefcase",
    submenu: [
      {
        key: "accounts",
        label: "Accounts",
        path: "/accounts",
      },
    ],
  },
];

export const statusMessage: { [key: string]: string } = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  DELETED: "Deleted",
  SENDED: "Sended",
  GENERATED: "Generated",
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export const statusColor: { [key: string]: string } = {
  ACTIVE: "text-success",
  INACTIVE: "text-pending",
  DELETED: "text-danger",
  SENDED: "text-success",
  GENERATED: "text-pending",
  PENDING: "text-pending",
  APPROVED: "text-success",
  REJECTED: "text-danger",
};

export const moduleEnum: ObjectType = {
  EMPLOYEE: "EMPLOYEE",
  PRODUCTION: "PRODUCTION"
} 

export const companyModules: ObjectType = {
  employee: moduleEnum.EMPLOYEE,
  production: moduleEnum.PRODUCTION,
};

export const gender: ObjectType = {
  male: "Male",
  female: "Female",
  other: "Other",
};

export const bankAccount: ObjectType = {
  SAVING: "Saving",
  CURRENT: "Current",
};

export const bankAccountEnum: ObjectType = {
  SAVING: "SAVING",
  CURRENT: "CURRENT",
};

export enum statusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DELETED = "DELETED",
  REJECTED = "REJECTED",
  ACCEPTED = "ACCEPTED",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  GENERATED = "GENERATED",
  SENDED = "SENDED",
  RECEIVED = "RECEIVED",
  PAID = "PAID",
}

export const genderOptions: IOption[] = [
  {
    label: gender.male,
    value: "male",
  },
  {
    label: gender.female,
    value: "female",
  },
  {
    label: gender.other,
    value: "other",
  },
];

export const accountOptions: IOption[] = [
  {
    label: bankAccount.SAVING,
    value: bankAccountEnum.SAVING,
  },
  {
    label: bankAccount.CURRENT,
    value: bankAccountEnum.CURRENT,
  },
];

export const accountStatusOptions: IOption[] = [
  {
    label: statusMessage.ACTIVE,
    value: statusEnum.ACTIVE,
  },
  {
    label: statusMessage.INACTIVE,
    value: statusEnum.INACTIVE,
  },
];

export const yesNo: ObjectType = {
  "YES": "Yes",
  "NO": "No"
}
export const yesNoOption: IOption[] = [
  {
    label: "Yes",
    value: "YES",
  },
  {
    label: "No",
    value: "NO",
  },
];

export const statusOptions: IOption[] = [
  {
    label: statusMessage.ACTIVE,
    value: statusEnum.ACTIVE,
  },
  {
    label: statusMessage.INACTIVE,
    value: statusEnum.INACTIVE,
  },
  {
    label: statusMessage.DELETED,
    value: statusEnum.DELETED,
  },
];

export const currency = {
  INR: "₹",
};
