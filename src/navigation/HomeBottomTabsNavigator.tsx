import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { StaticParamList } from '@react-navigation/native';

import {
  MaterialSymbolsAccountCircle,
  MaterialSymbolsCalendarClock,
  MaterialSymbolsGridView,
  MaterialSymbolsHome,
  MaterialSymbolsLightAccountCircleOutline,
  MaterialSymbolsLightCalendarClockOutline,
  MaterialSymbolsLightGridViewOutline,
  MaterialSymbolsLightHomeOutline,
  MaterialSymbolsLightNotificationsOutline,
  MaterialSymbolsNotifications,
} from '@src/components/icons/index';
import colors from '@src/configs/colors';
import HomeScreen from '@src/screens/dashboard/home/HomeScreen';

import AccountScreen from '@src/screens/dashboard/account/AccountScreen';
import ActivityScreen from '@src/screens/dashboard/activity/ActivityScreen';
import BookingsScreen from '@src/screens/dashboard/bookings/BookingsScreen';
import MyhubScreen from '@src/screens/dashboard/my-hub/MyhubScreen';
import Size from '@src/utils/useResponsiveSize';
import routes from './routes';

const iconProps = {
  height: Size.calcAverage(23),
  width: Size.calcAverage(23),
};

function getColor(isFocused: boolean) {
  return isFocused ? colors.BLUE_200 : colors.GRAY_200;
}

const HomeBottomTabsNavigator = createBottomTabNavigator({
  screenOptions: {
    animation: 'shift',
    tabBarActiveTintColor: colors.BLUE_200,
    tabBarLabelStyle: {
      fontSize: Size.calcAverage(12),
    },
    tabBarStyle: {
      minHeight: Size.calcHeight(109),
    },
    tabBarInactiveTintColor: colors.GRAY_200,
    headerShown: false,
  },
  screens: {
    [routes.HOME_SCREEN]: {
      screen: HomeScreen,
      options: {
        title: 'Home',
        tabBarIcon: ({ focused }) =>
          focused ? (
            <MaterialSymbolsHome {...iconProps} color={getColor(focused)} />
          ) : (
            <MaterialSymbolsLightHomeOutline
              {...iconProps}
              color={getColor(focused)}
            />
          ),
      },
    },

    [routes.BOOKINGS_SCREEN]: {
      screen: BookingsScreen,
      options: {
        title: 'Bookings',
        tabBarIcon: ({ focused }) =>
          focused ? (
            <MaterialSymbolsCalendarClock
              {...iconProps}
              color={getColor(focused)}
            />
          ) : (
            <MaterialSymbolsLightCalendarClockOutline
              {...iconProps}
              color={getColor(focused)}
            />
          ),
      },
    },

    [routes.MY_HUB_SCREEN]: {
      screen: MyhubScreen,
      options: {
        title: 'My Hub',
        tabBarIcon: ({ focused }) =>
          focused ? (
            <MaterialSymbolsGridView {...iconProps} color={getColor(focused)} />
          ) : (
            <MaterialSymbolsLightGridViewOutline
              {...iconProps}
              color={getColor(focused)}
            />
          ),
      },
    },
    [routes.ACTIVITY_SCREEN]: {
      screen: ActivityScreen,
      options: {
        title: 'Activity',
        tabBarIcon: ({ focused }) =>
          focused ? (
            <MaterialSymbolsNotifications
              {...iconProps}
              color={getColor(focused)}
            />
          ) : (
            <MaterialSymbolsLightNotificationsOutline
              {...iconProps}
              color={getColor(focused)}
            />
          ),
      },
    },
    [routes.ACCCOUNT_SCREEN]: {
      screen: AccountScreen,
      options: {
        title: 'Account',
        tabBarIcon: ({ focused }) =>
          focused ? (
            <MaterialSymbolsAccountCircle
              {...iconProps}
              color={getColor(focused)}
            />
          ) : (
            <MaterialSymbolsLightAccountCircleOutline
              {...iconProps}
              color={getColor(focused)}
            />
          ),
      },
    },
  },
});

export type HomeBottomTabsParamList = StaticParamList<
  typeof HomeBottomTabsNavigator
>;

export type HomeBottomTabsNavigationProp =
  BottomTabNavigationProp<HomeBottomTabsParamList>;

export default HomeBottomTabsNavigator;
