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
  AccessCodeStatusType,
  AccessEntryType,
  EntityKYCStatusEnum,
  EventStatusType,
  GenderType,
  GetEntityStatusType,
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
    { reason: '' },
  );

export const deleteDependent = (id: number) =>
  baseApi.delete<GenericApiResponse>(`/Household/Dependents/${id}`);

// SITE WORKERS

export const getHouseholdSiteWorkers = ({ id, ...query }: GetEntityReq) =>
  baseApi.get<GetHouseholdSiteWorkersRes>(
    `/Household/SiteWorkers/${id}`,
    query,
  );

export const getHouseholdSiteworkerIDCard = (id: number) =>
  baseApi.get<GetHouseholdSiteworkerIDCardRes>(
    `/Household/SiteWorkers/${id}/IdCard`,
  );

export const getHouseholdSiteworkerCheckInOut = ({
  id,
  ...query
}: GenericPaginationReqWithId) =>
  baseApi.get<GetHouseholdDependentsCheckInOutRes>(
    `/Household/SiteWorkers/${id}/CheckInOut`,
    query,
  );

export const getHouseholdSiteworkerSchedule = (id: number) =>
  baseApi.get<GetHouseholdSiteworkerScheduleRes>(
    `/Household/SiteWorkers/${id}/Schedule`,
  );

export const getSiteWorkerBankAccounts = (id: number) =>
  baseApi.get<GetEntityBankAccountsRes>(
    `/Household/SiteWorkers/${id}/BankAccounts`,
  );

// HOUSEHOLD STAFF

export const getHouseholdStaffs = ({ id, ...query }: GetEntityReq) =>
  baseApi.get<GetHouseholdStaffRes>(`/Household/HouseholdStaff/${id}`, query);

export const getHouseholdStaffIdCard = (id: number) =>
  baseApi.get<GetHouseholdStaffIDCardRes>(
    `/Household/HouseholdStaff/${id}/IdCard`,
  );

export const getHouseholdStaffCheckInOut = ({
  id,
  ...query
}: GenericPaginationReqWithId) =>
  baseApi.get<GetHouseholdDependentsCheckInOutRes>(
    `/Household/HouseholdStaff/${id}/CheckInOut`,
    query,
  );

export const getHouseholdStaffBankAccounts = (id: number) =>
  baseApi.get<GetEntityBankAccountsRes>(
    `/Household/HouseholdStaff/${id}/BankAccounts`,
  );

// RFIDS

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

export const postAddSelfAsOccupant = (val: PostAddSelfAsOccupantReq) =>
  baseApi.post<GenericApiResponse>(`/Household/AddSelfAsOccupant`, val);

export const getHouseholdAlphaOcccupants = (id: number) =>
  baseApi.get<GetHouseholdAlphaOccupantsRes>(`/Household/${id}/AlphaOccupants`);

export const postCreateSiteWorker = (val: PostCreateSiteWorkerReq) =>
  baseApi.post<GenericApiResponse>(`/Household/CreateSiteWorker`, val);

export const postCreateHouseholdStaff = (val: FormData) =>
  baseApi.post<GenericApiResponse>(`/Household/CreateHouseholdStaff`, val, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

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
  // FOR INTERNAL USE ONLY
  status?: AccessCodeStatusType;
  statusText?: string;
}

interface GetPropertyDependentsVisitorsRes extends GenericApiResponse {
  data: GenericPaginatedResponse<GetPropertyDependentsVisitorsResData>;
}

export interface GetPropertyDependentsEventsResData {
  name: string;
  status: EventStatusType;
  statusText: string;
  totalCheckInCount: number;
  startDate: string;
  // FOR INTERNAL USE ONLY
  images?: string[];
}

interface GetPropertyDependentsEventsRes extends GenericApiResponse {
  data: GenericPaginatedResponse<GetPropertyDependentsEventsResData>;
}

export interface GetPropertyDependentsGroupAccessResData {
  code: string;
  totalCheckInCount: number;
  startDate: string;
  endDate: string;
  // FOR INTERNAL USE ONLY
  isAllDay?: boolean;
  status?: EventStatusType; // THIS IS CORRECT. YOU CAN ALSO CONFIRM FROM BACKEND
  statusText?: string;
}

interface GetPropertyDependentsGroupAccessRes extends GenericApiResponse {
  data: GenericPaginatedResponse<GetPropertyDependentsGroupAccessResData>;
}

