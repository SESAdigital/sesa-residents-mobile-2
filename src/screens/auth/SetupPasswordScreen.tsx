import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Joi from 'joi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { useRoute } from '@react-navigation/native';
import { patchSetupPassword, PatchSetupPasswordReq } from '@src/api/auth.api';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppKeyboardAvoidingView from '@src/components/custom/AppKeyboardAvoidingView';
import AppTextInput from '@src/components/forms/AppTextInput';
import SubmitButton from '@src/components/forms/SubmitButton';
import PasswordToggle from '@src/components/icons/PasswordToggle';
import AppLoadingModal from '@src/modals/AppLoadingModal';
import {
  SetupPasswordScreenProps,
  useAppNavigator,
} from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { useAuthStore } from '@src/stores/auth.store';
import { appToast } from '@src/utils/appToast';
import Size from '@src/utils/useResponsiveSize';
import { loginScreenStyles } from './LoginScreen';
import { joiSchemas } from '@src/utils/schema';
import { handleToastApiError } from '@src/utils/handleErrors';

const schema = Joi.object<PatchSetupPasswordReq>({
  newPassword: joiSchemas.strictPassword,
  confirmPassword: joiSchemas.strictPassword,
});

const SetupPasswordScreen = (): React.ReactNode => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const patchSetupPasswordAPI = useMutation({ mutationFn: patchSetupPassword });
  const queryClient = useQueryClient();
  const navigation = useAppNavigator();

  const params = useRoute<SetupPasswordScreenProps>()?.params;

  const { handleSubmit, reset, control } = useForm<PatchSetupPasswordReq>({
    resolver: joiResolver(schema),
  });
  const { setLoginResponse } = useAuthStore();

  const onSubmit = handleSubmit(async data => {
    if (isLoading) return;

    const newPassword = data?.newPassword?.trim();

    if (newPassword != data?.confirmPassword?.trim())
      return appToast.Warning('Password does not match.');

    const initialData: PatchSetupPasswordReq = {
      deviceId: params?.deviceId,
      latitude: params?.latitude,
      longitude: params?.longitude,
      loginMode: params?.loginMode,
      currentPassword: params?.currentPassword,
      pushNotificationToken: params?.pushNotificationToken,
      ...(params?.phoneNumber ? { phoneNumber: params?.phoneNumber } : {}),
      ...(params?.email ? { email: params?.email } : {}),
      confirmPassword: newPassword,
      newPassword: newPassword,
    };

    const response = await patchSetupPasswordAPI.mutateAsync(initialData);

    if (response?.ok && response?.data) {
      appToast.Success(
        response?.data?.message ?? 'Password updated successfully',
      );
      setLoginResponse(response?.data);
      reset();
      queryClient.invalidateQueries();
      navigation.replace(routes.ONE_LAST_STEP_SCREEN);
    } else {
      handleToastApiError(response);
    }

    return;
  });

  const isLoading = patchSetupPasswordAPI?.isPending;

  return (
    <AppKeyboardAvoidingView
      keyboardVerticalOffset={-Size.calcHeight(50)}
      style={{ flex: 1 }}
    >
      <AppScreen showDownInset style={loginScreenStyles.container}>
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
