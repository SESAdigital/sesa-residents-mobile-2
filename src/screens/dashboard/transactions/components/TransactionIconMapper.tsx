import { StyleSheet, View } from 'react-native';

import { MaterialSymbolsNotifications } from '@src/components/icons';
import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';

const TransactionIconMapper = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <MaterialSymbolsNotifications
        height={Size.calcHeight(20)}
        width={Size.calcHeight(20)}
        color={colors.GRAY_100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE_300,
    height: Size.calcAverage(40),
    aspectRatio: 1,
    borderRadius: Size.calcAverage(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TransactionIconMapper;
