import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';

import AppAvatar from '@src/components/AppAvatar';
import AppText from '@src/components/AppText';
import {
  MaterialSymbolsArrowDropDown,
  MaterialSymbolsChevronRight,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useAuthStore } from '@src/stores/auth.store';
import Size from '@src/utils/useResponsiveSize';
import BillReminderBanner from './BillReminderBanner';

const HomeHeaderSection = (): React.ReactNode => {
  const { logout } = useAuthStore();
  const handleAddMoney = () => {
    logout();
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <View>
          <AppText style={styles.greeting}>Hello, Akachi 👋</AppText>
          <View style={styles.row}>
            <AppText style={styles.address}>6:16, Wesley Close,Frie...</AppText>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.row}>
              <AppText style={styles.switchPropertyText}>
                Switch Property
              </AppText>
              <MaterialSymbolsArrowDropDown
                height={Size.calcAverage(20)}
                width={Size.calcAverage(20)}
                color={colors.BLUE_200}
              />
            </TouchableOpacity>
          </View>
        </View>
        <AppAvatar />
      </View>
      <BillReminderBanner />
      <View style={styles.walletContainer}>
        <View>
          <AppText style={{ color: colors.LIGHT_GRAY_100 }}>My Wallet</AppText>
          <AppText style={styles.walletAmount}>₦ 34,124,239</AppText>
        </View>
        <TouchableOpacity
          onPress={handleAddMoney}
          style={styles.addMoneyButton}
        >
          <AppText style={styles.addMoneyText}>Add Money</AppText>
        </TouchableOpacity>
      </View>

      <Pressable style={styles.viewTransactionsContainer}>
        <AppText style={{ color: colors.WHITE_300 }}>View Transactions</AppText>
        <MaterialSymbolsChevronRight
          height={Size.calcAverage(24)}
          width={Size.calcAverage(24)}
          color={colors.WHITE_300}
        />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  address: {
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
  },

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

  divider: {
    height: Size.calcAverage(14),
    backgroundColor: colors.GRAY_200,
    width: Size.calcWidth(1),
    marginHorizontal: Size.calcWidth(6),
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

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  switchPropertyText: {
    color: colors.BLUE_200,
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_600,
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
