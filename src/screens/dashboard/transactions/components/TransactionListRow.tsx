import { StyleSheet, TouchableOpacity, View } from 'react-native';

import {
  GetWalletTransactionData,
  WalletTransactionDetails,
} from '@src/api/wallets.api';
import AppText from '@src/components/AppText';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { formatMoneyToTwoDecimals, getTransactionTypeColor } from '@src/utils';
import Size from '@src/utils/useResponsiveSize';
import TransactionIconMapper from './TransactionIconMapper';
import { dayJSFormatter } from '@src/utils/time';
import { TransactionEntryTypeData } from '@src/api/constants/default';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import DuplicateLoader from '@src/components/DuplicateLoader';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';

interface Props {
  val: GetWalletTransactionData;
}

const TransactionListRow = ({ val }: Props): React.JSX.Element => {
  const navigation = useAppNavigator();

  const handleView = (value: WalletTransactionDetails) =>
    navigation.navigate(routes.TRANSACTION_DETAILS_SCREEN, value);

  return (
    <View>
      <View style={styles.dateContainer}>
        <AppText style={styles.date}>{val?.date}</AppText>
      </View>
      {val?.transactions?.map((transaction, index) => (
        <View style={styles.container} key={index}>
          <TransactionIconMapper />

          <TouchableOpacity
            onPress={() => handleView(transaction)}
            style={styles.contentContainer}
          >
            <View style={styles.descriptionContainer}>
              <AppText style={styles.title}>{transaction?.description}</AppText>
              <AppText style={styles.transactionTime}>
                {dayJSFormatter(
                  transaction?.timeCreated,
                  'MMMM D, YYYY h:mm A',
                )}
              </AppText>
              {/* <AppText style={styles.transactionTime}>
                {transaction?.timeCreated} {''}
              </AppText> */}
            </View>
            <AppText
              style={[
                styles.amount,
                { color: getTransactionTypeColor(transaction?.entryType) },
              ]}
            >
              {transaction?.entryType === TransactionEntryTypeData.Debit
                ? '-'
                : ''}
              {formatMoneyToTwoDecimals({ amount: transaction?.amount })}
            </AppText>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export const TransactionListRowLoader = (): React.JSX.Element => {
  return (
    <View>
      <View style={styles.dateContainer}>
        <AppSkeletonLoader width="40%" />
      </View>

      <DuplicateLoader
        loader={
          <View style={styles.container}>
            <TransactionIconMapper isLoading />

            <View style={styles.contentContainer}>
              <View style={styles.descriptionContainer}>
                <AppSkeletonLoader width="70%" />
                <AppSkeletonLoader width="90%" />
              </View>

              <AppSkeletonLoader
                style={{ marginLeft: 'auto', marginRight: Size.calcWidth(21) }}
                width={Size.calcWidth(80)}
              />
            </View>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  amount: {
    textAlign: 'right',
    flex: 1,
    paddingRight: Size.calcWidth(18),
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_600,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Size.calcWidth(18),
  },

  contentContainer: {
    flex: 1,
    paddingVertical: Size.calcHeight(13),
    borderBottomWidth: Size.calcHeight(1),
    borderBottomColor: colors.WHITE_300,
    flexDirection: 'row',
    flexShrink: 1,
    alignItems: 'center',
  },

  date: {
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_500,
    color: colors.GRAY_100,
  },

  dateContainer: {
    borderTopWidth: Size.calcHeight(0.5),
    borderBottomWidth: Size.calcHeight(0.5),
    borderColor: colors.LIGHT_GRAY_200,
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(8),
  },

  descriptionContainer: {
    paddingHorizontal: Size.calcWidth(12),
    width: '60%',
    rowGap: Size.calcHeight(4),
    flexShrink: 1,
  },

  title: {
    fontFamily: fonts.INTER_500,
    color: colors.BLACK_300,
  },

  transactionTime: {
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
  },
});

export default TransactionListRow;