// SITE WORKERS

interface GetEntityReq extends GenericPaginationRequest {
  id: number;
  Status: GetEntityStatusType;
}

export interface GetHouseholdSiteWorkersResData {
  id: number;
  firstName: string;
  lastName: string;
  code: string;
  workPeriodEnd: string;
  workPeriodStart: string;
  statusText: string;
  status: GetEntityStatusType;
  period: string;
  photo: string;
}

interface GetHouseholdSiteWorkersRes extends GenericApiResponse {
  data: GenericPaginatedResponse<GetHouseholdSiteWorkersResData>;
}

interface GetHouseholdSiteworkerIDCardRes extends GenericApiResponse {
  data: {
    firstName: string;
    lastName: string;
    estateName: string;
    code: string;
    photo: string;
    homeAddress: string;
    homeAddressPlaceId: string;
    workAddress: string;
    workAddressPlaceId: string;
    workPeriodEnd: string;
    workPeriodStart: string;
    clockInEnd: string;
    clockInStart: string;
  };
}

interface GetHouseholdSiteworkerScheduleRes extends GenericApiResponse {
  data: {
    workPeriodEnd: string;
    workPeriodStart: string;
    clockInEnd: string;
    clockInStart: string;
    workDays: string[];
  };
}

export interface GetEntityBankAccountResData {
  id: string;
  bankId: number;
  bankName: string;
  bankCode: string;
  accountName: string;
  accountNumber: string;
}

interface GetEntityBankAccountsRes extends GenericApiResponse {
  data: GetEntityBankAccountResData;
}

//  HOUSEHOLD STAFF

export interface GetHouseholdStaffResData {
  id: number;
  firstName: string;
  lastName: string;
  code: string;
  statusText: string;
  // status: GetEntityStatusType;
  status: AccessCardStatusType;
  period: string;
  photo: string;
}

interface GetHouseholdStaffRes extends GenericApiResponse {
  data: GenericPaginatedResponse<GetHouseholdStaffResData>;
}

interface GetHouseholdStaffIDCardRes extends GenericApiResponse {
  data: {
    firstName: string;
    lastName: string;
    estateName: string;
    code: string;
    photo: string;
    homeAddress: string;
    homeAddressPlaceId: string;
    workAddress: string;
    workAddressPlaceId: string;
    workDays: string;
  };
}

// RFIDS
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
  HomeAddressPlaceId?: string;
  Photo: AppImageType;
  KYCId: number;
}

export interface PostHouseholdCreateOccupantResData {
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
}

interface PostHouseholdCreateOccupantRes extends GenericApiResponse {
  data: PostHouseholdCreateOccupantResData;
}

interface PostAddSelfAsOccupantReq {
  propertyUnitId: number;
  isAlpha: boolean;
}

interface GetHouseholdAlphaOccupantsResData {
  id: number;
  name: string;
  code: string;
  gender: GenderType;
  genderText: string;
  status: UserAccountStatusType;
  statusText: string;
  isPendingApproval: boolean;
  lastactivity: string;
}

interface GetHouseholdAlphaOccupantsRes extends GenericApiResponse {
  data: GenericPaginatedResponse<GetHouseholdAlphaOccupantsResData>;
}

interface PostCreateSiteWorkerReq {
  KycId: number;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Email: string;
  Gender: GenderType;
  DateOfBirth: string;
  Photo: AppImageType;
  HomeAddress: string;
  HomeAddressPlaceId: string;
  WorkPropertyStructureId: number;
  Workdays: string[];
  WorkPeriodStart: string;
  WorkPeriodEnd: string;
  ClockInStart: string;
  ClockInEnd: string;
  SecurityGuardMessage?: string;
}

export interface PostCreateHouseholdStaffReq {
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  DateOfBirth: string;
  Gender: GenderType;
  HomeAddress: string;
  Photo: AppImageType;
  WorkPropertyUnitId: number;
  RequireCheckInApproval?: boolean;
  RequireCheckOutApproval?: boolean;
  RequireCheckInPicture?: boolean;
  RequireCheckOutPicture?: boolean;
  SecurityGuardMessage?: string;
  HomeAddressPlaceId?: string;
  WorkDays?: string[];
  KYCId?: number;
}

//  TYPES ENDS
