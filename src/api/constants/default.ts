export const LoginModeData = {
  EmailAddress: 1,
  PhoneNumber: 2,
} as const;
export type LoginModeType = (typeof LoginModeData)[keyof typeof LoginModeData];

export const OnboardingStatusData = {
  PreLogin: 1,
  Login: 2,
  PasswordSetup: 3,
  NewDevice: 4,
  PinSetup: 5,
  Completed: 6,
} as const;

export type OnboardingStatusType =
  (typeof OnboardingStatusData)[keyof typeof OnboardingStatusData];

export const UserAccountStatusData = {
  New: 1,
  Active: 2,
  InActive: 3,
  Reset: 4,
  Deleted: 5,
} as const;

export type UserAccountStatusType =
  (typeof UserAccountStatusData)[keyof typeof UserAccountStatusData];

export const PropertyCategoryData = {
  Commercial: 1,
  Residential: 2,
  Shortlet: 3,
} as const;

export type PropertyCategoryType =
  (typeof PropertyCategoryData)[keyof typeof PropertyCategoryData];
