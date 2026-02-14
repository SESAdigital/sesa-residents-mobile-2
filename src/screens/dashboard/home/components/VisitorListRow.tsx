import { StyleSheet, View } from 'react-native';

import AppAvatar from '@src/components/AppAvatar';
import AppText from '@src/components/AppText';
import { MdiLightArrowLeft, MdiLightArrowRight } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';

const VisitorListRow = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <AppAvatar />
        <View style={{ paddingHorizontal: Size.calcWidth(12) }}>
          <AppText style={styles.title}>John Doe</AppText>
          <AppText style={styles.subtitle}>Artisan (AV-381032)</AppText>
        </View>
      </View>
      <View>
        <View style={[styles.row, { paddingBottom: Size.calcHeight(2) }]}>
          <MdiLightArrowRight
            height={Size.calcAverage(20)}
            width={Size.calcAverage(20)}
            color={colors.GREEN_100}
          />
          <AppText style={styles.time}>1:30 PM</AppText>
        </View>
        <View style={styles.row}>
          <MdiLightArrowLeft
            height={Size.calcAverage(20)}
            width={Size.calcAverage(20)}
            color={colors.RED_100}
          />
          <AppText style={[styles.time, { color: colors.RED_100 }]}>
            1:30 PM
          </AppText>
        </View>
      </View>
    </View>
  );
};

export const VisitorListRowLoader = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <AppAvatar isLoading />
        <View
          style={{
            paddingHorizontal: Size.calcWidth(12),
            rowGap: Size.calcHeight(10),
          }}
        >
          <AppSkeletonLoader
            height={Size.calcHeight(11)}
            width={Size.getWidth() / 3}
          />
          <AppSkeletonLoader
            height={Size.calcHeight(11)}
            width={Size.getWidth() / 2}
          />
        </View>
      </View>
      <View>
        <View style={[styles.row, { paddingBottom: Size.calcHeight(8) }]}>
          <AppSkeletonLoader
            style={{ marginLeft: 'auto' }}
            height={Size.calcHeight(10)}
            width={Size.calcWidth(60)}
          />
        </View>
        <View style={styles.row}>
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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: Size.calcHeight(1),
    borderColor: colors.WHITE_300,
    paddingVertical: Size.calcHeight(14),
    paddingHorizontal: Size.calcWidth(21),
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
    paddingBottom: Size.calcHeight(2),
    color: colors.BLACK_300,
  },
});

export default VisitorListRow;
