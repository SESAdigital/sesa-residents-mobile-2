import { StyleSheet, View } from 'react-native';

import AppText from '@src/components/AppText';
import Size from '@src/utils/useResponsiveSize';
import { MaterialSymbolsHistory } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';

const EmtpyTransactionComponent = (): React.ReactNode => {
  return (
    <View style={styles.container}>
      <MaterialSymbolsHistory
        height={Size.calcAverage(32)}
        width={Size.calcAverage(32)}
        color={colors.GRAY_100}
      />
      <AppText style={styles.title}>No transactions</AppText>
      <AppText style={styles.subtitle}>
        All your past transactions will appear here.
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Size.calcHeight(49),
    alignItems: 'center',
    marginHorizontal: Size.calcWidth(21),
    marginVertical: Size.calcHeight(32),
    backgroundColor: colors.WHITE_300,
    borderWidth: Size.calcAverage(1),
    borderColor: colors.LIGHT_GRAY_200,
    borderRadius: Size.calcAverage(8),
  },

  subtitle: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
    maxWidth: Size.calcWidth(230),
    textAlign: 'center',
  },

  title: {
    fontFamily: fonts.INTER_600,
    color: colors.BLUE_130,
    paddingTop: Size.calcHeight(8),
    paddingBottom: Size.calcHeight(4),
  },
});

export default EmtpyTransactionComponent;
