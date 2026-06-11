export type FileType = | "pdf" | "xlsx";

export interface IOption {
    label: string;
    value: any;
}

export type AccountType = "SAVING" | "CURRENT";

export type StatusType = "ACTIVE" | "INACTIVE" | "DELETED";

export interface ObjectType {[key: string]: string};

export interface BankAccount {
  bankAccountNo: number;
  ifscCode: string;
  accountHolderName: string;
  accountType: AccountType;
}