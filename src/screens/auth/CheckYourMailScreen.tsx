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
import { loginScreenStyles } from './LoginScreen';

const CheckYourMailScreen = (): React.ReactNode => {
  const navigation = useAppNavigator();

  return (
    <AppScreen>
      <View style={styles.innerContainer}>
        <MailSuccessIcon
          style={{ marginHorizontal: 'auto' }}
          height={Size.calcAverage(145)}
          width={Size.calcAverage(145)}
        />
        <AppText style={styles.title}>Check your mail</AppText>
        <AppText style={styles.subtitle}>
          Friends Colony Estate has onboarded you. Your login credentials have
          been sent to your email.
        </AppText>

        <View style={styles.resendContainer}>
          <AppText style={{ fontFamily: fonts.INTER_500 }}>
            Didn’t get an email?{' '}
          </AppText>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <AppText style={styles.resend}>Resend Email</AppText>
          </TouchableOpacity>
        </View>
      </View>
      <View style={loginScreenStyles.buttonContainer}>
        <SubmitButton
          title="Continue To Login"
          isLoading={false}
          onPress={() => navigation.replace(routes.LOGIN_SCREEN)}
        />
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  resend: {
    fontFamily: fonts.INTER_500,
    color: colors.BLUE_200,
    padding: Size.calcAverage(2),
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

export default CheckYourMailScreen;
