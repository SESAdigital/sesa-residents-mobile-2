import baseApi, {
  GenericApiResponse,
  GenericPaginatedResponse,
  GenericPaginationRequest,
  GenericTypeWithId,
} from './base.api';

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

export const getPropertyDetailsOccupantHistory = (
  val: GenericTypeWithId<GenericPaginationRequest>,
) =>
  baseApi.get<GetPropertyDetailsOccupantHistoryRes>(
    `/PropertyDetails/OccupantHistory/${val?.id}`,
    val?.value,
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

// TYPES ENDS
