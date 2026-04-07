import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ComingSoonTypes } from '@src/assets/data';
import AppText from '@src/components/AppText';
import EmptyTableComponent from '@src/components/EmptyTableComponent';
import {
  MaterialSymbolsAddRounded,
  MaterialSymbolsShieldWithHeart,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import SesaCommingSoonModal from '@src/modals/SesaCommingSoonModal';
import { useAppStateStore } from '@src/stores/appState.store';
import Size from '@src/utils/useResponsiveSize';

const HouseholdStaffBankAccountsScreen = (): React.JSX.Element => {
  const { setActiveModal } = useAppStateStore();

  const handlePress = () => {
    setActiveModal({
      modalType: 'EMPTY_MODAL',
      emptyModalComponent: (
        <SesaCommingSoonModal
          details={[
            {
              description:
                'Create a full-fledged bank account and request a debit card for easy payment of wages.',
            },
          ]}
          hubItem={{
            Icon: MaterialSymbolsShieldWithHeart,
            title: '' as ComingSoonTypes,
            bgColor: colors.GREEN_140,
            color: colors.GREEN_150,
            route: null,
          }}
        />
      ),
      shouldBackgroundClose: true,
    });
  };

  return (
    <View style={styles.container}>
      <EmptyTableComponent
        containerStyle={{ paddingVertical: 0 }}
        title="No bank accounts found."
      />

      <AppText style={styles.text}>
        No bank account has been opened for this household staff. Click on{' '}
        <AppText style={styles.addBankText}>Open Bank Account</AppText> to
        create a full-fledged bank account and request a debit card for easy
        payment of wages
      </AppText>
      <TouchableOpacity onPress={handlePress} style={styles.addBankButton}>
        <MaterialSymbolsAddRounded
          color={colors.BLUE_200}
          height={Size.calcAverage(16)}
          width={Size.calcAverage(16)}
        />
        <AppText style={styles.addBank}>Open Bank Account</AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addBank: {
    fontFamily: fonts.INTER_500,
    color: colors.BLUE_200,
    fontSize: Size.calcAverage(12),
  },

  addBankButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Size.calcHeight(9),
    columnGap: Size.calcWidth(4),
  },

  addBankText: {
    fontFamily: fonts.INTER_600,
    color: colors.BLACK_100,
    fontSize: Size.calcAverage(12),
  },

  container: {
    alignItems: 'center',
    paddingTop: Size.calcHeight(60),
    borderBottomWidth: Size.calcHeight(1),
    borderBottomColor: colors.WHITE_300,
  },

  text: {
    paddingVertical: Size.calcHeight(20),
    textAlign: 'center',
    maxWidth: Size.calcWidth(370),
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },
});

export default HouseholdStaffBankAccountsScreen;
