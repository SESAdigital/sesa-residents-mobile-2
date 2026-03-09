import { useQuery, useQueryClient } from '@tanstack/react-query';

import queryKeys from '@src/api/constants/queryKeys';
import { handleToastApiError } from '@src/utils/handleErrors';
import {
  getAccountProfile,
  getNotificationPreference,
} from '@src/api/auth.api';
import { useAuthStore } from '@src/stores/auth.store';
import {
  getDashboardHappeningTodayEvents,
  getDashboardHappeningTodayGroupAccess,
  getDashboardHappeningTodayVisitors,
  getDashboardProperties,
  getWalletBalance,
} from '@src/api/dashboard.api';
import { formatMoneyToTwoDecimals } from '@src/utils';
import { getSingleEmergencyContact } from '@src/api/profile.api';
import { getPropertyDetails } from '@src/api/property-details.api';

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

  const customRefetch = () => queryClient.removeQueries({ queryKey });

  return { value, customRefetch, propertyId: selectedProperty?.id };
};

export const useGetVistorHappeningToday = () => {
  const { selectedProperty } = useAuthStore();

  const id = selectedProperty?.id;

  const queryKey = [
    queryKeys.GET_VISTOR_BOOKINGS,
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
