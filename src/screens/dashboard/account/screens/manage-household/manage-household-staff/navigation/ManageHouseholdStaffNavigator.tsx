import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import { StatusBar, StyleSheet, View } from 'react-native';

import { useRoute } from '@react-navigation/native';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import HouseholdStaffStatusListScreen from '@src/screens/dashboard/account/screens/manage-household/manage-household-staff/HouseholdStaffStatusListScreen';
import Size from '@src/utils/useResponsiveSize';
import { ScreenWithName } from '../../../../../../../navigation/AppNavigator';
import AppTopTabBar from '../../../../../../../navigation/components/AppTopTabBar';
import routes from '../../../../../../../navigation/routes';
import { GetEntityStatusData } from '@src/api/constants/default';

const PendingHouseholdStaffScreen = () => (
  <HouseholdStaffStatusListScreen Status={GetEntityStatusData.New} />
);
const ActiveHouseholdStaffScreen = () => (
  <HouseholdStaffStatusListScreen Status={GetEntityStatusData.Active} />
);
const InactiveHouseholdStaffScreen = () => (
  <HouseholdStaffStatusListScreen Status={GetEntityStatusData.Inactive} />
);
const AllHouseholdStaffScreen = () => (
  <HouseholdStaffStatusListScreen Status={GetEntityStatusData.All} />
);

const ManageHouseholdStaffNavigator = createMaterialTopTabNavigator({
  tabBar: props => <CustomTopTabBar {...props} />,
  initialRouteName: routes.ALL_HOUSEHOLD_STAFF_SCREEN,
  screens: {
    [routes.ALL_HOUSEHOLD_STAFF_SCREEN]: {
      screen: AllHouseholdStaffScreen,
      options: {
        title: 'All',
      },
    },
    [routes.ACTIVE_HOUSEHOLD_STAFF_SCREEN]: {
      screen: ActiveHouseholdStaffScreen,
      options: {
        title: 'Active',
      },
    },
    [routes.INACTIVE_HOUSEHOLD_STAFF_SCREEN]: {
      screen: InactiveHouseholdStaffScreen,
      options: {
        title: 'Inactive',
      },
    },
    [routes.PENDING_HOUSEHOLD_STAFF_SCREEN]: {
      screen: PendingHouseholdStaffScreen,
      options: {
        title: 'Pending',
      },
    },
  },
});

export default ManageHouseholdStaffNavigator;

function CustomTopTabBar(props: MaterialTopTabBarProps): React.JSX.Element {
  const params = useRoute()?.params as ScreenWithName;
  return (
    <View style={{ paddingTop: StatusBar.currentHeight }}>
      <AppScreenHeader>
        <AppText style={styles.headerTitle}>Manage household staff</AppText>

        <AppText style={styles.headerSubtitle}>{params?.name}</AppText>
      </AppScreenHeader>

      <AppText style={styles.instructions}>
        Tap household staff to view access history
      </AppText>

      <AppTopTabBar {...props} />
    </View>
  );
}

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

  instructions: {
    paddingVertical: Size.calcHeight(8),
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
    paddingHorizontal: Size.calcWidth(21),
    borderBottomWidth: Size.calcWidth(1),
    borderColor: colors.WHITE_300,
  },
});
