import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { GetBookingsVistorResData } from '@src/api/bookings.api';
import { TransactionEntryTypeData } from '@src/api/constants/default';
import AppAvatar from '@src/components/AppAvatar';
import AppText from '@src/components/AppText';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { formatMoneyToTwoDecimals, getTransactionTypeColor } from '@src/utils';
import Size from '@src/utils/useResponsiveSize';

export interface MappedVisitorBookingRowData {
  title: string;
  data: GetBookingsVistorResData[];
}

interface Props {
  val: MappedVisitorBookingRowData;
}

const VisitorBookingRow = ({ val }: Props): React.JSX.Element => {
  const navigation = useAppNavigator();

  const handleView = (id: number) =>
    navigation.navigate(routes.VISITOR_BOOKING_DETAILS_SCREEN, { id });

  return (
    <View>
      <View style={styles.dateContainer}>
        <AppText style={styles.date}>{val?.title}</AppText>
      </View>
      {val?.data?.map((value, index) => (
        <View style={styles.container} key={index}>
          <AppAvatar />

          <TouchableOpacity
            onPress={() => handleView(value?.id)}
            style={styles.contentContainer}
          >
            <View style={styles.descriptionContainer}>
              <AppText style={styles.title}>{value?.name}</AppText>
              <AppText style={styles.transactionTime}>
                {value?.dateOfVisitation}
              </AppText>
              {/* <AppText style={styles.transactionTime}>
                {transaction?.timeCreated} {''}
              </AppText> */}
            </View>
            <View>
              <AppText>Yoo</AppText>
            </View>
          </TouchableOpacity>
        </View>
      ))}
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

export default VisitorBookingRow;
