import { statusEnum } from "../../../constants/constants";
import { apiRequest } from "../../../services/request";
import { ApiResponse } from "../../../types/api.types";
import { BankAccount } from "../../../types/common-types";

export const addBankAccount = (payload: BankAccount) =>
  apiRequest.post("/bank-accounts/add", payload, {
    showSuccessToast: true,
  });

export const updateBankAccountStatus = (
  payload: {
    status: statusEnum;
    bankAccountNo: string;
    ifscCode: string;
    accountHolderName: string;
    accountType: string;
  },
  accountId: string,
) =>
  apiRequest.put(`/bank-accounts/${accountId}`, payload, {
    showSuccessToast: true,
  });

export const getBankAccounts = (status?: string) =>
  apiRequest.get<ApiResponse>(
    `/bank-accounts/list?${status ? `status=${status}` : ""}`,
  );
