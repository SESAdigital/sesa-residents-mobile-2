import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ALL_DAYS } from '@src/api/constants/data';
import { RepeatDaysType } from '@src/api/constants/default';
import { postGroupAccess, PostGroupAccessReq } from '@src/api/group-access.api';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import InformationRow from '@src/components/common/InformationRow';
import AppCircularCheckIcon from '@src/components/custom/AppCircularCheckIcon';
import AppCollapse from '@src/components/custom/AppCollapse';
import AppKeyboardAvoidingView from '@src/components/custom/AppKeyboardAvoidingView';
import AppDateInput from '@src/components/forms/AppDateInput';
import SubmitButton from '@src/components/forms/SubmitButton';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import { useAppStateStore } from '@src/stores/appState.store';
import { dayJSFormatter } from '@src/utils/time';
import { useAuthStore } from '@src/stores/auth.store';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '@src/api/constants/queryKeys';
import useBackHandler from '@src/hooks/useBackHandler';

const schema = Joi.object<PostGroupAccessReq>({
  visitationDate: Joi.string().required().label('Date of visitation'),
  startTime: Joi.string().optional().allow('').label('Start time'),
  endTime: Joi.string().optional().allow('').label('End time'),
  isAllDay: Joi.boolean().optional(),
  isRepeat: Joi.boolean().optional(),
  repeatDays: Joi.array().items(Joi.string()).optional(),
});

