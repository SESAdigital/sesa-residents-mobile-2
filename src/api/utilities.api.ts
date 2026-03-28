import baseApi, { GenericApiResponse, GenericGetIdNameRes } from './base.api';
import { KYCVerificationType } from './constants/default';

// API STARTS

export const postUtilitiesKYC = (data: PostUtilitiesKYCReq) =>
  baseApi.post('/Utilities/KYC', data);

export const getUtilitiesStates = () =>
  baseApi.get<GenericGetIdNameRes>('/Utilities/States');

export const getUtilitiesCountries = () =>
  baseApi.get<GenericGetIdNameRes>('/Utilities/Countries');

export const getUtilitiesFees = () =>
  baseApi.get<GetUtilitiesFeesRes>('/Utilities/Fees');

// API ENDS

// TYPES STARTS

interface PostUtilitiesKYCReq {
  idType: KYCVerificationType;
  idNumber: string;
  firstName: string;
  lastName: string;
  lga: string;
  state: string;
  dateOfBirth: '2026-03-28';
}

interface GetUtilitiesFeesRes extends GenericApiResponse {
  data: {
    smsFee: number;
    kycFee: number;
    withdrawalFee: number;
    accessCodeFee: number;
  };
}

// TYPES ENDS
