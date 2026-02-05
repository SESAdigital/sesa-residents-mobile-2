import { useStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { transformMMKVStore } from './index';
import { PostLoginRes } from '@src/api/auth.api';
import { GetDashboardPropertiesData } from '@src/api/dashboard.api';

export interface AuthStore {
  loginResponse: PostLoginRes | null;
  isDoneOnboarding: boolean;
  selectedProperty: GetDashboardPropertiesData | null;

  logout: () => void;
  setLoginResponse: (value: PostLoginRes) => void;
  setSelectedProperty: (value: GetDashboardPropertiesData | null) => void;
  setIsDoneOnboarding: (value: boolean) => void;
}

const authStoreName = 'useResidentsAuthStore';

const defaultState = {
  loginResponse: null,
  isDoneOnboarding: false,
  selectedProperty: null,
};

export const authStore = createWithEqualityFn(
  persist<AuthStore>(
    set => ({
      // DEFAULT STATE
      ...defaultState,

      //   ACTIONS OR MUTATORS
      logout: () => set(() => defaultState),

      setLoginResponse: loginResponse => set(() => ({ loginResponse })),

      setSelectedProperty: selectedProperty =>
        set(() => ({ selectedProperty })),

      setIsDoneOnboarding: isDoneOnboarding =>
        set(() => ({ isDoneOnboarding })),
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
