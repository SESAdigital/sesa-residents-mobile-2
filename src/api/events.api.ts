import { Asset } from 'react-native-image-picker';

import baseApi, { GenericApiResponse } from './base.api';
import { EventDetailsType } from './constants/default';
import { EventLocationType, GuestLimitType } from '@src/types/default';

// API STARTS

export const postEvent = (data: FormData) =>
  baseApi.post<PostEventRes>('/Events', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// API ENDS

// TYPES STARTS

export interface PostEventReq {
  EventType: EventDetailsType;
  Name: string;
  StartDate: string; //date-time
  EndDate: string; // date-time
  Address?: string;
  PropertyId?: number;
  AddressPlaceId?: string; //TODO ASK OF THIS
  GuestLimit?: number;
  IsDailyLimit?: boolean;
  SecurityGuardMessage?: string;
  EstateManagerMessage?: string;
  Images?: Asset[];

  //   for internal form use only
  StartTime?: string;
  EndTime?: string;
  eventLocationType?: EventLocationType;
  guestLimitType?: GuestLimitType;
}

export interface PostEventResData {
  name: string;
  address: string;
  addressPlaceId: string;
  eventType: EventDetailsType;
  eventTypeText: string;
  statusText: string;
  startDate: string;
  endDate: string;
  guestLimit: number;
  code: string;
  image: string[];
  isDailyLimit: boolean;
}

interface PostEventRes extends GenericApiResponse {
  data: PostEventResData;
}

// TYPES ENDS
