import baseApi, {
  GenericApiResponse,
  GenericPaginatedResponse,
  GenericPaginationRequest,
  GenericPaginationReqWithId,
  GenericPatchStatusReq,
} from './base.api';
import {
  AccessCardStatusType,
  AccessEntryType,
  GenderType,
  PropertyCategoryType,
  RFIDType,
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

export const getHouseholdRFIDs = ({
  id,
  ...query
}: GenericPaginationReqWithId) =>
  baseApi.get<GetHouseholdRFIDsRes>(`/Household/RFIDs/${id}`, query);

export const getHouseholdRFIDsHistory = ({
  id,
  ...query
}: GenericPaginationReqWithId) =>
  baseApi.get<GetHouseholdRFIDsHistoryRes>(
    `/Household/RFIDs/${id}/History`,
    query,
  );

export const patchHouseholdRFIDStatus = (val: GenericPatchStatusReq) =>
  baseApi.patch<GenericApiResponse>(`/Household/RFID/${val.id}/${val?.status}`);

export const deleteHouseholdRFID = (id: number) =>
  baseApi.delete<GenericApiResponse>(`/Household/RFID/${id}`);

export const getHouseholdAccessCards = ({
  id,
  ...query
}: GenericPaginationReqWithId) =>
  baseApi.get<GetHouseholdAccessCardsRes>(
    `/Household/AccessCards/${id}`,
    query,
  );

export const getHouseholdAccessCardHistory = ({
  id,
  ...query
}: GenericPaginationReqWithId) =>
  baseApi.get<GetHouseholdRFIDsHistoryRes>(
    `/Household/AccessCard/${id}/History`,
    query,
  );

export const patchHouseholdAccessCardStatus = (val: GenericPatchStatusReq) =>
  baseApi.patch<GenericApiResponse>(
    `/Household/AccessCard/${val.id}/${val?.status}`,
  );

export const deleteHouseholdAccessCard = (id: number) =>
  baseApi.delete<GenericApiResponse>(`/Household/AccessCard/${id}`);

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
  status: number; // TODO FIX THIS
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

export interface GetHouseholdRFIDsResData {
  id: number;
  serialNumber: string;
  registrationNumber: string;
  rfidMake: string;
  type: RFIDType;
  typeDescription: string;
  photo: string;
  status: AccessCardStatusType;
  statusDescription: string;
}

interface GetHouseholdRFIDsRes extends GenericApiResponse {
  data: GenericPaginatedResponse<GetHouseholdRFIDsResData>;
}

export interface GetHouseholdRFIDsHistoryResData {
  timeCreated: string;
  accessEntryDatas: {
    guardName: string;
    residentName: string;
    entryType: AccessEntryType;
    entryTypeDescription: string;
    entryTime: string;
  }[];
}
interface GetHouseholdRFIDsHistoryRes extends GenericApiResponse {
  data: GenericPaginatedResponse<GetHouseholdRFIDsHistoryResData>;
}

export interface GetHouseholdAccessCardsResData {
  id: number;
  holderName: string;
  serialNumber: string;
  phoneNumber: string;
  status: AccessCardStatusType;
  statusDescription: string;
}

interface GetHouseholdAccessCardsRes extends GenericApiResponse {
  data: GenericPaginatedResponse<GetHouseholdAccessCardsResData>;
}

//  TYPES ENDS
