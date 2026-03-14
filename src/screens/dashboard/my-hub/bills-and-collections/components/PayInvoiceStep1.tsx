import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import ATMCardImageIcon from '@src/assets/images/icons/atm-card-icon.png';
import BankImageIcon from '@src/assets/images/icons/bank-image-icon.png';
import WalletImageIcon from '@src/assets/images/icons/wallet-icon.png';
import AppImage from '@src/components/AppImage';
import AppText from '@src/components/AppText';
import { MaterialSymbolsContentCopyOutline } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useGetWalletBalance } from '@src/hooks/useGetRequests';
import AddMoneyHelpModal from '@src/screens/dashboard/add-money/modals/AddMoneyHelpModal';
import { useAppStateStore } from '@src/stores/appState.store';
import { copyTextToClipboard } from '@src/utils';
import { appToast } from '@src/utils/appToast';
import Size from '@src/utils/useResponsiveSize';

interface Props {
  onDone: () => void;
  amountDue: number;
  invoiceNumber: string;
}

const PayInvoiceStep1 = (props: Props): React.JSX.Element => {
  const { onDone, amountDue, invoiceNumber } = props;
  const { setActiveModal } = useAppStateStore();
  const { data: walletBalance } = useGetWalletBalance();

  const handleHelp = () => {
    setActiveModal({
      modalType: 'EMPTY_MODAL',
      shouldBackgroundClose: true,
      emptyModalComponent: <AddMoneyHelpModal />,
    });
  };

  const handleSesaPay = () => {
    if (!walletBalance) {
      return appToast.Warning('Wallet balance not found');
    }

    if (!amountDue) {
      return appToast.Warning('Amount due not found');
    }

    if (walletBalance?.amount < amountDue) {
      return appToast.Warning('Insufficient wallet balance');
    }

    return onDone();
  };

  const handleCopy = () => {
    copyTextToClipboard({
      text: invoiceNumber,
      successText: 'Invoice number copied successfully',
      errorText: 'Failed to copy to clipboard',
    });
  };

  return (
    <View>
      <View>
        <AppText></AppText>
      </View>

      <ScrollView>
        <TouchableOpacity
          onPress={handleSesaPay}
          style={[styles.layoutContainer, { alignItems: 'center' }]}
        >
          <View style={styles.imageContainer}>
            <AppImage source={WalletImageIcon} style={styles.image} />
          </View>

          <View style={{ flex: 1 }}>
            <AppText style={styles.title}>Fund Via SESA Wallet</AppText>

            <AppText style={styles.subtitle}>
              Wallet balance: {walletBalance?.formattedAmount}
            </AppText>
          </View>
        </TouchableOpacity>

        <View style={styles.layoutContainer}>
          <View style={styles.imageContainer}>
            <AppImage source={ATMCardImageIcon} style={styles.image} />
          </View>

          <View style={{ flex: 1 }}>
            <AppText style={styles.title}>Pay online</AppText>

            <AppText style={styles.subtitle}>
              Copy the payment invoice number, go to sesa-digital.com, click
              "pay estate bills" & enter invoice no. Complete payment via the
              available payment options.
            </AppText>

            <View style={styles.row}>
              <TouchableOpacity onPress={handleCopy} style={styles.copyButton}>
                <MaterialSymbolsContentCopyOutline
                  height={Size.calcAverage(14)}
                  width={Size.calcAverage(14)}
                  color={colors.BLUE_200}
                />
                <AppText style={styles.copyText}>Copy invoice no.</AppText>
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity onPress={handleCopy} style={styles.copyButton}>
                <AppText style={styles.copyText}>Copy invoice no.</AppText>
                <MaterialSymbolsContentCopyOutline
                  height={Size.calcAverage(14)}
                  width={Size.calcAverage(14)}
                  color={colors.BLUE_200}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.layoutContainer,
            { alignItems: 'center', opacity: 0.5 },
          ]}
        >
          <View style={styles.imageContainer}>
            <AppImage source={BankImageIcon} style={styles.image} />
          </View>

          <View style={{ flex: 1 }}>
            <AppText style={styles.title}>
              Pay at bank branch (Coming Soon)
            </AppText>

            <AppText style={styles.subtitle}>
              Request to pay on XPath at a Zenith bank branch and present your
              invoice number to the teller.
            </AppText>
          </View>
        </View>
        <TouchableOpacity onPress={handleHelp} style={styles.issuesContainer}>
          <AppText style={styles.issuesText}>Have any issues? </AppText>
          <AppText style={[styles.issuesText, { color: colors.BLUE_200 }]}>
            Get Help
          </AppText>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: Size.calcWidth(4),
  },

  copyText: {
    fontFamily: fonts.INTER_500,
    fontSize: Size.calcWidth(13),
    color: colors.BLUE_200,
  },

  divider: {
    width: Size.calcWidth(1),
    height: '80%',
    borderRadius: 10,
    backgroundColor: colors.BLUE_200,
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
    marginVertical: Size.calcHeight(29),
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

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: Size.calcWidth(8),
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

export default PayInvoiceStep1;
