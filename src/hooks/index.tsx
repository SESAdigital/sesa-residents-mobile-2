import { useQuery } from '@tanstack/react-query';

import { getPanicAlertMetrics } from '@src/api/panicAlerts.api';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { useAppStateStore } from '@src/stores/appState.store';
import { formatMoneyToTwoDecimals } from '@src/utils';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import { useGetCurrentLocation } from './useCurrentLocation';
import PanicAlertGenericModal from '@src/screens/dashboard/my-hub/panic-alert/modals/PanicAlertGenericModal';
import WalletIcon from '@src/assets/images/icons/wallet-icon.png';
import AmbulanceIcon from '@src/assets/images/icons/ambulance-icon.png';
import { useAuthStore } from '@src/stores/auth.store';

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
        modalType: 'EMPTY_MODAL',
        emptyModalComponent: (
          <PanicAlertGenericModal
            title="No emergency contacts"
            description="To trigger a panic alert, you must have an emergency contact."
            icon={AmbulanceIcon}
            yesButtonTitle="Add emergency contact"
            onYesButtonClick={() => {
              closeActiveModal();
              // @ts-expect-error nothing for now
              navigation.navigate(routes.EMERGENCY_CONTACTS_SCREEN);
            }}
            noButtonTitle="Skip for now"
            onNoButtonClick={handleSuccess}
          />
        ),
      });
    } else {
      handleSuccess();
    }
  };

  const handlePanicAlertClick = () => {
    if (!data) return appToast.Warning('Unable to get panic alert metrics.');

    if (!selectedProperty?.id)
      return appToast.Error('Please select a property');

    const fee = formatMoneyToTwoDecimals({ amount: data?.panicAlertFes });

    if (data?.isWalletLow) {
      setActiveModal({
        modalType: 'EMPTY_MODAL',
        emptyModalComponent: (
          <PanicAlertGenericModal
            title="Wallet balance too low"
            description={`To trigger a panic alert, you must have at least ${fee} in your wallet.`}
            icon={WalletIcon}
            yesButtonTitle="Add Money"
            onYesButtonClick={() => {
              closeActiveModal();
              navigation.navigate(routes.ADD_MONEY_SCREEN);
            }}
          />
        ),
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
