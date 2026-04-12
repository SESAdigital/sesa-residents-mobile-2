import { useMutation } from '@tanstack/react-query';
import { Fragment, useState } from 'react';
import { StyleSheet } from 'react-native';

import { patchSetupPin } from '@src/api/auth.api';
import AppScreen from '@src/components/AppScreen';
import AppGoBackHeader from '@src/components/common/AppGoBackHeader';
import colors from '@src/configs/colors';
import useBackHandler from '@src/hooks/useBackHandler';
import AppLoadingModal from '@src/modals/AppLoadingModal';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import { useAuthStore } from '@src/stores/auth.store';
import appConfig from '@src/utils/appConfig';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import WalletPinInput from './components/WalletPinInput';

const SetupWalletPinScreen = (): React.JSX.Element => {
  const [pin, setPin] = useState<string>('');
  const [confirmPin, setConfirmPin] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const navigation = useAppNavigator();
  const patchSetupPinAPI = useMutation({ mutationFn: patchSetupPin });
  const isLoading = patchSetupPinAPI?.isPending;
  const {
    setIsDoneOnboarding,
    setIsFirstTimeLogin,
    isFirstTimeLogin,
    isDoneOnboarding,
  } = useAuthStore();

  const onBackPress = () => {
    if (isLoading) return;

    if (currentStep === 0) {
      navigation.goBack();
    } else {
      setCurrentStep(val => val - 1);
    }
  };

  useBackHandler(onBackPress, currentStep);

  const handleDone = async (newPin: string) => {
    if (isLoading) return;
    if (newPin !== pin) return appToast.Warning('PINs do not match');

    const response = await patchSetupPinAPI.mutateAsync({
      confirmPin: newPin,
      newPin: pin,
    });

    if (response?.ok) {
      if (!isDoneOnboarding) setIsDoneOnboarding(true);
      if (isFirstTimeLogin) setIsFirstTimeLogin(false);
      appToast.Success(
        response?.data?.message || 'Wallet PIN set up successfully',
      );
    } else {
      handleToastApiError(response);
    }
    return;
  };

  const steps = [
    <WalletPinInput
      pin={pin}
      onDone={() => setCurrentStep(val => val + 1)}
      onPinChange={val => setPin(val)}
      title="Set up your wallet PIN"
      subtitle={`Enter your ${appConfig.APP_PIN_LENGTH}-digit PIN below.`}
    />,
    <WalletPinInput
      pin={confirmPin}
      onDone={handleDone}
      onPinChange={val => setConfirmPin(val)}
      title="Repeat your wallet PIN"
      subtitle={`To confirm, enter your ${appConfig.APP_PIN_LENGTH}-digit PIN again.`}
    />,
  ];

  return (
    <AppScreen showDownInset style={styles.container}>
      <AppGoBackHeader onBackPress={onBackPress} />

      {steps?.map((step, index) =>
        index === currentStep ? <Fragment key={index}>{step}</Fragment> : null,
      )}
      <AppLoadingModal isLoading={isLoading} title="Preparing your account.." />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE_200,
    paddingHorizontal: 0,
  },
});

export default SetupWalletPinScreen;
