import {
  AccessEntryType,
  LoginModeType,
  OnboardingStatusType,
  UserAccountStatusType,
} from './constants/default';
import baseApi, {
  GenericApiResponse,
  GenericPaginatedResponse,
  GenericPaginationRequest,
} from './base.api';

// AUTH API STARTS HERE

export const postPreLogin = (data: PreLoginReq) =>
  baseApi.post<GenericApiResponse>('/Auth/PreLogin', data);

export const postLogin = (data: PostLoginReq) =>
  baseApi.post<PostLoginRes>('/Auth/Login', data);

export const postForgotPassword = (data: PreLoginReq) =>
  baseApi.post<GenericApiResponse>('/Auth/ForgotPassword', data);

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

export const getAccountProfile = () =>
  baseApi.get<GetAccountProfile>('/Account/Profile');

export const getAccessHistory = (val: GenericPaginationRequest) =>
  baseApi.get<GetAccessHistory>('/Account/AccessHistory', val);

export const postChangePassword = (data: PostChangePasswordReq) =>
  baseApi.post<GenericApiResponse>('/Account/ChangePassword', data);

export const patchChangeWalletPin = (data: PatchChangeWalletPinReq) =>
  baseApi.patch<GenericApiResponse>('/Account/ChangeWalletPin', data);

export const getNotificationPreference = () =>
  baseApi.get<GetNotificationPreference>('/Account/NotificationPreference');

export const patchNotificationPreference = (
  data: PatchNotificationPreferenceReq,
) => baseApi.patch<GenericApiResponse>('/Account/NotificationPreference', data);

export const deleteAccount = () =>
  baseApi.delete<GenericApiResponse>('/Account');

export const postLogout = () =>
  baseApi.post<GenericApiResponse>('/Account/Logout');

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
    accountStatus: UserAccountStatusType;
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

interface GetAccountProfile extends GenericApiResponse {
  data: {
    id: number;
    name: string;
    code: string;
    email: string;
    photo: string;
    phoneNumber: string;
    status: UserAccountStatusType;
    statusText: string;
    isTransactionPinSet: true;
    dateOnboarded: string;
  };
}

export interface GetAccessHistoryData {
  timeCreated: string;
  accessEntryDatas: {
    guardName: string;
    residentName: string;
    entryType: AccessEntryType;
    entryTypeDescription: string;
    entryTime: string;
  }[];
}

export interface GetAccessHistory extends GenericApiResponse {
  data: GenericPaginatedResponse<GetAccessHistoryData>;
}

export interface PostChangePasswordReq {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PatchChangeWalletPinReq {
  currentPIN: string;
  newPIN: string;
  confirmPIN: string;
}

export interface GetNotificationPreference extends GenericApiResponse {
  data: {
    id: number;
    timeCreated: string;
    timeUpdated: string;
    residentId: number;
    allowVisitorAccessActivity: boolean;
    allowSiteWorkerAccessActivity: boolean;
    allowOccupantAccessActivity: boolean;
    allowRFIDUsageActivity: boolean;
    allowAccessCardUsageActivity: boolean;
    allowAnnouncementActivity: boolean;
  };
}

export interface PatchNotificationPreferenceReq {
  allowVisitorAccessActivity: boolean;
  allowSiteWorkerAccessActivity: boolean;
  allowOccupantAccessActivity: boolean;
  allowRFIDUsageActivity: boolean;
  allowAccessCardUsageActivity: boolean;
  allowAnnouncementActivity: boolean;
}

// ACCOUNT TYPES ENDS HERE
