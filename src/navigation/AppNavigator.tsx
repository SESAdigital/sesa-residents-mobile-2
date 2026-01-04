import { createStaticNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import LoginScreen from '@src/screens/auth/LoginScreen';
import OnboardingScreen1 from '@src/screens/auth/OnboardingScreen1';
import OnboardingScreen2 from '@src/screens/auth/OnboardingScreen2';
import routes from './routes';
import DashboardScreen from '@src/screens/dashboard/DashboardScreen';
import { useAuthStore } from '@src/stores/auth.store';

function useIsSignedIn() {
  const { loginResponse } = useAuthStore();
  return !!loginResponse?.data?.token;
}

function useIsSignedOut() {
  return !useIsSignedIn();
}
export type AppNavigatorParams = {
  [routes.LOGIN_SCREEN]: undefined;
  [routes.ONBOARDING_SCREEN_1]: undefined;
  [routes.ONBOARDING_SCREEN_2]: undefined;
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
        [routes.ONBOARDING_SCREEN_1]: OnboardingScreen1,
        [routes.ONBOARDING_SCREEN_2]: OnboardingScreen2,
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
