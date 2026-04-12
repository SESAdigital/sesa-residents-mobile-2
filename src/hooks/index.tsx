import { useQuery, useQueryClient } from '@tanstack/react-query';

import { postLogout } from '@src/api/auth.api';
import queryKeys from '@src/api/constants/queryKeys';
import { getPanicAlertMetrics } from '@src/api/panicAlerts.api';
import AmbulanceIcon from '@src/assets/images/icons/ambulance-icon.png';
import WalletIcon from '@src/assets/images/icons/wallet-icon.png';
import AppRestrictedModal from '@src/modals/AppRestrictedModal';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { useAppStateStore } from '@src/stores/appState.store';
import { useAuthStore } from '@src/stores/auth.store';
import { formatMoneyToTwoDecimals } from '@src/utils';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import { useGetCurrentLocation } from './useCurrentLocation';
import { useGetPropertyDetails } from './useGetRequests';
import { GetDashboardAdvertsData } from '@src/api/dashboard.api';

export const useHandlePanicAlert = () => {
  const { latitude, longitude } = useGetCurrentLocation();
  const { setActiveModal, closeActiveModal } = useAppStateStore();
  const navigation = useAppNavigator();
  const { selectedProperty } = useAuthStore();

  const { data } = useQuery({
    queryKey: ['getPanicAlertMetrics', longitude, latitude],
    queryFn: async () => {
      const response = await getPanicAlertMetrics({
        Latitude: latitude,
        Longitude: longitude,
      });
      if (response.ok && response?.data) {
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
    enabled: !!longitude && !!latitude,
  });

  const handleSuccess = () => {
    if (!data) return appToast.Warning('Unable to get panic alert metrics.');

    closeActiveModal();
    navigation.navigate(routes.PANIC_ALERT_SCREEN, {
      data,
      latitude,
      longitude,
    });
    return;
  };

  const handleFundedPanicAlertClick = () => {
    if (!data?.hasEmergencyContact) {
      setActiveModal({
        modalType: 'INFORMATION_MODAL',
        informationModal: {
          title: 'No emergency contacts',
          description:
            'To trigger a panic alert, you must have an emergency contact.',
          icon: AmbulanceIcon,
          yesButtonTitle: 'Add emergency contact',
          onYesButtonClick: () => {
            closeActiveModal();
            navigation.navigate(routes.EMERGENCY_CONTACTS_SCREEN);
          },
          noButtonTitle: 'Skip for now',
          onNoButtonClick: handleSuccess,
        },
      });
    } else {
      handleSuccess();
    }
  };

  const handlePanicAlertClick = () => {
    if (!data)
      return appToast.Warning(
        'Panic alert data is loading... please try again in a few seconds',
      );

    if (!selectedProperty?.id)
      return appToast.Error('Please select a property');

    const fee = formatMoneyToTwoDecimals({ amount: data?.panicAlertFes });

    if (data?.isWalletLow) {
      setActiveModal({
        modalType: 'INFORMATION_MODAL',
        informationModal: {
          title: 'Wallet balance too low',
          description: `To trigger a panic alert, you must have at least ${fee} in your wallet.`,
          icon: WalletIcon,
          yesButtonTitle: 'Add Money',
          onYesButtonClick: () => {
            closeActiveModal();
            navigation.navigate(routes.ADD_MONEY_SCREEN);
          },
        },
      });
    } else {
      setActiveModal({
        modalType: 'PROMT_MODAL',
        promptModal: {
          noButtonTitle: 'Cancel',
          yesButtonTitle: 'Yes, trigger',
          title: 'Trigger panic alert?',
          description: `A message will be sent to your emergency contacts. ${fee} will be debited from your wallet.`,
          onYesButtonClick: handleFundedPanicAlertClick,
        },
      });
    }

    return;
  };

  return { handlePanicAlertClick, data, latitude, longitude };
};

export const useLogout = () => {
  const { logout } = useAuthStore();
  const { reset, setIsAppModalLoading, closeActiveModal, setActiveModal } =
    useAppStateStore();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    setIsAppModalLoading(true);
    await postLogout();
    setIsAppModalLoading(false);

    logout();
    closeActiveModal();
    appToast.Success('Logout successful');

    setTimeout(() => {
      queryClient.cancelQueries();
      queryClient.removeQueries();
      queryClient.clear();
      reset?.();
    }, 400);
  };

  const onLogoutClick: () => void = () => {
    setActiveModal({
      modalType: 'PROMT_MODAL',
      promptModal: {
        yesButtonTitle: 'No, cancel',
        isInverse: true,
        noButtonTitle: 'Yes, sign out',
        title: 'Sign out?',
        description:
          'You are about to sign out of your account. Are you sure you want to sign out?',
        onYesButtonClick: handleLogout,
      },
    });
  };

  return { onLogoutClick };
};

export const useCheckIsGroupAccessEnabled = () => {
  const {
    value: { data, isLoading },
  } = useGetPropertyDetails();
  const navigation = useAppNavigator();
  const { setActiveModal, closeActiveModal } = useAppStateStore();

  const handlePress = () => {
    closeActiveModal();
    navigation.navigate(routes.PROPERTY_DETAILS_CONFIGURE_ACCESS_SCREEN);
  };

  const handleGroupAccessClick = () => {
    if (isLoading)
      return appToast.Warning('Fetching property details, please wait...');

    if (data?.enableGroupAccess) {
      navigation.replace(routes.CREATE_GROUP_ACCESS_SCREEN);
    } else {
      setActiveModal({
        modalType: 'EMPTY_MODAL',
        shouldBackgroundClose: true,
        emptyModalComponent: (
          <AppRestrictedModal
            title="Group access disabled"
            description="Your group access settings is disabled. Enable it to continue."
            buttonTitle="Go to access settings"
            secondaryButtonTitle="Don’t enable"
            onButtonPress={handlePress}
          />
        ),
      });
    }

    return;
  };

  return { handleGroupAccessClick };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const includeItems = [queryKeys.GET_BILLS_AND_COLLECTIONS];
interface HandleRefreshTransactionalData {
  include?: (typeof includeItems)[number][];
}

export const useHandleTransactionRefresh = () => {
  const queryClient = useQueryClient();

  const handleRefreshTransactionalData = (
    props?: HandleRefreshTransactionalData,
  ) => {
    queryClient.resetQueries({ queryKey: [queryKeys.GET_WALLET_BALANCE] });
    queryClient.resetQueries({ queryKey: [queryKeys.GET_WALLET_TRANSACTIONS] });
    props?.include?.forEach(item => {
      queryClient.resetQueries({ queryKey: [item] });
    });
  };

  return { handleRefreshTransactionalData };
};

export const useAdvertActions = () => {
  const { setAdsLog, adsLog } = useAuthStore();

  const findAndDeleteOldAds = (advertsData: GetDashboardAdvertsData[]) => {
    if (!advertsData || advertsData?.length < 1) return;
    const allIds = advertsData?.map(ad => ad?.id);

    const pastKeys = Object.keys(adsLog)
      ?.map(key => Number(key))
      .filter(key => !allIds.includes(key));

    if (pastKeys?.length > 0) {
      const newAdsLog = { ...adsLog };
      pastKeys.forEach(id => {
        delete newAdsLog[id];
      });
      setAdsLog(newAdsLog);
    }

    const newAdvertsLog = { ...adsLog };
    advertsData?.forEach(ad => {
      if (!newAdvertsLog[ad?.id]) {
        newAdvertsLog[ad?.id] = 0;
      }
    });
    setAdsLog(newAdvertsLog);
  };

  return { findAndDeleteOldAds };
};