const CreateGroupAccessScreen = (): React.JSX.Element => {
  const {
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm<PostGroupAccessReq>({
    resolver: joiResolver(schema),
    defaultValues: {
      repeatDays: [],
      isAllDay: false,
      isRepeat: false,
    },
  });
  const { selectedProperty } = useAuthStore();
  const { setActiveModal, closeActiveModal, setIsAppModalLoading } =
    useAppStateStore();
  const queryClient = useQueryClient();
  const navigation = useAppNavigator();
  const [startTime, endTime, isRepeat, repeatDays, visitationDate, isAllDay] =
    watch([
      'startTime',
      'endTime',
      'isRepeat',
      'repeatDays',
      'visitationDate',
      'isAllDay',
      'isRepeat',
    ]);

  const onFinalSubmit = async () => {
    setIsAppModalLoading(true);
    const response = await postGroupAccess({
      visitationDate,
      startTime,
      endTime,
      isAllDay,
      isRepeat,
      repeatDays: isRepeat ? repeatDays : [],
      propertyUnitId: selectedProperty?.id!,
    });
    setIsAppModalLoading(false);

    if (response?.ok && response?.data) {
      appToast.Success(
        response?.data?.message || 'Group Access created successfully',
      );
      closeActiveModal();
      navigation.replace(
        routes.CREATE_GROUP_ACCESS_SUCCESS_SCREEN,
        response?.data?.data,
      );
      queryClient.resetQueries({
        queryKey: [queryKeys.GET_GROUP_ACCESS_BOOKINGS],
      });
    } else {
      handleToastApiError(response);
    }
  };

  const onSubmit = handleSubmit(data => {
    if (!selectedProperty?.id) {
      return appToast.Warning('Invalid property selected');
    }

    if (!isAllDay && (!startTime || !endTime)) {
      setError('startTime', { message: 'Please select start time' });
      setError('endTime', { message: 'Please select end time' });
      return appToast.Warning('Please select start and end time');
    }

    setActiveModal({
      modalType: 'PROMT_MODAL',
      promptModal: {
        title: 'Are you sure?',
        description: `You are about to create a Group Access code for ${dayJSFormatter(
          { value: data.visitationDate, format: 'MMM D, YYYY' },
        )}.  Are you sure you want to continue?`,
        noButtonTitle: 'Cancel',
        yesButtonTitle: "Yes, I'm sure",
        onYesButtonClick: onFinalSubmit,
      },
    });
    return;
  });

  const handleSelect = (val: RepeatDaysType) => {
    if (repeatDays.includes(val)) {
      setValue(
        'repeatDays',
        repeatDays?.filter(d => d !== val),
      );
    } else {
      setValue('repeatDays', [...repeatDays, val]);
    }
  };

  const onBackPress = () => {
    setActiveModal({
      modalType: 'PROMT_MODAL',
      promptModal: {
        title: 'Are you sure?',
        description:
          'Your progress will be discarded. Are you sure you want to discard it?',
        noButtonTitle: 'No, continue',
        yesButtonTitle: "Yes, I'm Sure",
        yesButtonProps: {
          variant: 'DANGER',
        },
        onYesButtonClick: () => {
          closeActiveModal();
          navigation.goBack();
        },
      },
    });
  };

  useBackHandler(onBackPress, 1);

  return (
    <AppScreen showDownInset>
      <AppScreenHeader onBackPress={onBackPress} title="Create Group Access" />

      <AppKeyboardAvoidingView>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ rowGap: Size.calcHeight(28) }}
        >
          <AppDateInput
            errorMessage={errors?.visitationDate?.message || ''}
            placeholder="Date of Visitation"
            label="Date of Visitation"
            mode="date"
            minimumDate={new Date()}
            value={visitationDate}
            setValue={value => {
              if (errors?.visitationDate?.message)
                setError('visitationDate', { message: undefined });
              setValue('visitationDate', value);
            }}
          />
          <AppCollapse isVisible={!isAllDay}>
            <View style={styles.dateContainer}>
              <AppDateInput
                label="Start Time"
                placeholder="Start Time"
                mode="time"
                value={startTime || ''}
                errorMessage={errors?.startTime?.message || ''}
                setValue={value => {
                  if (errors?.startTime?.message)
                    setError('startTime', { message: undefined });
                  setValue('startTime', value);
                }}
              />
              <AppDateInput
                label="End Time"
                placeholder="End Time"
                mode="time"
                value={endTime || ''}
                errorMessage={errors?.endTime?.message || ''}
                setValue={value => {
                  if (errors?.endTime?.message)
                    setError('endTime', { message: undefined });
                  setValue('endTime', value);
                }}
              />
            </View>
          </AppCollapse>

          <View style={styles.row}>
            <TouchableOpacity onPress={() => setValue('isAllDay', !isAllDay)}>
              <AppCircularCheckIcon isChecked={isAllDay} />
            </TouchableOpacity>
            <View>
              <AppText
                style={styles.title}
                onPress={() => setValue('isAllDay', !isAllDay)}
              >
                All Day
              </AppText>
              <AppText style={styles.subtitle}>
                Check-in will be allowed throughout the day
              </AppText>
            </View>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => setValue('isRepeat', !isRepeat)}>
              <AppCircularCheckIcon isChecked={isRepeat} />
            </TouchableOpacity>
            <View>
              <AppText
                style={styles.title}
                onPress={() => setValue('isRepeat', !isRepeat)}
              >
                Repeat every:
              </AppText>

              <AppCollapse isVisible={isRepeat}>
                <View style={styles.repeatContainer}>
                  {ALL_DAYS.map(day => (
                    <TouchableOpacity
                      key={day}
                      onPress={() => handleSelect(day)}
                    >
                      <AppText
                        style={[
                          styles.dayText,
                          repeatDays.includes(day) && styles.dayTextActive,
                        ]}
                      >
                        {day}
                      </AppText>
                    </TouchableOpacity>
                  ))}
                </View>
              </AppCollapse>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <InformationRow title="For repeat group access, you can edit or cancel at anytime by going to the most recent group access." />
          <SubmitButton title="Continue" onPress={onSubmit} />
        </View>
      </AppKeyboardAvoidingView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(37),
  },

  dateContainer: {
    flexDirection: 'row',
    gap: Size.calcWidth(23),
    alignItems: 'flex-end',
    paddingTop: Size.calcHeight(16),
  },

  dayText: {
    paddingHorizontal: Size.calcWidth(12),
    paddingVertical: Size.calcHeight(8),
    borderRadius: 100,
    backgroundColor: colors.WHITE_300,
    borderWidth: Size.calcAverage(1),
    borderColor: colors.LIGHT_GRAY_200,
  },

  dayTextActive: {
    backgroundColor: colors.BLUE_600,
    borderColor: colors.BLUE_200,
    color: colors.WHITE_100,
  },

  footer: {
    paddingTop: Size.calcHeight(24),
    paddingBottom: Size.calcHeight(50),
    paddingHorizontal: Size.calcWidth(21),
    rowGap: Size.calcHeight(24),
  },

  repeatContainer: {
    flexWrap: 'wrap',
    rowGap: Size.calcHeight(14),
    columnGap: Size.calcWidth(12),
    flexDirection: 'row',
    gap: Size.calcWidth(8),
    paddingVertical: Size.calcHeight(16),
  },

  row: {
    flexDirection: 'row',
    gap: Size.calcWidth(8),
  },

  subtitle: {
    color: colors.GRAY_100,
    paddingTop: Size.calcHeight(4),
    fontSize: Size.calcAverage(12),
  },

  title: {
    fontFamily: fonts.INTER_500,
    color: colors.GRAY_100,
  },
});

export default CreateGroupAccessScreen;
