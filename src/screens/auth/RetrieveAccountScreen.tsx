import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Joi from 'joi';
import { Activity, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { getDeviceId } from 'react-native-device-info';

import { postLogin } from '@src/api/auth.api';
import { LoginModeData, LoginModeType } from '@src/api/constants/default';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppKeyboardAvoidingView from '@src/components/custom/AppKeyboardAvoidingView';
import AppTextInput from '@src/components/forms/AppTextInput';
import SubmitButton from '@src/components/forms/SubmitButton';
import { RiInformationFill } from '@src/components/icons';
import colors from '@src/configs/colors';
import { useGetCurrentLocation } from '@src/hooks/useCurrentLocation';
import AppLoadingModal from '@src/modals/AppLoadingModal';
import { useAuthStore } from '@src/stores/auth.store';
import { appToast } from '@src/utils/appToast';
import { joiSchemas } from '@src/utils/schema';
import Size from '@src/utils/useResponsiveSize';
import LoginModeToggle from './components/LoginModeToggle';
import { loginScreenStyles } from './LoginScreen';

export interface LoginSchema {
  email?: string;
  phoneNumber?: string;
  password: string;
}

const schema = Joi.object<LoginSchema>({
  email: joiSchemas.email,
  password: joiSchemas.password,
});

const RetrieveAccountScreen = (): React.ReactNode => {
  const [selectedMode, setSelectedMode] = useState<LoginModeType>(
    LoginModeData.EmailAddress,
  );
  const location = useGetCurrentLocation();
  const postLoginAPI = useMutation({ mutationFn: postLogin });
  const queryClient = useQueryClient();

  const { handleSubmit, reset, control } = useForm<LoginSchema>({
    resolver: joiResolver(schema),
  });
  const { setLoginResponse } = useAuthStore();

  const isEmailLogin = selectedMode === LoginModeData.EmailAddress;

  const onSubmit = handleSubmit(async data => {
    if (isLoading) return;

    const email = data?.email?.trim()?.toLowerCase();
    const phoneNumber = data?.phoneNumber?.trim()?.toLowerCase();
    const password = data?.password?.trim();

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
      keyboardVerticalOffset={-Size.calcHeight(50)}
      style={{ flex: 1 }}
    >
      <AppScreen style={loginScreenStyles.container}>
        <AppText style={loginScreenStyles.title}>Welcome to SESA</AppText>
        <AppText style={loginScreenStyles.subTitle}>
          To get started, enter your associated email address or phone number.
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
            <View style={styles.informationContainer}>
              <RiInformationFill
                height={Size.calcAverage(17)}
                width={Size.calcAverage(17)}
                color={colors.BLACK_100}
              />
              <AppText style={styles.informationText}>
                If your account is found, your login credentials will be sent to
                your email.
              </AppText>
            </View>
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

        <View style={loginScreenStyles.buttonContainer}>
          <SubmitButton title="Continue" isLoading={false} onPress={onSubmit} />
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
  informationContainer: {
    backgroundColor: colors.WHITE_300,
    padding: Size.calcAverage(10),
    borderRadius: Size.calcAverage(8),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Size.calcHeight(-8),
  },
  informationText: {
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
    paddingLeft: Size.calcWidth(8),
    maxWidth: Size.calcWidth(350),
  },
});

export default RetrieveAccountScreen;
