import { StyleSheet, View } from 'react-native';

import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useGetPropertyDetails } from '@src/hooks/useGetRequests';
import Size from '@src/utils/useResponsiveSize';

const HouseholdActivityPage = (): React.JSX.Element => {
  const {
    value: { data: propertyDetails },
  } = useGetPropertyDetails();

  return (
    <AppScreen showDownInset>
      <AppScreenHeader>
        <View style={{ rowGap: Size.calcHeight(4) }}>
          <AppText style={styles.header}>Household activity </AppText>
          <AppText style={styles.address} numberOfLines={1}>
            {propertyDetails?.address}
          </AppText>
        </View>
      </AppScreenHeader>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {},

  address: {
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
    paddingHorizontal: Size.calcWidth(50),
  },

  header: {
    textAlign: 'center',
    fontSize: Size.calcAverage(16),
    fontFamily: fonts.INTER_600,
  },
});

export default HouseholdActivityPage;
