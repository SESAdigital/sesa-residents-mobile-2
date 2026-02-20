import { Activity, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import colors from '@src/configs/colors';
import { useGetWalletBalance } from '@src/hooks/useGetRequests';
import WalletPinInput from '@src/screens/auth/components/WalletPinInput';
import Size from '@src/utils/useResponsiveSize';
import ConfirmPurchaseSection from './sections/ConfirmPurchaseSection';
import EstateTokenFormSection from './sections/EstateTokenFormSection';
import useBackHandler from '@src/hooks/useBackHandler';
import { useAppNavigator } from '@src/navigation/AppNavigator';

const BuyPowerFormScreen = (): React.JSX.Element => {
  const [currentStep, setCurrentStep] = useState(BuyTokenSteps.INPUT_PIN_STEP);
  const { data } = useGetWalletBalance();
  const [pin, setPin] = useState('');
  const navigation = useAppNavigator();

  const isLoading = false;

  const onBackPress = () => {
    if (isLoading) return;

    if (currentStep === BuyTokenSteps.TOKEN_FORM_STEP) {
      navigation.goBack();
    } else {
      setCurrentStep(val => val - 1);
    }
  };

  useBackHandler(onBackPress, currentStep);

  const handleSubmit = () => {};

  const steps = [
    {
      title: 'Estate token',
      subtitle: 'Enter details below',
      component: (
        <EstateTokenFormSection
          onDone={() => setCurrentStep(BuyTokenSteps.CONFIRMATION_STEP)}
        />
      ),
    },
    {
      title: 'Confirm Purchase',
      subtitle: 'Confirm details below',
      component: <ConfirmPurchaseSection />,
    },
    {
      title: '',
      subtitle: '',
      component: (
        <View style={styles.pinContainer}>
          <WalletPinInput
            pin={pin}
            onDone={handleSubmit}
            onPinChange={val => setPin(val)}
            title="Enter wallet PIN"
            subtitle="Amount Due: ₦150,000.00"
          />
        </View>
      ),
    },
  ];

  const currentStepDetail = steps[currentStep - 1];

  return (
    <AppScreen>
      <AppScreenHeader title={currentStepDetail?.title}>
        <View style={{ height: Size.calcHeight(23) }} />
      </AppScreenHeader>
      {currentStep !== BuyTokenSteps.INPUT_PIN_STEP && (
        <View style={styles.bannerContainer}>
          <AppText style={styles.bannerText}>
            {currentStepDetail?.subtitle}
          </AppText>
          <AppText style={styles.bannerText}>
            Balance: {data?.formattedAmount}
          </AppText>
        </View>
      )}
      {steps?.map((step, index) => (
        <Activity
          key={index}
          mode={currentStep === index + 1 ? 'visible' : 'hidden'}
        >
          {step?.component}
        </Activity>
      ))}
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Size.calcHeight(6),
    paddingHorizontal: Size.calcWidth(21),
    backgroundColor: colors.WHITE_300,
  },

  bannerText: {
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
  },

  container: {
    paddingHorizontal: 0,
  },

  pinContainer: {
    flex: 1,
    paddingBottom: Size.calcHeight(40),
  },
});

export default BuyPowerFormScreen;

enum BuyTokenSteps {
  TOKEN_FORM_STEP = 1,
  CONFIRMATION_STEP,
  INPUT_PIN_STEP,
}
