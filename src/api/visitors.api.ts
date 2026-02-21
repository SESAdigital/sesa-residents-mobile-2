import baseApi, { GenericApiResponse } from './base.api';

// API STARTS

export const postBookVisitor = (data: PostBookVisitorReq) =>
  baseApi.post<PostBookVisitorRes>('/Visitors/BookVisitor', data);

// API ENDS

// TYPES STARTS

export interface PostBookVisitorReq {
  propertyUnitId: number;
  fullName: string;
  phoneNumber: string;
  dateOfVisitation: string;
}

interface PostBookVisitorRes extends GenericApiResponse {
  data: {
    id: number;
    code: string;
    fullName: string;
    propertyUnitId: number;
    propertyAddress: string;
    propertyAddressPlaceId: string;
    propertyName: string;
    date: string;
    phoneNumber: string;
  };
}

// TYPES ENDS
