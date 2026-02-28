import baseApi, { GenericApiResponse, GenericTypeWithId } from './base.api';
import { GenderType, RelationshipType } from './constants/default';

// API STARTS

export const patchProfilePhoneNumber = (data: PatchProfilePhoneNumberReq) =>
  baseApi.patch<GenericApiResponse>(
    `/Profile/PhoneNumber?PhoneNumber=${data?.PhoneNumber}`,
  );

export const getEmergencyContacts = () =>
  baseApi.get<GetEmergencyContactsRes>(`/Profile/EmergencyContacts`);

export const getSingleEmergencyContact = (id: number) =>
  baseApi.get<GetSingleEmergencyContactRes>(`/Profile/EmergencyContacts/${id}`);

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

// TYPES ENDS
