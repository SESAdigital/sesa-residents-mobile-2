import baseApi, { GenericApiResponse } from './base.api';

// API STARTS

export const patchAdvertView = (id: number) =>
  baseApi.patch<GenericApiResponse>(`/Adverts/${id}/View`);

export const patchAdvertClick = (id: number) =>
  baseApi.patch<GenericApiResponse>(`/Adverts/${id}/Click`);

// API ENDS
