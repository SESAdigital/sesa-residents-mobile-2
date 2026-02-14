import { useAppNavigator } from '@src/navigation/AppNavigator';
import CheckYourMailComponent from './components/CheckYourMailComponent';

const PreLoginSuccessScreen = (): React.JSX.Element => {
  const navigation = useAppNavigator();

  const handleResend = () => {
    navigation.goBack();
  };

  const isLoading = false;

  return (
    <CheckYourMailComponent
      isLoading={isLoading}
      onResendPress={handleResend}
      subtitle="Friends Colony Estate has onboarded you. Your login credentials have been sent to your email."
    />
  );
};

export default PreLoginSuccessScreen;
