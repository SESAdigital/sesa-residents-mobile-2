import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import queryKeys from '@src/api/constants/queryKeys';
import { getPowerMetrics } from '@src/api/power.api';
import EstateTokenImage from '@src/assets/images/icons/eco-house-estate-token-icon.png';
import ElectricDiscoTokenImage from '@src/assets/images/icons/electric-tower-electric-disco-icon.png';
import AppImage from '@src/components/AppImage';
import AppScreen from '@src/components/AppScreen';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppProfilePicture from '@src/components/custom/AppProfilePicture';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useGetWalletBalance } from '@src/hooks/useGetRequests';
import { formatMoneyToTwoDecimals } from '@src/utils';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';

const queryKey = [queryKeys.ELECTRICITY, 'METRICS'];

const BuyPowerScreen = (): React.JSX.Element => {
  const { data } = useGetWalletBalance();
  const queryClient = useQueryClient();
  const navigation = useAppNavigator();

  const { data: powerMetrics, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getPowerMetrics();
      if (response.ok) {
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
  });

  const rowData = [
    {
      title: 'Total convenience fee',
      value: formatMoneyToTwoDecimals({
        amount: powerMetrics?.totalConvenienceFee || 0,
      }),
    },
    {
      title: 'No. of tokens Purchased',
      value: powerMetrics?.numberTokensPurchased,
    },
  ];

  const options = [
    {
      title: 'Electric DISCO token',
      description:
        'Buy electricity tokens for certified distribution companies to power your home.',
      image: ElectricDiscoTokenImage,
    },
    {
      title: 'Estate token',
      description:
        'Buy estate power tokens to access your estate’s exclusive electricity services.',
      image: EstateTokenImage,
    },
  ];

  const refetch = () => {
    queryClient.resetQueries({ queryKey });
  };

  return (
    <AppScreen style={{ paddingHorizontal: 0 }}>
      <AppScreenHeader rightIcon={<AppProfilePicture />}>
        <AppText style={styles.title}>Buy Power</AppText>
        <AppText style={styles.subtitle}>
          Wallet balance:{data?.formattedAmount}
        </AppText>
      </AppScreenHeader>

      <ScrollView
        refreshControl={
          <AppRefreshControl
            progressViewOffset={Size.calcHeight(-25)}
            refreshing={isLoading}
            onRefresh={refetch}
          />
        }
      >
        <View style={styles.contentContainer}>
          <AppText style={styles.allTimeText}>All Time</AppText>
          <AppText style={styles.spentText}>
            Total amount spent on power
          </AppText>

          {isLoading ? (
            <View style={{ alignItems: 'center' }}>
              <AppSkeletonLoader
                height={Size.calcAverage(21)}
                width={Size.calcAverage(100)}
              />
            </View>
          ) : (
            <AppText style={styles.amount}>
              {formatMoneyToTwoDecimals({
                amount: powerMetrics?.tokensPurchasedAmount || 0,
              })}
            </AppText>
          )}

          <View style={styles.rowItemContainer}>
            {rowData?.map(({ title, value }, key) => (
              <View key={key} style={styles.rowItem}>
                <AppText style={styles.rowItemText}>{title}</AppText>
                {isLoading ? (
                  <AppSkeletonLoader
                    height={Size.calcAverage(21)}
                    width={Size.calcAverage(80)}
                  />
                ) : (
                  <AppText style={styles.rowItemValue}>{value}</AppText>
                )}
              </View>
            ))}
          </View>
        </View>

        <AppText style={styles.title}>How do you want to top-up?</AppText>
        <AppText style={styles.topUpSubText}>
          Select an option to continue
        </AppText>

        {options?.map(({ title, description, image }, key) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(routes.BUY_POWER_FORM_SCREEN)}
            key={key}
            style={styles.optionContainer}
          >
            <View style={styles.optionImageContainer}>
              <AppImage source={image} style={styles.optionImage} />
            </View>
            <View>
              <AppText style={styles.optionTitle}>{title}</AppText>
              <AppText style={styles.optionDescription}>{description}</AppText>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  allTimeText: {
    marginHorizontal: 'auto',
    marginTop: Size.calcHeight(18),
    backgroundColor: colors.BLUE_300,
    paddingVertical: Size.calcHeight(4),
    paddingHorizontal: Size.calcWidth(10),
    borderRadius: 100,
    color: colors.WHITE_300,
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_600,
    borderWidth: Size.calcAverage(1),
    borderColor: colors.BLUE_600,
  },

  amount: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(16),
    color: colors.WHITE_200,
    textAlign: 'center',
  },

  contentContainer: {
    backgroundColor: colors.BLUE_200,
    marginBottom: Size.calcHeight(24),
  },

  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(14),
    borderBottomWidth: Size.calcHeight(1),
    borderBottomColor: colors.WHITE_300,
  },

  optionDescription: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
    paddingTop: Size.calcHeight(4),
    maxWidth: Size.calcWidth(300),
  },

  optionImage: {
    width: Size.calcAverage(36),
    height: Size.calcAverage(36),
  },

  optionImageContainer: {
    borderRadius: 100,
    backgroundColor: colors.WHITE_300,
    padding: Size.calcAverage(6),
    marginRight: Size.calcWidth(16),
  },

  optionTitle: {
    fontFamily: fonts.INTER_500,
    color: colors.BLACK_300,
  },

  rowItem: {
    borderWidth: Size.calcAverage(0.3),
    borderColor: colors.BLUE_300,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Size.calcAverage(10),
    flex: 1,
    paddingHorizontal: Size.calcWidth(16),
  },

  rowItemContainer: {
    flexDirection: 'row',
    paddingTop: Size.calcHeight(18),
  },

  rowItemText: {
    fontSize: Size.calcAverage(12),
    color: colors.WHITE_200,
    paddingBottom: Size.calcHeight(4),
  },

  rowItemValue: {
    fontSize: Size.calcAverage(16),
    fontFamily: fonts.INTER_600,
    color: colors.WHITE_200,
  },

  spentText: {
    textAlign: 'center',
    paddingTop: Size.calcHeight(8),
    paddingBottom: Size.calcHeight(4),
    color: colors.WHITE_200,
    fontSize: Size.calcAverage(12),
  },

  subtitle: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },

  title: {
    fontSize: Size.calcAverage(16),
    fontFamily: fonts.INTER_600,
    textAlign: 'center',
    color: colors.BLACK_200,
  },

  topUpSubText: {
    textAlign: 'center',
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
    paddingBottom: Size.calcHeight(20),
    paddingTop: Size.calcHeight(4),
    borderBottomWidth: Size.calcHeight(1),
    borderBottomColor: colors.WHITE_300,
  },
});

export default BuyPowerScreen;
