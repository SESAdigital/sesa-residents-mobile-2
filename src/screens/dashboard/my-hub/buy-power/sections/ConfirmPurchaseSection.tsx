import { ScrollView, StyleSheet, View } from 'react-native';

import { VerifyPowerDiscoResData } from '@src/api/power.api';
import EcoHouseEstateTokenIcon from '@src/assets/images/icons/eco-house-estate-token-icon.png';
import AppImage from '@src/components/AppImage';
import AppText from '@src/components/AppText';
import InformationRow from '@src/components/common/InformationRow';
import SubmitButton from '@src/components/forms/SubmitButton';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import { formatMoneyToTwoDecimals } from '@src/utils';

interface Props {
  data: VerifyPowerDiscoResData | null;
  onConfirm: () => void;
}

const ConfirmPurchaseSection = (props: Props): React.JSX.Element => {
  const { data, onConfirm } = props;

  const firstDetails = [
    {
      title: 'Meter Number',
      value: data?.meterNumber,
    },
    {
      title: 'Customer Name',
      value: data?.customerName,
    },
    {
      title: 'Property Address',
      value: data?.propertyAddress,
    },
  ];

  const secondDetails = [
    {
      title: 'You are paying',
      value: formatMoneyToTwoDecimals({ amount: data?.amount || 0 }),
    },
    {
      title: 'Convenience Fee',
      value: formatMoneyToTwoDecimals({ amount: data?.convenienceFee || 0 }),
    },
    {
      title: 'You will get',
      value: `${
        Number(data?.quantity?.toFixed(2) || '0')?.toLocaleString() || ''
      } KW`,
    },
    {
      title: 'Total Amount',
      value: formatMoneyToTwoDecimals({ amount: data?.totalAmountToPay || 0 }),
    },
  ];

  return (
    <View style={styles.container}>
      <AppText style={styles.buying}>You are buying:</AppText>
      <View style={styles.row}>
        <View style={styles.imageContainer}>
          <AppImage
            style={styles.image}
            resizeMode="contain"
            source={EcoHouseEstateTokenIcon}
          />
        </View>
        <View style={styles.estateTokenContainer}>
          <AppText style={styles.estateToken}>Estate token</AppText>
          <AppText style={styles.etstateTokenDescription}>
            Buy estate power tokens to access your estate’s exclusive
            electricity services.
          </AppText>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          {firstDetails?.map((item, index) => (
            <View style={{ rowGap: Size.calcHeight(4) }} key={index}>
              <AppText style={{ color: colors.GRAY_100 }}>
                {item?.title}
              </AppText>
              <AppText style={{ fontFamily: fonts.INTER_500 }}>
                {item?.value}
              </AppText>
            </View>
          ))}
        </View>
        <View style={[styles.card, { marginTop: Size.calcHeight(8) }]}>
          {secondDetails?.map((item, index) => (
            <View style={styles.cardRow} key={index}>
              <AppText style={styles.cardTitle}>{item?.title}</AppText>
              <AppText style={styles.cardSubtitle}>{item?.value}</AppText>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <InformationRow title="Funds will be deducted from your SESA Wallet." />
        <SubmitButton title="Pay Now" onPress={onConfirm} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buying: {
    fontFamily: fonts.INTER_500,
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
    paddingBottom: Size.calcHeight(4),
  },

  card: {
    backgroundColor: colors.WHITE_200,
    shadowColor: colors.GRAY_600,
    borderWidth: Size.calcAverage(1),
    borderColor: colors.LIGHT_GRAY_200,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: Size.calcAverage(8),
    rowGap: Size.calcHeight(20),
    paddingHorizontal: Size.calcWidth(16),
    paddingVertical: Size.calcHeight(20),
  },

  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cardSubtitle: {
    width: '48%',
    textAlign: 'right',
    fontFamily: fonts.INTER_500,
  },

  cardTitle: {
    width: '48%',
    color: colors.GRAY_100,
  },

  container: {
    paddingTop: Size.calcHeight(24),
    paddingHorizontal: Size.calcWidth(21),
    flex: 1,
  },

  estateToken: {
    color: colors.BLACK_300,
    fontFamily: fonts.INTER_500,
    paddingBottom: Size.calcHeight(4),
  },

  estateTokenContainer: {
    paddingLeft: Size.calcWidth(8),
    flexShrink: 1,
  },

  etstateTokenDescription: {
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
  },

  footer: {
    marginTop: 'auto',
    rowGap: Size.calcHeight(16),
    paddingBottom: Size.calcHeight(90),
  },

  image: {
    height: Size.calcAverage(32),
    width: Size.calcAverage(32),
  },

  imageContainer: {
    flexShrink: 0,
    padding: Size.calcAverage(6),
    backgroundColor: colors.WHITE_300,
    borderRadius: 100,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Size.calcHeight(8),
    borderBottomWidth: Size.calcHeight(1),
    borderBottomColor: colors.WHITE_300,
    marginBottom: Size.calcHeight(18),
  },

  scrollView: {
    marginBottom: Size.calcHeight(20),
    borderRadius: Size.calcAverage(8),
    maxHeight: Size.getHeight() / 2.1,
  },
});

export default ConfirmPurchaseSection;
