import { UseFormReturn } from 'react-hook-form';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { WORK_DAYS } from '@src/api/constants/data';
import { PostCreateHouseholdStaffReq } from '@src/api/household.api';
import AppText from '@src/components/AppText';
import AppKeyboardAvoidingView from '@src/components/custom/AppKeyboardAvoidingView';
import AppMultiLineTextInput from '@src/components/forms/AppMultiLineTextInput';
import AppSwitch from '@src/components/forms/AppSwitch';
import SubmitButton from '@src/components/forms/SubmitButton';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import { appToast } from '@src/utils/appToast';

type ToggleKeys =
  | 'RequireCheckInApproval'
  | 'RequireCheckInPicture'
  | 'RequireCheckOutApproval'
  | 'RequireCheckOutPicture';

interface Requirement {
  title: string;
  description: string;
  toggleKey: ToggleKeys;
  value?: boolean;
}

interface Props {
  onDone: () => void;
  onBackClick: () => void;
  form: UseFormReturn<
    PostCreateHouseholdStaffReq,
    any,
    PostCreateHouseholdStaffReq
  >;
}
const ConfigureAccessRequirementStep = (props: Props): React.JSX.Element => {
  const { onDone, onBackClick, form } = props;

  const {
    watch,
    control,
    setValue,
    formState: { errors },
  } = form;

  const [
    RequireCheckInApproval,
    RequireCheckInPicture,
    RequireCheckOutApproval,
    RequireCheckOutPicture,
    WorkDays,
  ] = watch([
    'RequireCheckInApproval',
    'RequireCheckInPicture',
    'RequireCheckOutApproval',
    'RequireCheckOutPicture',
    'WorkDays',
  ]);

  const handleSubmit = () => {
    if (!WorkDays || WorkDays?.length < 1)
      return appToast.Info('Please select at least one work day');

    return onDone();
  };

  const requirements: Requirement[] = [
    {
      title: 'Require Check-in Approval (optional)',
      description:
        'Guard must get approval from you (or the other alpha occupant) before the household staff can check in.',
      toggleKey: 'RequireCheckInApproval',
      value: RequireCheckInApproval,
    },
    {
      title: 'Require Check-out Approval (optional)',
      description:
        'Guard must get approval from you (or the other alpha occupant) before the household staff can check out.',
      toggleKey: 'RequireCheckOutApproval',
      value: RequireCheckOutApproval,
    },
    {
      title: 'Require Check-in Picture (optional)',
      description:
        'Guard must capture a complete picture of the household staff to record their "entry state" before they can check in.',
      toggleKey: 'RequireCheckInPicture',
      value: RequireCheckInPicture,
    },
    {
      title: 'Require Check-out Picture (optional)',
      description:
        'Guard must capture a complete picture of the household staff to record their "exit state" before they can check out.',
      toggleKey: 'RequireCheckOutPicture',
      value: RequireCheckOutPicture,
    },
  ];

  const handleSelectDay = (day: string) => {
    if (WorkDays?.includes(day)) {
      setValue(
        'WorkDays',
        WorkDays?.filter(d => d !== day),
      );
    } else if (!WorkDays?.length) {
      setValue('WorkDays', [day]);
    } else {
      setValue('WorkDays', [...WorkDays, day]);
    }
  };

  return (
    <AppKeyboardAvoidingView>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <AppText style={styles.headerTitle}>
            Configure Access Requirements
          </AppText>
          <AppText style={{ fontSize: Size.calcAverage(12) }}>
            This determines the criteria for enabling access in and out of the
            estate
          </AppText>
        </View>

        {requirements.map((req, index) => (
          <View style={styles.row} key={index}>
            <View style={{ flexShrink: 1 }}>
              <AppText style={styles.title}>{req.title}</AppText>
              <AppText style={{ fontSize: Size.calcAverage(12) }}>
                {req.description}
              </AppText>
            </View>
            <AppSwitch
              isEnabled={!!req?.value}
              onValueChange={value => setValue(req?.toggleKey, value)}
            />
          </View>
        ))}

        <AppText style={styles.workDayInstruction}>
          Select work days for this household staff (required)
        </AppText>

        <View style={styles.workDayContainer}>
          {WORK_DAYS?.map((day, index) => {
            const isActive = WorkDays?.includes(day);
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
            instruction when they check-in/out this household staff.
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
          title="Cancel"
          onPress={onBackClick}
        />
        <SubmitButton
          title="Continue"
          style={{ width: '47%' }}
          onPress={handleSubmit}
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

export default ConfigureAccessRequirementStep;
