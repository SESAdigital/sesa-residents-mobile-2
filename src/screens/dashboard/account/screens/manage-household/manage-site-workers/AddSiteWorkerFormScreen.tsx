import { joiResolver } from '@hookform/resolvers/joi';
import { useQueryClient } from '@tanstack/react-query';
import Joi from 'joi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';

import { GenderType } from '@src/api/constants/default';
import queryKeys from '@src/api/constants/queryKeys';
import {
  postCreateSiteWorker,
  PostCreateSiteWorkerReq,
  PostCreateSiteWorkerReq1,
  PostCreateSiteWorkerReq2,
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
import { AddSiteWorkerSuccessScreenProps } from './AddSiteWorkerSuccessScreen';
import ConfirmSiteWorkerStep from './steps/ConfirmSiteWorkerStep';
import SetSiteWorkerScheduleStep from './steps/SetSiteWorkerScheduleStep';
import SiteWorkerFormStep from './steps/SiteWorkerFormStep';

type Props = AppScreenProps<'ADD_SITE_WORKER_FORM_SCREEN'>;

const schema = Joi.object<PostCreateSiteWorkerReq1>({
  FirstName: joiSchemas.name.label('First name'),
  LastName: joiSchemas.name.label('Last name'),
  Email: joiSchemas.email,
  PhoneNumber: joiSchemas.phone.label('Phone number'),
  Photo: joiSchemas.image.label('Profile photo'),
  DateOfBirth: Joi.string().optional().allow('').label('Date of birth'),
  Gender: Joi.string().required().label('Gender'),
  KycId: Joi.number().optional(),
  HomeAddress: Joi.string().required().label('Home address').min(3).max(1000),
});

const schema2 = Joi.object<PostCreateSiteWorkerReq2>({
  Workdays: Joi.array().required().label('Work days'),
  WorkPeriodStart: Joi.string().required().label('Start date'),
  WorkPeriodEnd: Joi.string().required().label('End date'),
  ClockInStart: Joi.string().required().label('Check-in time'),
  ClockInEnd: Joi.string().required().label('Check-out time'),
  SecurityGuardMessage: Joi.string()
    .optional()
    .allow('')
    .label('Security guard message')
    .min(3)
    .max(500),
});

const AddSiteWorkerFormScreen = ({ route }: Props): React.JSX.Element => {
  const { name, isKYC } = route?.params || {};
  const { selectedProperty } = useAuthStore();
  const firstStep = isKYC
    ? AddSiteWorkerSteps.VERIFY_KYC_FORM
    : AddSiteWorkerSteps.SITE_WORKER_FORM_STEP;
  const [currentStep, setCurrentStep] = useState(firstStep);
  const navigation = useAppNavigator();
  const form = useForm<PostCreateSiteWorkerReq1>({
    resolver: joiResolver(schema),
  });
  const form2 = useForm<PostCreateSiteWorkerReq2>({
    resolver: joiResolver(schema2),
  });

  const { getValues: getForm2Values } = form2;

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
      LastName,
      PhoneNumber,
      Photo,
      HomeAddress,
      KycId,
    } = getValues();

    const {
      Workdays,
      WorkPeriodStart,
      WorkPeriodEnd,
      ClockInStart,
      ClockInEnd,
      SecurityGuardMessage,
    } = getForm2Values();

    const guardMessage = SecurityGuardMessage?.trim();

    const initData: Partial<PostCreateSiteWorkerReq> = {
      FirstName: FirstName?.trim(),
      LastName: LastName?.trim(),
      Email: Email?.trim()?.toLowerCase(),
      PhoneNumber: PhoneNumber?.trim(),
      WorkPropertyStructureId: selectedProperty?.id || 0,
      Gender,
      HomeAddress,
      ClockInEnd: dayJSFormatter({
        format: 'HH:mma',
        shouldNotLocalize: true,
        value: ClockInEnd,
      }),
      ClockInStart: dayJSFormatter({
        format: 'HH:mma',
        shouldNotLocalize: true,
        value: ClockInStart,
      }),
      WorkPeriodEnd: dayJSFormatter({
        format: 'YYYY-MM-DD',
        shouldNotLocalize: true,
        value: WorkPeriodEnd,
      }),
      WorkPeriodStart: dayJSFormatter({
        format: 'YYYY-MM-DD',
        shouldNotLocalize: true,
        value: WorkPeriodStart,
      }),
      HomeAddressPlaceId: selectedProperty?.propertyAddressPlaceId || '',
      ...(KycId ? { KycId } : {}),
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

    const siteWorkerFormData = new FormData();

    Object.entries(initData).forEach(([key, value]) => {
      siteWorkerFormData.append(key, value);
    });

    const fileName = Photo?.fileName || generateFileName(0, Photo?.type || '');

    siteWorkerFormData.append('Photo', {
      uri: Photo?.uri,
      type: Photo?.type,
      name: fileName,
    });

    if (!!Workdays && Workdays?.length > 0) {
      Workdays?.forEach(value => {
        siteWorkerFormData.append('Workdays[]', value?.toString?.());
      });
    }

    setIsAppModalLoading(true);
    const response = await postCreateSiteWorker(siteWorkerFormData);
    setIsAppModalLoading(false);

    if (response?.ok && response?.data) {
      queryClient.resetQueries({ queryKey: [queryKeys.GET_HOUSEHOLDS] });
      appToast.Success(
        response?.data?.message || 'Site worker added successfully.',
      );

      const successValue: AddSiteWorkerSuccessScreenProps = {
        firstName: FirstName?.trim(),
        lastName: LastName?.trim(),
        emailAddress: Email?.trim()?.toLowerCase(),
        phoneNumber: PhoneNumber?.trim(),
        photo: Photo?.uri || '',
        address: selectedProperty?.propertyAddress || '',
        propertyUnitName: name,
      };

      navigation.replace(routes.ADD_SITE_WORKER_SUCCESS_SCREEN, successValue);
      closeActiveModal();
    } else {
      handleToastApiError(response);
    }
  };

  const handleSubmit = () => {
    setActiveModal({
      modalType: 'PROMT_MODAL',
      promptModal: {
        title: 'Add site worker?',
        description:
          'You are about to add a new site worker. Are you sure you want to continue?',
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
    setValue('KycId', data?.res?.kycId || 0);

    // CHANGE THIS IF NECESSARRY
    setCurrentStep(AddSiteWorkerSteps.SITE_WORKER_FORM_STEP);
    return;
  };

  const steps = [
    <VerifyKYCForm
      key={AddSiteWorkerSteps.VERIFY_KYC_FORM}
      onDone={onKYCVerifyDone}
      form={kycForm}
      onBackClick={onBackPress}
    />,
    <SiteWorkerFormStep
      onBackClick={onBackPress}
      key={AddSiteWorkerSteps.SITE_WORKER_FORM_STEP}
      form={form}
      onDone={() =>
        setCurrentStep(AddSiteWorkerSteps.SET_SITE_WORKER_SCHEDULE_STEP)
      }
    />,
    <SetSiteWorkerScheduleStep
      onBackClick={() =>
        setCurrentStep(AddSiteWorkerSteps.SITE_WORKER_FORM_STEP)
      }
      form={form2}
      key={AddSiteWorkerSteps.SET_SITE_WORKER_SCHEDULE_STEP}
      onDone={() => setCurrentStep(AddSiteWorkerSteps.CONFIRM_SITE_WORKER_STEP)}
    />,
    <ConfirmSiteWorkerStep
      onBackClick={() =>
        setCurrentStep(AddSiteWorkerSteps.SET_SITE_WORKER_SCHEDULE_STEP)
      }
      key={AddSiteWorkerSteps.CONFIRM_SITE_WORKER_STEP}
      getValues={getValues}
      getForm2Values={getForm2Values}
      onDone={handleSubmit}
    />,
  ];

  const totalSteps = steps?.length;

  return (
    <AppScreen showDownInset>
      <AppScreenHeader onBackPress={onBackPress}>
        <AppText style={styles.headerTitle}>Add site worker</AppText>
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

enum AddSiteWorkerSteps {
  VERIFY_KYC_FORM = 1,
  SITE_WORKER_FORM_STEP,
  SET_SITE_WORKER_SCHEDULE_STEP,
  CONFIRM_SITE_WORKER_STEP,
}

export default AddSiteWorkerFormScreen;
