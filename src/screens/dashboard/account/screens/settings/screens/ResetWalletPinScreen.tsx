import { useMutation } from '@tanstack/react-query';
import { Fragment, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import {
  postSendResetPinOTP,
  postValidateResetPinOTP,
} from '@src/api/auth.api';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import useBackHandler from '@src/hooks/useBackHandler';
import AppLoadingModal from '@src/modals/AppLoadingModal';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import WalletPinInput from '@src/screens/auth/components/WalletPinInput';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';

const seconds = 60;

const ResetWalletPinScreen = (): React.JSX.Element => {
  const [pin, setPin] = useState<string>('');
  const [confirmPin, setConfirmPin] = useState<string>('');
  const [OTP, setOTP] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const navigation = useAppNavigator();
  const postValidateResetPinOTPAPI = useMutation({
    mutationFn: postValidateResetPinOTP,
  });
  const postSendResetPinOTPAPI = useMutation({
    mutationFn: postSendResetPinOTP,
  });
  const isLoading =
    postValidateResetPinOTPAPI?.isPending || postSendResetPinOTPAPI?.isPending;

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (timeLeft < 1) return;
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const secondsRemaining = timeLeft % 60;

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

    const response = await postValidateResetPinOTPAPI.mutateAsync({
      code: OTP,
      newPin: pin,
      confirmPin: pin,
    });

    if (response?.ok) {
      appToast.Success(
        response?.data?.message || 'Wallet PIN set up successfully',
      );
      navigation.goBack();
      navigation.goBack();
    } else {
      handleToastApiError(response);
    }
    return;
  };

  const onResendPress = async () => {
    if (isLoading) return;
    const response = await postSendResetPinOTPAPI.mutateAsync();
    if (response?.ok) {
      appToast.Success(response?.data?.message || 'Code sent successfully');
    } else {
      handleToastApiError(response);
    }
  };

  const handleResend = () => {
    if (isLoading) return;

    if (timeLeft > 0) return;

    onResendPress();
    setTimeLeft(seconds);
  };

  useEffect(() => {
    handleResend();
  }, []);

  const steps = [
    <WalletPinInput
      title="Enter OTP"
      pin={OTP}
      pinLength={5}
      onDone={() => setCurrentStep(val => val + 1)}
      onPinChange={val => setOTP(val)}
      subtitle={
        <TouchableOpacity onPress={handleResend} style={styles.subtitle}>
          <AppText
            style={[
              styles.subtitleText,
              timeLeft < 1 && { color: colors.BLUE_200 },
            ]}
          >
            Didn't receive any code? Resend Email{' '}
            {timeLeft > 0 && (
              <AppText>
                {' '}
                in {minutes}:
                {secondsRemaining < 10
                  ? `0${secondsRemaining}`
                  : `${secondsRemaining}`}{' '}
                {minutes > 0 ? 'mins' : 'secs'}
              </AppText>
            )}
          </AppText>
        </TouchableOpacity>
      }
    />,
    // <WalletPinInput
    //   title="Enter your current pin"
    //   pin={OTP}
    //   onDone={() => setCurrentStep(val => val + 1)}
    //   onPinChange={val => setOTP(val)}
    //   subtitle={'We have sent a verification code to your email address'}
    // />,

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
      <AppLoadingModal
        isLoading={isLoading && !postSendResetPinOTPAPI?.isPending}
        title="Updating PIN"
      />
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
    fontSize: Size.calcAverage(12),
  },
});

export default ResetWalletPinScreen;
