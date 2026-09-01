import { apiRequest } from "../../services/request";
import { ApiResponse } from "../../types/api.types";
import { PaymentMode } from "../../types/common-types";

export const getAllPayments = (payload: {
  search: string;
  status: string;
  page: number;
  limit: number;
  year: number;
  month: number;
}) => {
  const { page, limit, search, status, year, month } = payload;
  return apiRequest.get<ApiResponse>(
    `/payments/list?year=${year}&month=${month}&page=${page}&limit=${limit}${search ? `&search=${search}` : ""}${status ? `&status=${status}` : ""}`,
  );
};

export interface PaymentPayload {
  paymentMode: PaymentMode;
  amount: number;
  transactionId: string;
  remarks: string;
}
export const updatePaymentStatus = (payload: PaymentPayload, invoiceId: string) => {
  return apiRequest.post(
    `/payments/add/${invoiceId}`,
    payload,
    {
      showSuccessToast: true
    }
  )
}