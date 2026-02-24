import baseApi, { GenericApiResponse } from './base.api';

// API STARTS

export const patchProfilePhoneNumber = (data: PatchProfilePhoneNumberReq) =>
  baseApi.patch<GenericApiResponse>(
    `/Profile/PhoneNumber?PhoneNumber=${data?.PhoneNumber}`,
  );

// API ENDS

// TYPES STARTS

export interface PatchProfilePhoneNumberReq {
  PhoneNumber: string;
}

// TYPES ENDS
