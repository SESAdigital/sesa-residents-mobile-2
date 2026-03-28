import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  getAccountProfile,
  getNotificationPreference,
} from '@src/api/auth.api';
import { DEFAULT_API_DATA_SIZE } from '@src/api/base.api';
import {
  getBookingsEventAttendees,
  getBookingsGroupAccessAttendees,
  getSingleBookingsEventsAttendeeDetailRes,
  getSingleBookingsGroupAccessAttendeeDetailRes,
} from '@src/api/bookings.api';
import queryKeys from '@src/api/constants/queryKeys';
import {
  getDashboardHappeningTodayEvents,
  getDashboardHappeningTodayGroupAccess,
  getDashboardHappeningTodayVisitors,
  getDashboardProperties,
  getWalletBalance,
} from '@src/api/dashboard.api';
import { getSingleEmergencyContact } from '@src/api/profile.api';
import { getPropertyDetails } from '@src/api/property-details.api';
import { useAuthStore } from '@src/stores/auth.store';
import { formatMoneyToTwoDecimals, getTotalPages } from '@src/utils';
import { handleToastApiError } from '@src/utils/handleErrors';
import { getBillsMetrics } from '@src/api/bills.api';
import { getUtilitiesFees } from '@src/api/utilities.api';

export const useGetUserDetails = () => {
  const { data: profileData, isLoading: isProfileLoading } = useGetProfile();
  const { loginResponse } = useAuthStore();
  const loginData = loginResponse?.data;

  const details = {
    firstName: profileData?.name?.split(' ')?.[0] || loginData?.firstName,
    lastName: profileData?.name?.split(' ')?.[1] || loginData?.lastName,
    email: profileData?.email || loginData?.email,
    photo: profileData?.photo || loginData?.photo,
    status: profileData?.status || loginData?.accountStatus,
    statusText: profileData?.statusText || loginData?.accountStatusText,
    phone: profileData?.phoneNumber,
    code: profileData?.code,
    dateOnboarded: profileData?.dateOnboarded,
  } as const;

  return {
    details,
    loginResponse,
    profileData,
    isProfileLoading,
  };
};

