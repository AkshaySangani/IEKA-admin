import { IOption } from "../types/common-types";
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

export const companyModules: {[key: string]: string} = {
  employee: "EMPLOYEE",
  production: "PRODUCTION"
}

export const genderOptions: IOption[] = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Other",
    value: "other",
  },
];