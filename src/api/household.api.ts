import { AppImageType } from '@src/types/default';
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
  EntityKYCStatusEnum,
  GenderType,
  PropertyCategoryType,
  RFIDType,
  UserAccountStatusType,
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

export const getPropertyDependentsVisitors = ({
  propId,
  id,
  ...query
}: PropIdPagReq) =>
  baseApi.get<GetPropertyDependentsVisitorsRes>(
    `/Household/${propId}/Dependents/${id}/Visitors`,
    query,
  );

export const getPropertyDependentsEvents = ({
  propId,
  id,
  ...query
}: PropIdPagReq) =>
  baseApi.get<GetPropertyDependentsEventsRes>(
    `/Household/${propId}/Dependents/${id}/Events`,
    query,
  );

export const getPropertyDependentsGroupAccess = ({
  propId,
  id,
  ...query
}: PropIdPagReq) =>
  baseApi.get<GetPropertyDependentsGroupAccessRes>(
    `/Household/${propId}/Dependents/${id}/GroupAccess`,
    query,
  );

export const patchDependentStatus = (val: GenericPatchStatusReq) =>
  baseApi.patch<GenericApiResponse>(
    `/Household/Dependent/${val.id}/${val?.status}`,
  );

export const deleteDependent = (id: number) =>
  baseApi.delete<GenericApiResponse>(`/Household/Dependents/${id}`);

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

export const postHouseholdCreateOccupant = (val: FormData) =>
  baseApi.post<PostHouseholdCreateOccupantRes>(
    `/Household/CreateOccupant`,
    val,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
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
  status: AccessCardStatusType;
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

export interface GetPropertyDependentsVisitorsResData {
  name: string;
  code: string;
  checkInTime: string;
  checkOutTime: string;
  dateOfVisitation: string;
}

interface GetPropertyDependentsVisitorsRes extends GenericApiResponse {
  data: GenericPaginatedResponse<GetPropertyDependentsVisitorsResData>;
}

export interface GetPropertyDependentsEventsResData {
  name: string;
  status: number; // TODO FIX THIS
  statusText: string;
  totalCheckInCount: number;
  startDate: string;
}

interface GetPropertyDependentsEventsRes extends GenericApiResponse {
  data: GenericPaginatedResponse<GetPropertyDependentsEventsResData>;
}

export interface GetPropertyDependentsGroupAccessResData {
  code: string;
  totalCheckInCount: number;
  startDate: string;
  endDate: string;
}

interface GetPropertyDependentsGroupAccessRes extends GenericApiResponse {
  data: GenericPaginatedResponse<GetPropertyDependentsGroupAccessResData>;
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

interface PropIdPagReq extends GenericPaginationReqWithId {
  propId: number;
}

export interface PostHouseholdCreateOccupantReq {
  PropertyUnitId: number;
  IsAlpha: boolean;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  DateOfBirth: string;
  Gender: GenderType;
  HomeAddress: string;
  HomeAddressPlaceId: string;
  Photo: AppImageType;
  KYCId: number;
}

interface PostHouseholdCreateOccupantRes extends GenericApiResponse {
  data: {
    id: number;
    estateId: number;
    photo: string;
    gender: GenderType;
    genderText: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    userName: string;
    phoneNumber: string;
    code: string;
    dateOfBirth: string;
    timeCreated: string;
    timeCreatedFormatted: string;
    accountStatus: UserAccountStatusType;
    accountStatusText: string;
    kycStatus: EntityKYCStatusEnum;
    kycStatusText: string;
    kycId: number;
    isAlphaResident: boolean;
    address: string;
    addressPlaceId: string;
    propertyUnitName: string;
  };
}

//  TYPES ENDS
