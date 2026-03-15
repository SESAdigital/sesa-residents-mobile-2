import { StyleSheet, TouchableOpacity, View } from 'react-native';

import AppText from '@src/components/AppText';
import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';
import fonts from '@src/configs/fonts';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import { GetBillOlderResData } from '@src/api/bills.api';
import { formatMoneyToTwoDecimals } from '@src/utils';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { dayJSFormatter } from '@src/utils/time';

interface Props {
  data: GetBillOlderResData;
}

const EstatePaymentRow = ({ data }: Props): React.JSX.Element => {
  const navigation = useAppNavigator();

  const handlePress = () => {
    navigation.navigate(routes.PAYMENT_INVOICE_DETAILS_SCREEN, {
      title: data?.collectionType ? 'Collection Invoice' : 'Bill Invoice',
      id: data?.invoiceId,
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.contentContainer}>
        <AppText style={{ fontFamily: fonts.INTER_500 }}>
          {data?.description}
        </AppText>
        <View style={styles.row}>
          <AppText style={styles.text}>{data?.billFrequencyText}</AppText>
          {data?.datePaid && (
            <AppText style={styles.text}>
              Paid{' '}
              {dayJSFormatter({ value: data?.datePaid, format: 'MMM D, YYYY' })}
            </AppText>
          )}
        </View>
      </View>

      <AppText style={styles.amount}>
        {formatMoneyToTwoDecimals({ amount: data?.amount })}
      </AppText>
    </TouchableOpacity>
  );
};

export const EstatePaymentRowLoader = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <AppSkeletonLoader width={Size.calcWidth(200)} />
        <View style={styles.row}>
          <AppSkeletonLoader width={Size.calcWidth(60)} />
          <AppSkeletonLoader width={Size.calcWidth(80)} />
        </View>
      </View>

      <AppSkeletonLoader width={Size.calcWidth(60)} />
    </View>
  );
};

const styles = StyleSheet.create({
  amount: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(12),
    flexShrink: 0,
  },

  container: {
    borderBottomWidth: Size.calcWidth(1),
    borderBottomColor: colors.WHITE_300,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(13),
    columnGap: Size.calcWidth(15),
    justifyContent: 'space-between',
  },

  contentContainer: {
    rowGap: Size.calcHeight(4),
    flexShrink: 1,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Size.calcWidth(12),
    flexWrap: 'wrap',
  },

  text: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },
});

export default EstatePaymentRow;
