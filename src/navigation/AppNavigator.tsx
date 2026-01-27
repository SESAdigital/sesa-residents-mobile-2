import {
  createStaticNavigation,
  useNavigation,
  StaticParamList,
} from '@react-navigation/native';
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
import RetrieveAccountScreen from '@src/screens/auth/RetrieveAccountScreen';
import CheckYourMailScreen from '@src/screens/auth/CheckYourMailScreen';
import ChangePasswordScreen from '@src/screens/auth/ChangePasswordScreen';

function useIsSignedIn() {
  const { loginResponse } = useAuthStore();
  return !!loginResponse?.data?.token;
}

function useIsSignedOut() {
  return !useIsSignedIn();
}
export type AppNavigatorParams = {
  [routes.ONBOARDING_SCREEN_1]: undefined;
  [routes.ONBOARDING_SCREEN_2]: undefined;
  [routes.RETRIEVE_ACCOUNT_SCREEN]: undefined;
  [routes.CHECK_YOUR_MAIL_SCREEN]: undefined;
  [routes.LOGIN_SCREEN]: undefined;
  [routes.CHANGE_PASSOWRD_SCREEN]: undefined;
};

export type AppParamsNavigator = NativeStackNavigationProp<AppNavigatorParams>;

export const useAppNavigator = () => {
  return useNavigation<AppParamsNavigator>();
};

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
    // animation: 'fade_from_bottom',
  },

  groups: {
    GUEST_USER: {
      if: useIsSignedOut,
      initialRouteName: routes.ONBOARDING_SCREEN_1,
      screens: {
        [routes.ONBOARDING_SCREEN_1]: OnboardingScreen1,
        [routes.ONBOARDING_SCREEN_2]: OnboardingScreen2,
        [routes.LOGIN_SCREEN]: LoginScreen,
        [routes.RETRIEVE_ACCOUNT_SCREEN]: RetrieveAccountScreen,
        [routes.CHECK_YOUR_MAIL_SCREEN]: CheckYourMailScreen,
        [routes.CHANGE_PASSOWRD_SCREEN]: ChangePasswordScreen,
      },
    },

    AUTHORIZED_USER: {
      if: useIsSignedIn,
      screens: {
        // AUTH PAGES
        [routes.HOME_BOTTOM_TABS_NAVIGATOR]: DashboardScreen,
      },
    },
  },
});

export const AppNavigator = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// export type ScreenWithIdProps = RouteProp<
//   AppNavigatorParams,
//   'PATROL_REPORT_DETAILS_SCREEN'
// >;
