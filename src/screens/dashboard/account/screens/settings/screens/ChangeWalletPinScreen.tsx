import { Fragment, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import WalletPinInput from '@src/screens/auth/components/WalletPinInput';
import Size from '@src/utils/useResponsiveSize';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import fonts from '@src/configs/fonts';
import colors from '@src/configs/colors';
import useBackHandler from '@src/hooks/useBackHandler';
import { useMutation } from '@tanstack/react-query';
import { patchChangeWalletPin } from '@src/api/auth.api';
import AppLoadingModal from '@src/modals/AppLoadingModal';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';

const ChangeWalletPinScreen = (): React.JSX.Element => {
  const [pin, setPin] = useState<string>('');
  const [confirmPin, setConfirmPin] = useState<string>('');
  const [currentPIN, setCurrentPIN] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const navigation = useAppNavigator();
  const patchChangeWalletPinAPI = useMutation({
    mutationFn: patchChangeWalletPin,
  });
  const isLoading = patchChangeWalletPinAPI?.isPending;

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

    const response = await patchChangeWalletPinAPI.mutateAsync({
      currentPIN,
      newPIN: pin,
      confirmPIN: pin,
    });

    if (response?.ok) {
      appToast.Success(
        response?.data?.message || 'Wallet PIN set up successfully',
      );
      navigation.goBack();
    } else {
      handleToastApiError(response);
    }
    return;
  };

  const steps = [
    <WalletPinInput
      title="Enter your current pin"
      pin={currentPIN}
      onDone={() => setCurrentStep(val => val + 1)}
      onPinChange={val => setCurrentPIN(val)}
      subtitle={
        <TouchableOpacity
          onPress={() => navigation.navigate(routes.RESET_WALLET_PIN_SCREEN)}
          style={styles.subtitle}
        >
          <AppText style={styles.subtitleText}>Forgot Pin?</AppText>
        </TouchableOpacity>
      }
    />,

    <WalletPinInput
      pin={pin}
      onDone={() => setCurrentStep(val => val + 1)}
      onPinChange={val => setPin(val)}
      title="Enter new PIN"
      subtitle="To begin, enter your new PIN."
    />,

    <WalletPinInput
      pin={confirmPin}
      onDone={handleDone}
      onPinChange={val => setConfirmPin(val)}
      title="Repeat new PIN"
      subtitle="To confirm, enter your new PIN again."
    />,
  ];

  return (
    <AppScreen showDownInset>
      <AppScreenHeader
        onBackPress={onBackPress}
        containerStyle={{ paddingVertical: Size.calcHeight(24) }}
      />

      {steps?.map((step, index) =>
        index === currentStep ? <Fragment key={index}>{step}</Fragment> : null,
      )}
      <AppLoadingModal isLoading={isLoading} title="Updating PIN" />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    marginHorizontal: 'auto',
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(4),
  },

  subtitleText: {
    fontFamily: fonts.INTER_500,
    color: colors.BLUE_200,
  },
});

export default ChangeWalletPinScreen;
