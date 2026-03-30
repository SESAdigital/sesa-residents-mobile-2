import { useStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { transformMMKVStore } from './index';
import { PostLoginRes } from '@src/api/auth.api';
import type { GetDashboardPropertiesData } from '@src/api/dashboard.api';
import { LoginSchema } from '@src/screens/auth/LoginScreen';
import { LoginModeData, LoginModeType } from '@src/api/constants/default';
import appConfig from '@src/utils/appConfig';

export interface AuthStore {
  loginResponse: PostLoginRes | null;
  loginReq: LoginSchema | null;
  isPasswordRemembered: boolean;
  isBiometricEnabled: boolean;
  loginMode: LoginModeType;
  FCMToken: string | null;
  isDoneOnboarding: boolean;
  selectedProperty: GetDashboardPropertiesData | null;

  logout: () => void;
  tempLogout: () => void;
  setLoginResponse: (value: PostLoginRes) => void;
  setSelectedProperty: (value: GetDashboardPropertiesData | null) => void;
  setIsDoneOnboarding: (value: boolean) => void;
  setLoginReq: (value: LoginSchema) => void;
  setIsPasswordRemembered: (value: boolean) => void;
  setFCMToken: (value: string) => void;
  setIsBiometricEnabled: (value: boolean) => void;
  setLoginMode: (value: LoginModeType) => void;
}

const authStoreName = `useAuthStore-${appConfig.APP_CUSTOM_FLAVOUR}-${appConfig.APPLICATION_ID}`;

const defaultState = {
  loginResponse: null,
  isDoneOnboarding: false,
  selectedProperty: null,
};

const doNotDeleteState = {
  loginReq: null,
  isPasswordRemembered: false,
  isBiometricEnabled: false,
  FCMToken: null,
  loginMode: LoginModeData.EmailAddress,
};

export const authStore = createWithEqualityFn(
  persist<AuthStore>(
    (set, get) => ({
      // DEFAULT STATE
      ...defaultState,
      ...doNotDeleteState,

      //   ACTIONS OR MUTATORS
      logout: () => set(() => ({ ...defaultState })),

      setLoginResponse: loginResponse => set(() => ({ loginResponse })),

      setSelectedProperty: selectedProperty =>
        set(() => ({ selectedProperty })),

      tempLogout: () => {
        const authenticationStore = get();
        if (!authenticationStore || !authenticationStore.loginResponse) return;
        const authStoreTemp: AuthStore = {
          ...authenticationStore,
          loginResponse: {
            ...authenticationStore?.loginResponse,
            data: {
              ...authenticationStore?.loginResponse?.data,
              token: 'fake',
            },
          },
        };
        set(() => authStoreTemp);
      },

      setIsDoneOnboarding: isDoneOnboarding =>
        set(() => ({ isDoneOnboarding })),

      setLoginReq: loginReq => set(() => ({ loginReq })),

      setIsPasswordRemembered: isPasswordRemembered =>
        set(() => ({ isPasswordRemembered })),

      setFCMToken: FCMToken => set(() => ({ FCMToken })),

      setIsBiometricEnabled: isBiometricEnabled =>
        set(() => ({ isBiometricEnabled })),

      setLoginMode: loginMode => set(() => ({ loginMode })),
    }),
    {
      name: authStoreName,
      storage: transformMMKVStore(),
    },
  ),
  shallow,
);

export const useAuthStore = () => {
  return useStore(authStore);
};
