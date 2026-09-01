
import { apiRequest } from "../../services/request";
import { ApiResponse } from "../../types/api.types";
import { HistoryFieldEnum } from "../../types/common-types";
import { config } from "../../utils/config";

export interface HistoryPayload {
    fieldId: string;
    field: HistoryFieldEnum;
    title: string;
}

export const initialHistory: HistoryPayload = {
    field: HistoryFieldEnum.UserStatus,
    fieldId: "",
    title: "" 
}

export const getHistory = ({
    fieldId,
    field
}: HistoryPayload) => {
  return apiRequest.get<ApiResponse>(`${config.BACKEND_API_URL}/api/history?field=${field}&fieldId=${fieldId}`);
};

export const getAssignmentHistory = (userId: string) => {
  return apiRequest.get<ApiResponse>(`${config.BACKEND_API_URL}/api/history/assignments?userId=${userId}`);
};