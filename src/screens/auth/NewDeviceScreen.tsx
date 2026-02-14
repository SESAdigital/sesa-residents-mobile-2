import { useMutation } from '@tanstack/react-query';

import { useAuthStore } from '@src/stores/auth.store';
import { maskEmail } from '@src/utils';
import CheckYourMailComponent from './components/CheckYourMailComponent';
import { postResendNewDeviceEmail } from '@src/api/auth.api';
import { handleToastApiError } from '@src/utils/handleErrors';
import { appToast } from '@src/utils/appToast';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';

const NewDeviceScreen = (): React.JSX.Element => {
  const { loginResponse } = useAuthStore();
  const navigation = useAppNavigator();
  const postResendNewDeviceEmailAPI = useMutation({
    mutationFn: postResendNewDeviceEmail,
  });
  const isLoading = postResendNewDeviceEmailAPI?.isPending;

  const handleResend = async () => {
    if (isLoading) return;
    const response = await postResendNewDeviceEmailAPI.mutateAsync();
    if (response?.ok) {
      appToast.Success(response?.data?.message || 'Code sent successfully');
    } else {
      handleToastApiError(response);
    }
  };

  return (
    <CheckYourMailComponent
      isLoading={isLoading}
      onProceed={() =>
        navigation.navigate(routes.NEW_DEVICE_VERIFICATION_SCREEN)
      }
      buttonTitle="Proceed"
      onResendPress={handleResend}
      subtitle={`We just detected a new device. To verify this new device, we sent a verification code to your email ${maskEmail(
        loginResponse?.data?.email || '',
      )}.`}
      showBackButton
    />
  );
};

export default NewDeviceScreen;
