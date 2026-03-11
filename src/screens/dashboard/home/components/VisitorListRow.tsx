import { StyleSheet, View } from 'react-native';

import { GetDashboardHappeningTodayVisitorsData } from '@src/api/dashboard.api';
import AppAvatar from '@src/components/AppAvatar';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import VisitorBookingStatus from '../../bookings/visitors/VisitorBookingStatus';

interface Props {
  data: GetDashboardHappeningTodayVisitorsData;
}

const VisitorListRow = ({ data }: Props): React.JSX.Element => {
  const splitedName = data?.name?.split(' ');

  return (
    <View style={styles.container}>
      <AppAvatar
        firstWord={splitedName?.[0]}
        lastWord={splitedName?.[1]}
        // imageURL={data?.}
      />
      <View style={styles.mainContianer}>
        <View style={styles.content}>
          <AppText style={styles.title}>{data?.name}</AppText>
          <AppText style={styles.subtitle}>
            {data?.visitorTypeText} ({data?.code})
          </AppText>
        </View>

        <VisitorBookingStatus
          status={data?.status}
          statusText={data?.statusText}
          checkInTime={data?.checkInTime}
          checkOutTime={data?.checkOutTime}
        />
      </View>
    </View>
  );
};

export const VisitorListRowLoader = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <AppAvatar isLoading />
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
          <AppSkeletonLoader
            style={{ marginLeft: 'auto' }}
            height={Size.calcHeight(10)}
            width={Size.calcWidth(60)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

  mainContianer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: Size.calcHeight(1),
    borderColor: colors.WHITE_300,
    paddingVertical: Size.calcHeight(14),
  },

  subtitle: {
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
  },

  title: {
    fontFamily: fonts.INTER_500,
    color: colors.BLACK_300,
  },
});

export default VisitorListRow;
