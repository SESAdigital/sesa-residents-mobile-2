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

export const RepeatDaysTypeData = {
  MON: 'Mon',
  TUE: 'Tues',
  WED: 'Wed',
  THU: 'Thur',
  FRI: 'Fri',
  SAT: 'Sat',
  SUN: 'Sun',
} as const;

export type RepeatDaysType =
  (typeof RepeatDaysTypeData)[keyof typeof RepeatDaysTypeData];

export const PropertyStatusTypeData = {
  InActive: 0,
  Active: 1,
} as const;

export type PropertyStatusType =
  (typeof PropertyStatusTypeData)[keyof typeof PropertyStatusTypeData];

export const NotificationTypeData = {
  NEW_WALK_IN_VISITOR: 1,
  APPROVE_ACCESS_REQUEST: 2,
  REJECT_ACCESS_REQUEST: 3,
  RE_ASSIGNMENT: 4,
  ANNOUNCEMENT: 5,
  INCIDENT: 6,
  INVOICE_REMINDER: 7,
  INVOICE_REMINDER_TRACKED: 8,
  WALLET_DEBIT: 9,
  WALLET_FUNDED: 10,
  NEW_BILL: 11,
  NEW_COLLECTION: 12,
  BILL_DELETED: 13,
  COLLECTION_DELETED: 14,
  PAYMENT_COMPLETED: 15,
  NEW_ELECTION: 16,
  NEW_POLL: 17,
  PANIC_ALERT_TRIGGERED: 18,
  VISITOR_CHECK_IN: 19,
  SITE_WORKER_CHECK_IN: 20,
  VISITOR_CHECK_OUT: 21,
  SITE_WORKER_CHECK_OUT: 22,
  GROUP_ACCESS_CHECK_IN: 23,
  PANIC_ALERT_RESOLVED: 24,
  GUARD_REASSIGNMENT: 25,
  NEW_PATROL_ALERT: 26,
  TOKEN_PURCHASE: 27,
  DEPENDANT_CHECK_IN: 28,
  DEPENDANT_CHECK_OUT: 29,
  EVENT_APPROVED: 30,
  EVENT_DECLINED: 31,
  SITEWORKER_APPROVED: 32,
  SITEWORKER_DECLINED: 33,
  RESIDENT_APPROVED: 34,
  RESIDENT_DECLINED: 35,
  ACCESS_CARD_ADDED: 36,
  ACCESS_CARD_DELETED: 37,
  ACCESS_CARD_ACTIVATED: 38,
  ACCESS_CARD_DEACTIVATED: 39,
  RFID_ADDED: 40,
  RFID_DELETED: 41,
  RFID_ACTIVATED: 42,
  RFID_DEACTIVATED: 43,
  HOUSEHOLD_ACTIVATED: 44,
  HOUSEHOLD_DEACTIVATED: 45,
  HOUSEHOLD_OCCUPANT_ADDED: 46,
  HOUSEHOLD_OCCUPANT_REMOVED: 47,
  MTAG_CHECK_IN: 48,
  MTAG_CHECK_OUT: 49,
  HOUSEHOLD_STAFF_APPROVED: 50,
  HOUSEHOLD_STAFF_DECLINED: 51,
  HOUSEHOLD_STAFF_CHECK_IN: 52,
  HOUSEHOLD_STAFF_CHECK_OUT: 53,
  APPROVE_STAFF_ACCESS_REQUEST: 54,
  REJECT_STAFF_ACCESS_REQUEST: 55,
  ACCESS_CARD_CHECK_IN: 56,
  ACCESS_CARD_CHECK_OUT: 57,
  CANCEL_INVOICE: 58,
  CANCEL_BILL: 59,
  CANCEL_COLLECTION: 60,
  MARK_BILL_PAID: 61,
  MARK_COLLECTION_PAID: 62,
  OVERDUE_INVOICE_REMINDER: 63,
  Others: 64,
} as const;

export type NotificationType =
  (typeof NotificationTypeData)[keyof typeof NotificationTypeData];

export const AccessNotificationStatusData = {
  Pending: 0,
  Approve: 1,
  Reject: 2,
  Expired: 3,
  Cancelled: 4,
} as const;

export type AccessNotificationStatusType =
  (typeof AccessNotificationStatusData)[keyof typeof AccessNotificationStatusData];

export const AccessCodeStatusData = {
  Pending: 0,
  Used: 1,
  Completed: 2,
  Cancel: 3,
  Expired: 4,
  SignedOut: 5,
} as const;

export type AccessCodeStatusType =
  (typeof AccessCodeStatusData)[keyof typeof AccessCodeStatusData];

export const AccessEntityTypeData = {
  RegisteredVisitor: 1,
  ArtisanVisitor: 2,
  WalkInVisitor: 3,
  EventVisitor: 4,
  EstateStaff: 5,
  SiteWorker: 6,
  Resident: 7,
  SecurityGuard: 8,
  GroupAccess: 9,
  Guest: 10,
} as const;

export type AccessEntityType =
  (typeof AccessEntityTypeData)[keyof typeof AccessEntityTypeData];
