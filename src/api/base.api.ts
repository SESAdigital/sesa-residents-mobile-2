import { create } from 'apisauce';

import { authStore } from '@src/stores/auth.store';
import appConfig from '@src/utils/appConfig';
import { appToast } from '@src/utils/appToast';

export const DEFAULT_API_DATA_SIZE: Readonly<number> = 50;

const baseApi = create({
  baseURL: appConfig.APP_BACKEND_BASE_URL,
  paramsSerializer: { indexes: null },
});

// baseApi.addAsyncRequestTransform(async request => {
//   const { loginResponse } = authStore.getState();
//   const userToken = loginResponse?.data?.token;
//   const expireTime = loginResponse?.data?.expiresTime;

//   if (expireTime) {
//     const tokenExpiryDate = new Date(expireTime);
//     const currentDate = new Date();

//     if (currentDate >= tokenExpiryDate) {
//     } else {
//       authStore.getState().logout();
//       setTimeout(() => {
//         appToast.Warning('Session Expired.');
//       }, 1000);
//     }
//   } else {
//     if (userToken) {
//       if (request?.headers)
//         request.headers.Authorization = `Bearer ${userToken}`;
//     }
//   }
// });

// baseApi.addAsyncRequestTransform(async request => {
//   const { loginResponse } = authStore.getState();
//   const userToken = loginResponse?.data?.token;
//   const expireTime = loginResponse?.data?.expiresTime;

//   if (expireTime) {
//     const tokenExpiryDate = new Date(expireTime);
//     const currentDate = new Date();
//     if (currentDate >= tokenExpiryDate) {
//       authStore.getState().logout();
//       setTimeout(() => {
//         appToast.Warning('Session Expired.');
//       }, 1000);

//       return;
//     }
//   }

//   if (userToken && request?.headers) {
//     request.headers.Authorization = `Bearer ${userToken}`;
//   }
// });

let globalAbortController = new AbortController();

baseApi.addAsyncRequestTransform(async request => {
  request.signal = globalAbortController.signal;

  const { loginResponse } = authStore.getState();
  const userToken = loginResponse?.data?.token;
  const expireTime = loginResponse?.data?.expiresTime;

  if (expireTime) {
    const tokenExpiryDate = new Date(expireTime);
    const currentDate = new Date();

    if (currentDate >= tokenExpiryDate) {
      authStore.getState().logout();

      globalAbortController.abort();

      setTimeout(() => {
        globalAbortController = new AbortController();
      }, 500);

      setTimeout(() => {
        appToast.Warning('Session Expired.');
      }, 1000);

      throw new Error('Session Expired');
    }
  }

  if (userToken && request?.headers) {
    request.headers.Authorization = `Bearer ${userToken}`;
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

export interface GenericPaginationReqWithId extends GenericPaginationRequest {
  id?: number;
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

export interface GenericPatchStatusReq {
  status: 'Activate' | 'Deactivate';
  id: number;
}

export interface GenericGetIdNameRes extends GenericApiResponse {
  data: {
    id: number;
    name: string;
  }[];
}
