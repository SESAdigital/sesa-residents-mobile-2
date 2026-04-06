import { UseFormReturn } from 'react-hook-form';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { WORK_DAYS } from '@src/api/constants/data';
import { PostCreateSiteWorkerReq2 } from '@src/api/household.api';
import AppText from '@src/components/AppText';
import AppKeyboardAvoidingView from '@src/components/custom/AppKeyboardAvoidingView';
import AppDateInput from '@src/components/forms/AppDateInput';
import AppMultiLineTextInput from '@src/components/forms/AppMultiLineTextInput';
import SubmitButton from '@src/components/forms/SubmitButton';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { appToast } from '@src/utils/appToast';
import Size from '@src/utils/useResponsiveSize';

interface Props {
  onDone: () => void;
  onBackClick: () => void;
  form: UseFormReturn<PostCreateSiteWorkerReq2, any, PostCreateSiteWorkerReq2>;
}
const SetSiteWorkerScheduleStep = (props: Props): React.JSX.Element => {
  const { onDone, onBackClick, form } = props;

  const {
    watch,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = form;

  const [ClockInEnd, ClockInStart, Workdays, WorkPeriodStart, WorkPeriodEnd] =
    watch([
      'ClockInEnd',
      'ClockInStart',
      'Workdays',
      'WorkPeriodStart',
      'WorkPeriodEnd',
    ]);

  const onSubmit = () => {
    if (!Workdays || Workdays?.length < 1)
      return appToast.Info('Please select at least one work day');

    return onDone();
  };

  const handleSelectDay = (day: string) => {
    if (Workdays?.includes(day)) {
      setValue(
        'Workdays',
        Workdays?.filter(d => d !== day),
      );
    } else if (!Workdays?.length) {
      setValue('Workdays', [day]);
    } else {
      setValue('Workdays', [...Workdays, day]);
    }
  };

  return (
    <AppKeyboardAvoidingView>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <AppText style={styles.headerTitle}>Set work schedule</AppText>
          <AppText style={{ fontSize: Size.calcAverage(12) }}>
            Setup work period and work days.
          </AppText>
        </View>

        <View style={styles.dateContainer}>
          <AppDateInput
            errorMessage={errors?.WorkPeriodStart?.message || ''}
            label="Start Date"
            mode="date"
            minimumDate={new Date()}
            value={WorkPeriodStart}
            setValue={value => {
              if (errors?.WorkPeriodStart?.message)
                setError('WorkPeriodStart', { message: undefined });
              setValue('WorkPeriodStart', value);
            }}
            placeholder="Start Date"
          />

          <AppDateInput
            errorMessage={errors?.WorkPeriodEnd?.message || ''}
            label="End Date"
            mode="date"
            minimumDate={new Date(WorkPeriodStart)}
            value={WorkPeriodEnd}
            setValue={value => {
              if (errors?.WorkPeriodEnd?.message)
                setError('WorkPeriodEnd', { message: undefined });
              setValue('WorkPeriodEnd', value);
            }}
            placeholder="End Date"
          />
        </View>
        <View style={styles.dateContainer}>
          <AppDateInput
            errorMessage={errors?.ClockInStart?.message || ''}
            label="Check-in time"
            mode="time"
            value={ClockInStart || ''}
            setValue={value => {
              if (errors?.ClockInStart?.message)
                setError('ClockInStart', { message: undefined });
              setValue('ClockInStart', value);
            }}
            placeholder="Check-in time"
          />

          <AppDateInput
            errorMessage={errors?.ClockInEnd?.message || ''}
            label="Check-out time"
            mode="time"
            value={ClockInEnd || ''}
            setValue={value => {
              if (errors?.ClockInEnd?.message)
                setError('ClockInEnd', { message: undefined });
              setValue('ClockInEnd', value);
            }}
            placeholder="Check-out time"
          />
        </View>

        <AppText style={styles.workDayInstruction}>
          Select work days for this site worker (required)
        </AppText>

        <View style={styles.workDayContainer}>
          {WORK_DAYS?.map((day, index) => {
            const isActive = Workdays?.includes(day);
            return (
              <TouchableOpacity
                style={[
                  styles.workDayButton,
                  isActive && styles.workDayButtonActive,
                ]}
                onPress={() => handleSelectDay(day)}
                key={index}
              >
                <AppText
                  style={[
                    styles.workDayText,
                    isActive && styles.workDayTextActive,
                  ]}
                >
                  {day}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </View>

        <View>
          <AppText style={styles.headerTitle}>
            Message to security guards (optional)
          </AppText>
          <AppText
            style={{
              fontSize: Size.calcAverage(12),
              marginBottom: Size.calcHeight(12),
            }}
          >
            This message will be displayed to the security guards as an
            instruction when they check-in/out this site worker.
          </AppText>
          <AppMultiLineTextInput
            placeholder="Leave a message"
            label=""
            name="SecurityGuardMessage"
            control={control}
            errorMessage={errors?.SecurityGuardMessage?.message}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <SubmitButton
          variant="SECONDARY"
          style={{ width: '47%' }}
          title="Go Back"
          onPress={onBackClick}
        />
        <SubmitButton
          title="Continue"
          style={{ width: '47%' }}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </AppKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Size.calcWidth(21),
    rowGap: Size.calcHeight(26),
    paddingVertical: Size.calcHeight(26),
  },

  dateContainer: {
    flexDirection: 'row',
    gap: Size.calcWidth(23),
    alignItems: 'flex-end',
    paddingTop: Size.calcHeight(16),
  },

  footer: {
    paddingTop: Size.calcHeight(16),
    paddingBottom: Size.calcHeight(16 * 3),
    borderTopColor: colors.WHITE_300,
    borderTopWidth: Size.calcAverage(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Size.calcWidth(21),
  },

  headerTitle: {
    paddingBottom: Size.calcHeight(4),
    fontFamily: fonts.INTER_500,
  },

  row: {
    flexDirection: 'row',
    columnGap: Size.calcWidth(12),
    alignItems: 'center',
  },

  title: {
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_500,
    paddingBottom: Size.calcHeight(4),
  },

  workDayButton: {
    paddingVertical: Size.calcHeight(8),
    paddingHorizontal: Size.calcWidth(16),
    borderRadius: Size.calcAverage(8),
    borderWidth: Size.calcAverage(1),
    borderColor: colors.LIGHT_GRAY_100,
  },

  workDayButtonActive: {
    backgroundColor: colors.BLUE_200,
    borderColor: colors.CYAN_100,
  },

  workDayContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Size.calcHeight(12),
  },

  workDayInstruction: {
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_500,
  },

  workDayText: {
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_600,
  },

  workDayTextActive: {
    color: colors.WHITE_100,
  },
});

export default SetSiteWorkerScheduleStep;
