import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { GetPropertyDependentsEventsResData } from '@src/api/household.api';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import EventBookingStatus from '@src/screens/dashboard/bookings/events/components/EventBookingStatus';
import { dayJSFormatter } from '@src/utils/time';
import Size from '@src/utils/useResponsiveSize';
import AppAvatar from '../AppAvatar';
import AppSkeletonLoader from '../AppSkeletonLoader';
import AppText from '../AppText';
import { MaterialSymbolsCalendarTodayRounded } from '../icons';

interface Props {
  value: GetPropertyDependentsEventsResData;
  onPress?: () => void;
}

const GenericEventRow = (props: Props): React.JSX.Element => {
  const { value, onPress } = props;

  return (
    <View style={styles.container}>
      <AppAvatar
        firstWord={value?.name?.split(' ')?.[0]}
        lastWord={value?.name?.split(' ')?.[1]}
        imageURL={value?.images?.[0]}
        style={styles.image}
      />

      <TouchableOpacity onPress={onPress} style={styles.contentContainer}>
        <View style={styles.descriptionContainer}>
          <AppText style={styles.title}>{value?.name}</AppText>

          <View style={styles.row2}>
            <View style={styles.row}>
              <MaterialSymbolsCalendarTodayRounded
                color={colors.GRAY_100}
                height={Size.calcAverage(12)}
                width={Size.calcAverage(12)}
              />
              <AppText style={styles.text}>
                {dayJSFormatter({
                  value: value?.startDate,
                  format: 'MMM D, YYYY h:mm A',
                  shouldNotLocalize: true,
                })}
              </AppText>
            </View>
            <EventBookingStatus
              status={value?.status}
              statusText={value?.statusText}
            />
          </View>
        </View>
        {!!value?.totalCheckInCount && (
          <AppText style={[styles.text, { fontFamily: fonts.INTER_500 }]}>
            {value?.totalCheckInCount?.toLocaleString()} Check-ins
          </AppText>
        )}
      </TouchableOpacity>
    </View>
  );
};

export const GenericEventRowLoader = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <AppSkeletonLoader
        width={Size.calcAverage(40)}
        height={Size.calcAverage(40)}
        style={styles.image}
      />

      <View style={styles.contentContainer}>
        <View style={styles.descriptionContainer}>
          <AppSkeletonLoader width={Size.calcWidth(100)} />

          <View style={styles.row2}>
            <View style={styles.row}>
              <MaterialSymbolsCalendarTodayRounded
                color={colors.GRAY_100}
                height={Size.calcAverage(12)}
                width={Size.calcAverage(12)}
              />
              <AppSkeletonLoader width={Size.calcWidth(100)} />
            </View>
            <AppSkeletonLoader width={Size.calcWidth(100)} />
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Size.calcWidth(18),
  },

  contentContainer: {
    flex: 1,
    paddingVertical: Size.calcHeight(13),
    borderBottomWidth: Size.calcHeight(1),
    borderBottomColor: colors.WHITE_300,
    flexDirection: 'row',
    flexShrink: 1,
    alignItems: 'center',
    marginLeft: Size.calcWidth(12),
  },

  descriptionContainer: {
    rowGap: Size.calcHeight(4),
    flex: 1,
  },

  image: {
    height: Size.calcAverage(40),
    borderRadius: Size.calcAverage(8),
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: Size.calcWidth(2),
  },

  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: Size.calcWidth(10),
    flexWrap: 'wrap',
  },

  title: {
    fontFamily: fonts.INTER_500,
    color: colors.BLACK_300,
  },

  text: {
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
  },
});

export default GenericEventRow;
