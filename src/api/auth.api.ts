import baseApi, { GenericApiResponse } from './index';
import { LoginModeType, OnboardingStatusType } from './constants/default';

// AUTH API STARTS HERE

export const postPreLogin = (data: PreLoginReq) =>
  baseApi.post<GenericApiResponse>('/Auth/PreLogin', data);

export const postLogin = (data: PostLoginReq) =>
  baseApi.post<PostLoginRes>('/Auth/Login', data);

export const postForgotPassword = (data: PreLoginReq) =>
  baseApi.post<PostLoginRes>('/Auth/ForgotPassword', data);

export const patchSetupPassword = (data: PatchSetupPasswordReq) =>
  baseApi.patch<PostLoginRes>('/Auth/SetupPassword', data);

// AUTH API ENDS HERE

// ACCOUNT API STARTS HERE

export const patchSetupPin = (data: PatchSetupPin) =>
  baseApi.patch<GenericApiResponse>('/Account/SetupPin', data);

export const postResendNewDeviceEmail = () =>
  baseApi.post<GenericApiResponse>('/Account/ResendNewDeviceEmail', {});

export const patchValidateNewDeviceCode = (
  data: PatchValidateNewDeviceCodeReq,
) => baseApi.patch<GenericApiResponse>('/Account/ValidateNewDeviceCode', data);

// ACCOUNT API ENDS HERE

// AUTH TYPES STARTS HERE

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

export interface PostLoginRes extends GenericApiResponse {
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

export interface PatchSetupPasswordReq {
  loginMode: LoginModeType;
  email?: string;
  phoneNumber?: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  deviceId: string;
  latitude: string;
  longitude: string;
  pushNotificationToken: string;
}

// AUTH TYPES ENDS HERE

// ACCOUNT TYPES STARTS HERE

interface PatchSetupPin {
  newPin: string;
  confirmPin: string;
}

interface PatchValidateNewDeviceCodeReq {
  code: string;
  deviceId: string;
  pushNotificationToken: string;
}

export interface PostChangePasswordReq {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// ACCOUNT TYPES ENDS HERE
