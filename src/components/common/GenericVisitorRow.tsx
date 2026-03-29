import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { GetPropertyDependentsVisitorsResData } from '@src/api/household.api';
import colors from '@src/configs/colors';
import VisitorBookingStatus from '@src/screens/dashboard/bookings/visitors/VisitorBookingStatus';
import { dayJSFormatter } from '@src/utils/time';
import Size from '@src/utils/useResponsiveSize';
import AppAvatar from '../AppAvatar';
import AppText from '../AppText';
import {
  MaterialSymbolsAccountCircle,
  MaterialSymbolsCalendarTodayRounded,
} from '../icons';
import fonts from '@src/configs/fonts';
import { AccessCodeStatusData } from '@src/api/constants/default';
import AppSkeletonLoader from '../AppSkeletonLoader';

interface Props {
  value: GetPropertyDependentsVisitorsResData;
  onPress?: () => void;
}

const GenericVisitorRow = (props: Props): React.JSX.Element => {
  const { value, onPress } = props;
  const splittedName = value?.name?.split(' ');

  return (
    <View style={styles.container}>
      <AppAvatar firstWord={splittedName?.[0]} lastWord={splittedName?.[1]} />

      <TouchableOpacity
        disabled={!onPress}
        onPress={onPress}
        style={styles.contentContainer}
      >
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
                  value: value?.dateOfVisitation,
                  format: 'MMM D, YYYY',
                })}
              </AppText>
            </View>
            <View style={styles.row}>
              <MaterialSymbolsAccountCircle
                color={colors.GRAY_100}
                height={Size.calcAverage(12)}
                width={Size.calcAverage(12)}
              />
              <AppText style={styles.text}>{value?.code}</AppText>
            </View>
          </View>
        </View>
        <VisitorBookingStatus
          status={value?.status || AccessCodeStatusData.Completed}
          statusText={value?.statusText || ''}
          checkInTime={value?.checkInTime}
          checkOutTime={value?.checkOutTime}
        />
      </TouchableOpacity>
    </View>
  );
};

export const GenericVisitorRowLoader = () => {
  return (
    <View style={styles.container}>
      <AppAvatar isLoading />

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
              <AppSkeletonLoader width={Size.calcWidth(50)} />
            </View>
            <View style={styles.row}>
              <MaterialSymbolsAccountCircle
                color={colors.GRAY_100}
                height={Size.calcAverage(12)}
                width={Size.calcAverage(12)}
              />
              <AppSkeletonLoader width={Size.calcWidth(50)} />
            </View>
          </View>
        </View>
        <AppSkeletonLoader width={Size.calcWidth(100)} />
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

export default GenericVisitorRow;
