import { apiRequest } from "../../services/request";
import { ApiResponse } from "../../types/api.types";

export const addCompany = (
  payload: FormData
) =>
  apiRequest.post(
    "/companies",
    payload,
    {
      showSuccessToast: true,
    }
  );

  export const getCompanies = (
  payload: {
    search: string;
    status: string;
    page: number;
    limit: number;
  }
) => {
  const {page,limit,search,status} = payload;
  return apiRequest.get<ApiResponse>(
    `/companies/list?page=${page}&limit=${limit}${search ? `&search=${search}`:""}${status ? `&status=${status}`:""}`
    );
}
export const getCompaniesCount = () => {
  return apiRequest.get<ApiResponse>(
    `/companies/count`
    );
}

export const getCompanyById = (companyId: string) => {
  return apiRequest.get<ApiResponse>(
    `/companies/${companyId}`
  )
}

export const updateCompanyDetails = (payload: FormData, companyId: string) => {
  return apiRequest.put(
    `/companies/${companyId}`,
    payload,
    {
      showSuccessToast: true
    }
  )
}

export interface IExpensePayload {
  companyId: string;
  startDate: string;
  endDate: string;
}
export const getCompaniesExpense = (payload: IExpensePayload) => {
  const {companyId, startDate, endDate} = payload;
  return apiRequest.get<ApiResponse>(
    `/companies/dashboard/expense?companyId=${companyId}&startDate=${startDate}&endDate=${endDate}`
    );
}

export interface ICompanyEmployeePayload {
  companyId: string;
  page: number;
  limit: number;
  status: string;
}
export const getCompanyEmployees = ({companyId, page, limit, status}: ICompanyEmployeePayload) => {
  return apiRequest.get<ApiResponse>(
    `/companies/dashboard/employee?companyId=${companyId}&page=${page}&limit=${limit}&status=${status}`
    );
}

export const getCompanyWorkforce = (companyId: string) => {
  return apiRequest.get<ApiResponse>(
    `/companies/dashboard/workforce?companyId=${companyId}`
    );
}

export const getCompanyBranchDepartments = (companyId: string) => {
  return apiRequest.get<ApiResponse>(
    `/companies/dashboard/branch-shift-department?companyId=${companyId}`
    );
}