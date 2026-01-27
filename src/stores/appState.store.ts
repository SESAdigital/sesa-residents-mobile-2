import { useStore } from 'zustand';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { appToast } from '@src/utils/appToast';
import { AppModalProps } from '@src/modals/AppModal';

interface AppStateStore {
  activeModal: AppModalProps | null;
  isAppModalLoading: boolean;

  closeActiveModal: () => void;
  setActiveModal: (value: AppModalProps) => void;
  setIsAppModalLoading: (val: boolean) => void;
  reset: () => void;
}

const defaultState = {
  activeModal: null,
  isAppModalLoading: false,
  shiftDetailsScreenId: null,
  qrCodeDetail: null,
};

const appStateStore = createWithEqualityFn<AppStateStore>(
  set => ({
    ...defaultState,

    reset: () => set(() => defaultState),

    closeActiveModal: () => set(() => ({ activeModal: null })),
    setIsAppModalLoading: isAppModalLoading =>
      set(() => ({ isAppModalLoading })),
    setActiveModal: activeModal => {
      appToast.Dismiss();
      return set(() => ({ activeModal }));
    },
  }),
  shallow,
);

export const useAppStateStore = () => {
  return useStore(appStateStore);
};
