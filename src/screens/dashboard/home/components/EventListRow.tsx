import { StyleSheet, View } from 'react-native';

import { GetDashboardHappeningTodayEventsData } from '@src/api/dashboard.api';
import AppAvatar from '@src/components/AppAvatar';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import { MaterialSymbolsCalendarToday } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import { dayJSFormatter } from '@src/utils/time';

interface EventListRowProps {
  data: GetDashboardHappeningTodayEventsData;
}

const EventListRow = ({ data }: EventListRowProps): React.JSX.Element => {
  const splittedName = data?.name?.split(' ');

  return (
    <View style={styles.container}>
      <AppAvatar
        firstWord={splittedName?.[0]}
        lastWord={splittedName?.[1]}
        imageURL={data?.images?.[0]}
        style={styles.image}
      />
      <View style={styles.mainContianer}>
        <View style={styles.content}>
          <AppText style={styles.title}>{data?.name}</AppText>
          <View style={styles.row}>
            <MaterialSymbolsCalendarToday
              height={Size.calcAverage(12)}
              width={Size.calcAverage(12)}
              color={colors.GRAY_100}
            />
            <AppText style={styles.subtitle}>
              {dayJSFormatter({
                value: data?.startDate,
                format: 'MMM D, YYYY h:mm A',
              })}
            </AppText>
          </View>
        </View>

        <AppText style={styles.checkins}>
          {data?.totalCheckInCount?.toLocaleString()} Check-ins
        </AppText>
      </View>
    </View>
  );
};

export const EventListRowLoader = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <AppSkeletonLoader
        height={Size.calcAverage(40)}
        width={Size.calcAverage(40)}
        style={{ borderRadius: Size.calcAverage(4) }}
      />
      <View style={styles.mainContianer}>
        <View style={styles.content}>
          <AppSkeletonLoader
            height={Size.calcHeight(11)}
            width={Size.getWidth() / 3}
          />
          <AppSkeletonLoader
            height={Size.calcHeight(11)}
            width={Size.getWidth() / 2.5}
          />
        </View>

        <View style={{ rowGap: Size.calcHeight(5) }}>
          <AppSkeletonLoader
            height={Size.calcHeight(10)}
            width={Size.calcWidth(80)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkins: {
    fontFamily: fonts.INTER_500,
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
    paddingLeft: Size.calcWidth(2),
    textAlign: 'right',
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Size.calcWidth(21),
  },

  content: {
    paddingHorizontal: Size.calcWidth(12),
    flex: 1,
    rowGap: Size.calcHeight(5),
  },

  image: {
    height: Size.calcAverage(40),
    width: Size.calcAverage(40),
    borderRadius: Size.calcAverage(4),
    shadowColor: colors.BLUE_170,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

  mainContianer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: Size.calcHeight(1),
    borderColor: colors.WHITE_300,
    paddingVertical: Size.calcHeight(14),
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  subtitle: {
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
    paddingLeft: Size.calcWidth(5),
  },

  title: {
    fontFamily: fonts.INTER_500,
    color: colors.BLACK_300,
  },
});

export default EventListRow;
