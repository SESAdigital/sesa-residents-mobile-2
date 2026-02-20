import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import AppText from '@src/components/AppText';
import { MaterialSymbolsRefresh } from '@src/components/icons';
import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';
import { useGetWalletBalance } from '@src/hooks/useGetRequests';

interface Props {
  title: string;
}

const AddMoneyBanner = (props: Props): React.JSX.Element => {
  const { title } = props;

  const { data, isFetching, refetch } = useGetWalletBalance();

  return (
    <View style={styles.info}>
      <AppText style={styles.infoText}>{title}</AppText>
      <View style={styles.row}>
        <TouchableOpacity
          disabled={isFetching}
          onPress={() => refetch()}
          style={styles.balanceContainer}
        >
          {isFetching ? (
            <ActivityIndicator color={colors.BLUE_200} />
          ) : (
            <MaterialSymbolsRefresh
              height={Size.calcAverage(20)}
              width={Size.calcAverage(20)}
              color={colors.BLUE_200}
            />
          )}
          <AppText style={styles.infoText}>
            Balance: {data?.formattedAmount}
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: Size.calcWidth(5),
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  info: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(6),
    backgroundColor: colors.WHITE_300,
    borderTopWidth: Size.calcHeight(1),
    borderBottomWidth: Size.calcHeight(1),
    borderColor: colors.WHITE_300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  infoText: {
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
  },
});

export default AddMoneyBanner;
