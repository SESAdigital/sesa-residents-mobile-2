import { StyleSheet, View } from 'react-native';

import { formatMoneyToTwoDecimals } from '@src/utils';
import AppText from '../AppText';
import AppSwitch from '../forms/AppSwitch';
import { useGetFees, useGetWalletBalance } from '@src/hooks/useGetRequests';
import Size from '@src/utils/useResponsiveSize';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { appToast } from '@src/utils/appToast';

interface Props {
  isKYC: boolean;
  setIsKYC: (value: boolean) => void;
}

const KYCDetailsToggle = ({ isKYC, setIsKYC }: Props): React.JSX.Element => {
  const { data: feesData } = useGetFees();
  const { data: walletData } = useGetWalletBalance();

  const walletAmount = walletData?.amount;
  const kycFee = feesData?.kycFee;

  const handleToggle = (val: boolean) => {
    if (val) {
      if (walletAmount === undefined || walletAmount === null)
        return appToast.Warning(
          'Unable to get wallet balance at this moment. Please try again later.',
        );

      if (kycFee === undefined || kycFee === null)
        return appToast.Warning(
          'Unable to get KYC fee at this moment. Please try again later.',
        );

      if (kycFee > walletAmount)
        return appToast.Info(
          'Insufficient balance. Please top up your wallet to continue.',
        );
    }
    return setIsKYC(val);
  };

  return (
    <View style={styles.container}>
      <View style={{ rowGap: Size.calcHeight(5) }}>
        <AppText style={{ fontFamily: fonts.INTER_500 }}>
          Use KYC Verification? (
          {formatMoneyToTwoDecimals({ amount: feesData?.kycFee || 0 })})
        </AppText>
        <AppText style={styles.subTitle}>
          Wallet Balance:{' '}
          <AppText style={[styles.subTitle, { color: colors.BLACK_100 }]}>
            {walletData?.formattedAmount}
          </AppText>
        </AppText>
      </View>
      <AppSwitch isEnabled={isKYC} onValueChange={handleToggle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Size.calcHeight(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Size.calcWidth(16),
    columnGap: Size.calcWidth(10),
    backgroundColor: colors.WHITE_300,
    borderRadius: Size.calcAverage(8),
  },

  subTitle: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },

  walletBalance: {
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_500,
  },
});

export default KYCDetailsToggle;
