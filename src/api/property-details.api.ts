import baseApi, {
  GenericApiResponse,
  GenericPaginatedResponse,
  GenericPaginationRequest,
  GenericPaginationReqWithId,
  GenericTypeWithId,
} from './base.api';
import { HouseholdActivityType } from './constants/default';

// API STARTS

export const getPropertyDetails = (id: number) =>
  baseApi.get<GetPropertyDetailsRes>(`/PropertyDetails/${id}`);

export const patchPropertyDetailsAccessOptions = (
  val: GenericTypeWithId<PatchPropertyDetailsAccessOptionsReq>,
) =>
  baseApi.patch<GenericApiResponse>(
    `/PropertyDetails/${val?.id}/AccessOptions`,
    val?.value,
  );

export const getPropertyDetailsPrivileges = (id: number) =>
  baseApi.get<GetPropertyDetailsPrivilegesRes>(
    `/PropertyDetails/${id}/Privilege`,
  );

export const getPropertyDetailsOccupantHistory = ({
  id,
  ...val
}: GenericPaginationReqWithId) =>
  baseApi.get<GetPropertyDetailsOccupantHistoryRes>(
    `/PropertyDetails/OccupantHistory/${id}`,
    val,
  );

export const getPropertyDetailsHouseholdActivity = (
  val: GetPropertyDetailsHouseholdActivityReq,
) =>
  baseApi.get<GetPropertyDetailsHouseholdActivityRes>(
    '/PropertyDetails/HouseholdActivity',
    val,
  );

export const getPropertyDetailsSingleHouseholdActivity = (id: number) =>
  baseApi.get<GetPropertyDetailsSingleHouseholdActivityRes>(
    `/PropertyDetails/HouseholdActivity/${id}`,
  );

// API ENDS

// TYPES STARTS

export interface GetPropertyDetailsRes extends GenericApiResponse {
  data: {
    estateName: string;
    image: string;
    status: string;
    category: string;
    structureAddress: string;
    unitNumber: string;
    address: string;
    addressPlaceId: string;
    type: string;
    name: string;
    enableWalkIn: boolean;
    enableGroupAccess: boolean;
    alphaStatus: string;
    ownerResponses: {
      name: string;
      photo: string;
      landloadStatus: string;
    }[]; // TODO ASK ABOUT THIS
  };
}

export interface PatchPropertyDetailsAccessOptionsReq {
  enableWalkIn: boolean;
  enableGroupAccess: boolean;
}

interface GetPropertyDetailsPrivilegesRes extends GenericApiResponse {
  data: {
    isAlpha: boolean;
    isDependent: boolean;
    isLandlordResident: boolean;
    isLandlordNonResident: boolean;
    isLandlordDeveloper: boolean;
  };
}

export interface GetPropertyDetailsOccupantHistoryResData {
  id: number;
  name: string;
  status: string; // TODO FIX
  totalAlphaCount: number;
  totalDependentCount: number;
  totalSiteWorkerCount: number;
  totalRFIDCount: number;
  totalAccessCardCount: number;
  timeDeparted: string;
  timeCreated: string;
}

interface GetPropertyDetailsOccupantHistoryRes extends GenericApiResponse {
  data: GenericPaginatedResponse<GetPropertyDetailsOccupantHistoryResData>;
}

export interface GetPropertyDetailsHouseholdActivityResData {
  id: number;
  name: string;
  activity: HouseholdActivityType;
  status: string;
  timeCreated: string;
}

interface GetPropertyDetailsHouseholdActivityRes extends GenericApiResponse {
  data: GenericPaginatedResponse<GetPropertyDetailsHouseholdActivityResData>;
}

interface GetPropertyDetailsHouseholdActivityReq
  extends GenericPaginationRequest {
  HouseHoldId: number;
  PropertyId: number;
}

interface GetPropertyDetailsSingleHouseholdActivityRes
  extends GenericApiResponse {
  data: {
    activity: HouseholdActivityType;
    activityText: string;
    details: Record<string, string>;
    additionalDetails: Record<string, string>;
    timeCreated: string;
  };
}

// TYPES ENDS
