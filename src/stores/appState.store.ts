import { Contact } from 'react-native-contacts';
import { useStore } from 'zustand';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { AppModalProps } from '@src/modals/AppModal';
import { appToast } from '@src/utils/appToast';
import {
  GetHouseholdPropertiesResData,
  GetHouseholdPropertyDependentsResData,
  GetHouseholdSiteWorkersResData,
} from '@src/api/household.api';

interface AppStateStore {
  activeModal: AppModalProps | null;
  isAppModalLoading: boolean;
  allPhoneContacts: Contact[];
  selectedDependent: GetHouseholdPropertyDependentsResData | null;
  selectedHousehold: GetHouseholdPropertiesResData | null;
  selectedSiteWorker: GetHouseholdSiteWorkersResData | null;

  closeActiveModal: () => void;
  setActiveModal: (value: AppModalProps) => void;
  setIsAppModalLoading: (val: boolean) => void;
  setAllPhoneContacts: (val: Contact[]) => void;
  reset: () => void;
  setSelectedDependent: (value: GetHouseholdPropertyDependentsResData) => void;
  setSelectedHousehold: (value: GetHouseholdPropertiesResData) => void;
  setSelectedSiteWorker: (value: GetHouseholdSiteWorkersResData) => void;
}

const defaultState = {
  activeModal: null,
  isAppModalLoading: false,
  shiftDetailsScreenId: null,
  qrCodeDetail: null,
  allPhoneContacts: [],
  selectedDependent: null,
  selectedHousehold: null,
  selectedSiteWorker: null,
};

export const appStateStore = createWithEqualityFn<AppStateStore>(
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
    setSelectedDependent: selectedDependent =>
      set(() => ({ selectedDependent })),
    setSelectedHousehold: selectedHousehold =>
      set(() => ({ selectedHousehold })),
    setSelectedSiteWorker: selectedSiteWorker =>
      set(() => ({ selectedSiteWorker })),
  }),
  shallow,
);

export const useAppStateStore = () => {
  return useStore(appStateStore);
};
