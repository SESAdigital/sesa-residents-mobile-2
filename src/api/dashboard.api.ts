import baseApi, { GenericApiResponse } from '.';
import { PropertyCategoryType } from './constants/default';

// API STARTS HERE

export const getWalletBalance = () =>
  baseApi.get<GetWalletBalance>('/Dashboard/WalletBalance');

export const getDashboardProperties = () =>
  baseApi.get<GetDashboardProperties>('/Dashboard/Properties');

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

// TYPES ENDS HERE