const useGetProfile = () => {
  return useQuery({
    queryKey: [queryKeys.GET_PROFILE],
    queryFn: async () => {
      const response = await getAccountProfile();
      if (response.ok) {
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
  });
};

export const useGetWalletBalance = () => {
  return useQuery({
    queryKey: [queryKeys.GET_WALLET_BALANCE],
    queryFn: async () => {
      const response = await getWalletBalance();
      if (response.ok && response?.data) {
        const amount = response?.data?.data;
        return {
          amount,
          formattedAmount: formatMoneyToTwoDecimals({ amount }),
        };
      } else {
        handleToastApiError(response);
        return null;
      }
    },
  });
};

export const useGetProperties = () => {
  const { setSelectedProperty, selectedProperty } = useAuthStore();

  return useQuery({
    queryKey: [queryKeys.GET_DASHBOARD_PROPERTIES],
    queryFn: async () => {
      const response = await getDashboardProperties();

      if (response.ok) {
        const properties = response?.data?.data;
        const currentProperty = properties?.find(
          item => item?.id === selectedProperty?.id,
        );

        if (!currentProperty) {
          setSelectedProperty(properties?.[0] || null);
        }
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
  });
};

export const useGetNotificationPreference = () => {
  return useQuery({
    queryKey: [queryKeys.GET_NOTIFICATION_PREFERENCES],
    queryFn: async () => {
      const response = await getNotificationPreference();
      if (response.ok) {
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
  });
};

export const useGetSingleEmergencyContact = (id: number) => {
  return useQuery({
    queryKey: [queryKeys.GET_EMERGENCY_CONTACTS, 'single', id],
    queryFn: async () => {
      const response = await getSingleEmergencyContact(id);
      if (response.ok) {
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
    enabled: !!id && !isNaN(Number(id)),
  });
};

export const useGetPropertyDetails = () => {
  const { selectedProperty } = useAuthStore();
  const id = selectedProperty?.id;
  const queryClient = useQueryClient();
  const queryKey = [queryKeys.GET_PROPERTY_DETAILS, 'single', id];

  const value = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getPropertyDetails(id || 0);
      if (response.ok) {
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
    enabled: !!id && !isNaN(Number(id)),
  });

  const customRefetch = () => queryClient.resetQueries({ queryKey });

  return { value, customRefetch, propertyId: selectedProperty?.id };
};

export const useGetVistorHappeningToday = () => {
  const { selectedProperty } = useAuthStore();

  const id = selectedProperty?.id;

  const queryKey = [
    queryKeys.GET_VISITOR_BOOKINGS,
    'getDashboardHappeningTodayVisitors',
    id,
  ];

  const value = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getDashboardHappeningTodayVisitors(id!);
      if (response.ok) {
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
    enabled: !!id,
  });

  const queryClient = useQueryClient();
  const customRefetch = () => queryClient.resetQueries({ queryKey });

  return { value, customRefetch };
};

export const useGetEventsHappeningToday = () => {
  const { selectedProperty } = useAuthStore();

  const id = selectedProperty?.id;

  const queryKey = [
    queryKeys.GET_EVENT_BOOKINGS,
    'getDashboardHappeningTodayEvents',
    id,
  ];

  const value = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getDashboardHappeningTodayEvents(id!);
      if (response.ok) {
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
    enabled: !!id,
  });

  const queryClient = useQueryClient();
  const customRefetch = () => queryClient.resetQueries({ queryKey });

  return { value, customRefetch };
};

export const useGetGroupAccessHappeningToday = () => {
  const { selectedProperty } = useAuthStore();

  const id = selectedProperty?.id;

  const queryKey = [
    queryKeys.GET_GROUP_ACCESS_BOOKINGS,
    'getDashboardHappeningTodayGroupAccess',
    id,
  ];

  const value = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getDashboardHappeningTodayGroupAccess(id!);
      if (response.ok) {
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
    enabled: !!id,
  });

  const queryClient = useQueryClient();
  const customRefetch = () => queryClient.resetQueries({ queryKey });

  return { value, customRefetch };
};

interface UseGetBookingsAttendeesProps {
  enabled: boolean;
  id: number;
}
const pageSize = DEFAULT_API_DATA_SIZE;

export const useGetBookingsEventAttendees = (
  props: UseGetBookingsAttendeesProps,
) => {
  const { enabled, id } = props;
  const queryKey = [
    queryKeys.GET_EVENT_BOOKINGS,
    'getBookingsEventAttendees',
    id,
  ];
  const queryData = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      const response = await getBookingsEventAttendees({
        id,
        value: {
          PageNumber: pageParam,
          PageSize: pageSize,
        },
      });
      if (response.ok) {
        return response?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },

    initialPageParam: 1,
    enabled,
    getNextPageParam: lastPage => {
      if (!lastPage) return undefined;
      const { currentPage, totalRecordCount: totalItems } = lastPage.data;
      const totalPages = getTotalPages({ pageSize, totalItems });
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  const formattedData =
    queryData?.data?.pages
      ?.flatMap(page => page?.data?.records)
      ?.filter(val => !!val) || [];

  const queryClient = useQueryClient();
  const customRefetch = () => queryClient.resetQueries({ queryKey });

  return { customRefetch, formattedData, queryData };
};

export const useGetBookingsGroupAccessAttendees = (
  props: UseGetBookingsAttendeesProps,
) => {
  const { enabled, id } = props;
  const queryKey = [
    queryKeys.GET_GROUP_ACCESS_BOOKINGS,
    'getBookingsGroupAccessAttendees',
    id,
  ];
  const queryData = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      const response = await getBookingsGroupAccessAttendees({
        id,
        value: {
          PageNumber: pageParam,
          PageSize: pageSize,
        },
      });
      if (response.ok) {
        return response?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },

    initialPageParam: 1,
    enabled,
    getNextPageParam: lastPage => {
      if (!lastPage) return undefined;
      const { currentPage, totalRecordCount: totalItems } = lastPage.data;
      const totalPages = getTotalPages({ pageSize, totalItems });
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  const formattedData =
    queryData?.data?.pages
      ?.flatMap(page => page?.data?.records)
      ?.filter(val => !!val) || [];

  const queryClient = useQueryClient();
  const customRefetch = () => queryClient.resetQueries({ queryKey });

  return { customRefetch, formattedData, queryData };
};

interface UseGetBookingsAttendeeDetailsProps
  extends UseGetBookingsAttendeesProps {
  parentId: number;
}

export const useGetBookingsEventAttendeeDetails = (
  props: UseGetBookingsAttendeeDetailsProps,
) => {
  const { enabled, id, parentId } = props;
  const queryKey = [
    queryKeys.GET_EVENT_BOOKINGS,
    'getSingleBookingsEventsAttendeeDetailRes',
    id,
    parentId,
  ];

  const queryData = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getSingleBookingsEventsAttendeeDetailRes({
        id,
        parentId,
      });
      if (response.ok) {
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
    enabled,
  });

  const queryClient = useQueryClient();
  const customRefetch = () => queryClient.resetQueries({ queryKey });

  return { customRefetch, queryData };
};

export const useGetBookingsGroupAccessAttendeeDetails = (
  props: UseGetBookingsAttendeeDetailsProps,
) => {
  const { enabled, id, parentId } = props;
  const queryKey = [
    queryKeys.GET_GROUP_ACCESS_BOOKINGS,
    'getSingleBookingsGroupAccessAttendeeDetailRes',
    id,
    parentId,
  ];

  const queryData = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getSingleBookingsGroupAccessAttendeeDetailRes({
        id,
        parentId,
      });
      if (response.ok) {
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
    enabled,
  });

  const queryClient = useQueryClient();
  const customRefetch = () => queryClient.resetQueries({ queryKey });

  return { customRefetch, queryData };
};

export const useGetBillsMetrics = () => {
  const { selectedProperty } = useAuthStore();
  const id = selectedProperty?.id;
  const queryKey = [queryKeys.GET_BILLS_AND_COLLECTIONS, 'getBillsMetrics', id];

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getBillsMetrics(id || 0);
      if (response.ok) {
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
    enabled: !!id,
  });

  const queryClient = useQueryClient();
  const customRefetch = () => queryClient.resetQueries({ queryKey });

  const unPaidEstatePaymentCount =
    (data?.totalUnpaidBillCount || 0) + (data?.totalUnpaidCollectionCount || 0);

  const unpaidEstatePaymentAmount =
    (data?.totalBillDueAmount || 0) + (data?.totalColllectionDueAmount || 0);

  const overDueEstatePaymentCount =
    (data?.overDueBillCount || 0) + (data?.overDueCollectionCount || 0);

  const dueEstatePaymentCount =
    (data?.totalDueBillCount || 0) + (data?.totalDueCollectionCount || 0);

  const isEstatePaymentOverdue =
    !!data?.isBillOverDue || !!data?.isCollectionOverDue;

  const earliestPaymentDueDay = Math.min(
    data?.dueBillDays || 0,
    data?.dueCollectionDays || 0,
  );

  return {
    unPaidEstatePaymentCount,
    unpaidEstatePaymentAmount,
    overDueEstatePaymentCount,
    dueEstatePaymentCount,
    earliestPaymentDueDay,
    isEstatePaymentOverdue,
    isLoading,
    customRefetch,
  };
};

export const useGetFees = () => {
  return useQuery({
    queryKey: ['getUtilitiesFees'],
    queryFn: async () => {
      const response = await getUtilitiesFees();
      if (response.ok) {
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
  });
};
