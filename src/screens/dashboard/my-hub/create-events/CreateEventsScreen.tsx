import { joiResolver } from '@hookform/resolvers/joi';
import { useQueryClient } from '@tanstack/react-query';
import Joi from 'joi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';

import queryKeys from '@src/api/constants/queryKeys';
import { postEvent, PostEventReq } from '@src/api/events.api';
import AppScreen from '@src/components/AppScreen';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import SubmitButton from '@src/components/forms/SubmitButton';
import colors from '@src/configs/colors';
import useBackHandler from '@src/hooks/useBackHandler';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { useAppStateStore } from '@src/stores/appState.store';
import { useAuthStore } from '@src/stores/auth.store';
import { EventLocationTypeData, GuestLimitTypeData } from '@src/types/default';
import { formatMoneyValueIntoNumber, generateFileName } from '@src/utils';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import { combineDateTime, isStartGreaterOrEqual } from '@src/utils/time';
import Size from '@src/utils/useResponsiveSize';
import EventDetailsStep from './steps/EventDetailsStep';
import EventMessageStep from './steps/EventMessageStep';
import EventSummaryStep from './steps/EventSummaryStep';
import EventTypeStep from './steps/EventTypeStep';

const schema = Joi.object<PostEventReq>({
  EventType: Joi.number().optional(),
  Name: Joi.string().required().min(3).max(255),
  StartDate: Joi.string().required().label('Start Date'),
  EndDate: Joi.string().required().label('End Date'),
  EndTime: Joi.string().required().label('End Time'),
  StartTime: Joi.string().required().label('Start Time'),
  Address: Joi.string().optional().allow('').min(3).max(255),
  AddressPlaceId: Joi.string().optional(),
  GuestLimit: Joi.string().optional().allow('').label('Guest limit'),
  eventLocationType: Joi.string().optional().allow(''),
  guestLimitType: Joi.string().optional().allow(''),
  IsDailyLimit: Joi.boolean().optional(),
  SecurityGuardMessage: Joi.string()
    .optional()
    .allow('')
    .min(3)
    .max(255)
    .label('Security guard message'),
  EstateManagerMessage: Joi.string()
    .optional()
    .allow('')
    .min(3)
    .max(255)
    .label('Estate manager message'),
  Images: Joi.array().optional(),
});

