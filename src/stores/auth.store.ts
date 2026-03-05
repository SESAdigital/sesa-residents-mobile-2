import { useStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { transformMMKVStore } from './index';
import { PostLoginRes } from '@src/api/auth.api';
import type { GetDashboardPropertiesData } from '@src/api/dashboard.api';
import { LoginSchema } from '@src/screens/auth/LoginScreen';
import { LoginModeData, LoginModeType } from '@src/api/constants/default';

export interface AuthStore {
  loginResponse: PostLoginRes | null;
  loginReq: LoginSchema | null;
  isPasswordRemembered: boolean;
  isBiometricEnabled: boolean;
  loginMode: LoginModeType;
  isDoneOnboarding: boolean;
  selectedProperty: GetDashboardPropertiesData | null;

  logout: () => void;
  setLoginResponse: (value: PostLoginRes) => void;
  setSelectedProperty: (value: GetDashboardPropertiesData | null) => void;
  setIsDoneOnboarding: (value: boolean) => void;
  setLoginReq: (value: LoginSchema) => void;
  setIsPasswordRemembered: (value: boolean) => void;
  setIsBiometricEnabled: (value: boolean) => void;
  setLoginMode: (value: LoginModeType) => void;
}

const authStoreName = 'useResidentsAuthStore';

const defaultState = {
  loginResponse: null,
  isDoneOnboarding: false,
  selectedProperty: null,
};

const doNotDeleteState = {
  loginReq: null,
  isPasswordRemembered: false,
  isBiometricEnabled: false,
  loginMode: LoginModeData.EmailAddress,
};

export const authStore = createWithEqualityFn(
  persist<AuthStore>(
    set => ({
      // DEFAULT STATE
      ...defaultState,
      ...doNotDeleteState,

      //   ACTIONS OR MUTATORS
      logout: () => set(() => ({ ...defaultState })),

      setLoginResponse: loginResponse => set(() => ({ loginResponse })),

      setSelectedProperty: selectedProperty =>
        set(() => ({ selectedProperty })),

      setIsDoneOnboarding: isDoneOnboarding =>
        set(() => ({ isDoneOnboarding })),

      setLoginReq: loginReq => set(() => ({ loginReq })),

      setIsPasswordRemembered: isPasswordRemembered =>
        set(() => ({ isPasswordRemembered })),

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
