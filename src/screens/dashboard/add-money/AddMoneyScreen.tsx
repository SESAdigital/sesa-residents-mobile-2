import { StyleSheet, TouchableOpacity, View } from 'react-native';

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

const AddMoneyScreen = (): React.ReactNode => {
  const { data } = useGetWalletBalance();

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
          <TouchableOpacity style={{ paddingHorizontal: Size.calcWidth(5) }}>
            <MaterialSymbolsRefresh
              height={Size.calcAverage(20)}
              width={Size.calcAverage(20)}
              color={colors.BLUE_200}
            />
          </TouchableOpacity>
          <AppText style={styles.infoText}>
            Balance: {data?.formattedAmount}
          </AppText>
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

            <TouchableOpacity style={styles.copyButton}>
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
