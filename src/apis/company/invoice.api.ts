import { apiRequest } from "../../services/request";
import { ApiResponse } from "../../types/api.types";

  export const getInvoices = (
  payload: {
    search: string;
    status: string;
    page: number;
    limit: number;
    year: number;
    month: number;
  }
) => {
  const {page,limit,search,status,year,month} = payload;
  return apiRequest.get<ApiResponse>(
    `/invoices/list?year=${year}&month=${month}&page=${page}&limit=${limit}${search ? `&search=${search}`:""}${status ? `&status=${status}`:""}`
    );
}