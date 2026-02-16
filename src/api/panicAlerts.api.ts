import baseApi, { GenericApiResponse } from './base.api';
import { PanicAlertType } from './constants/default';

// API STARTS

export const getPanicAlertMetrics = (val: GetPanicAlertMetricsReq) =>
  baseApi.get<GetPanicAlertMetricsRes>('/PanicAlerts/Metrics', val);

export const postPanicAlert = (val: PostPanicAlertData) =>
  baseApi.post('/PanicAlerts', val);

// API ENDS

// TYPES STARTS

interface GetPanicAlertMetricsReq {
  Latitude: number;
  Longitude: number;
}

interface GetPanicAlertMetricsRes extends GenericApiResponse {
  data: {
    hasEmergencyContact: boolean;
    isWalletLow: boolean;
    isWithinEstate: boolean;
    panicAlertFes: number;
  };
}

export interface PostPanicAlertData {
  propertyId: number;
  isWithinEstate: boolean;
  latitude: string;
  longitude: string;
  type: PanicAlertType;
}

// TYPES ENDS
