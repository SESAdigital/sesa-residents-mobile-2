import { create } from 'apisauce';

import { authStore } from '@src/stores/auth.store';
import appConfig from '@src/utils/appConfig';
import { appToast } from '@src/utils/appToast';

export const DEFAULT_API_DATA_SIZE: Readonly<number> = 50;

const baseApi = create({
  baseURL: appConfig.APP_BACKEND_BASE_URL,
  paramsSerializer: { indexes: null },
});

baseApi.addAsyncRequestTransform(async request => {
  const { loginResponse } = authStore.getState();
  const userToken = loginResponse?.data?.token;
  // console.log(userToken);
  if (userToken) {
    if (request.headers)
      request.headers['authorization'] = `Bearer ${userToken}`;
  }
});

baseApi.addAsyncResponseTransform(async response => {
  const { logout } = authStore.getState();

  if (response?.status === 401) {
    logout();
    setTimeout(() => {
      appToast.Warning(response?.data?.message ?? 'Session Expired.');
    }, 1000);
  }
  if (response?.status === 403) {
    logout();
    setTimeout(() => {
      appToast.Warning(response?.data?.message ?? 'Not allowed.');
    }, 1000);
  }
});

export default baseApi;

export interface GenericApiResponse {
  status: boolean;
  message: string;
  errors?: string[];
  traceId?: string;
}

export interface GenericPaginationRequest {
  PageNumber: number;
  PageSize: number;
  SearchText?: string;
}

export interface GenericPaginationRequestWithId
  extends GenericPaginationRequest {
  id?: string;
}
export interface GenericPaginatedResponse<T> {
  records: T[];
  currentPage: number;
  currentRecordCount: number;
  totalRecordCount: number;
  totalPages: number;
}
export interface GenericTypeWithId<T> {
  value: T;
  id: number;
}
