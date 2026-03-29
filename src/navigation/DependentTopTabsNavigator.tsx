import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';

import AppScreenHeader from '@src/components/common/AppScreenHeader';
import { MaterialSymbolsMoreVert } from '@src/components/icons';
import colors from '@src/configs/colors';
import ManageDependentRow from '@src/screens/dashboard/account/screens/manage-household/manage-dependents/components/ManageDependentRow';
import { useDependentActions } from '@src/screens/dashboard/account/screens/manage-household/manage-dependents/components/dependent-actions';
import DependentCheckInAndOutScreen from '@src/screens/dashboard/account/screens/manage-household/manage-dependents/dependent-details/DependentCheckInAndOutScreen';
import DependentEventsSceen from '@src/screens/dashboard/account/screens/manage-household/manage-dependents/dependent-details/DependentEventsSceen';
import DependentGroupAccessScreen from '@src/screens/dashboard/account/screens/manage-household/manage-dependents/dependent-details/DependentGroupAccessScreen';
import DependentVisitorsScreen from '@src/screens/dashboard/account/screens/manage-household/manage-dependents/dependent-details/DependentVisitorsScreen';
import { useAppStateStore } from '@src/stores/appState.store';
import Size from '@src/utils/useResponsiveSize';
import AppTopTabBar from './components/AppTopTabBar';
import routes from './routes';

const DependentTopTabsNavigator = createMaterialTopTabNavigator({
  tabBar: props => <CustomTopTabBar {...props} />,
  initialRouteName: routes.DEPENDENT_CHECK_IN_AND_OUT_SCREEN,
  screens: {
    [routes.DEPENDENT_CHECK_IN_AND_OUT_SCREEN]: {
      screen: DependentCheckInAndOutScreen,
      options: {
        title: 'Check-in/out',
      },
    },
    [routes.DEPENDENT_VISITORS_SCREEN]: {
      screen: DependentVisitorsScreen,
      options: {
        title: 'Visitors',
      },
    },
    [routes.DEPENDENT_EVENTS_SCREEN]: {
      screen: DependentEventsSceen,
      options: {
        title: 'Events',
      },
    },
    [routes.DEPENDENT_GROUP_ACCESS_SCREEN]: {
      screen: DependentGroupAccessScreen,
      options: {
        title: 'Group Access',
      },
    },
  },
});

export default DependentTopTabsNavigator;

function CustomTopTabBar(props: MaterialTopTabBarProps): React.JSX.Element {
  const { selectedDependent } = useAppStateStore();
  const { handleModal } = useDependentActions({ shouldGoBackOnDelete: true });

  return (
    <View style={{ paddingTop: StatusBar.currentHeight }}>
      <AppScreenHeader
        rightIcon={
          <TouchableOpacity onPress={() => handleModal(selectedDependent!)}>
            <MaterialSymbolsMoreVert
              height={Size.calcAverage(24)}
              width={Size.calcAverage(24)}
              color={colors.GRAY_100}
            />
          </TouchableOpacity>
        }
      >
        <ManageDependentRow
          data={selectedDependent!}
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
