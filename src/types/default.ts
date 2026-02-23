export interface SelectInputData {
  title: string;
  value: string;
}

export type BuyPowerFormScreenType = 'Estate token' | 'Electric DISCO token';

export interface BuyPowerFormScreenData {
  screenType: BuyPowerFormScreenType;
}
