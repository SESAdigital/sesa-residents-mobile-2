import { Pressable, StyleSheet, View } from 'react-native';

import AppText from '@src/components/AppText';
import {
  MaterialSymbolsChevronRight,
  RiInformationFill,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';
import fonts from '@src/configs/fonts';

type Status = 'SUCCESS' | 'INFO' | 'DANGER';

const BillReminderBanner = (): React.ReactNode => {
  const status: Status = 'SUCCESS';
  const { color, backgroundColor } = getColors(status);
  return (
    <Pressable style={[styles.container, { backgroundColor }]}>
      <View style={styles.row}>
        <RiInformationFill
          height={Size.calcAverage(20)}
          width={Size.calcAverage(20)}
          color={color}
        />
        <AppText style={styles.text}>You have a bill due in 2 day(s)</AppText>
      </View>
      <MaterialSymbolsChevronRight
        height={Size.calcAverage(20)}
        width={Size.calcAverage(20)}
        color={colors.BLACK_100}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Size.calcHeight(8),
    paddingHorizontal: Size.calcWidth(21),
    flexDirection: 'row',
    backgroundColor: colors.BLUE_400,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    color: colors.BLACK_100,
    fontFamily: fonts.INTER_500,
    fontSize: Size.calcAverage(14),
    paddingLeft: Size.calcWidth(4),
  },
});

export default BillReminderBanner;

function getColors(status: Status) {
  if (status == 'DANGER') {
    return {
      color: colors.RED_100,
      backgroundColor: colors.RED_300,
    };
  }

  if (status == 'SUCCESS') {
    return {
      color: colors.GREEN_600,
      backgroundColor: colors.GREEN_200,
    };
  }
  return {
    color: colors.BLUE_600,
    backgroundColor: colors.BLUE_400,
  };
}
