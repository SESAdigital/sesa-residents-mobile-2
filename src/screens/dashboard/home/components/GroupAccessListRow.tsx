import { StyleSheet, View } from 'react-native';

import { GetDashboardHappeningTodayGroupAccessData } from '@src/api/dashboard.api';
import AppAvatar from '@src/components/AppAvatar';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import { MdiLightArrowRight } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { dayJSFormatter } from '@src/utils/time';
import Size from '@src/utils/useResponsiveSize';

interface Props {
  data: GetDashboardHappeningTodayGroupAccessData;
}

const GroupAccessListRow = ({ data }: Props): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <AppAvatar firstWord={data?.code} lastWord={data?.code} />
      <View style={styles.mainContianer}>
        <View style={styles.content}>
          <View style={[styles.row, { columnGap: Size.calcWidth(5) }]}>
            <AppText style={styles.title}>
              {dayJSFormatter({ format: 'hh:mm A', value: data?.startDate })}
            </AppText>
            <MdiLightArrowRight
              height={Size.calcAverage(12)}
              width={Size.calcAverage(12)}
              color={colors.GRAY_100}
            />
            <AppText style={styles.title}>
              {dayJSFormatter({ format: 'hh:mm A', value: data?.endTime })}
            </AppText>
          </View>
          <AppText style={styles.subtitle}>{data?.code}</AppText>
        </View>

        <AppText style={styles.checkins}>
          {data?.totalCheckInCount?.toLocaleString()} Check-ins
        </AppText>
      </View>
    </View>
  );
};

export const GroupAccessListRowLoader = (): React.JSX.Element => {
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
  },

  title: {
    fontFamily: fonts.INTER_500,
    color: colors.BLACK_300,
  },
});

export default GroupAccessListRow;