const CreateEventsScreen = (): React.JSX.Element => {
  const [currentStep, setCurrentStep] = useState(
    CreateEventSteps.EVENT_TYPE_STEP,
  );
  const { setActiveModal, setIsAppModalLoading, closeActiveModal } =
    useAppStateStore();
  const navigation = useAppNavigator();
  const form = useForm<PostEventReq>({
    resolver: joiResolver(schema),
    defaultValues: {
      StartDate: new Date()?.toISOString?.(),
    },
  });
  const { handleSubmit, watch, setValue, getValues } = form;
  const { selectedProperty } = useAuthStore();
  const [EventType] = watch(['EventType']);
  const queryClient = useQueryClient();

  const onSubmit = handleSubmit(
    ({ StartDate, EndDate, StartTime, EndTime }) => {
      const res = isStartGreaterOrEqual({
        endDate: EndDate,
        endTime: EndTime!,
        startDate: StartDate,
        startTime: StartTime!,
      });
      if (res)
        return appToast.Info(
          'The selected start date and time should not exceed the end date and time.',
        );

      return setCurrentStep(CreateEventSteps.EVENT_SUMMARY_STEP);
    },
  );

  const handleCreate = async () => {
    const {
      Name,
      EndDate,
      StartDate,
      EndTime,
      StartTime,
      Address,
      SecurityGuardMessage,
      EstateManagerMessage,
      eventLocationType,
      GuestLimit,
      Images,
      guestLimitType,
    } = getValues();

    const endDateTime = combineDateTime({ date: EndDate, time: EndTime });
    const startDateTime = combineDateTime({ date: StartDate, time: StartTime });
    const esmMessage = EstateManagerMessage?.trim?.();
    const guardMessage = SecurityGuardMessage?.trim?.();

    const initData: PostEventReq = {
      Name: Name?.trim(),
      StartDate: startDateTime,
      EndDate: endDateTime,
      EventType,

      ...(!!GuestLimit
        ? {
            GuestLimit: formatMoneyValueIntoNumber(GuestLimit?.toString?.()),
            ...(guestLimitType === GuestLimitTypeData.DAILY_LIMIT
              ? { IsDailyLimit: true }
              : {}),
          }
        : {}),
      ...(!!esmMessage ? { EstateManagerMessage: esmMessage } : {}),
      ...(!!guardMessage ? { SecurityGuardMessage: guardMessage } : {}),

      ...(eventLocationType === EventLocationTypeData.ANOTHER_LOCATION
        ? { Address: Address?.trim() }
        : {
            Address: selectedProperty?.propertyAddress,
            PropertyId: selectedProperty?.id!,
          }),
    };

    const eventFormData = new FormData();

    Object.entries(initData).forEach(([key, value]) => {
      eventFormData.append(key, value);
    });

    Images?.forEach((image, index) => {
      const fileName =
        image.fileName || generateFileName(index, image?.type || '');

      eventFormData.append('Images', {
        uri: image.uri,
        type: image?.type,
        name: fileName,
      });
    });

    setIsAppModalLoading(true);
    const response = await postEvent(eventFormData);
    setIsAppModalLoading(false);

    if (response?.ok && response?.data) {
      queryClient.resetQueries({ queryKey: [queryKeys.GET_EVENT_BOOKINGS] });
      appToast.Success(
        response?.data?.message || 'Event created successfully.',
      );

      navigation.replace(
        routes.CREATE_EVENT_SUCCESS_SCREEN,
        response?.data?.data,
      );
      closeActiveModal();
    } else {
      handleToastApiError(response);
    }
  };

  const handleContinue = () => {
    if (currentStep === CreateEventSteps.EVENT_TYPE_STEP) {
      if (!EventType) return appToast.Info('Please select an event type');
      return setCurrentStep(CreateEventSteps.EVENT_DETAILS_STEP);
    }

    if (currentStep === CreateEventSteps.EVENT_DETAILS_STEP) {
      return onSubmit();
    }

    if (currentStep === CreateEventSteps.EVENT_SUMMARY_STEP) {
      const { eventLocationType, Address } = form.getValues();
      if (!eventLocationType)
        return appToast.Info('Please select an event location');

      if (eventLocationType === EventLocationTypeData.ANOTHER_LOCATION) {
        if (!Address) return appToast.Info('Please enter the event location');
      }
      if (eventLocationType === EventLocationTypeData.CURRENT_LOCATION) {
        if (!selectedProperty?.id)
          return appToast.Info('Please select a valid property');
      }
      return setCurrentStep(CreateEventSteps.EVENT_MESSAGE_STEP);
    }
    if (currentStep === CreateEventSteps.EVENT_MESSAGE_STEP) {
      // TODO CHECK ERRORS
      // const firstError = errors

      setActiveModal({
        modalType: 'PROMT_MODAL',
        promptModal: {
          title: 'Are you sure?',
          description:
            'You are about to create a new event. Are you sure you want to continue?',
          noButtonTitle: 'Cancel',
          yesButtonTitle: "Yes, I'm Sure",
          onYesButtonClick: handleCreate,
        },
      });
    }
  };

  const onBackPress = () => {
    if (currentStep === CreateEventSteps.EVENT_TYPE_STEP) {
      navigation.goBack();
    } else {
      setCurrentStep(val => val - 1);
    }
  };

  useBackHandler(onBackPress, currentStep);

  const steps = [
    <EventTypeStep
      key={CreateEventSteps.EVENT_TYPE_STEP}
      selectedType={EventType}
      setSelectedType={type => setValue('EventType', type)}
    />,
    <EventDetailsStep form={form} />,
    <EventSummaryStep form={form} />,
    <EventMessageStep form={form} />,
  ];

  return (
    <AppScreen showDownInset>
      <AppScreenHeader title="Create Event" />
      <View style={styles.indicatorContainer}>
        {Array.from({ length: steps?.length }).map((_, index) => (
          <View
            style={[
              styles.indicator,
              index < currentStep && {
                backgroundColor: colors.GREEN_600,
              },
            ]}
            key={index}
          />
        ))}
      </View>

      <ScrollView>{steps?.[currentStep - 1]}</ScrollView>

      <View style={styles.footer}>
        <SubmitButton
          style={{ width: '46%' }}
          title={
            currentStep === CreateEventSteps.EVENT_TYPE_STEP
              ? 'Cancel'
              : 'Go Back'
          }
          variant="SECONDARY"
          onPress={onBackPress}
        />
        <SubmitButton
          style={{ width: '46%' }}
          title="Continue"
          onPress={handleContinue}
        />
      </View>
    </AppScreen>
  );
};

enum CreateEventSteps {
  EVENT_TYPE_STEP = 1,
  EVENT_DETAILS_STEP,
  EVENT_SUMMARY_STEP,
  EVENT_MESSAGE_STEP,
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Size.calcHeight(17),
    paddingHorizontal: Size.calcWidth(21),
    borderTopWidth: Size.calcAverage(1),
    borderTopColor: colors.WHITE_300,
  },

  indicator: {
    flex: 1,
    height: Size.calcHeight(4),
    borderRadius: Size.calcWidth(4),
    backgroundColor: colors.LIGHT_GRAY_200,
  },

  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: Size.calcWidth(16),
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(10),
    borderBottomWidth: Size.calcHeight(1),
    borderBottomColor: colors.WHITE_300,
  },
});

export default CreateEventsScreen;
