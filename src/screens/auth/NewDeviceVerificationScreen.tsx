import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import AppScreen from '@src/components/AppScreen';
import AppGoBackHeader from '@src/components/common/AppGoBackHeader';
import colors from '@src/configs/colors';
import AppLoadingModal from '@src/modals/AppLoadingModal';
import WalletPinInput from './components/WalletPinInput';
import { handleToastApiError } from '@src/utils/handleErrors';
import { appToast } from '@src/utils/appToast';
import { patchValidateNewDeviceCode } from '@src/api/auth.api';
import { useAuthStore } from '@src/stores/auth.store';
import { maskEmail } from '@src/utils';
import { getDeviceId } from 'react-native-device-info';

const NewDeviceVerificationScreen = (): React.JSX.Element => {
  const [pin, setPin] = useState<string>('');
  const patchValidateNewDeviceCodeAPI = useMutation({
    mutationFn: patchValidateNewDeviceCode,
  });
  const isLoading = patchValidateNewDeviceCodeAPI.isPending;
  const { isDoneOnboarding, setIsDoneOnboarding, loginResponse } =
    useAuthStore();

  const handleDone = async (code: string) => {
    if (isLoading) return;

    const response = await patchValidateNewDeviceCodeAPI.mutateAsync({
      code,
      deviceId: getDeviceId(),
      pushNotificationToken: '',
    });

    if (response?.ok) {
      if (!isDoneOnboarding) setIsDoneOnboarding(true);
      appToast.Success(response?.data?.message || 'Verification code accepted');
    } else {
      handleToastApiError(response);
    }
    return;
  };

  return (
    <AppScreen
      showDownInset
      style={{ backgroundColor: colors.WHITE_200, paddingHorizontal: 0 }}
    >
      <AppGoBackHeader />
      <WalletPinInput
        showValues
        preventVibration
        subtitleStyles={{ textAlign: 'left' }}
        titleStyles={{ textAlign: 'left' }}
        pin={pin}
        pinLength={5}
        onDone={handleDone}
        onPinChange={val => setPin(val)}
        title="Enter verification code"
        subtitle={`Enter the verification code we sent to your associated email address ${maskEmail(
          loginResponse?.data?.email || '',
        )}.`}
      />
      <AppLoadingModal isLoading={isLoading} title="Binding new device..." />
    </AppScreen>
  );
};

export default NewDeviceVerificationScreen;
