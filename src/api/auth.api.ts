import baseApi, { GenericApiResponse } from '.';
import { LoginModeType, OnboardingStatusType } from './constants/default';

// API STARTS HERE

export const postPreLogin = (data: PreLoginReq) =>
  baseApi.post<GenericApiResponse>('/Auth/PreLogin', data);

// API ENDS HERE

// TYPES STARTS HERE

export interface PreLoginReq {
  loginMode: LoginModeType;
  email?: string;
  phoneNumber?: string;
}

export interface PostLoginReq extends PreLoginReq {
  password: string;
  latitude: string;
  longitude: string;
  deviceId: string;
  pushNotificationToken: string;
}

export interface LoginRes extends GenericApiResponse {
  data: {
    firstName: string;
    lastName: string;
    email: string;
    isEmailVerified: boolean;
    token: string;
    expires: number;
    expiresTime: string;
    userType: number;
    userTypeText: string;
    accountStatus: number;
    accountStatusText: string;
    privileges: string[];
    estateName: string;
    securityCompanyName: string;
    estateAddress: string;
    photo: string;
    isNewDevice: boolean;
    isPinSet: boolean;
    isDeletedTemporary: boolean;
    onboardingStatus: OnboardingStatusType;
  };
}

// TYPES ENDS HERE
