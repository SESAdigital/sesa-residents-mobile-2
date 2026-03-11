import baseApi, { GenericApiResponse, GenericTypeWithId } from './base.api';
import {
  AccessEntryType,
  DoorType,
  GateType,
  GenderType,
  RelationshipType,
} from './constants/default';

// API STARTS

export const patchProfilePhoneNumber = (data: PatchProfilePhoneNumberReq) =>
  baseApi.patch<GenericApiResponse>(
    `/Profile/PhoneNumber?PhoneNumber=${data?.PhoneNumber}`,
  );

export const getEmergencyContacts = () =>
  baseApi.get<GetEmergencyContactsRes>(`/Profile/EmergencyContacts`);

export const getSingleEmergencyContact = (id: number) =>
  baseApi.get<GetSingleEmergencyContactRes>(`/Profile/EmergencyContacts/${id}`);

export const getVerifyDoorCode = (id: string) =>
  baseApi.get<GetVerifyDoorCodeRes>(`/Profile/VerifyDoorCode`, {
    DoorCode: id,
  });

export const postOpenDoor = (val: PostOpenDoorReq) =>
  baseApi.post<GenericApiResponse>('/Profile/OpenDoor', val);

export const postEmergencyContact = (data: PostEmergencyContactReq) =>
  baseApi.post<GenericApiResponse>(`/Profile/EmergencyContact`, data);

export const patchEmergencyContact = (
  val: GenericTypeWithId<PostEmergencyContactReq>,
) =>
  baseApi.patch<GenericApiResponse>(
    `/Profile/EmergencyContact/${val.id}`,
    val?.value,
  );

export const deleteEmergencyContact = (id: number) =>
  baseApi.delete<GenericApiResponse>(`/Profile/EmergencyContact/${id}`);

// API ENDS

// TYPES STARTS

export interface PatchProfilePhoneNumberReq {
  PhoneNumber: string;
}

export interface GetEmergencyContactsResData {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}

interface GetEmergencyContactsRes extends GenericApiResponse {
  data: GetEmergencyContactsResData[];
}

interface GetSingleEmergencyContactRes extends GenericApiResponse {
  data: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    gender: GenderType;
    genderDescription: string;
    relationship: RelationshipType;
    relationshipDescription: string;
  };
}

export interface PostEmergencyContactReq {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: GenderType;
  relationship: RelationshipType;
}

interface GetVerifyDoorCodeRes extends GenericApiResponse {
  data: {
    id: number;
    deviceId: number;
    name: string;
    doorId: string;
    isActive: boolean;
    doorEntryType: AccessEntryType;
    doorEntryTypeText: string;
    doorType: DoorType;
    gateType: GateType;
    doorTypeText: string;
    timeCreatedFormatted: string;
    timeCreated: string;
  };
}
interface PostOpenDoorReq {
  doorId: string;
  accessEntryType: AccessEntryType;
}

// TYPES ENDS
