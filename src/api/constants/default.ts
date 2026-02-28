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

export const TransactionEntryTypeData = {
  Credit: 1,
  Debit: 2,
} as const;

export type TransactionEntryType =
  (typeof TransactionEntryTypeData)[keyof typeof TransactionEntryTypeData];

export const TransactionPurposeData = {
  Refund: 1,
  WalletTopUp: 2,
  WalletWithdrawal: 3,
  PlatformSubscription: 4,
  ConvenienceFee: 5,
  TokenPurchase: 6,
  KycFee: 7,
  SMSFee: 8,
  PhysicalAddressVerificationFee: 9,
  MeterAddressVerificationFee: 10,
  LicenseNumberVerificationFee: 11,
} as const;

export type TransactionPurposeType =
  (typeof TransactionPurposeData)[keyof typeof TransactionPurposeData];

export const PanicAlertTypeData = {
  SecurityEmergency: 1,
  MedicalEmergency: 2,
  FireEmergency: 3,
} as const;

export type PanicAlertType =
  (typeof PanicAlertTypeData)[keyof typeof PanicAlertTypeData];

export const ElectricityMeterTypeData = {
  PostPaid: 1,
  PrePaid: 2,
} as const;

export type ElectricityMeterType =
  (typeof ElectricityMeterTypeData)[keyof typeof ElectricityMeterTypeData];

export const EventDetailsTypeData = {
  Celebratory: 1,
  CulturalandEntertainment: 2,
  EducationalandProfessional: 3,
  CommunityandSocialEvents: 4,
  ReligiousandSpiritualEvents: 5,
  BusinessandProductEvents: 6,
  ShortletBookingNormalStay: 7,
  ShortletBookingPartyBooking: 8,
} as const;

export type EventDetailsType =
  (typeof EventDetailsTypeData)[keyof typeof EventDetailsTypeData];

export const AccessEntryTypeData = {
  CheckIn: 1,
  CheckOut: 2,
  Both: 3,
} as const;

export type AccessEntryType =
  (typeof AccessEntryTypeData)[keyof typeof AccessEntryTypeData];

export const RelationshipTypeData = {
  Father: 1,
  Mother: 2,
  Brother: 3,
  Sister: 4,
  Son: 5,
  Daughter: 6,
} as const;

export type RelationshipType =
  (typeof RelationshipTypeData)[keyof typeof RelationshipTypeData];

export const GenderTypeData = {
  Male: 1,
  Female: 2,
} as const;

export type GenderType = (typeof GenderTypeData)[keyof typeof GenderTypeData];
