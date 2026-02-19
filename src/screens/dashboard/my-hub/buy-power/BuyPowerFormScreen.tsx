import { Activity, useState } from 'react';
import { StyleSheet } from 'react-native';

import AppScreen from '@src/components/AppScreen';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import EstateTokenFormSection from './sections/EstateTokenFormSection';

const BuyPowerFormScreen = (): React.JSX.Element => {
  const [currentStep, setCurrentStep] = useState(BuyTokenSteps.TOKEN_FORM_STEP);

  const steps = [
    {
      title: 'Estate token',
      component: <EstateTokenFormSection />,
    },
  ];

  return (
    <AppScreen>
      <AppScreenHeader title={steps[currentStep - 1]?.title} />
      {steps?.map((step, index) => (
        <Activity mode={currentStep === index + 1 ? 'visible' : 'hidden'}>
          {step?.component}
        </Activity>
      ))}
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
});

export default BuyPowerFormScreen;

enum BuyTokenSteps {
  TOKEN_FORM_STEP = 1,
  CONFIRMATION_STEP,
  INPUT_PIN_STEP,
}
