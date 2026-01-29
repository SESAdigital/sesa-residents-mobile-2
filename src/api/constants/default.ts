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
