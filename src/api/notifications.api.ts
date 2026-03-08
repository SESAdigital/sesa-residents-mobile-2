import baseApi, {
  GenericApiResponse,
  GenericPaginatedResponse,
  GenericPaginationRequest,
} from './base.api';
import { NotificationType } from './constants/default';

// API STARTS

export const getNotificationsUnreadCount = () =>
  baseApi.get<GetNotificationsUnreadCountRes>('/Notifications/UnReadCount');

export const getNofications = (val: GenericPaginationRequest) =>
  baseApi.get<GetNotificationsRes>('/Notifications', val);

export const postNotification = (val: PostNotificationReq) =>
  baseApi.post<GenericApiResponse>('/Notifications', val);

export const getNotificationAnnouncement = (id: number) =>
  baseApi.get<GetNotificationAnnouncementRes>(
    `/Notifications/Announcements/${id}`,
  );

export const getNotificationVisitorRequest = (id: number) =>
  baseApi.get<GetNotificationVisitorRequestRes>(
    `/Notifications/VisitorRequest/${id}`,
  );

export const patchNotificationVisitorRequest = (val: PatchReq) =>
  baseApi.patch(`/Notifications/VisitorRequest/${val?.id}/${val?.route}`);

// API ENDS

// TYPES STARTS

interface GetNotificationsUnreadCountRes extends GenericApiResponse {
  data: number;
}

export interface GetNotificationsResData {
  id: number;
  message: string;
  title: string;
  isRead: boolean;
  notificationTypeId: number;
  notificationType: NotificationType;
  timeCreated: string;
  timePosted: string;
}

interface GetNotificationsRes extends GenericApiResponse {
  data: GenericPaginatedResponse<GetNotificationsResData>;
}

interface PostNotificationReq {
  notificationIds: number[];
}

interface GetNotificationAnnouncementRes extends GenericApiResponse {
  data: {
    subject: string;
    message: string;
    entityType: string;
    entityName: string;
    datePosted: string;
  };
}

interface GetNotificationVisitorRequestRes extends GenericApiResponse {
  data: {
    id: number;
    phoneNumber: string;
    fullName: string;
    visitorMessage: string;
    visitationDate: string;
    numberOfOccupant: number;
    photo: string;
    modeEntryType: number;
    modeEntryTypeText: string;
    status: number;
    propertyName: string;
    propertyAddress: string;
    code: string;
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
  };
}

interface PatchReq {
  id: number;
  route: 'Reject' | 'Approve';
}

// TYPES ENDS
