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
import {
  BuyPowerFormScreenProps,
  useAppNavigator,
} from '@src/navigation/AppNavigator';
import { VerifyPowerDiscoResData } from '@src/api/power.api';
import { formatMoneyToTwoDecimals } from '@src/utils';
import ElectricDiscoTokenFormSection from './sections/ElectricDiscoTokenFormSection';

const BuyPowerFormScreen = (
  props: BuyPowerFormScreenProps,
): React.JSX.Element => {
  const screenType = props?.route?.params?.screenType;
  const [currentStep, setCurrentStep] = useState(BuyTokenSteps.TOKEN_FORM_STEP);
  const { data } = useGetWalletBalance();
  const [verifiedData, setVerifiedData] =
    useState<VerifyPowerDiscoResData | null>(null);
  const [pin, setPin] = useState('');
  const navigation = useAppNavigator();

  const isEstate = screenType === 'Estate token';

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

  const handleFirstStepDone = (val: VerifyPowerDiscoResData) => {
    setVerifiedData(val);
    setCurrentStep(BuyTokenSteps.CONFIRMATION_STEP);
  };

  const steps = [
    {
      title: screenType,
      subtitle: 'Enter details below',
      component: isEstate ? (
        <EstateTokenFormSection onDone={handleFirstStepDone} />
      ) : (
        <ElectricDiscoTokenFormSection onDone={handleFirstStepDone} />
      ),
    },
    {
      title: 'Confirm Purchase',
      subtitle: 'Confirm details below',
      component: (
        <ConfirmPurchaseSection
          data={verifiedData}
          onConfirm={() => setCurrentStep(BuyTokenSteps.INPUT_PIN_STEP)}
        />
      ),
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
            subtitle={`Amount Due: ${formatMoneyToTwoDecimals({
              amount: verifiedData?.totalAmountToPay || 0,
            })}`}
          />
        </View>
      ),
    },
  ];

  const currentStepDetail = steps[currentStep - 1];

  return (
    <AppScreen>
      <AppScreenHeader
        onBackPress={onBackPress}
        title={currentStepDetail?.title}
      >
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
