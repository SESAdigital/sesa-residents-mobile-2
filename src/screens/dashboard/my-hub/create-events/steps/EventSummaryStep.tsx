import { UseFormReturn } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { PostEventReq } from '@src/api/events.api';
import AppText from '@src/components/AppText';
import AppCircularCheckIcon from '@src/components/custom/AppCircularCheckIcon';
import {
  MaterialSymbolsArrowDropDown,
  RiInformationFill,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useGetProperties } from '@src/hooks/useGetRequests';
import SwitchPropertyModal from '@src/modals/SwitchPropertyModal';
import { useAppStateStore } from '@src/stores/appState.store';
import { useAuthStore } from '@src/stores/auth.store';
import Size from '@src/utils/useResponsiveSize';
import AppTextInput from '@src/components/forms/AppTextInput';
import {
  EventLocationTypeData,
  GuestLimitType,
  GuestLimitTypeData,
} from '@src/types/default';
import AppCollapse from '@src/components/custom/AppCollapse';

interface Props {
  form: UseFormReturn<PostEventReq, any, PostEventReq>;
}

const guestLimitData = [
  {
    title: 'Daily limit for check-in',
    value: GuestLimitTypeData.DAILY_LIMIT,
  },
  {
    title: 'Total limit for check-in',
    value: GuestLimitTypeData.TOTAL_LIMIT,
  },
];

