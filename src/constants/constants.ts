import { IOption, ObjectType } from "../types/common-types";
import { MenuItem } from "../types/sidebar-types";

export const storageKeys = {
  authStorage: "authStorage"
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

export const statusMessage: {[key: string]: string} = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  DELETED: "Deleted"
}

export const statusColor: {[key: string]: string} = {
  ACTIVE: "text-success",
  INACTIVE: "text-pending",
  DELETED: "text-danger"
}

export const companyModules: ObjectType = {
  employee: "EMPLOYEE",
  production: "PRODUCTION"
}

export const gender: ObjectType = {
  male: "Male",
  female: "Female",
  other: "Other"
}

export const bankAccount: ObjectType = {
  SAVING: "Saving",
  CURRENT: "Current"
}

export const bankAccountEnum: ObjectType = {
  SAVING: "SAVING",
  CURRENT: "CURRENT"
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
  }
];

export const accountStatusOptions: IOption[] = [
  {
    label: statusMessage.ACTIVE,
    value: "ACTIVE",
  },
  {
    label: statusMessage.INACTIVE,
    value: "INACTIVE",
  }
];