import { useStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { transformMMKVStore } from './index';
import { PostLoginRes } from '@src/api/auth.api';

export interface AuthStore {
  loginResponse: PostLoginRes | null;
  isDoneOnboarding: boolean;

  logout: () => void;
  setLoginResponse: (value: PostLoginRes) => void;
  setIsDoneOnboarding: (value: boolean) => void;
}

const authStoreName = 'useResidentsAuthStore';

const defaultState = {
  loginResponse: null,
  isDoneOnboarding: false,
};

export const authStore = createWithEqualityFn(
  persist<AuthStore>(
    set => ({
      // DEFAULT STATE
      ...defaultState,

      //   ACTIONS OR MUTATORS
      logout: () => set(() => defaultState),

      setLoginResponse: loginResponse => set(() => ({ loginResponse })),

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
