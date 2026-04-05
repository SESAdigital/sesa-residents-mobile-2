import { joiResolver } from '@hookform/resolvers/joi';
import { useQueryClient } from '@tanstack/react-query';
import Joi from 'joi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';

import { GenderType } from '@src/api/constants/default';
import queryKeys from '@src/api/constants/queryKeys';
import {
  postHouseholdCreateOccupant,
  PostHouseholdCreateOccupantReq,
} from '@src/api/household.api';
import { KYCDetails } from '@src/api/utilities.api';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppStepIndicator from '@src/components/common/AppStepIndicator';
import VerifyKYCForm from '@src/components/forms/VerifyKYCForm';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import useBackHandler from '@src/hooks/useBackHandler';
import { useVerifyKYCForm } from '@src/hooks/useForms';
import { AppScreenProps, useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { useAppStateStore } from '@src/stores/appState.store';
import { useAuthStore } from '@src/stores/auth.store';
import {
  formatBase64Image,
  formatKYCGender,
  generateFileName,
} from '@src/utils';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import { joiSchemas } from '@src/utils/schema';
import { dayJSFormatter } from '@src/utils/time';
import Size from '@src/utils/useResponsiveSize';
import ConfirmDependentStep from './steps/ConfirmDependentStep';
import DependentFormStep from './steps/DependentFormStep';

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
  // HomeAddress: Joi.string().optional().allow('').label('Home address'),
});

const AddDependentFormScreen = ({ route }: Props): React.JSX.Element => {
  const { name, isKYC } = route?.params || {};
  const { selectedProperty } = useAuthStore();
  const firstStep = isKYC
    ? AddDependentSteps.VERIFY_KYC_FORM
    : AddDependentSteps.DEPENDENT_FORM_STEP;
  const [currentStep, setCurrentStep] = useState(firstStep);
  const navigation = useAppNavigator();
  const form = useForm<PostHouseholdCreateOccupantReq>({
    resolver: joiResolver(schema),
  });
  const kycForm = useVerifyKYCForm();
  const { setValue, getValues } = form;
  const { setActiveModal, setIsAppModalLoading, closeActiveModal } =
    useAppStateStore();
  const queryClient = useQueryClient();

  const onBackPress = () => {
    if (currentStep === firstStep) {
      navigation.goBack();
    } else {
      setCurrentStep(val => val - 1);
    }
  };

  useBackHandler(onBackPress, currentStep);

  const onSubmit = async () => {
    const {
      DateOfBirth,
      Email,
      FirstName,
      Gender,
      KYCId,
      LastName,
      PhoneNumber,
      Photo,
    } = getValues();

    const initData: Partial<PostHouseholdCreateOccupantReq> = {
      FirstName: FirstName?.trim(),
      LastName: LastName?.trim(),
      Email: Email?.trim()?.toLowerCase(),
      PhoneNumber: PhoneNumber?.trim(),
      ...(DateOfBirth
        ? {
            DateOfBirth: dayJSFormatter({
              value: DateOfBirth,
              format: 'YYYY-MM-DD',
            }),
          }
        : {}),
      Gender,

      PropertyUnitId: selectedProperty?.id || 0,
      HomeAddress: selectedProperty?.propertyAddress || '',
      HomeAddressPlaceId: selectedProperty?.propertyAddressPlaceId || '',
      ...(KYCId ? { KYCId } : {}),
    };

    const dependentFormData = new FormData();

    Object.entries(initData).forEach(([key, value]) => {
      dependentFormData.append(key, value);
    });

    const fileName = Photo?.fileName || generateFileName(0, Photo?.type || '');

    dependentFormData.append('Photo', {
      uri: Photo?.uri,
      type: Photo?.type,
      name: fileName,
    });

    setIsAppModalLoading(true);
    const response = await postHouseholdCreateOccupant(dependentFormData);
    setIsAppModalLoading(false);

    if (response?.ok && response?.data) {
      queryClient.resetQueries({ queryKey: [queryKeys.GET_HOUSEHOLDS] });
      appToast.Success(
        response?.data?.message || 'Dependent added successfully.',
      );

      navigation.replace(
        routes.ADD_DEPENDENT_SUCCESS_SCREEN,
        response?.data?.data,
      );
      closeActiveModal();
    } else {
      handleToastApiError(response);
    }
  };

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

  const onKYCVerifyDone = (data: KYCDetails | null) => {
    if (!data) {
      return appToast.Warning('An error occured while validating kyc details.');
    }

    const gender = formatKYCGender(data?.res?.gender) as unknown as GenderType;
    const photo = formatBase64Image(data?.res?.photo || '');

    setValue('FirstName', data?.res?.firstname ?? '');
    setValue('LastName', data?.res?.lastname ?? '');
    setValue('Email', data?.res?.email ?? '');
    // setValue('HomeAddress', data?.res?.address ?? '');
    setValue('DateOfBirth', data?.res?.dateOfBirth ?? '');
    setValue('Gender', gender);
    setValue('Photo.uri', photo?.data);
    setValue('Photo.type', photo?.prefix);
    setValue('PhoneNumber', data?.res?.phoneNumber ?? '');

    setValue('KYCId', data?.res?.kycId || 0);

    // CHANGE THIS IF NECESSARRY
    setCurrentStep(AddDependentSteps.DEPENDENT_FORM_STEP);
    return;
  };

  const steps = [
    <VerifyKYCForm
      key={AddDependentSteps.VERIFY_KYC_FORM}
      onDone={onKYCVerifyDone}
      form={kycForm}
      onBackClick={onBackPress}
    />,
    <DependentFormStep
      onBackClick={onBackPress}
      key={AddDependentSteps.DEPENDENT_FORM_STEP}
      form={form}
      onDone={() => setCurrentStep(AddDependentSteps.CONFIRM_DEPENDENT_STEP)}
    />,
    <ConfirmDependentStep
      onBackClick={() => setCurrentStep(AddDependentSteps.DEPENDENT_FORM_STEP)}
      key={AddDependentSteps.CONFIRM_DEPENDENT_STEP}
      getValues={getValues}
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
