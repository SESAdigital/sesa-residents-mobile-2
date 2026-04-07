import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import { StatusBar, StyleSheet, View } from 'react-native';

import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppTopTabBar from '@src/navigation/components/AppTopTabBar';
import routes from '@src/navigation/routes';
import { useAppStateStore } from '@src/stores/appState.store';
import SiteWorkerRow from '../components/SiteWorkerRow';
import SiteWorkerBankAccountsScreen from '../details/SiteWorkerBankAccountsScreen';
import SiteWorkerCheckInAndOutScreen from '../details/SiteWorkerCheckInAndOutScreen';
import SiteWorkerIDCardScreen from '../details/SiteWorkerIDCardScreen';
import SiteWorkerScheduleScreen from '../details/SiteWorkerScheduleScreen';

const SiteWorkerDetailNavigator = createMaterialTopTabNavigator({
  tabBar: props => <CustomTopTabBar {...props} />,
  initialRouteName: routes.SITE_WORKER_ID_CARD_SCREEN,
  screens: {
    [routes.SITE_WORKER_ID_CARD_SCREEN]: {
      screen: SiteWorkerIDCardScreen,
      options: {
        title: 'ID card',
      },
    },
    [routes.SITE_WORKER_CHECK_IN_AND_OUT_SCREEN]: {
      screen: SiteWorkerCheckInAndOutScreen,
      options: {
        title: 'Check-in/out',
      },
    },
    [routes.SITE_WORKER_SCHEDULE_SCREEN]: {
      screen: SiteWorkerScheduleScreen,
      options: {
        title: 'Schedule',
      },
    },
    [routes.SITE_WORKER_BANKS_SCREEN]: {
      screen: SiteWorkerBankAccountsScreen,
      options: {
        title: 'Bank accounts',
      },
    },
  },
});

export default SiteWorkerDetailNavigator;

function CustomTopTabBar(props: MaterialTopTabBarProps): React.JSX.Element {
  const { selectedSiteWorker } = useAppStateStore();

  return (
    <View style={{ paddingTop: StatusBar.currentHeight }}>
      <AppScreenHeader>
        <SiteWorkerRow
          data={selectedSiteWorker!}
          contentContainerStyle={styles.cardRow}
          containerStyle={styles.cardRowContainer}
        />
      </AppScreenHeader>
      <AppTopTabBar {...props} />
    </View>
  );
}
const styles = StyleSheet.create({
  cardRow: {
    paddingBottom: 0,
    borderBottomWidth: 0,
  },

  cardRowContainer: {
    paddingTop: 0,
    paddingBottom: 0,
  },
});
