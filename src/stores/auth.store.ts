import { useStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { LoginRes } from '@src/api/auth.api';
import { transformMMKVStore } from '.';

export interface AuthStore {
  loginResponse: LoginRes | null;
  FCMToken: string | null;

  logout: () => void;
  setLoginResponse: (value: LoginRes | null) => void;
  setFCMToken: (value: string) => void;
}

const authStoreName = 'useSesaResidentsAuthStore';

const defaultState = {
  loginResponse: null,
  FCMToken: null,
};

export const authStore = createWithEqualityFn(
  persist<AuthStore>(
    set => ({
      // DEFAULT STATE
      ...defaultState,

      //   ACTIONS OR MUTATORS
      logout: () => set(() => defaultState),

      setLoginResponse: loginResponse => set(() => ({ loginResponse })),

      setFCMToken: FCMToken => set(() => ({ FCMToken })),
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
