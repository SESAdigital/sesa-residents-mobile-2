import { StyleSheet, View } from 'react-native';

import { GetWalletTransactionData } from '@src/api/wallets.api';
import AppText from '@src/components/AppText';
import Size from '@src/utils/useResponsiveSize';
import fonts from '@src/configs/fonts';
import colors from '@src/configs/colors';
import TransactionIconMapper from './TransactionIconMapper';

interface Props {
  val: GetWalletTransactionData;
}

const TransactionListRow = ({ val }: Props): React.JSX.Element => {
  return (
    <View>
      <AppText style={styles.date}>{val?.date}</AppText>
      {val?.transactions?.map((transaction, index) => (
        <View style={styles.container} key={index}>
          <TransactionIconMapper />

          <View style={styles.contentContainer}>
            <View style={styles.descriptionContainer}>
              <AppText style={{ width: '70%' }}>
                {transaction?.description} Lorem ipsum dolor sit, amet
                consectetur adipisicing elit. Eum enim molestiae pariatur?
                Maxime earum exercitationem id nostrum, a perspiciatis nulla
                similique quas ipsam mollitia temporibus, nisi, ex placeat! Ea,
                modi?
              </AppText>
            </View>
            <View style={{ flex: 1, backgroundColor: 'green' }}>
              <AppText>{transaction?.amount} adakjdfkasdf</AppText>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export const TransactionListRowLoader = (): React.JSX.Element => {
  return <></>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Size.calcWidth(21),
  },

  contentContainer: {
    backgroundColor: 'red',
    flex: 1,
    paddingRight: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(13),
    borderBottomWidth: Size.calcHeight(1),
    borderBottomColor: colors.WHITE_300,
    flexDirection: 'row',
    maxWidth: '80%',
    alignItems: 'center',
  },

  descriptionContainer: {
    paddingHorizontal: Size.calcWidth(12),
    width: '100%',
    backgroundColor: 'yellow',
  },

  date: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(8),
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_500,
    color: colors.GRAY_100,
    borderTopWidth: Size.calcHeight(0.5),
    borderBottomWidth: Size.calcHeight(0.5),
    borderColor: colors.LIGHT_GRAY_200,
  },
});

export default TransactionListRow;
