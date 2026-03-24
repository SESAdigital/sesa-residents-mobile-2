import baseApi, {
  GenericApiResponse,
  GenericPaginatedResponse,
  GenericPaginationRequest,
  GenericPaginationReqWithId,
} from './base.api';
import {
  AccessEntryType,
  GenderType,
  PropertyCategoryType,
} from './constants/default';

// API STARTS

export const getHouseholdProperties = (val: GenericPaginationRequest) =>
  baseApi.get<GetHouseholdPropertiesRes>('/Household/Properties', val);

export const getHouseholdPropertyMetrics = (id: number) =>
  baseApi.get<GetHouseholdPropertyMetricsRes>(`/Household/Metrics/${id}`);

export const getHouseholdPropertyDependents = ({
  id,
  ...query
}: GenericPaginationReqWithId) =>
  baseApi.get<GetHouseholdPropertyDependentsRes>(
    `/Household/${id}/Dependents/Occupants`,
    query,
  );

export const getHouseholdDependentsCheckInOut = ({
  id,
  ...query
}: GenericPaginationReqWithId) =>
  baseApi.get<GetHouseholdDependentsCheckInOutRes>(
    `/Household/Dependents/${id}/CheckInOut`,
    query,
  );

// API ENDS

//  TYPES STARTS

export interface GetHouseholdPropertiesResData {
  id: number;
  propertyTypeName: string;
  name: string;
  address: string;
  propertyCategory: PropertyCategoryType;
  propertyCategoryText: string;
  addressPlaceId: string;
  totalAlphaCount: number;
  totalDependentCount: number;
  totalRFIDCount: number;
  totalAccessCardCount: number;
  totalSiteWorkerCount: number;
  totalHouseholdStaffCount: number;
  isVacant: boolean;
}

interface GetHouseholdPropertiesRes extends GenericApiResponse {
  data: GenericPaginatedResponse<GetHouseholdPropertiesResData>;
}

interface GetHouseholdPropertyMetricsRes extends GenericApiResponse {
  data: {
    name: string;
    dependentMaximumCount: number;
    totalAlphaCount: number;
    totalDependentCount: number;
    totalRFIDCount: number;
    totalAccessCardCount: number;
    totalSiteWorkerCount: number;
    totalHouseholdStaffCount: number;
  };
}

export interface GetHouseholdPropertyDependentsResData {
  id: number;
  name: string;
  code: string;
  gender: GenderType;
  genderText: string;
  status: 0; // TODO FIX THIS
  statusText: string;
  isPendingApproval: boolean;
  lastactivity: string;
}

interface GetHouseholdPropertyDependentsRes extends GenericApiResponse {
  data: GenericPaginatedResponse<GetHouseholdPropertyDependentsResData>;
}

export interface GetHouseholdDependentsCheckInOutResData {
  timeCreated: string;
  accessEntryDatas: [
    {
      guardName: string;
      residentName: string;
      entryType: AccessEntryType;
      entryTypeDescription: string;
      entryTime: string;
    },
  ];
}

interface GetHouseholdDependentsCheckInOutRes extends GenericApiResponse {
  data: GenericPaginatedResponse<GetHouseholdDependentsCheckInOutResData>;
}

//  TYPES ENDS
