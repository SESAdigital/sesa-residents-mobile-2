import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Joi from 'joi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { patchSetupPassword, PatchSetupPasswordReq } from '@src/api/auth.api';
import { LoginModeData } from '@src/api/constants/default';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppKeyboardAvoidingView from '@src/components/custom/AppKeyboardAvoidingView';
import AppTextInput from '@src/components/forms/AppTextInput';
import SubmitButton from '@src/components/forms/SubmitButton';
import PasswordToggle from '@src/components/icons/PasswordToggle';
import AppLoadingModal from '@src/modals/AppLoadingModal';
import { useAuthStore } from '@src/stores/auth.store';
import { appToast } from '@src/utils/appToast';
import Size from '@src/utils/useResponsiveSize';
import { loginScreenStyles } from './LoginScreen';

const schema = Joi.object<PatchSetupPasswordReq>({});

const SetupPasswordScreen = (): React.ReactNode => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const patchSetupPasswordAPI = useMutation({ mutationFn: patchSetupPassword });
  const queryClient = useQueryClient();

  const { handleSubmit, reset, control } = useForm<PatchSetupPasswordReq>({
    resolver: joiResolver(schema),
  });
  const { setLoginResponse } = useAuthStore();

  const onSubmit = handleSubmit(async data => {
    if (isLoading) return;

    const currentPassword = data?.currentPassword?.trim();

    if (currentPassword != data?.confirmPassword?.trim())
      return appToast.Warning('Password does not match.');

    const initialData: PatchSetupPasswordReq = {
      confirmPassword: currentPassword,
      currentPassword,
      deviceId: '',
      latitude: '',
      longitude: '',
      loginMode: LoginModeData.EmailAddress,
      pushNotificationToken: '',
      phoneNumber: '',
      email: '',
      newPassword: '',
    };

    const response = await patchSetupPasswordAPI.mutateAsync(initialData);

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

  const isLoading = patchSetupPasswordAPI?.isPending;

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
            name="newPassword"
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
            placeholder="Repeat Password"
            label="Repeat Password"
            control={control}
            name="confirmPassword"
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
          <SubmitButton
            title="Update Password"
            isLoading={false}
            onPress={onSubmit}
          />
        </View>
      </AppScreen>
      <AppLoadingModal
        isLoading={isLoading}
        title="Updating your password..."
      />
    </AppKeyboardAvoidingView>
  );
};

export default SetupPasswordScreen;
