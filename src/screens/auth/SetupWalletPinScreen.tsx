import { useMutation } from '@tanstack/react-query';
import { Activity, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { patchSetupPin } from '@src/api/auth.api';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import { MaterialSymbolsChevronLeft } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import useBackHandler from '@src/hooks/useBackHandler';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import { useAuthStore } from '@src/stores/auth.store';
import appConfig from '@src/utils/appConfig';
import { appToast } from '@src/utils/appToast';
import Size from '@src/utils/useResponsiveSize';
import WalletPinInput from './components/WalletPinInput';
import { handleToastApiError } from '@src/utils/handleErrors';
import AppLoadingModal from '@src/modals/AppLoadingModal';

const SetupWalletPinScreen = (): React.ReactNode => {
  const [pin, setPin] = useState<string>('');
  const [confirmPin, setConfirmPin] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const navigation = useAppNavigator();
  const patchSetupPinAPI = useMutation({ mutationFn: patchSetupPin });
  const isLoading = patchSetupPinAPI?.isPending;
  const { setIsDoneOnboarding, isDoneOnboarding } = useAuthStore();

  const onBackPress = () => {
    if (isLoading) return;

    if (currentStep == 0) {
      navigation.goBack();
    } else {
      setCurrentStep(val => val - 1);
    }
  };

  useBackHandler(onBackPress, currentStep);

  const handleDone = async (newPin: string) => {
    if (isLoading) return;
    if (newPin != pin) return appToast.Warning('PINs do not match');

    const response = await patchSetupPinAPI.mutateAsync({
      confirmPin: newPin,
      newPin: pin,
    });

    if (response?.ok) {
      if (!isDoneOnboarding) setIsDoneOnboarding(true);
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
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.headerButton}>
          <MaterialSymbolsChevronLeft
            height={Size.calcAverage(24)}
            width={Size.calcAverage(24)}
            color={colors.BLACK_100}
          />
          <AppText style={{ fontFamily: fonts.INTER_500 }}>Go Back</AppText>
        </TouchableOpacity>
      </View>

      {steps?.map((step, index) => (
        <Activity
          mode={index == currentStep ? 'visible' : 'hidden'}
          key={index}
        >
          {step}
        </Activity>
      ))}
      <AppLoadingModal isLoading={isLoading} title="Preparing your account.." />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE_200,
    paddingHorizontal: 0,
  },

  header: {
    padding: Size.calcAverage(11),
    borderColor: colors.LIGHT_GRAY_200,
    borderBottomWidth: Size.calcHeight(1),
  },

  headerButton: {
    flexDirection: 'row',
    rowGap: Size.calcWidth(8),
    alignItems: 'center',
    padding: Size.calcAverage(10),
    marginRight: 'auto',
  },
});

export default SetupWalletPinScreen;
