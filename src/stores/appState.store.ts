import { Contact } from 'react-native-contacts';
import { useStore } from 'zustand';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { AppModalProps } from '@src/modals/AppModal';
import { appToast } from '@src/utils/appToast';

interface AppStateStore {
  activeModal: AppModalProps | null;
  isAppModalLoading: boolean;
  allPhoneContacts: Contact[];

  closeActiveModal: () => void;
  setActiveModal: (value: AppModalProps) => void;
  setIsAppModalLoading: (val: boolean) => void;
  setAllPhoneContacts: (val: Contact[]) => void;
  reset: () => void;
}

const defaultState = {
  activeModal: null,
  isAppModalLoading: false,
  shiftDetailsScreenId: null,
  qrCodeDetail: null,
  allPhoneContacts: [],
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
    setAllPhoneContacts: allPhoneContacts => set(() => ({ allPhoneContacts })),
  }),
  shallow,
);

export const useAppStateStore = () => {
  return useStore(appStateStore);
};
