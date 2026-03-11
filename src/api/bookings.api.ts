import baseApi, { GenericApiResponse } from './base.api';
import { AccessCodeStatusType, AccessEntityType } from './constants/default';

// API STARTS

export const getBookingsVisitors = (val: GetBookingsReq) =>
  baseApi.get<GetBookingsVisitorsRes>(
    `/Bookings/${val?.id}/Visitors`,
    val?.query,
  );

export const getSingleVisitorBooking = (id: number) =>
  baseApi.get<GetSingleVisitorBookingRes>(`/Bookings/Visitors/${id}`);

export const patchCancelVisitorBooking = (id: number) =>
  baseApi.patch<GenericApiResponse>(`/Bookings/Visitors/${id}/Cancel`);

export const patchSignOutVisitorBooking = (
  val: PatchSignOutVisitorBookingReq,
) =>
  baseApi.patch<GenericApiResponse>(
    `/Bookings/${val?.propertyId}/Visitors/${val?.id}/SignOut`,
  );

// API ENDS

// TYPES STARTS

interface GetBookingsReq {
  query?: {
    SearchText?: string;
  };
  id: number;
}

export interface GetBookingsVistorResData {
  id: number;
  name: string;
  code: string;
  checkInTime: string;
  checkOutTime: string;
  dateOfVisitation: string;
  status: AccessCodeStatusType;
  visitorType: AccessEntityType;
  visitorTypeText: string;
  statusText: string;
}

export interface GetBookingsVisitorsRes extends GenericApiResponse {
  data: {
    todayHistroy: GetBookingsVistorResData[];
    upcommingHistroy: GetBookingsVistorResData[];
    olderHistroy: GetBookingsVistorResData[];
  };
}

interface GetSingleVisitorBookingRes extends GenericApiResponse {
  data: {
    id: number;
    visitorName: string;
    code: string;
    propertyAddress: string;
    propertyName: string;
    phoneNumber: string;
    checkInBy: string;
    checkInByPhoto: string;
    checkOutBy: string;
    checkOutByPhoto: string;
    checkInTime: string;
    checkOutTime: string;
    status: AccessCodeStatusType;
    statusText: string;
    dateOfVisitation: string;
    modeEntryType: number; // TODO FIX THIS
    modeEntryTypeText: string;
    noOfEntries: string;
    shouldSignOut: boolean;
  };
}

interface PatchSignOutVisitorBookingReq {
  id: number;
  propertyId: number;
}

// TYPES ENDS
