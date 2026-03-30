import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { PostHouseholdCreateOccupantReq } from '@src/api/household.api';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppStepIndicator from '@src/components/common/AppStepIndicator';
import VerifyKYCForm from '@src/components/forms/VerifyKYCForm';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import useBackHandler from '@src/hooks/useBackHandler';
import { AppScreenProps } from '@src/navigation/AppNavigator';
import { joiSchemas } from '@src/utils/schema';
import Size from '@src/utils/useResponsiveSize';
import ConfirmDependentStep from './steps/ConfirmDependentStep';
import DependentFormStep from './steps/DependentFormStep';
import { useAppStateStore } from '@src/stores/appState.store';

export interface AddDependentFormScreenProps {
  id: number;
  name: string;
  isKYC: boolean;
}

type Props = AppScreenProps<'ADD_DEPENDENT_FORM_SCREEN'>;

const schema = Joi.object<PostHouseholdCreateOccupantReq>({
  FirstName: joiSchemas.name.label('First name'),
  LastName: joiSchemas.name.label('Last name'),
  Email: joiSchemas.email,
  PhoneNumber: joiSchemas.phone.label('Phone number'),
  Photo: joiSchemas.image.label('Profile photo'),
  DateOfBirth: Joi.string().optional().allow('').label('Date of birth'),
  Gender: Joi.string().required().label('Gender'),
  KYCId: Joi.number().optional(),
});

const AddDependentFormScreen = ({ route }: Props): React.JSX.Element => {
  const { name, isKYC } = route?.params || {};
  const firstStep = isKYC
    ? AddDependentSteps.VERIFY_KYC_FORM
    : AddDependentSteps.DEPENDENT_FORM_STEP;
  const [currentStep, setCurrentStep] = useState(firstStep);
  const navigation = useNavigation();
  const form = useForm<PostHouseholdCreateOccupantReq>({
    resolver: joiResolver(schema),
  });
  const { setActiveModal } = useAppStateStore();

  const onBackPress = () => {
    if (currentStep === firstStep) {
      navigation.goBack();
    } else {
      setCurrentStep(val => val - 1);
    }
  };

  useBackHandler(onBackPress, currentStep);

  const onSubmit = () => {};

  const handleSubmit = () => {
    setActiveModal({
      modalType: 'PROMT_MODAL',
      promptModal: {
        title: 'Add dependent?',
        description:
          'You are about to add a new dependent. Are you sure you want to continue?',
        noButtonTitle: 'Cancel',
        yesButtonTitle: "Yes, I'm Sure",
        onYesButtonClick: onSubmit,
      },
    });
  };

  const steps = [
    <VerifyKYCForm key={AddDependentSteps.VERIFY_KYC_FORM} />,
    <DependentFormStep
      onBackClick={onBackPress}
      key={AddDependentSteps.DEPENDENT_FORM_STEP}
      form={form}
      onDone={() => setCurrentStep(AddDependentSteps.CONFIRM_DEPENDENT_STEP)}
    />,
    <ConfirmDependentStep
      onBackClick={() => setCurrentStep(AddDependentSteps.DEPENDENT_FORM_STEP)}
      key={AddDependentSteps.CONFIRM_DEPENDENT_STEP}
      getValues={form.getValues}
      onDone={handleSubmit}
    />,
  ];

  const totalSteps = steps?.length;

  return (
    <AppScreen showDownInset>
      <AppScreenHeader onBackPress={onBackPress}>
        <AppText style={styles.headerTitle}>Add dependent</AppText>
        <AppText style={styles.headerSubtitle}>{name}</AppText>
      </AppScreenHeader>
      <AppStepIndicator
        currentStep={!isKYC ? currentStep - 1 : currentStep}
        totalSteps={!isKYC ? totalSteps - 1 : totalSteps}
      />
      {steps?.[currentStep - 1]}
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(16),
    color: colors.BLACK_200,
    textAlign: 'center',
  },

  headerSubtitle: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
    textAlign: 'center',
  },
});

enum AddDependentSteps {
  VERIFY_KYC_FORM = 1,
  DEPENDENT_FORM_STEP,
  CONFIRM_DEPENDENT_STEP,
}

export default AddDependentFormScreen;
