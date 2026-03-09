import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import Joi from 'joi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet } from 'react-native';

import { postChangePassword, PostChangePasswordReq } from '@src/api/auth.api';
import AppScreen from '@src/components/AppScreen';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppKeyboardAvoidingView from '@src/components/custom/AppKeyboardAvoidingView';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import { joiSchemas } from '@src/utils/schema';
import Size from '@src/utils/useResponsiveSize';
import AppTextInput from '@src/components/forms/AppTextInput';
import PasswordToggle from '@src/components/icons/PasswordToggle';
import SubmitButton from '@src/components/forms/SubmitButton';
import AppLoadingModal from '@src/modals/AppLoadingModal';

const schema = Joi.object<PostChangePasswordReq>({
  currentPassword: joiSchemas.password.label('Old password'),
  newPassword: joiSchemas.strictPassword.label('New password'),
  confirmPassword: joiSchemas.strictPassword.label('Repeat new password'),
});

const ChangePasswordScreen = (): React.JSX.Element => {
  const postChangePasswordAPI = useMutation({
    mutationFn: postChangePassword,
  });
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const navigation = useAppNavigator();
  const { control, handleSubmit } = useForm<PostChangePasswordReq>({
    resolver: joiResolver(schema),
  });

  const isLoading = postChangePasswordAPI?.isPending;

  const onSubmit = handleSubmit(async data => {
    const password = data?.newPassword?.trim();
    if (password !== data?.confirmPassword?.trim()) {
      return appToast.Info('Passwords do not match');
    }

    const response = await postChangePasswordAPI?.mutateAsync({
      currentPassword: data?.currentPassword?.trim(),
      newPassword: password,
      confirmPassword: password,
    });

    if (response?.ok) {
      appToast.Success(
        response?.data?.message || 'Password changed successfully',
      );
      navigation.goBack();
    } else {
      handleToastApiError(response);
    }

    return;
  });
  return (
    <AppScreen showDownInset>
      <AppScreenHeader title="Change Password" />
      <AppLoadingModal isLoading={isLoading} />
      <AppKeyboardAvoidingView>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <AppTextInput
            editable={!isLoading}
            placeholder="Old Password"
            label="Old Password"
            control={control}
            name="currentPassword"
            secureTextEntry={!isPasswordVisible}
            rightIcon={
              <PasswordToggle
                isVisible={!isPasswordVisible}
                onClick={() => setPasswordVisibility(prev => !prev)}
              />
            }
          />
          <AppTextInput
            editable={!isLoading}
            placeholder="New Password"
            label="New Password"
            control={control}
            name="newPassword"
            secureTextEntry={!isPasswordVisible}
            rightIcon={
              <PasswordToggle
                isVisible={!isPasswordVisible}
                onClick={() => setPasswordVisibility(prev => !prev)}
              />
            }
          />
          <AppTextInput
            editable={!isLoading}
            placeholder="Repeat New Password"
            label="Repeat New Password"
            control={control}
            name="confirmPassword"
            secureTextEntry={!isPasswordVisible}
            rightIcon={
              <PasswordToggle
                isVisible={!isPasswordVisible}
                onClick={() => setPasswordVisibility(prev => !prev)}
              />
            }
          />
        </ScrollView>
        <SubmitButton
          style={styles.button}
          title="Save Password"
          onPress={onSubmit}
        />
      </AppKeyboardAvoidingView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: Size.calcWidth(21),
    marginVertical: Size.calcHeight(30),
  },

  container: {
    paddingVertical: Size.calcHeight(44),
    paddingHorizontal: Size.calcWidth(21),
  },

  contentContainer: {
    rowGap: Size.calcHeight(30),
    paddingBottom: Size.calcHeight(100),
  },
});

export default ChangePasswordScreen;
