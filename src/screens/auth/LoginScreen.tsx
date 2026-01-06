import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Joi from 'joi';
import { Activity, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { getDeviceId } from 'react-native-device-info';

import { postLogin } from '@src/api/auth.api';
import { LoginModeData, LoginModeType } from '@src/api/constants/default';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppKeyboardAvoidingView from '@src/components/custom/AppKeyboardAvoidingView';
import AppTextInput from '@src/components/forms/AppTextInput';
import SubmitButton from '@src/components/forms/SubmitButton';
import PasswordToggle from '@src/components/icons/PasswordToggle';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useGetCurrentLocation } from '@src/hooks/useCurrentLocation';
import { useAuthStore } from '@src/stores/auth.store';
import { appToast } from '@src/utils/appToast';
import { joiSchemas } from '@src/utils/schema';
import Size from '@src/utils/useResponsiveSize';
import LoginModeToggle from './components/LoginModeToggle';

export interface LoginSchema {
  email?: string;
  phoneNumber?: string;
  password: string;
}

const schema = Joi.object<LoginSchema>({
  email: joiSchemas.email,
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

  const { handleSubmit, reset, control } = useForm<LoginSchema>({
    resolver: joiResolver(schema),
  });
  const { setLoginResponse } = useAuthStore();

  const onSubmit = handleSubmit(async data => {
    const email = data?.email?.trim()?.toLowerCase();
    const phoneNumber = data?.phoneNumber?.trim()?.toLowerCase();
    const password = data?.password?.trim();
    const isEmailLogin = selectedMode === LoginModeData.EmailAddress;

    if (isEmailLogin && !email)
      return appToast.Info('Please enter an email address');
    if (!isEmailLogin && !phoneNumber)
      return appToast.Info('Please enter a phone number');

    const response = await postLoginAPI.mutateAsync({
      deviceId: getDeviceId(),
      latitude: location?.latitude?.toString() || '',
      longitude: location?.longitude?.toString() || '',
      loginMode: selectedMode,
      password,
      pushNotificationToken: '',
      ...(isEmailLogin ? { email } : { phoneNumber }),
    });

    if (response?.ok && response?.data) {
      appToast.Success(response?.data?.message ?? 'Login successfully.');
      setLoginResponse(response?.data);
      reset();
      queryClient.invalidateQueries();
    } else {
      appToast.Error(response?.data?.message ?? 'Login failed.');
    }

    return;
  });

  const isLoading = postLoginAPI?.isPending;

  return (
    <AppKeyboardAvoidingView
      keyboardVerticalOffset={-Size.calcHeight(55)}
      style={{ flex: 1 }}
    >
      <AppScreen
        containerStyle={{ flex: 1 }}
        scrollable
        // contentContainerStyle={{ flex: 1 }}
        style={styles.container}
      >
        <AppText style={styles.title}>Login to your account</AppText>
        <AppText style={styles.subTitle}>
          Need help logging in? Get Help
        </AppText>

        <LoginModeToggle
          selectedMode={selectedMode}
          onSelectMode={setSelectedMode}
        />

        <View style={styles.content}>
          <Activity
            mode={
              selectedMode == LoginModeData.EmailAddress ? 'visible' : 'hidden'
            }
          >
            <AppTextInput
              editable={!isLoading}
              placeholder="Email Address"
              label="Email Address"
              control={control}
              name="email"
              keyboardType="email-address"
            />
          </Activity>
          <Activity
            mode={
              selectedMode == LoginModeData.PhoneNumber ? 'visible' : 'hidden'
            }
          >
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
        </View>
        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <AppText style={styles.forgotPasswordText}>
            Forgot your password?
          </AppText>
        </TouchableOpacity>
        <View style={{ marginTop: Size.calcHeight(30) }}>
          <SubmitButton
            title="Continue"
            isLoading={isLoading}
            onPress={onSubmit}
          />
        </View>
      </AppScreen>
    </AppKeyboardAvoidingView>
  );
};

// here

const styles = StyleSheet.create({
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
    marginTop: Size.calcHeight(32),
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
