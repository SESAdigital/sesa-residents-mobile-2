export interface SelectInputData {
  title: string;
  value: string;
}

export type BuyPowerFormScreenType = 'Estate token' | 'Electric DISCO token';

export interface BuyPowerFormScreenData {
  screenType: BuyPowerFormScreenType;
}

export const EventLocationTypeData = {
  CURRENT_LOCATION: 'CURRENT_LOCATION',
  ANOTHER_LOCATION: 'ANOTHER_LOCATION',
  NONE: '',
} as const;

export type EventLocationType =
  (typeof EventLocationTypeData)[keyof typeof EventLocationTypeData];

export const GuestLimitTypeData = {
  DAILY_LIMIT: 'DAILY_LIMIT',
  TOTAL_LIMIT: 'TOTAL_LIMIT',
  NONE: '',
} as const;

export type GuestLimitType =
  (typeof GuestLimitTypeData)[keyof typeof GuestLimitTypeData];
