import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import SubmitButton from '@src/components/forms/SubmitButton';
import { MailSuccessIcon } from '@src/components/icons/custom';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import Size from '@src/utils/useResponsiveSize';
import AppLoadingModal from '@src/modals/AppLoadingModal';

interface Props {
  subtitle: string;
  onResendPress: () => void;
  isLoading: boolean;
  buttonTitle?: string;
  onProceed?: () => void;
  showBackButton?: boolean;
}

const seconds = 60;

const CheckYourMailComponent = (props: Props): React.JSX.Element => {
  const navigation = useAppNavigator();
  const {
    subtitle,
    onResendPress,
    isLoading,
    buttonTitle,
    onProceed,
    showBackButton,
  } = props;

  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft < 1) return;
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const secondsRemaining = timeLeft % 60;

  const handleSubmit = () => {
    if (isLoading) return;

    if (onProceed) {
      onProceed();
    } else {
      navigation.replace(routes.LOGIN_SCREEN);
    }

    return;
  };

  const handleResend = () => {
    if (isLoading) return;

    if (timeLeft > 0) return;

    onResendPress();
    setTimeLeft(seconds);
  };

  return (
    <AppScreen showDownInset style={{ paddingHorizontal: Size.calcWidth(21) }}>
      <View style={styles.innerContainer}>
        <MailSuccessIcon
          style={{ marginHorizontal: 'auto' }}
          height={Size.calcAverage(145)}
          width={Size.calcAverage(145)}
        />
        <AppText style={styles.title}>Check your mail</AppText>
        <AppText style={styles.subtitle}>{subtitle}</AppText>

        <View style={styles.resendContainer}>
          <AppText style={{ fontFamily: fonts.INTER_500 }}>
            Didn’t get an email?{' '}
          </AppText>
          <TouchableOpacity onPress={handleResend}>
            <AppText
              style={[styles.resend, timeLeft > 0 && styles.resendPending]}
            >
              Resend Email{' '}
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
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {!!showBackButton && (
          <SubmitButton
            title="Cancel"
            variant="SECONDARY"
            isLoading={false}
            disabled={isLoading}
            onPress={handleSubmit}
            style={{ width: '49%' }}
          />
        )}
        <SubmitButton
          style={{ width: showBackButton ? '49%' : '100%' }}
          title={buttonTitle || 'Continue To Login'}
          isLoading={false}
          disabled={isLoading}
          onPress={handleSubmit}
        />
      </View>
      <AppLoadingModal
        isLoading={isLoading}
        title="Looking up your account..."
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: Size.calcHeight(15),
    paddingBottom: Size.calcHeight(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  innerContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  resend: {
    fontFamily: fonts.INTER_500,
    color: colors.BLUE_200,
    padding: Size.calcAverage(2),
  },

  resendPending: {
    opacity: 0.5,
    color: colors.BLACK_100,
  },

  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  subtitle: {
    textAlign: 'center',
    maxWidth: Size.calcWidth(380),
    marginHorizontal: 'auto',
    paddingBottom: Size.calcHeight(28),
  },

  title: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(24),
    textAlign: 'center',
    paddingTop: Size.calcHeight(24),
    paddingBottom: Size.calcHeight(12),
  },
});

export default CheckYourMailComponent;
