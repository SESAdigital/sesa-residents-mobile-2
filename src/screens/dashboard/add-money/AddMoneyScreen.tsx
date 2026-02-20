import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { getWalletsBankAccount } from '@src/api/wallets.api';
import ATMCardImageIcon from '@src/assets/images/icons/atm-card-icon.png';
import BankImageIcon from '@src/assets/images/icons/bank-image-icon.png';
import AppImage from '@src/components/AppImage';
import AppScreen from '@src/components/AppScreen';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import { MaterialSymbolsContentCopyOutline } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { useAppStateStore } from '@src/stores/appState.store';
import { copyTextToClipboard } from '@src/utils';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import AddMoneyHelpModal from './modals/AddMoneyHelpModal';
import AddMoneyBanner from './components/AddMoneyBanner';

const queryKey = ['getWalletsBankAccount'];

const AddMoneyScreen = (): React.JSX.Element => {
  const { setActiveModal } = useAppStateStore();
  const navigation = useAppNavigator();
  const queryClient = useQueryClient();

  const { data: bankData, isLoading: isBankLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getWalletsBankAccount();

      if (response.ok) {
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
  });

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
      value: bankData?.accountName,
    },
    {
      title: 'Bank Name',
      value: bankData?.bankName,
    },
    {
      title: 'Account Number',
      value: bankData?.accountNumber,
    },
  ];

  const handleRefetch = () => queryClient.resetQueries({ queryKey });

  const accountNumber = bankDetails?.[2]?.value;

  return (
    <AppScreen style={styles.container}>
      <AppScreenHeader
        icon="close"
        containerStyle={styles.header}
        title="Add Money"
      />
      <AddMoneyBanner title="Select a funding method" />

      <ScrollView
        refreshControl={
          <AppRefreshControl
            refreshing={isBankLoading}
            onRefresh={handleRefetch}
          />
        }
      >
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
                  {isBankLoading ? (
                    <AppSkeletonLoader
                      style={{ paddingTop: Size.calcHeight(6.5) }}
                      width="70%"
                    />
                  ) : (
                    <AppText style={styles.bankDetailValue}>
                      {item?.value || 'Not available'}
                    </AppText>
                  )}
                </View>
              ))}

              {!!accountNumber && (
                <TouchableOpacity
                  onPress={() =>
                    copyTextToClipboard({
                      text: accountNumber,
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
              )}
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
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
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

  layoutContainer: {
    paddingLeft: Size.calcWidth(21),
    paddingRight: Size.calcWidth(14),
    paddingVertical: Size.calcHeight(18),
    flexDirection: 'row',
    borderBottomWidth: Size.calcHeight(1),
    borderColor: colors.WHITE_300,
    columnGap: Size.calcWidth(15),
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
