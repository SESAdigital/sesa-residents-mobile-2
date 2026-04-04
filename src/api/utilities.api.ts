import baseApi, { GenericApiResponse, GenericGetIdNameRes } from './base.api';
import { KYCVerificationType } from './constants/default';

// API STARTS

export const postUtilitiesKYC = (data: PostUtilitiesKYCReq) =>
  baseApi.post<PostUtilitiesKYCRes>('/Utilities/KYC', data);

export const getUtilitiesStates = () =>
  baseApi.get<GenericGetIdNameRes>('/Utilities/States');

export const getUtilitiesCountries = () =>
  baseApi.get<GenericGetIdNameRes>('/Utilities/Countries');

export const getUtilitiesFees = () =>
  baseApi.get<GetUtilitiesFeesRes>('/Utilities/Fees');

// API ENDS

// TYPES STARTS

export interface PostUtilitiesKYCReq {
  idType: KYCVerificationType;
  idNumber: string;
  firstName?: string;
  lastName?: string;
  lga?: string;
  state?: string;
  dateOfBirth?: string;
}

export interface KYCDetails {
  req: PostUtilitiesKYCReq;
  res: PostUtilitiesKYCResData;
}

export interface PostUtilitiesKYCResData {
  kycId?: number;
  idNumber?: string;
  response?: string;
  firstname?: string;
  lastname?: string;
  dateOfBirth?: string;
  state?: string;
  lga?: string;
  email?: string;
  phoneNumber?: string;
  gender?: string;
  address?: string;
  photo?: string;
  verificationType: number;
  verificationTypeText: string;
  provider?: string;
}

interface PostUtilitiesKYCRes extends GenericApiResponse {
  data: PostUtilitiesKYCResData;
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
