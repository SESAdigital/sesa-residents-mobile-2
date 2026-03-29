import baseApi, {
  GenericApiResponse,
  GenericPaginatedResponse,
  GenericPaginationRequest,
  GenericTypeWithId,
} from './base.api';
import {
  AccessCodeStatusType,
  AccessEntityType,
  AccessEntryType,
  EventDetailsType,
  EventStatusType,
} from './constants/default';

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

// EVENTS

export const getBookingsEvents = (val: GetBookingsReq) =>
  baseApi.get<GetBookingsEventsRes>(`/Bookings/${val?.id}/Events`, val?.query);

export const getSingleEventsBooking = (id: number) =>
  baseApi.get<GetSingleEventsBookingRes>(`/Bookings/Events/${id}`);

export const patchCancelEventBooking = (id: number) =>
  baseApi.patch<GenericApiResponse>(`/Bookings/Events/${id}/Cancel`);

export const getBookingsEventAttendees = (
  val: GenericTypeWithId<GenericPaginationRequest>,
) =>
  baseApi.get<GetBookingsAttendeesRes>(
    `/Bookings/Events/${val?.id}/Attendees`,
    val?.value,
  );

export const getSingleBookingsEventsAttendeeDetailRes = (
  val: GetSingleBookingsAttendeeDetailReq,
) =>
  baseApi.get<GetSingleBookingsAttendeeDetailRes>(
    `/Bookings/Events/${val?.parentId}/Attendees/${val?.id}`,
  );

// GROUP ACCESS

export const getBookingsGroupAccess = (val: GetBookingsReq) =>
  baseApi.get<GetBookingsGroupAccessRes>(
    `/Bookings/${val?.id}/GroupAccess`,
    val?.query,
  );

export const getSingleGroupAccessBooking = (id: number) =>
  baseApi.get<GetSingleGroupAccessBookingRes>(`/Bookings/GroupAccess/${id}`);

export const patchCancelGroupAccessBooking = (id: number) =>
  baseApi.patch<GenericApiResponse>(`/Bookings/GroupAccess/${id}/Cancel`);

export const getBookingsGroupAccessAttendees = (
  val: GenericTypeWithId<GenericPaginationRequest>,
) =>
  baseApi.get<GetBookingsAttendeesRes>(
    `/Bookings/GroupAccess/${val?.id}/Attendees`,
    val?.value,
  );

export const getSingleBookingsGroupAccessAttendeeDetailRes = (
  val: GetSingleBookingsAttendeeDetailReq,
) =>
  baseApi.get<GetSingleBookingsAttendeeDetailRes>(
    `/Bookings/GroupAccess/${val?.parentId}/Attendees/${val?.id}`,
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

export interface GetBookingsEventsResData {
  id: number;
  name: string;
  totalCheckInCount: number;
  status: EventStatusType;
  code: string;
  statusText: string;
  imagePaths: string;
  images: string[];
  startDate: string;
  endDate: string;
}

export interface GetBookingsEventsRes extends GenericApiResponse {
  data: {
    todayHistroy: GetBookingsEventsResData[];
    upcommingHistroy: GetBookingsEventsResData[];
    olderHistroy: GetBookingsEventsResData[];
  };
}

interface GetSingleEventsBookingRes extends GenericApiResponse {
  data: {
    id: number;
    name: string;
    code: string;
    startTime: string;
    endTime: string;
    guestsCount: number;
    totalCheckInCount: number;
    eventAddress: string;
    addressPlaceId: string;
    eventType: EventDetailsType;
    eventTypeText: string;
    status: EventStatusType;
    statusText: string;
    imagePaths: string;
    isDailyLimit: boolean;
    images: string[];
    timeCreated: string;
  };
}

export interface GetBookingsAttendeesResData {
  id: number;
  name: string;
  phoneNumber: string;
  checkInTime: string;
  checkOutTime: string;
}

interface GetBookingsAttendeesRes extends GenericApiResponse {
  data: GenericPaginatedResponse<GetBookingsAttendeesResData>;
}

export interface GetSingleBookingsAttendeeDetailReq {
  parentId: number;
  id: number;
  // just for internal use only
  type?: 'GROUP_ACCESS' | 'EVENT';
}

export interface GetSingleBookingsAttendeeDetailResData {
  name: string;
  phoneNumber: string;
  noOfEntrants: number;
  modeEntryType: AccessEntryType;
  modeEntryText: string;
  tagNumber: string;
  checkInTime: string;
  checkOutTime: string;
  checkInDate: string;
  checkedInBy: {
    name: string;
    checkTime: string;
    photo: string;
  };
  checkedOutBy: {
    name: string;
    checkTime: string;
    photo: string;
  };
}

interface GetSingleBookingsAttendeeDetailRes {
  data: GetSingleBookingsAttendeeDetailResData;
}

// GROUP ACCESS

export interface GetBookingsGroupAccessResData {
  id: number;
  code: string;
  totalCheckInCount: number;
  endTime: string;
  isAllDay: boolean;
  status: EventStatusType; // THIS IS CORRECT. YOU CAN ALSO CONFIRM FROM BACKEND
  statusText: string;
  startDate: string;
}

export interface GetBookingsGroupAccessRes extends GenericApiResponse {
  data: {
    todayHistroy: GetBookingsGroupAccessResData[];
    upcommingHistroy: GetBookingsGroupAccessResData[];
    olderHistroy: GetBookingsGroupAccessResData[];
  };
}

interface GetSingleGroupAccessBookingRes extends GenericApiResponse {
  data: {
    id: number;
    code: string;
    propertyAddress: string;
    addressPlaceId: string;
    propertyName: string;
    startTime: string;
    endTime: string;
    isAllDay: boolean;
    checkInCounts: number;
    status: AccessCodeStatusType;
    statusText: string;
    repeatDays: string[];
  };
}

// TYPES ENDS
