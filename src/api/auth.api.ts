import { GenericApiResponse } from '.';

// API STARTS HERE

// API ENDS HERE

// TYPES STARTS HERE

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
    privileges: any[];
    estateName: string;
    securityCompanyName: string;
    estateAddress: string;
    photo: string;
    isNewDevice: boolean;
    isPinSet: boolean;
    isDeletedTemporary: boolean;
    onboardingStatus: number;
  };
}

// TYPES ENDS HERE