const EventSummaryStep = ({ form }: Props): React.JSX.Element => {
  const { setActiveModal } = useAppStateStore();
  const { selectedProperty } = useAuthStore();
  useGetProperties();
  const { control, watch, setValue } = form;
  const [eventLocationType, guestLimitType, GuestLimit] = watch([
    'eventLocationType',
    'guestLimitType',
    'GuestLimit',
  ]);

  const onIconPress = (val: GuestLimitType) => {
    if (val === GuestLimitTypeData.DAILY_LIMIT) {
      setActiveModal({
        modalType: 'SINGLE_PROMPT_MODAL',
        singlePromptModal: {
          title: 'Daily limit for check-in',
          description:
            'This uses the value entered in the "expected number of guests" field as a daily check-in limit. It resets at the end of each day for events over 1 day.',
        },
      });
    }
    if (val === GuestLimitTypeData.TOTAL_LIMIT) {
      setActiveModal({
        modalType: 'SINGLE_PROMPT_MODAL',
        singlePromptModal: {
          title: 'Total limit for check-in',
          description:
            'This uses the value you entered in the "expected number of guests" field as the total check-in limit for this event irrespective of the number of days the event holds.',
        },
      });
    }
  };

  const handleSwitch = () => {
    setActiveModal({
      modalType: 'EMPTY_MODAL',
      emptyModalComponent: <SwitchPropertyModal />,
      shouldBackgroundClose: true,
    });
  };

  const isAnotherLocation =
    eventLocationType === EventLocationTypeData.ANOTHER_LOCATION;

  const isCurrentLocation =
    eventLocationType === EventLocationTypeData.CURRENT_LOCATION;

  const onCurrentPress = () => {
    if (isCurrentLocation) {
      setValue('eventLocationType', EventLocationTypeData.NONE);
    } else {
      setValue('eventLocationType', EventLocationTypeData.CURRENT_LOCATION);
    }
  };

  const onAnotherPress = () => {
    if (isAnotherLocation) {
      setValue('eventLocationType', EventLocationTypeData.NONE);
    } else {
      setValue('eventLocationType', EventLocationTypeData.ANOTHER_LOCATION);
    }
  };

  return (
    <View style={styles.container}>
      <AppText style={{ fontFamily: fonts.INTER_600 }}>Event Location</AppText>
      <AppText style={styles.subtitle}>
        Select event location or add a new location
      </AppText>

      <TouchableOpacity
        onPress={onCurrentPress}
        style={[styles.row, styles.gap, { alignItems: 'flex-start' }]}
      >
        <AppCircularCheckIcon isChecked={isCurrentLocation} />
        <View>
          <AppText style={styles.text}>
            Current Property ({selectedProperty?.propertyAddress})
          </AppText>
          <TouchableOpacity onPress={handleSwitch} style={styles.button}>
            <AppText style={styles.switchPropertyText}>Switch Property</AppText>
            <MaterialSymbolsArrowDropDown
              height={Size.calcAverage(20)}
              width={Size.calcAverage(20)}
              color={colors.BLUE_200}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onAnotherPress}
        style={[styles.row, styles.gap]}
      >
        <AppCircularCheckIcon isChecked={isAnotherLocation} />

        <AppText style={styles.text}>Add New Location</AppText>
      </TouchableOpacity>
      <AppCollapse isVisible={isAnotherLocation}>
        <View style={{ paddingTop: Size.calcHeight(10) }}>
          <AppTextInput
            control={control}
            name="Address"
            placeholder="Enter event location"
            label="Event Location"
            description="Enter the location of the event."
          />
        </View>
      </AppCollapse>
      <AppText style={styles.expectedText}>
        Expected number of guests (Optional)
      </AppText>
      <AppTextInput
        control={control}
        name="GuestLimit"
        placeholder="Enter number of guests"
        label="Enter number of guests"
        description="If you are not sure, give an estimate."
        keyboardType="number-pad"
      />
      <AppCollapse isVisible={!!GuestLimit}>
        <AppText style={styles.guestLimitText}>Guest Limit (Optional)</AppText>
        <AppText style={styles.guestLimitSubtitle}>
          Is this number above the daily limit or total limit?
        </AppText>

        <View style={{ rowGap: Size.calcHeight(24) }}>
          {guestLimitData?.map(({ title, value }, key) => {
            const isSelected = guestLimitType === value;
            return (
              <TouchableOpacity
                style={[styles.row, { marginRight: 'auto' }]}
                key={key}
                onPress={() => !isSelected && setValue('guestLimitType', value)}
              >
                <AppCircularCheckIcon isChecked={isSelected} />
                <AppText style={styles.itemText}>{title}</AppText>
                <TouchableOpacity
                  style={{ paddingHorizontal: Size.calcWidth(4) }}
                  onPress={() => onIconPress(value)}
                >
                  <RiInformationFill
                    height={Size.calcAverage(15)}
                    width={Size.calcAverage(15)}
                    color={colors.GRAY_200}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </View>
      </AppCollapse>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: Size.calcWidth(1),
    marginTop: Size.calcHeight(6),
    marginBottom: Size.calcHeight(14),
    paddingHorizontal: Size.calcWidth(6),
    paddingVertical: Size.calcHeight(6),
    marginLeft: Size.calcWidth(-5),
  },

  container: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(16),
  },

  expectedText: {
    fontFamily: fonts.INTER_600,
    paddingTop: Size.calcHeight(32),
    paddingBottom: Size.calcHeight(24),
  },

  gap: {
    columnGap: Size.calcWidth(10),
  },

  guestLimitSubtitle: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
    paddingTop: Size.calcHeight(4),
    paddingBottom: Size.calcHeight(54),
  },

  guestLimitText: {
    fontFamily: fonts.INTER_600,
    paddingTop: Size.calcHeight(32),
  },

  itemText: {
    fontFamily: fonts.INTER_500,
    color: colors.GRAY_100,
    paddingLeft: Size.calcWidth(8),
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  subtitle: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
    paddingTop: Size.calcHeight(4),
    paddingBottom: Size.calcHeight(25),
  },

  switchPropertyText: {
    color: colors.BLUE_200,
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_600,
  },

  text: {
    fontFamily: fonts.INTER_500,
    color: colors.GRAY_100,
    paddingRight: Size.calcWidth(40),
  },
});

export default EventSummaryStep;
