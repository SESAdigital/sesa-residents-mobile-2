import {
  createStaticNavigation,
  RouteProp,
  StaticParamList,
  useNavigation,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { PatchSetupPasswordReq } from '@src/api/auth.api';
import ForgotPasswordScreen, {
  ForgotPasswordScreenParam,
} from '@src/screens/auth/ForgotPasswordScreen';
import LoginScreen from '@src/screens/auth/LoginScreen';
import NewDeviceScreen from '@src/screens/auth/NewDeviceScreen';
import NewDeviceVerificationScreen from '@src/screens/auth/NewDeviceVerificationScreen';
import OnboardingScreen1 from '@src/screens/auth/OnboardingScreen1';
import OnboardingScreen2 from '@src/screens/auth/OnboardingScreen2';
import OneLastStepScreen from '@src/screens/auth/OneLastStepScreen';
import PreLoginSuccessScreen from '@src/screens/auth/PreLoginSuccessScreen';
import RetrieveAccountScreen from '@src/screens/auth/RetrieveAccountScreen';
import SetupPasswordScreen from '@src/screens/auth/SetupPasswordScreen';
import SetupWalletPinScreen from '@src/screens/auth/SetupWalletPinScreen';
import AddMoneyScreen from '@src/screens/dashboard/add-money/AddMoneyScreen';
import AddMoneyViaCardScreen from '@src/screens/dashboard/add-money/AddMoneyViaCardScreen';
import BillsAndCollectionsScreen from '@src/screens/dashboard/my-hub/bills-and-collections/BillsAndCollectionsScreen';
import BookVisitorScreen from '@src/screens/dashboard/my-hub/book-visitor/BookVisitorScreen';
import BuyPowerScreen from '@src/screens/dashboard/my-hub/buy-power/BuyPowerScreen';
import CreateEventsScreen from '@src/screens/dashboard/my-hub/create-events/CreateEventsScreen';
import GroupAccessScreen from '@src/screens/dashboard/my-hub/group-access/GroupAccessScreen';
import HireArtisanScreen from '@src/screens/dashboard/my-hub/hire-artisan/HireArtisanScreen';
import PanicAlertScreen from '@src/screens/dashboard/my-hub/panic-alert/PanicAlertScreen';
import { useAuthStore } from '@src/stores/auth.store';
import HomeBottomTabsNavigator from './HomeBottomTabsNavigator';
import routes from './routes';
import TransactionListScreen from '@src/screens/dashboard/transactions/TransactionListScreen';
import TransactionDetailsScreen from '@src/screens/dashboard/transactions/TransactionDetailsScreen';
import ManageProfileScreen from '@src/screens/dashboard/account/screens/manage-profile/ManageProfileScreen';
import AccountSettingsScreen from '@src/screens/dashboard/account/screens/settings/AccountSettingsScreen';
import HelpCenterScreen from '@src/screens/dashboard/account/screens/help-center/HelpCenterScreen';
import ManageHouseholdScreen from '@src/screens/dashboard/account/screens/manage-household/ManageHouseholdScreen';

function useIsSignedIn() {
  const { loginResponse, isDoneOnboarding } = useAuthStore();
  return !!loginResponse?.data?.token && !!isDoneOnboarding;
}

function useIsSignedOut() {
  return !useIsSignedIn();
}
export type AppNavigatorParams = {
  [routes.ONBOARDING_SCREEN_1]: undefined;
  [routes.ONBOARDING_SCREEN_2]: undefined;
  [routes.RETRIEVE_ACCOUNT_SCREEN]: undefined;
  [routes.PRE_LOGIN_SUCCESS_SCREEN]: undefined;
  [routes.LOGIN_SCREEN]: undefined;
  [routes.SETUP_PASSWORD_SCREEN]: PatchSetupPasswordReq;
  [routes.ONE_LAST_STEP_SCREEN]: undefined;
  [routes.SET_UP_WALLET_PIN_SCREEN]: undefined;
  [routes.NEW_DEVICE_SCREEN]: undefined;
  [routes.NEW_DEVICE_VERIFICATION_SCREEN]: undefined;
  [routes.FORGOT_PASSWORD_SCREEN]: ForgotPasswordScreenParam;
  [routes.ADD_MONEY_SCREEN]: undefined;
  [routes.ADD_MONEY_ATM_CARD_SCREEN]: undefined;
  [routes.TRANSACTION_LIST_SCREEN]: undefined;
  [routes.TRANSACTION_DETAILS_SCREEN]: undefined;

  // ACCOUNTS SCREEN
  [routes.MANAGE_PROFILE_SCREEN]: undefined;
  [routes.MANAGE_HOUSEHOLD_SCREEN]: undefined;
  [routes.ACCOUNT_SETTINGS_SCREEN]: undefined;
  [routes.HELP_CENTER_SCREEN]: undefined;
};

export type AppParamsNavigator = NativeStackNavigationProp<AppNavigatorParams>;

export type AppNavigatorRoutes = keyof AppNavigatorParams;

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
        [routes.PRE_LOGIN_SUCCESS_SCREEN]: PreLoginSuccessScreen,
        [routes.SETUP_PASSWORD_SCREEN]: SetupPasswordScreen,
        [routes.SET_UP_WALLET_PIN_SCREEN]: SetupWalletPinScreen,
        [routes.NEW_DEVICE_SCREEN]: NewDeviceScreen,
        [routes.NEW_DEVICE_VERIFICATION_SCREEN]: NewDeviceVerificationScreen,
        [routes.ONE_LAST_STEP_SCREEN]: OneLastStepScreen,
        [routes.FORGOT_PASSWORD_SCREEN]: ForgotPasswordScreen,
      },
    },

    AUTHORIZED_USER: {
      if: useIsSignedIn,
      screens: {
        // AUTH PAGES
        [routes.HOME_BOTTOM_TABS_NAVIGATOR]: HomeBottomTabsNavigator,
        [routes.BOOK_VISITOR_SCREEN]: BookVisitorScreen,
        [routes.CREATE_EVENTS_SCREEN]: CreateEventsScreen,
        [routes.GROUP_ACCESS_SCREEN]: GroupAccessScreen,
        [routes.BILLS_AND_COLLECTIONS_SCREEN]: BillsAndCollectionsScreen,
        [routes.BUY_POWER_SCREEN]: BuyPowerScreen,
        [routes.PANIC_ALERT_SCREEN]: PanicAlertScreen,
        [routes.HIRE_ARTISAN_SCREEN]: HireArtisanScreen,
        [routes.ADD_MONEY_SCREEN]: AddMoneyScreen,
        [routes.ADD_MONEY_ATM_CARD_SCREEN]: AddMoneyViaCardScreen,
        [routes.TRANSACTION_LIST_SCREEN]: TransactionListScreen,
        [routes.TRANSACTION_DETAILS_SCREEN]: TransactionDetailsScreen,

        // ACCOUNTS SCREEN
        [routes.MANAGE_PROFILE_SCREEN]: ManageProfileScreen,
        [routes.MANAGE_HOUSEHOLD_SCREEN]: ManageHouseholdScreen,
        [routes.ACCOUNT_SETTINGS_SCREEN]: AccountSettingsScreen,
        [routes.HELP_CENTER_SCREEN]: HelpCenterScreen,
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

export type SetupPasswordScreenProps = RouteProp<
  AppNavigatorParams,
  'SETUP_PASSWORD_SCREEN'
>;

export type ForgotPasswordScreenProps = RouteProp<
  AppNavigatorParams,
  'FORGOT_PASSWORD_SCREEN'
>;
