import { joiResolver } from '@hookform/resolvers/joi';
import { useQueryClient } from '@tanstack/react-query';
import Joi from 'joi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';

import { GenderType } from '@src/api/constants/default';
import queryKeys from '@src/api/constants/queryKeys';
import {
  postCreateHouseholdStaff,
  PostCreateHouseholdStaffReq,
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
import { AddHouseholdStaffSuccessScreenProps } from './AddHouseholdStaffSuccessScreen';
import ConfigureAccessRequirementStep from './steps/ConfigureAccessRequirementStep';
import ConfirmHouseholdStaffStep from './steps/ConfirmHouseholdStaffStep';
import HouseholdStaffFormStep from './steps/HouseholdStaffFormStep';

type Props = AppScreenProps<'ADD_HOUSEHOLD_STAFF_FORM_SCREEN'>;

const schema = Joi.object<PostCreateHouseholdStaffReq>({
  FirstName: joiSchemas.name.label('First name'),
  LastName: joiSchemas.name.label('Last name'),
  Email: joiSchemas.email,
  PhoneNumber: joiSchemas.phone.label('Phone number'),
  Photo: joiSchemas.image.label('Profile photo'),
  DateOfBirth: Joi.string().optional().allow('').label('Date of birth'),
  Gender: Joi.string().required().label('Gender'),
  KYCId: Joi.number().optional(),
  HomeAddress: Joi.string().required().label('Home address').min(3).max(1000),
  RequireCheckInApproval: Joi.boolean()
    .required()
    .label('Require check in approval'),
  RequireCheckOutApproval: Joi.boolean()
    .required()
    .label('Require check out approval'),
  RequireCheckInPicture: Joi.boolean()
    .required()
    .label('Require check in picture'),
  RequireCheckOutPicture: Joi.boolean()
    .required()
    .label('Require check out picture'),
  SecurityGuardMessage: Joi.string()
    .optional()
    .allow('')
    .label('Security guard message')
    .min(3)
    .max(500),
  WorkDays: Joi.array().required().label('Work days'),
});

const AddHouseholdStaffFormScreen = ({ route }: Props): React.JSX.Element => {
  const { name, isKYC } = route?.params || {};
  const { selectedProperty } = useAuthStore();
  const firstStep = isKYC
    ? AddHouseholdStaffSteps.VERIFY_KYC_FORM
    : AddHouseholdStaffSteps.HOUSEHOLD_STAFF_FORM_STEP;
  const [currentStep, setCurrentStep] = useState(firstStep);
  const navigation = useAppNavigator();
  const form = useForm<PostCreateHouseholdStaffReq>({
    resolver: joiResolver(schema),
    defaultValues: {
      WorkDays: [],
      RequireCheckInApproval: false,
      RequireCheckOutApproval: false,
      RequireCheckInPicture: false,
      RequireCheckOutPicture: false,
    },
  });
  const kycForm = useVerifyKYCForm();
  const { setValue, getValues } = form;
  const { setActiveModal, setIsAppModalLoading, closeActiveModal } =
    useAppStateStore();
  const queryClient = useQueryClient();

  const onBackPress = () => {
    if (currentStep <= firstStep) {
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
      HomeAddress,
      RequireCheckInApproval,
      RequireCheckOutPicture,
      WorkDays,
      SecurityGuardMessage,
      RequireCheckOutApproval,
      RequireCheckInPicture,
    } = getValues();

    const guardMessage = SecurityGuardMessage?.trim();

    const initData: Partial<PostCreateHouseholdStaffReq> = {
      FirstName: FirstName?.trim(),
      LastName: LastName?.trim(),
      Email: Email?.trim()?.toLowerCase(),
      PhoneNumber: PhoneNumber?.trim(),
      RequireCheckInApproval,
      RequireCheckOutApproval,
      RequireCheckInPicture,
      RequireCheckOutPicture,
      Gender,
      WorkPropertyUnitId: selectedProperty?.id || 0,
      HomeAddress,
      HomeAddressPlaceId: selectedProperty?.propertyAddressPlaceId || '',
      ...(KYCId ? { KYCId } : {}),
      ...(guardMessage ? { SecurityGuardMessage: guardMessage } : {}),
      ...(DateOfBirth
        ? {
            DateOfBirth: dayJSFormatter({
              value: DateOfBirth,
              format: 'YYYY-MM-DD',
            }),
          }
        : {}),
    };

    const householdStaffFormData = new FormData();

    Object.entries(initData).forEach(([key, value]) => {
      householdStaffFormData.append(key, value);
    });

    const fileName = Photo?.fileName || generateFileName(0, Photo?.type || '');

    householdStaffFormData.append('Photo', {
      uri: Photo?.uri,
      type: Photo?.type,
      name: fileName,
    });

    if (!!WorkDays && WorkDays?.length > 0) {
      WorkDays?.forEach(value => {
        householdStaffFormData.append('WorkDays[]', value?.toString?.());
      });
    }
    console.log(householdStaffFormData);
    console.log(initData);

    setIsAppModalLoading(true);
    const response = await postCreateHouseholdStaff(householdStaffFormData);
    setIsAppModalLoading(false);

    if (response?.ok && response?.data) {
      queryClient.resetQueries({ queryKey: [queryKeys.GET_HOUSEHOLDS] });
      appToast.Success(
        response?.data?.message || 'Household staff added successfully.',
      );

      const successValue: AddHouseholdStaffSuccessScreenProps = {
        firstName: FirstName?.trim(),
        lastName: LastName?.trim(),
        emailAddress: Email?.trim()?.toLowerCase(),
        phoneNumber: PhoneNumber?.trim(),
        photo: Photo?.uri || '',
        address: selectedProperty?.propertyAddress || '',
        propertyUnitName: name,
      };

      navigation.replace(
        routes.ADD_HOUSEHOLD_STAFF_SUCCESS_SCREEN,
        successValue,
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
        title: 'Add household staff?',
        description:
          'You are about to add a new household staff. Are you sure you want to continue?',
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
    setValue('HomeAddress', data?.res?.address ?? '');
    setValue('DateOfBirth', data?.res?.dateOfBirth ?? '');
    setValue('Gender', gender);
    setValue('Photo.uri', photo?.data);
    setValue('Photo.type', photo?.prefix);
    setValue('PhoneNumber', data?.res?.phoneNumber ?? '');
    setValue('KYCId', data?.res?.kycId || 0);

    // CHANGE THIS IF NECESSARRY
    setCurrentStep(AddHouseholdStaffSteps.HOUSEHOLD_STAFF_FORM_STEP);
    return;
  };

  const steps = [
    <VerifyKYCForm
      key={AddHouseholdStaffSteps.VERIFY_KYC_FORM}
      onDone={onKYCVerifyDone}
      form={kycForm}
      onBackClick={onBackPress}
    />,
    <HouseholdStaffFormStep
      onBackClick={onBackPress}
      key={AddHouseholdStaffSteps.HOUSEHOLD_STAFF_FORM_STEP}
      form={form}
      onDone={() =>
        setCurrentStep(AddHouseholdStaffSteps.CONFIGURE_ACCESS_REQUIREMENT_STEP)
      }
    />,
    <ConfigureAccessRequirementStep
      onBackClick={() =>
        setCurrentStep(AddHouseholdStaffSteps.HOUSEHOLD_STAFF_FORM_STEP)
      }
      form={form}
      key={AddHouseholdStaffSteps.CONFIGURE_ACCESS_REQUIREMENT_STEP}
      onDone={() =>
        setCurrentStep(AddHouseholdStaffSteps.CONFIRM_HOUSEHOLD_STAFF_STEP)
      }
    />,
    <ConfirmHouseholdStaffStep
      onBackClick={() =>
        setCurrentStep(AddHouseholdStaffSteps.CONFIGURE_ACCESS_REQUIREMENT_STEP)
      }
      key={AddHouseholdStaffSteps.CONFIRM_HOUSEHOLD_STAFF_STEP}
      getValues={getValues}
      onDone={handleSubmit}
    />,
  ];

  const totalSteps = steps?.length;

  return (
    <AppScreen showDownInset>
      <AppScreenHeader onBackPress={onBackPress}>
        <AppText style={styles.headerTitle}>Add Household Staff</AppText>
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

enum AddHouseholdStaffSteps {
  VERIFY_KYC_FORM = 1,
  HOUSEHOLD_STAFF_FORM_STEP,
  CONFIGURE_ACCESS_REQUIREMENT_STEP,
  CONFIRM_HOUSEHOLD_STAFF_STEP,
}

export default AddHouseholdStaffFormScreen;
