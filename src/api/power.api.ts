import baseApi, { GenericApiResponse } from './base.api';
import { ElectricityMeterType } from './constants/default';

// POWER API STARTS HERE

export const getPowerMetrics = () =>
  baseApi.get<GetPowerMetricsRes>('/Power/Metrics');

export const getPowerDicsoBillers = () =>
  baseApi.get<GetPowerDicsoBillersRes>('/Power/Dicso/Billers');

export const verifyPowerDisco = (val: VerifyPowerDiscoReq) =>
  baseApi.get<VerifyPowerDiscoRes>('/Power/Disco/Verify', val);

export const verifyPowerEstate = (val: VerifyPowerEstateReq) =>
  baseApi.get<VerifyPowerDiscoRes>('/Power/Estate/Verify', val);

export const postPurchaseDiscoPower = (val: PostPurchaseDiscoPowerReq) =>
  baseApi.post<GenericApiResponse>('/Power/Disco/Purchase', val);

export const postPurchaseEstatePower = (val: PostPurchaseEstatePowerReq) =>
  baseApi.post<GenericApiResponse>('/Power/Estate/Purchase', val);

// POWER API ENDS HERE

// POWER TYPES STARTS HERE

interface GetPowerMetricsRes extends GenericApiResponse {
  data: {
    numberTokensPurchased: number;
    tokensPurchasedAmount: number;
    totalConvenienceFee: number;
  };
}

interface GetPowerDicsoBillersRes extends GenericApiResponse {
  data: {
    id: number;
    name: string;
    productId: number;
    currency: string;
    serviceType: string;
  }[];
}

export interface VerifyPowerDiscoResData {
  customerName: string;
  meterNumber: string;
  propertyAddress: string;
  convenienceFee: number;
  quantity: number;
  amount: number;
  totalAmountToPay: number;
}

interface VerifyPowerDiscoRes extends GenericApiResponse {
  data: VerifyPowerDiscoResData;
}

export interface VerifyPowerDiscoReq {
  Amount: number | string;
  PropertyId: number;
  MeterNumber: string;
  ItemId: number;
}

export interface VerifyPowerEstateReq {
  Amount: number | string;
  PropertyId: number;
  MeterNumber: string;
  MeterType: ElectricityMeterType;
}

interface PostPurchaseDiscoPowerReq {
  transactionPin: string;
  meterNumber: string;
  itemId: number;
  amount: number;
}

interface PostPurchaseEstatePowerReq {
  transactionPin: string;
  meterNumber: string;
  amount: number;
  meterType: ElectricityMeterType;
}

//  TYPES ENDS HERE
