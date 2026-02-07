import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Joi from 'joi';
import { Activity, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { getDeviceId } from 'react-native-device-info';


import {
  PatchSetupPasswordReq,
  postLogin,
  PostLoginReq,
} from '@src/api/auth.api';
import {
  LoginModeData,
  LoginModeType,
  OnboardingStatusData,
} from '@src/api/constants/default';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppKeyboardAvoidingView from '@src/components/custom/AppKeyboardAvoidingView';
import AppTextInput from '@src/components/forms/AppTextInput';
import SubmitButton from '@src/components/forms/SubmitButton';
import PasswordToggle from '@src/components/icons/PasswordToggle';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useGetCurrentLocation } from '@src/hooks/useCurrentLocation';
import AppLoadingModal from '@src/modals/AppLoadingModal';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { useAuthStore } from '@src/stores/auth.store';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import { joiSchemas } from '@src/utils/schema';
import Size from '@src/utils/useResponsiveSize';
import LoginModeToggle from './components/LoginModeToggle';

export interface LoginSchema {
  email?: string;
  phoneNumber?: string;
  password: string;
}

const schema = Joi.object<LoginSchema>({
  email: joiSchemas.email.optional().allow(''),
  phoneNumber: joiSchemas.phone.optional().allow(''),
  password: joiSchemas.password,
});

const LoginScreen = (): React.ReactNode => {
  const [selectedMode, setSelectedMode] = useState<LoginModeType>(
    LoginModeData.EmailAddress,
  );
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const location = useGetCurrentLocation();
  const postLoginAPI = useMutation({ mutationFn: postLogin });
  const queryClient = useQueryClient();
  const navigation = useAppNavigator();
  const { handleSubmit, reset, control, getValues } = useForm<LoginSchema>({
    resolver: joiResolver(schema),
  });
  const { setLoginResponse, setIsDoneOnboarding } = useAuthStore();

  const isEmailLogin = selectedMode === LoginModeData.EmailAddress;

  const isLoading = postLoginAPI?.isPending;

  const onSubmit = handleSubmit(async data => {
    if (isLoading) return;

    const email = data?.email?.trim()?.toLowerCase();
    const phoneNumber = data?.phoneNumber?.trim()?.toLowerCase();
    const password = data?.password?.trim();

    if (isEmailLogin && !email)
      return appToast.Info('Please enter an email address');
    if (!isEmailLogin && !phoneNumber)
      return appToast.Info('Please enter a phone number');

    const loginData: PostLoginReq = {
      deviceId: getDeviceId(),
      latitude: location?.latitude?.toString() || '',
      longitude: location?.longitude?.toString() || '',
      loginMode: selectedMode,
      password,
      pushNotificationToken: '',
      ...(isEmailLogin ? { email } : { phoneNumber }),
    };

    const response = await postLoginAPI.mutateAsync(loginData);

    const result = response?.data;

    if (response?.ok && !!result) {
      queryClient.invalidateQueries();

      if (
        result?.data?.onboardingStatus === OnboardingStatusData.PasswordSetup
      ) {
        const setupData: PatchSetupPasswordReq = {
          deviceId: loginData?.deviceId,
          latitude: loginData?.latitude,
          longitude: loginData?.longitude,
          loginMode: loginData?.loginMode,
          pushNotificationToken: loginData?.pushNotificationToken,
          currentPassword: password,
          newPassword: '',
          ...(isEmailLogin ? { email } : { phoneNumber }),
          confirmPassword: '',
        };
        navigation.navigate(routes.SETUP_PASSWORD_SCREEN, setupData);
        appToast.Success(
          response?.data?.message ?? 'Please set up your password',
        );
      } else if (
        result?.data?.onboardingStatus === OnboardingStatusData.PinSetup
      ) {
        setLoginResponse(result);
        navigation.navigate(routes.ONE_LAST_STEP_SCREEN);
        appToast.Success(
          response?.data?.message ?? 'Please set up your wallet pin',
        );
      } else if (
        result?.data?.onboardingStatus === OnboardingStatusData.NewDevice
      ) {
        setLoginResponse(result);
        navigation.navigate(routes.NEW_DEVICE_SCREEN);
        appToast.Success(
          response?.data?.message ?? 'Please verify your new device',
        );
      } else {
        setLoginResponse(result);
        appToast.Success(response?.data?.message ?? 'Login successful');
        reset();
        setIsDoneOnboarding(true);
      }
    } else {
      handleToastApiError(response);
    }

    return;
  });

  const handleForgotPassword = () => {
    const { email, phoneNumber } = getValues();
    console.log({ email, phoneNumber });
    navigation.navigate(routes.FORGOT_PASSWORD_SCREEN, {
      email: email?.trim()?.toLowerCase(),
      phoneNumber: phoneNumber?.trim(),
    });
  };

  return (
    <AppKeyboardAvoidingView
      keyboardVerticalOffset={-Size.calcHeight(50)}
      style={{ flex: 1 }}
    >
      <AppScreen showDownInset style={loginScreenStyles.container}>
        <AppText style={loginScreenStyles.title}>Login to your account</AppText>
        <AppText style={loginScreenStyles.subTitle}>
          Need help logging in? Get Help
        </AppText>

        <LoginModeToggle
          selectedMode={selectedMode}
          onSelectMode={setSelectedMode}
        />

        <View style={loginScreenStyles.content}>
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
          <AppTextInput
            editable={!isLoading}
            placeholder="Password"
            label="Password"
            control={control}
            name="password"
            secureTextEntry={!isPasswordVisible}
            rightIcon={
              <PasswordToggle
                isVisible={!isPasswordVisible}
                onClick={() => setPasswordVisibility(value => !value)}
              />
            }
          />
          <TouchableOpacity
            onPress={handleForgotPassword}
            style={loginScreenStyles.forgotPasswordContainer}
          >
            <AppText style={loginScreenStyles.forgotPasswordText}>
              Forgot your password?
            </AppText>
          </TouchableOpacity>
        </View>

        <View style={loginScreenStyles.buttonContainer}>
          <SubmitButton title="Continue" onPress={onSubmit} />
        </View>
      </AppScreen>
      <AppLoadingModal isLoading={isLoading} title="Logging you in..." />
    </AppKeyboardAvoidingView>
  );
};

export const loginScreenStyles = StyleSheet.create({
  buttonContainer: {
    paddingTop: Size.calcHeight(15),
    paddingBottom: Size.calcHeight(40),
  },

  container: {
    backgroundColor: colors.WHITE_200,
    flex: 1,
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

  subTitle: {
    fontFamily: fonts.INTER_500,
    paddingBottom: Size.calcHeight(24),
  },

  title: {
    fontSize: Size.calcAverage(24),
    fontFamily: fonts.INTER_600,
    paddingBottom: Size.calcHeight(12),
    paddingTop: Size.calcHeight(54),
  },
});

export default LoginScreen;
