import { StyleSheet, View } from 'react-native';

import { MaterialSymbolsNotifications } from '@src/components/icons';
import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';

interface Props {
  isLoading?: boolean;
}

const TransactionIconMapper = (props: Props): React.JSX.Element => {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <AppSkeletonLoader
        width={Size.calcAverage(40)}
        height={Size.calcAverage(40)}
        borderRadius={Size.calcAverage(40)}
      />
    );
  }

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
