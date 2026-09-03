export type FileType = | "pdf" | "xlsx";

export interface IOption {
    label: string;
    value: any;
}

export type AccountType = "SAVING" | "CURRENT";

export type StatusType = "ACTIVE" | "INACTIVE" | "DELETED";

export interface ObjectType {[key: string]: any};

export interface BankAccount {
  bankAccountNo: number;
  ifscCode: string;
  accountHolderName: string;
  accountType: AccountType;
}

export interface IEmployeeStats {
  active: number;
  inactive: number;
  deleted: number;
}

export interface FilterCardItem {
  id: string;
  title: string;
  count: number;
  activeColor?: string;
  textColor?: string;
  icon: React.ReactNode;
  amount?: number | string;
}

export enum PaymentMode {
  BANK_TRANSFER = "BANK_TRANSFER",
  CASH = "CASH"
}

export enum PaymentModeNames {
  BANK_TRANSFER = "Online",
  CASH = "Cash"
}

export enum RoleEnum {
  EMPLOYEE = "EMPLOYEE",
  MANAGER = "MANAGER",
  OWNER = "OWNER",
}

export const RoleNames: any = {
  [RoleEnum.OWNER]: "COO",
  [RoleEnum.MANAGER]: "Manager",
  [RoleEnum.EMPLOYEE]: "Employee",
};

export enum HistoryFieldEnum {
  UserStatus = "userStatus",
}

export interface ExpenseCardItem {
  id: string;
  title: string;
  count: number;
  activeColor?: string;
  textColor?: string;
  trendDetails: {
    type: string;
    difference: number;
    percentage: number;
  } | null;
  amount?: number | string;
}