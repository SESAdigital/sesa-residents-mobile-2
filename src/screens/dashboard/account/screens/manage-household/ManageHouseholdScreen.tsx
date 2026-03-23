import { StyleSheet } from 'react-native';

import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';

const ManageHouseholdScreen = (): React.JSX.Element => {
  return (
    <AppScreen showDownInset>
      <AppScreenHeader>
        <AppText style={styles.headerTitle}>Manage household</AppText>
        <AppText style={styles.headerSubtitle}>Select Property</AppText>
      </AppScreenHeader>
      <AppText style={styles.title}>
        Select a property to manage household
      </AppText>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(16),
    color: colors.BLACK_200,
    textAlign: 'center',
  },

  headerSubtitle: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
    textAlign: 'center',
  },

  title: {
    paddingHorizontal: Size.calcWidth(21),
    paddingBottom: Size.calcHeight(8),
    paddingTop: Size.calcHeight(28),
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },
});

export default ManageHouseholdScreen;
