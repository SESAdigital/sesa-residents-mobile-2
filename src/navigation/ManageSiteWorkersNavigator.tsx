import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import { StatusBar, StyleSheet, View } from 'react-native';

import { useRoute } from '@react-navigation/native';
import { GetEntityStatusData } from '@src/api/constants/default';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import SiteWorkersStatusListScreen from '@src/screens/dashboard/account/screens/manage-household/manage-site-workers/SiteWorkersStatusListScreen';
import Size from '@src/utils/useResponsiveSize';
import { ScreenWithName } from './AppNavigator';
import AppTopTabBar from './components/AppTopTabBar';
import routes from './routes';

const PendingSiteWorkersScreen = () => (
  <SiteWorkersStatusListScreen Status={GetEntityStatusData.New} />
);
const ActiveSiteWorkersScreen = () => (
  <SiteWorkersStatusListScreen Status={GetEntityStatusData.Active} />
);
const InactiveSiteWorkersScreen = () => (
  <SiteWorkersStatusListScreen Status={GetEntityStatusData.Inactive} />
);
const AllSiteWorkersScreen = () => (
  <SiteWorkersStatusListScreen Status={GetEntityStatusData.All} />
);

const ManageSiteWorkersNavigator = createMaterialTopTabNavigator({
  tabBar: props => <CustomTopTabBar {...props} />,
  initialRouteName: routes.ALL_SITE_WORKERS_SCREEN,
  screens: {
    [routes.ALL_SITE_WORKERS_SCREEN]: {
      screen: AllSiteWorkersScreen,
      options: {
        title: 'All',
      },
    },
    [routes.ACTIVE_SITE_WORKERS_SCREEN]: {
      screen: ActiveSiteWorkersScreen,
      options: {
        title: 'Active',
      },
    },
    [routes.INACTIVE_SITE_WORKERS_SCREEN]: {
      screen: InactiveSiteWorkersScreen,
      options: {
        title: 'Inactive',
      },
    },
    [routes.PENDING_SITE_WORKERS_SCREEN]: {
      screen: PendingSiteWorkersScreen,
      options: {
        title: 'Pending',
      },
    },
  },
});

export default ManageSiteWorkersNavigator;

function CustomTopTabBar(props: MaterialTopTabBarProps): React.JSX.Element {
  const params = useRoute()?.params as ScreenWithName;
  return (
    <View style={{ paddingTop: StatusBar.currentHeight }}>
      <AppScreenHeader>
        <AppText style={styles.headerTitle}>Manage site workers</AppText>

        <AppText style={styles.headerSubtitle}>{params?.name}</AppText>
      </AppScreenHeader>

      <AppText style={styles.instructions}>
        Tap site workers to view access history
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
