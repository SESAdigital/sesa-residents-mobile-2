import { StyleSheet, TouchableOpacity, View } from 'react-native';

import AppText from '@src/components/AppText';
import { MaterialSymbolsArrowDropDown } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import VisitorListRow, { VisitorListRowLoader } from './VisitorListRow';

const HappeningTodaySection = (): React.ReactNode => {
  return (
    <>
      <View style={styles.container}>
        <AppText style={styles.title}>Happening Today (9)</AppText>
        <TouchableOpacity style={styles.row}>
          <AppText style={styles.visitorsText}>Visitors</AppText>
          <MaterialSymbolsArrowDropDown
            height={Size.calcAverage(20)}
            width={Size.calcAverage(20)}
            color={colors.BLUE_200}
          />
        </TouchableOpacity>
      </View>

      <VisitorListRow />
      <VisitorListRowLoader />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: colors.WHITE_300,
    borderTopWidth: Size.calcHeight(1),
    borderBottomWidth: Size.calcHeight(1),
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontFamily: fonts.INTER_600,
    color: colors.BLACK_200,
  },

  visitorsText: {
    color: colors.BLUE_200,
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_600,
  },
});

export default HappeningTodaySection;
