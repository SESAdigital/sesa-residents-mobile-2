import { useStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { transformMMKVStore } from './index';
import { LoginRes } from '@src/api/auth.api';

export interface AuthStore {
  loginResponse: LoginRes | null;

  logout: () => void;
  setLoginResponse: (value: LoginRes) => void;
}

const authStoreName = 'useAuthStore';

const defaultState = {
  loginResponse: null,
};

export const authStore = createWithEqualityFn(
  persist<AuthStore>(
    set => ({
      // DEFAULT STATE
      ...defaultState,

      //   ACTIONS OR MUTATORS
      logout: () => set(() => defaultState),

      setLoginResponse: loginResponse => set(() => ({ loginResponse })),
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
