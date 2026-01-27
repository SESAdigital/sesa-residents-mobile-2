import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Joi from 'joi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { getDeviceId } from 'react-native-device-info';

import { postLogin } from '@src/api/auth.api';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppKeyboardAvoidingView from '@src/components/custom/AppKeyboardAvoidingView';
import AppTextInput from '@src/components/forms/AppTextInput';
import SubmitButton from '@src/components/forms/SubmitButton';
import PasswordToggle from '@src/components/icons/PasswordToggle';
import { useGetCurrentLocation } from '@src/hooks/useCurrentLocation';
import AppLoadingModal from '@src/modals/AppLoadingModal';
import { useAuthStore } from '@src/stores/auth.store';
import { appToast } from '@src/utils/appToast';
import { joiSchemas } from '@src/utils/schema';
import Size from '@src/utils/useResponsiveSize';
import { loginScreenStyles } from './LoginScreen';

export interface LoginSchema {
  email?: string;
  phoneNumber?: string;
  password: string;
}

const schema = Joi.object<LoginSchema>({
  password: joiSchemas.strictPassword,
  confirmPassword: joiSchemas.strictPassword,
});

const ChangePasswordScreen = (): React.ReactNode => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const location = useGetCurrentLocation();
  const postLoginAPI = useMutation({ mutationFn: postLogin });
  const queryClient = useQueryClient();

  const { handleSubmit, reset, control } = useForm<LoginSchema>({
    resolver: joiResolver(schema),
  });
  const { setLoginResponse } = useAuthStore();


  const onSubmit = handleSubmit(async data => {
    if (isLoading) return;


    const response = await postLoginAPI.mutateAsync({
      deviceId: getDeviceId(),
      latitude: location?.latitude?.toString() || '',
      longitude: location?.longitude?.toString() || '',
      loginMode: ,
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
        <AppText style={loginScreenStyles.title}>Change your password</AppText>
        <AppText style={loginScreenStyles.subTitle}>
          To secure your experience, create a new password for your SESA
          account.
        </AppText>

        <View style={loginScreenStyles.content}>
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

        <View style={loginScreenStyles.buttonContainer}>
          <SubmitButton title="Update Password" isLoading={false} onPress={onSubmit} />
        </View>
      </AppScreen>
      <AppLoadingModal isLoading={isLoading} title="Updating your password..." />
    </AppKeyboardAvoidingView>
  );
};

export default ChangePasswordScreen;
