import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import BankImageIcon from '@src/assets/images/icons/bank-image-icon.png';
import ATMCardImageIcon from '@src/assets/images/icons/atm-card-icon.png';
import AppImage from '@src/components/AppImage';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import {
  MaterialSymbolsContentCopyOutline,
  MaterialSymbolsRefresh,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import { useGetWalletBalance } from '@src/hooks/useGetRequests';
import Size from '@src/utils/useResponsiveSize';
import fonts from '@src/configs/fonts';
import { useAppStateStore } from '@src/stores/appState.store';
import AddMoneyHelpModal from './modals/AddMoneyHelpModal';
import { copyTextToClipboard } from '@src/utils';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';

const AddMoneyScreen = (): React.ReactNode => {
  const { data, isFetching, refetch } = useGetWalletBalance();
  const { setActiveModal } = useAppStateStore();
  const navigation = useAppNavigator();

  const handleHelp = () => {
    setActiveModal({
      modalType: 'EMPTY_MODAL',
      shouldBackgroundClose: true,
      emptyModalComponent: <AddMoneyHelpModal />,
    });
  };

  const bankDetails = [
    {
      title: 'Account Name',
      value: 'SESA Bank',
    },
    {
      title: 'Bank Name',
      value: 'SESA Bank',
    },
    {
      title: 'Account Number',
      value: '1234567890',
    },
  ];

  return (
    <AppScreen style={styles.container}>
      <AppScreenHeader
        icon="close"
        containerStyle={styles.header}
        title="Add Money"
      />
      <View style={styles.info}>
        <AppText style={styles.infoText}>Select a funding method</AppText>
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

      <View style={styles.layoutContainer}>
        <View style={styles.imageContainer}>
          <AppImage source={BankImageIcon} style={styles.image} />
        </View>

        <View style={{ flex: 1 }}>
          <View>
            <AppText style={styles.title}>Fund Via Bank Transfer</AppText>
          </View>
          <AppText style={styles.subtitle}>
            Send money to the bank details below
          </AppText>
          <View style={styles.bankDetailsContainer}>
            {bankDetails?.map((item, index) => (
              <View key={index}>
                <AppText style={styles.bankDetailTitle}>{item.title}</AppText>
                <AppText style={styles.bankDetailValue}>{item.value}</AppText>
              </View>
            ))}

            <TouchableOpacity
              onPress={() =>
                copyTextToClipboard({
                  text: bankDetails?.[2].value,
                  successText: `${bankDetails?.[2]?.title} Copied Successfully`,
                  errorText: 'Failed to copy to clipboard',
                })
              }
              style={styles.copyButton}
            >
              <MaterialSymbolsContentCopyOutline
                height={Size.calcAverage(14)}
                width={Size.calcAverage(14)}
                color={colors.BLUE_200}
              />
              <AppText style={styles.copyText}>Copy</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate(routes.ADD_MONEY_ATM_CARD_SCREEN)}
        style={[styles.layoutContainer, { alignItems: 'center' }]}
      >
        <View style={styles.imageContainer}>
          <AppImage source={ATMCardImageIcon} style={styles.image} />
        </View>

        <View style={{ flex: 1 }}>
          <View>
            <AppText style={styles.title}>Fund Via ATM Card</AppText>
          </View>
          <AppText style={styles.subtitle}>
            Add money to your SESA wallet with your debit card.
          </AppText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleHelp} style={styles.issuesContainer}>
        <AppText style={styles.issuesText}>Have any issues? </AppText>
        <AppText style={[styles.issuesText, { color: colors.BLUE_200 }]}>
          Get Help
        </AppText>
      </TouchableOpacity>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: Size.calcWidth(5),
  },
  bankDetailsContainer: {
    rowGap: Size.calcHeight(12),
    backgroundColor: colors.WHITE_300,
    padding: Size.calcAverage(16),
    borderRadius: Size.calcAverage(8),
    borderWidth: Size.calcAverage(1),
    borderColor: colors.LIGHT_GRAY_200,
    position: 'relative',
  },

  bankDetailTitle: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
    paddingBottom: Size.calcHeight(2),
  },

  bankDetailValue: {
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_500,
  },

  container: {
    paddingHorizontal: 0,
    backgroundColor: colors.WHITE_200,
  },

  copyButton: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: Size.calcWidth(4),
    right: Size.calcWidth(16),
    bottom: Size.calcHeight(16),
  },

  copyText: {
    fontFamily: fonts.INTER_500,
    fontSize: Size.calcWidth(13),
    color: colors.BLUE_200,
  },

  header: {
    borderBottomWidth: 0,
  },

  image: {
    height: Size.calcAverage(32),
    width: Size.calcAverage(32),
  },

  imageContainer: {
    height: Size.calcAverage(50),
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE_300,
    borderRadius: 100,
  },

  issuesContainer: {
    marginHorizontal: 'auto',
    paddingVertical: Size.calcHeight(5),
    marginVertical: Size.calcHeight(5),
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Size.calcWidth(4),
  },

  issuesText: {
    fontFamily: fonts.INTER_500,
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

  layoutContainer: {
    paddingLeft: Size.calcWidth(21),
    paddingRight: Size.calcWidth(14),
    paddingVertical: Size.calcHeight(18),
    flexDirection: 'row',
    borderBottomWidth: Size.calcHeight(1),
    borderColor: colors.WHITE_300,
    columnGap: Size.calcWidth(15),
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  subtitle: {
    fontSize: Size.calcAverage(12),
    paddingTop: Size.calcHeight(4),
    paddingBottom: Size.calcHeight(8),
    color: colors.GRAY_100,
  },

  title: {
    fontFamily: fonts.INTER_500,
    color: colors.BLACK_300,
  },
});

export default AddMoneyScreen;
