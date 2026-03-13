import baseApi, { GenericApiResponse } from './base.api';
import {
  AccessCodeStatusType,
  AccessEntityType,
  PropertyCategoryType,
} from './constants/default';

// API STARTS HERE

export const getWalletBalance = () =>
  baseApi.get<GetWalletBalance>('/Dashboard/WalletBalance');

export const getDashboardProperties = () =>
  baseApi.get<GetDashboardProperties>('/Dashboard/Properties');

export const getDashboardHappeningTodayVisitors = (id: number) =>
  baseApi.get<GetDashboardHappeningTodayVisitors>(
    `/Dashboard/HappeningToday/${id}/Visitors`,
  );

export const getDashboardHappeningTodayGroupAccess = (id: number) =>
  baseApi.get<GetDashboardHappeningTodayGroupAccess>(
    `/Dashboard/HappeningToday/${id}/GroupAccess`,
  );

export const getDashboardHappeningTodayEvents = (id: number) =>
  baseApi.get<GetDashboardHappeningTodayEvents>(
    `/Dashboard/HappeningToday/${id}/Events`,
  );

// API ENDS HERE

// TYPES STARTS HERE

interface GetWalletBalance extends GenericApiResponse {
  data: number;
}

export interface GetDashboardPropertiesData {
  id: number;
  code: string;
  name: string;
  propertyName: string;
  propertyAddress: string;
  propertyAddressPlaceId: string;
  propertyCategory: PropertyCategoryType;
  propertyCategoryText: string;
}

interface GetDashboardProperties extends GenericApiResponse {
  data: GetDashboardPropertiesData[];
}

export interface GetDashboardHappeningTodayGroupAccessData {
  id: number;
  code: string;
  totalCheckInCount: number;
  endTime: string;
  isAllDay: boolean;
  status: number; // TODO  FIX THIS GROUP ACCESS
  statusText: string;
  startDate: string;
}

interface GetDashboardHappeningTodayGroupAccess extends GenericApiResponse {
  data: GetDashboardHappeningTodayGroupAccessData[];
}

export interface GetDashboardHappeningTodayVisitorsData {
  id: number;
  name: string;
  code: string;
  checkInTime: string;
  checkOutTime: string;
  dateOfVisitation: string;
  status: AccessCodeStatusType;
  visitorType: AccessEntityType;
  visitorTypeText: string;
  statusText: string;
}

interface GetDashboardHappeningTodayVisitors extends GenericApiResponse {
  data: GetDashboardHappeningTodayVisitorsData[];
}

export interface GetDashboardHappeningTodayEventsData {
  id: number;
  name: string;
  totalCheckInCount: number;
  status: number; // TODO  FIX THIS
  code: string;
  statusText: string;
  imagePaths: string;
  images: string[];
  startDate: string;
  endDate: string;
}
interface GetDashboardHappeningTodayEvents extends GenericApiResponse {
  data: GetDashboardHappeningTodayEventsData[];
}

// TYPES ENDS HERE
