import baseApi, {
  GenericApiResponse,
  GenericPaginatedResponse,
  GenericPaginationRequest,
} from './base.api';

// API STARTS

export const getEmergencyServices = (val: GenericPaginationRequest) =>
  baseApi.get<GetEmergencyServicesRes>('/HelpCenter/EmergencyServices', val);

export const getEstateRules = (val: GenericPaginationRequest) =>
  baseApi.get<GetEstateRulesRes>('/HelpCenter/EstateRules', val);

// API ENDS

// TYPES STARTS

export interface GetEmergencyServicesResData {
  id: number;
  name: string;
  email: string;
  phoneNumbers: string[];
  stateId: number;
  stateName: string;
  contactAddress: string;
  contactAddressPlaceId: string;
  estates: string[];
  timeCreated: string;
  timeCreatedFormatted: string;
}

interface GetEmergencyServicesRes extends GenericApiResponse {
  data: GenericPaginatedResponse<GetEmergencyServicesResData>;
}

export interface GetEstateRulesResData {
  id: number;
  title: string;
  details: string;
  timeUpdated: string;
  timeCreated: string;
}

interface GetEstateRulesRes extends GenericApiResponse {
  data: GenericPaginatedResponse<GetEstateRulesResData>;
}

// TYPES ENDS
