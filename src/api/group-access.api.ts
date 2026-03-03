import baseApi, { GenericApiResponse } from './base.api';
import { RepeatDaysType } from './constants/default';

// API STARTS

export const postGroupAccess = (data: PostGroupAccessReq) =>
  baseApi.post<PostGroupAccessRes>('/GroupAccess', data);

// API ENDS

// TYPES STARTS

export interface PostGroupAccessReq {
  propertyUnitId: number;
  visitationDate: string;
  startTime: string;
  endTime: string;
  isAllDay: boolean;
  isRepeat: boolean;
  repeatDays: RepeatDaysType[];
}

export interface PostGroupAccessResData {
  id: number;
  code: string;
  propertyUnitId: number;
  propertyAddress: string;
  propertyAddressPlaceId: string;
  propertyName: string;
  accessDate: string;
  startTime: string;
  endTime: string;
  isAllDay: boolean;
  isRepeat: boolean;
  repeatDays: string;
}

interface PostGroupAccessRes extends GenericApiResponse {
  data: PostGroupAccessResData;
}

// TYPES ENDS
