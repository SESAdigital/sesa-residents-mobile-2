import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';

import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import SwitchPropertyRow from '@src/components/common/SwitchPropertyRow';
import AppProfilePicture from '@src/components/custom/AppProfilePicture';
import { MaterialSymbolsChevronRightRounded } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import {
  useGetUserDetails,
  useGetWalletBalance,
} from '@src/hooks/useGetRequests';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import Size from '@src/utils/useResponsiveSize';
// import BillReminderBanner from './BillReminderBanner';

const HomeHeaderSection = (): React.JSX.Element => {
  const navigation = useAppNavigator();
  const { data, isLoading } = useGetWalletBalance();
  const { details } = useGetUserDetails();

  return (
    <>
      <View style={styles.headerContainer}>
        <View>
          <AppText style={styles.greeting}>
            Hello, {details?.firstName} 👋
          </AppText>
          <SwitchPropertyRow />
        </View>
        <AppProfilePicture />
      </View>
      {/* <BillReminderBanner /> TODO FIX THIS */}
      <View style={styles.walletContainer}>
        <View>
          <AppText style={{ color: colors.LIGHT_GRAY_100 }}>My Wallet</AppText>
          {isLoading ? (
            <AppSkeletonLoader
              style={{ marginTop: Size.calcHeight(17) }}
              height={Size.calcAverage(20)}
              width={Size.calcAverage(100)}
            />
          ) : (
            <AppText style={styles.walletAmount}>
              {data?.formattedAmount || '₦0.00'}
            </AppText>
          )}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(routes.ADD_MONEY_SCREEN)}
          style={styles.addMoneyButton}
        >
          <AppText style={styles.addMoneyText}>Add Money</AppText>
        </TouchableOpacity>
      </View>

      <Pressable
        hitSlop={Size.calcAverage(30)}
        onPress={() => navigation.navigate(routes.TRANSACTION_LIST_SCREEN)}
        style={styles.viewTransactionsContainer}
      >
        <AppText style={{ color: colors.WHITE_300 }}>View Transactions</AppText>
        <MaterialSymbolsChevronRightRounded
          height={Size.calcAverage(24)}
          width={Size.calcAverage(24)}
          color={colors.WHITE_300}
        />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  addMoneyButton: {
    paddingHorizontal: Size.calcWidth(16),
    paddingVertical: Size.calcHeight(11),
    backgroundColor: colors.WHITE_300,
    borderRadius: 100,
  },

  addMoneyText: {
    fontFamily: fonts.INTER_500,
    color: colors.BLUE_200,
  },

  greeting: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(16),
    color: colors.BLACK_200,
    paddingBottom: Size.calcHeight(2),
  },

  headerContainer: {
    paddingVertical: Size.calcHeight(12),
    paddingHorizontal: Size.calcWidth(21),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  viewTransactionsContainer: {
    paddingVertical: Size.calcHeight(5.5),
    paddingHorizontal: Size.calcWidth(21),
    flexDirection: 'row',
    backgroundColor: colors.BLUE_800,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  walletContainer: {
    padding: Size.calcAverage(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.BLUE_200,
  },

  walletAmount: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(20),
    color: colors.WHITE_200,
    paddingTop: Size.calcHeight(11),
  },
});

export default HomeHeaderSection;
