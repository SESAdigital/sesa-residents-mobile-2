import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import Joi from 'joi';
import { Activity, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { postForgotPassword, PreLoginReq } from '@src/api/auth.api';
import { LoginModeData, LoginModeType } from '@src/api/constants/default';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppGoBackHeader from '@src/components/common/AppGoBackHeader';
import AppKeyboardAvoidingView from '@src/components/custom/AppKeyboardAvoidingView';
import AppTextInput from '@src/components/forms/AppTextInput';
import SubmitButton from '@src/components/forms/SubmitButton';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import AppLoadingModal from '@src/modals/AppLoadingModal';
import { ForgotPasswordScreenProps } from '@src/navigation/AppNavigator';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import { joiSchemas } from '@src/utils/schema';
import Size from '@src/utils/useResponsiveSize';
import LoginModeToggle from './components/LoginModeToggle';

const schema = Joi.object<PreLoginReq>({
  email: joiSchemas.email.optional().allow(''),
  phoneNumber: joiSchemas.phone.optional().allow(''),
});

export interface ForgotPasswordScreenParam {
  email?: string;
  phoneNumber?: string;
}

const ForgotPasswordScreen = (val: {
  route: ForgotPasswordScreenProps;
}): React.ReactNode => {
  const param = val?.route?.params;
  const [selectedMode, setSelectedMode] = useState<LoginModeType>(
    param?.phoneNumber ? LoginModeData.PhoneNumber : LoginModeData.EmailAddress,
  );

  const postForgotPasswordAPI = useMutation({ mutationFn: postForgotPassword });
  const { handleSubmit, control } = useForm<PreLoginReq>({
    resolver: joiResolver(schema),
    defaultValues: {
      email: param?.email,
      phoneNumber: param?.phoneNumber,
    },
  });

  const isEmailLogin = selectedMode === LoginModeData.EmailAddress;

  const isLoading = postForgotPasswordAPI?.isPending;

  const onSubmit = handleSubmit(async data => {
    if (isLoading) return;

    const email = data?.email?.trim()?.toLowerCase();
    const phoneNumber = data?.phoneNumber?.trim()?.toLowerCase();

    if (isEmailLogin && !email)
      return appToast.Info('Please enter an email address');
    if (!isEmailLogin && !phoneNumber)
      return appToast.Info('Please enter a phone number');

    const response = await postForgotPasswordAPI.mutateAsync({
      loginMode: selectedMode,
      ...(isEmailLogin ? { email } : { phoneNumber }),
    });

    if (response?.ok) {
      appToast.Success(response?.data?.message ?? 'Password reset successful');
      //   navigation.navigate(routes.SETUP_PASSWORD_SCREEN);
    } else {
      handleToastApiError(response);
    }

    return;
  });

  return (
    <AppKeyboardAvoidingView
      keyboardVerticalOffset={-Size.calcHeight(50)}
      style={{ flex: 1 }}
    >
      <AppScreen showDownInset style={styles.container}>
        <AppGoBackHeader />
        <View style={styles.mainContainer}>
          <AppText style={styles.title}>Forgot your password?</AppText>
          <AppText style={styles.subTitle}>
            Enter your associated email address or phone number and we will send
            a new password.
          </AppText>

          <LoginModeToggle
            selectedMode={selectedMode}
            onSelectMode={setSelectedMode}
          />

          <View style={styles.content}>
            <Activity mode={isEmailLogin ? 'visible' : 'hidden'}>
              <AppTextInput
                editable={!isLoading}
                placeholder="Email Address"
                label="Email Address"
                control={control}
                name="email"
                keyboardType="email-address"
              />
            </Activity>
            <Activity mode={!isEmailLogin ? 'visible' : 'hidden'}>
              <AppTextInput
                editable={!isLoading}
                maxLength={11}
                placeholder="Phone Number"
                label="Phone Number"
                control={control}
                name="phoneNumber"
                keyboardType="number-pad"
              />
            </Activity>
          </View>

          <View style={styles.buttonContainer}>
            <SubmitButton title="Continue" onPress={onSubmit} />
          </View>
        </View>
      </AppScreen>
      <AppLoadingModal
        isLoading={isLoading}
        title="Looking up your account..."
      />
    </AppKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: Size.calcHeight(15),
    paddingBottom: Size.calcHeight(40),
  },

  container: {
    backgroundColor: colors.WHITE_200,
    flex: 1,
    paddingHorizontal: 0,
  },

  content: {
    paddingTop: Size.calcHeight(24),
    flex: 1,
    rowGap: Size.calcAverage(24),
  },

  forgotPasswordContainer: {
    padding: Size.calcAverage(3),
    marginHorizontal: 'auto',
  },

  forgotPasswordText: {
    fontFamily: fonts.INTER_500,
    color: colors.BLUE_200,
  },

  mainContainer: {
    flex: 1,
    paddingHorizontal: Size.calcAverage(16),
  },

  subTitle: {
    fontFamily: fonts.INTER_500,
    paddingBottom: Size.calcHeight(24),
  },

  title: {
    fontSize: Size.calcAverage(24),
    fontFamily: fonts.INTER_600,
    paddingBottom: Size.calcHeight(12),
    paddingTop: Size.calcHeight(20),
  },
});

export default ForgotPasswordScreen;
