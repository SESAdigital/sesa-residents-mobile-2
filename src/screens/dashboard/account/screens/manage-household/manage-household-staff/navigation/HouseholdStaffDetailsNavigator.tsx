import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import { StatusBar, StyleSheet, View } from 'react-native';

import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppTopTabBar from '@src/navigation/components/AppTopTabBar';
import routes from '@src/navigation/routes';
import { useAppStateStore } from '@src/stores/appState.store';
import SiteWorkerRow from '../../manage-site-workers/components/SiteWorkerRow';
import HouseholdStaffBankAccountsScreen from '../details/HouseholdStaffBankAccountsScreen';
import HouseholdStaffCheckInAndOutScreen from '../details/HouseholdStaffCheckInAndOutScreen';
import HouseholdStaffIdCardScreen from '../details/HouseholdStaffIdCardScreen';

const HouseholdStaffDetailsNavigator = createMaterialTopTabNavigator({
  tabBar: props => <CustomTopTabBar {...props} />,
  screens: {
    [routes.HOUSEHOLD_STAFF_ID_CARD_SCREEN]: {
      screen: HouseholdStaffIdCardScreen,
      options: {
        title: 'ID card',
      },
    },
    [routes.HOUSEHOLD_STAFF_CHECK_IN_AND_OUT_SCREEN]: {
      screen: HouseholdStaffCheckInAndOutScreen,
      options: {
        title: 'Check-in/out',
      },
    },
    [routes.HOUSEHOLD_STAFF_BANKS_SCREEN]: {
      screen: HouseholdStaffBankAccountsScreen,
      options: {
        title: 'Banks',
      },
    },
  },
});

export default HouseholdStaffDetailsNavigator;

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
