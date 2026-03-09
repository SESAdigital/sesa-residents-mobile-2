import { StyleSheet, View } from 'react-native';

import AppAvatar from '@src/components/AppAvatar';
import AppText from '@src/components/AppText';
import { MdiLightArrowLeft, MdiLightArrowRight } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import { GetDashboardHappeningTodayVisitorsData } from '@src/api/dashboard.api';
import { dayJSFormatter } from '@src/utils/time';
import AppPill from '@src/components/common/AppPill';
import { AccessCodeStatusData } from '@src/api/constants/default';

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

        <View style={{ rowGap: Size.calcHeight(2) }}>
          {data?.status === AccessCodeStatusData.Pending ? (
            <AppPill statusText={data?.statusText} status="WARNING" />
          ) : (
            <>
              <View style={styles.row}>
                <MdiLightArrowRight
                  height={Size.calcAverage(20)}
                  width={Size.calcAverage(20)}
                  color={colors.GREEN_100}
                />
                <AppText style={styles.time}>
                  {dayJSFormatter({
                    value: data?.checkInTime,
                    format: 'hh:mm A',
                  })}
                </AppText>
              </View>
              <View style={styles.row}>
                <MdiLightArrowLeft
                  height={Size.calcAverage(20)}
                  width={Size.calcAverage(20)}
                  color={colors.RED_100}
                />
                <AppText style={[styles.time, { color: colors.RED_100 }]}>
                  {dayJSFormatter({
                    value: data?.checkOutTime,
                    format: 'hh:mm A',
                  })}
                </AppText>
              </View>
            </>
          )}
        </View>
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

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  subtitle: {
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
  },

  time: {
    fontFamily: fonts.INTER_600,
    color: colors.GREEN_100,
    fontSize: Size.calcAverage(12),
    paddingLeft: Size.calcWidth(2),
    textAlign: 'right',
  },

  title: {
    fontFamily: fonts.INTER_500,
    color: colors.BLACK_300,
  },
});

export default VisitorListRow;
