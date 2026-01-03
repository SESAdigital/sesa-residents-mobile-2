import { createStaticNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import LoginScreen from '@src/screens/auth/LoginScreen';
import DashboardScreen from '@src/screens/dashboard/DashboardScreen';
import { useAuthStore } from '@src/stores/auth.store';
import routes from './routes';
import OnboardingScreen from '@src/screens/auth/OnboardingScreen';

function useIsSignedIn() {
  const { loginResponse } = useAuthStore();
  return !!loginResponse?.data?.token;
}

function useIsSignedOut() {
  return !useIsSignedIn();
}
export type AppNavigatorParams = {
  [routes.LOGIN_SCREEN]: undefined;
  [routes.ONBOARDING_SCREEN]: undefined;
};

export type AppParamsNavigator = NativeStackNavigationProp<AppNavigatorParams>;

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
    animation: 'none',
  },

  groups: {
    GUEST_USER: {
      if: useIsSignedOut,
      screens: {
        [routes.ONBOARDING_SCREEN]: OnboardingScreen,
        [routes.LOGIN_SCREEN]: LoginScreen,
      },
    },

    AUTHORIZED_USER: {
      if: useIsSignedIn,
      screens: {
        // AUTH PAGES
        [routes.DASHBOARD_SCREEN]: DashboardScreen,
      },
    },
  },
});

export const AppNavigator = createStaticNavigation(RootStack);

// export type ScreenWithIdProps = RouteProp<
//   AppNavigatorParams,
//   'PATROL_REPORT_DETAILS_SCREEN'
// >;
