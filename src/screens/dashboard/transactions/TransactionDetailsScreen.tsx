import { ScrollView, StyleSheet, View } from 'react-native';

import { TransactionEntryTypeData } from '@src/api/constants/default';
import SuccessCheckIconImage from '@src/assets/images/icons/success-check-icon.png';
import AppImage from '@src/components/AppImage';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import SubmitButton from '@src/components/forms/SubmitButton';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { AppScreenProps } from '@src/navigation/AppNavigator';
import { formatMoneyToTwoDecimals, getTransactionTypeColor } from '@src/utils';
import { dayJSFormatter } from '@src/utils/time';
import Size from '@src/utils/useResponsiveSize';

type Props = AppScreenProps<'TRANSACTION_DETAILS_SCREEN'>;

const TransactionDetailsScreen = (props: Props): React.JSX.Element => {
  const { navigation, route } = props;
  const param = route?.params;

  const detailList = [
    {
      title: 'TRANSACTION REFERENCE',
      value: param?.reference,
    },
    {
      title: 'AMOUNT',
      value: param?.amount?.toLocaleString?.(),
    },

    {
      title: 'PAYMENT METHOD',
      value: param?.paymentMethod,
    },

    {
      title: 'DESCRIPTION',
      value: param?.description,
    },

    {
      title: 'TRANSACTION DATE',
      value: dayJSFormatter(param?.timeCreated, 'MMMM D, YYYY h:mm A'),
    },
  ];

  return (
    <AppScreen>
      <AppScreenHeader title="Transaction Details" />
      <ScrollView
        showsVerticalScrollIndicator
        contentContainerStyle={{ minHeight: '80%' }}
        style={styles.scrollContainer}
      >
        <AppImage style={styles.image} source={SuccessCheckIconImage} />
        <AppText
          style={[
            styles.amount,
            { color: getTransactionTypeColor(param?.entryType) },
          ]}
        >
          {param?.entryType === TransactionEntryTypeData.Debit
            ? '-'
            : param?.entryType === TransactionEntryTypeData.Credit
            ? '+'
            : ''}
          {formatMoneyToTwoDecimals({ amount: param?.amount })}
        </AppText>
        <AppText style={styles.description}>
          View your transaction receipt below. A copy of this receipt has also
          been sent to your email.
        </AppText>

        <View style={styles.detailContainer}>
          {detailList.map((item, index) => {
            if (!item?.value) return null;
            return (
              <View style={styles.detailItem} key={index}>
                <AppText style={styles.detailItemTitle}>{item?.title}</AppText>
                <AppText style={styles.detailItemValue}>{item?.value}</AppText>
              </View>
            );
          })}
        </View>

        <SubmitButton
          variant="SECONDARY"
          title="Go Back"
          style={{ marginTop: 'auto' }}
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  amount: {
    textAlign: 'center',
    paddingTop: Size.calcHeight(16),
    paddingBottom: Size.calcHeight(4),
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(16),
  },

  description: {
    maxWidth: Size.calcWidth(310),
    marginHorizontal: 'auto',
    textAlign: 'center',
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
    paddingBottom: Size.calcHeight(20),
  },

  detailContainer: {
    borderWidth: Size.calcAverage(1),
    borderColor: colors.WHITE_300,
    shadowColor: colors.GRAY_600,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor: colors.WHITE_200,
    borderRadius: Size.calcAverage(12),
  },

  detailItem: {
    paddingHorizontal: Size.calcWidth(20),
    paddingVertical: Size.calcHeight(15),
    borderBottomWidth: Size.calcHeight(1),
    borderColor: colors.WHITE_300,
  },

  detailItemTitle: {
    color: colors.GRAY_300,
    fontSize: Size.calcAverage(12),
  },

  detailItemValue: {
    fontFamily: fonts.INTER_500,
  },

  scrollContainer: {
    paddingHorizontal: Size.calcWidth(21),
    paddingTop: Size.calcHeight(21),
  },

  image: {
    height: Size.calcAverage(80),
    aspectRatio: 1,
    marginHorizontal: 'auto',
  },
});

export default TransactionDetailsScreen;
