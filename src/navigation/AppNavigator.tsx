import {
  createStaticNavigation,
  StaticParamList,
  useNavigation,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { PatchSetupPasswordReq } from '@src/api/auth.api';
import { GetSingleBookingsAttendeeDetailReq } from '@src/api/bookings.api';
import { PostEventResData } from '@src/api/events.api';
import { PostGroupAccessResData } from '@src/api/group-access.api';
import {
  GetEmergencyServicesResData,
  GetEstateRulesResData,
} from '@src/api/helpCenter.api';
import {
  GetHouseholdAccessCardsResData,
  GetHouseholdRFIDsResData,
  PostHouseholdCreateOccupantResData,
} from '@src/api/household.api';
import { PostBookVisitorResData } from '@src/api/visitors.api';
import { WalletTransactionDetails } from '@src/api/wallets.api';
import DependentTopTabsNavigator from '@src/navigation/DependentTopTabsNavigator';
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
import EmergencyServiceDetailsScreen from '@src/screens/dashboard/account/screens/help-center/emergency-services/EmergencyServiceDetailsScreen';
import EmergencyServicesScreen from '@src/screens/dashboard/account/screens/help-center/emergency-services/EmergencyServicesScreen';
import EstateRuleDetailsScreen from '@src/screens/dashboard/account/screens/help-center/estate-rules/EstateRuleDetailsScreen';
import EstateRulesScreen from '@src/screens/dashboard/account/screens/help-center/estate-rules/EstateRulesScreen';
import HelpCenterScreen from '@src/screens/dashboard/account/screens/help-center/HelpCenterScreen';
import HouseHoldMetricsScreen from '@src/screens/dashboard/account/screens/manage-household/HouseHoldMetricsScreen';
import AccessCardHistoryScreen from '@src/screens/dashboard/account/screens/manage-household/manage-access-cards/AccessCardHistoryScreen';
import ManageAccessCardsScreen from '@src/screens/dashboard/account/screens/manage-household/manage-access-cards/ManageAccessCardsScreen';
import AddDependentFormScreen, {
  AddDependentFormScreenProps,
} from '@src/screens/dashboard/account/screens/manage-household/manage-dependents/AddDependentFormScreen';
import AddDependentScreen from '@src/screens/dashboard/account/screens/manage-household/manage-dependents/AddDependentScreen';
import ManageDependentsScreen from '@src/screens/dashboard/account/screens/manage-household/manage-dependents/ManageDependentsScreen';
import ManageRFIDsScreen from '@src/screens/dashboard/account/screens/manage-household/manage-rfids/ManageRFIDsScreen';
import RFIDHistoryScreen from '@src/screens/dashboard/account/screens/manage-household/manage-rfids/RFIDHistoryScreen';
import ManageHouseholdScreen from '@src/screens/dashboard/account/screens/manage-household/ManageHouseholdScreen';
import EmergencyContactListScreen from '@src/screens/dashboard/account/screens/manage-profile/emergency-contacts/EmergencyContactListScreen';
import EmergencyContactsScreen from '@src/screens/dashboard/account/screens/manage-profile/emergency-contacts/EmergencyContactsScreen';
import ManageEmergencyContactScreen from '@src/screens/dashboard/account/screens/manage-profile/emergency-contacts/ManageEmergencyContactScreen';
import ManageProfileScreen from '@src/screens/dashboard/account/screens/manage-profile/ManageProfileScreen';
import NotificationPreferencesScreen from '@src/screens/dashboard/account/screens/manage-profile/notification-preferences/NotificationPreferencesScreen';
import UpdatePhoneNumberScreen from '@src/screens/dashboard/account/screens/manage-profile/update-phone-number/UpdatePhoneNumberScreen';
import MyQRCodeScreen from '@src/screens/dashboard/account/screens/my-qr-code/MyQRCodeScreen';
import HouseHoldActivityDetailsPage from '@src/screens/dashboard/account/screens/property-details/household-activity/HouseHoldActivityDetailsPage';
import HouseholdActivityPage from '@src/screens/dashboard/account/screens/property-details/household-activity/HouseholdActivityPage';
import OccupantHistoryPage from '@src/screens/dashboard/account/screens/property-details/occupant-history/OccupantHistoryPage';
import PropertyDetailsConfigureAccessScreen from '@src/screens/dashboard/account/screens/property-details/PropertyDetailsConfigureAccessScreen';
import PropertyDetailScreen from '@src/screens/dashboard/account/screens/property-details/PropertyDetailScreen';
import AccountSettingsScreen from '@src/screens/dashboard/account/screens/settings/AccountSettingsScreen';
import ChangePasswordScreen from '@src/screens/dashboard/account/screens/settings/screens/ChangePasswordScreen';
import ChangeWalletPinScreen from '@src/screens/dashboard/account/screens/settings/screens/ChangeWalletPinScreen';
import DeleteAccountScreen from '@src/screens/dashboard/account/screens/settings/screens/DeleteAccountScreen';
import ResetWalletPinScreen from '@src/screens/dashboard/account/screens/settings/screens/ResetWalletPinScreen';
import NewWalkInVisitorActivityScreen from '@src/screens/dashboard/activity/screens/NewWalkInVisitorActivityScreen';
import AddMoneyScreen from '@src/screens/dashboard/add-money/AddMoneyScreen';
import AddMoneyViaCardScreen from '@src/screens/dashboard/add-money/AddMoneyViaCardScreen';
import AttendeeDetailScreen from '@src/screens/dashboard/bookings/attendees/AttendeeDetailScreen';
import AttendeeListScreen, {
  AttendeeListScreenProps,
} from '@src/screens/dashboard/bookings/attendees/AttendeeListScreen';
import EventBookingDetailsScreen from '@src/screens/dashboard/bookings/events/EventBookingDetailsScreen';
import GroupAccessBookingDetailsScreen from '@src/screens/dashboard/bookings/group-access/GroupAccessBookingDetailsScreen';
import VisitorBookingDetailsScreen from '@src/screens/dashboard/bookings/visitors/VisitorBookingDetailsScreen';
import BillsAndCollectionsScreen from '@src/screens/dashboard/my-hub/bills-and-collections/BillsAndCollectionsScreen';
import PayInvoiceScreen, {
  PayInvoiceScreenProps,
} from '@src/screens/dashboard/my-hub/bills-and-collections/PayInvoiceScreen';
import PaymentInvoiceDetailsScreen, {
  BillInvoiceDetailsScreenProps,
} from '@src/screens/dashboard/my-hub/bills-and-collections/PaymentInvoiceDetailsScreen';
import UnPaidEstatePaymentsScreen from '@src/screens/dashboard/my-hub/bills-and-collections/UnPaidEstatePaymentsScreen';
import BookVisitorScreen from '@src/screens/dashboard/my-hub/book-visitor/BookVisitorScreen';
import BookVisitorSuccessScreen from '@src/screens/dashboard/my-hub/book-visitor/BookVistorSuccessScreen';
import BuyPowerFormScreen from '@src/screens/dashboard/my-hub/buy-power/BuyPowerFormScreen';
import BuyPowerScreen from '@src/screens/dashboard/my-hub/buy-power/BuyPowerScreen';
import CreateEventsScreen from '@src/screens/dashboard/my-hub/create-events/CreateEventsScreen';
import CreateEventSuccessScreen from '@src/screens/dashboard/my-hub/create-events/CreateEventSuccessScreen';
import CreateGroupAccessScreen from '@src/screens/dashboard/my-hub/group-access/CreateGroupAccessScreen';
import CreateGroupAccessSuccessScreen from '@src/screens/dashboard/my-hub/group-access/CreateGroupAccessSuccessScreen';
import GroupAccessScreen from '@src/screens/dashboard/my-hub/group-access/GroupAccessScreen';
import HireArtisanScreen from '@src/screens/dashboard/my-hub/hire-artisan/HireArtisanScreen';
import PanicAlertScreen, {
  PanicAlertScreenData,
} from '@src/screens/dashboard/my-hub/panic-alert/PanicAlertScreen';
import ScanBarCodeScreen, {
  ScanBarCodeScreenProps,
} from '@src/screens/dashboard/reusable-screens/ScanBarCodeScreen';
import TransactionSuccessScreen, {
  TransactionSuccessScreenData,
} from '@src/screens/dashboard/reusable-screens/TransactionSuccessScreen';
import TransactionDetailsScreen from '@src/screens/dashboard/transactions/TransactionDetailsScreen';
import TransactionListScreen from '@src/screens/dashboard/transactions/TransactionListScreen';
import { useAuthStore } from '@src/stores/auth.store';
import { BuyPowerFormScreenData } from '@src/types/default';
import HomeBottomTabsNavigator from './HomeBottomTabsNavigator';
import routes from './routes';
import AddDependentSuccessScreen from '@src/screens/dashboard/account/screens/manage-household/manage-dependents/AddDependentSuccessScreen';
import ManageHouseholdStaffNavigator from '../screens/dashboard/account/screens/manage-household/manage-household-staff/navigation/ManageHouseholdStaffNavigator';
import AddHouseholdStaffFormScreen from '@src/screens/dashboard/account/screens/manage-household/manage-household-staff/AddHouseholdStaffFormScreen';
import AddHouseholdStaffScreen from '@src/screens/dashboard/account/screens/manage-household/manage-household-staff/AddHouseholdStaffScreen';
import AddHouseholdStaffSuccessScreen, {
  AddHouseholdStaffSuccessScreenProps,
} from '@src/screens/dashboard/account/screens/manage-household/manage-household-staff/AddHouseholdStaffSuccessScreen';
import ManageSiteWorkersNavigator from '../screens/dashboard/account/screens/manage-household/manage-site-workers/navigation/ManageSiteWorkersNavigator';
import AddSiteWorkerFormScreen from '@src/screens/dashboard/account/screens/manage-household/manage-site-workers/AddSiteWorkerFormScreen';
import AddSiteWorkerScreen from '@src/screens/dashboard/account/screens/manage-household/manage-site-workers/AddSiteWorkerScreen';
import AddSiteWorkerSuccessScreen, {
  AddSiteWorkerSuccessScreenProps,
} from '@src/screens/dashboard/account/screens/manage-household/manage-site-workers/AddSiteWorkerSuccessScreen';
import SiteWorkerDetailNavigator from '@src/screens/dashboard/account/screens/manage-household/manage-site-workers/navigation/SiteWorkerDetailNavigator';
import HouseholdStaffDetailsNavigator from '@src/screens/dashboard/account/screens/manage-household/manage-household-staff/navigation/HouseholdStaffDetailsNavigator';
import AddAlphaOccupantFormScreen, {
  AddAlphaOccupantFormScreenProps,
} from '@src/screens/dashboard/account/screens/manage-household/manage-alpha-occupants/AddAlphaOccupantFormScreen';
import AddAlphaOccupantScreen from '@src/screens/dashboard/account/screens/manage-household/manage-alpha-occupants/AddAlphaOccupantScreen';
import ManageAlphaOccupantsScreen from '@src/screens/dashboard/account/screens/manage-household/manage-alpha-occupants/ManageAlphaOccupantsScreen';
import AddAlphaOccupantSuccessScreen from '@src/screens/dashboard/account/screens/manage-household/manage-alpha-occupants/AddAlphaOccupantSuccessScreen';

function useCheckIsFirstTimeUser() {
  const { isFirstTimeLogin } = useAuthStore();
  return !!isFirstTimeLogin;
}
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
  [routes.TRANSACTION_DETAILS_SCREEN]: WalletTransactionDetails;
  [routes.TRANSACTION_SUCCESS_SCREEN]: TransactionSuccessScreenData;

  [routes.HOME_BOTTOM_TABS_NAVIGATOR]: undefined;

  // MY HUB SCREENS
  [routes.PANIC_ALERT_SCREEN]: PanicAlertScreenData;
  [routes.BUY_POWER_SCREEN]: undefined;
  [routes.BUY_POWER_FORM_SCREEN]: BuyPowerFormScreenData;
  [routes.BOOK_VISITOR_SCREEN]: undefined;
  [routes.BOOK_VISITOR_SUCCESS_SCREEN]: PostBookVisitorResData;
  [routes.CREATE_EVENTS_SCREEN]: undefined;
  [routes.CREATE_EVENT_SUCCESS_SCREEN]: PostEventResData;
  [routes.GROUP_ACCESS_SCREEN]: undefined;
  [routes.CREATE_GROUP_ACCESS_SCREEN]: undefined;
  [routes.CREATE_GROUP_ACCESS_SUCCESS_SCREEN]: PostGroupAccessResData;
  [routes.BILLS_AND_COLLECTIONS_SCREEN]: undefined;
  [routes.UNPAID_ESTATE_PAYMENT_SCREEN]: undefined;
  [routes.PAY_INVOICE_SCREEN]: PayInvoiceScreenProps;
  [routes.PAYMENT_INVOICE_DETAILS_SCREEN]: BillInvoiceDetailsScreenProps;

  // BOOKINGS SCREENS
  [routes.VISITOR_BOOKING_DETAILS_SCREEN]: ScreenWithId;
  [routes.EVENT_BOOKING_DETAILS_SCREEN]: ScreenWithId;
  [routes.ATTENDEE_LIST_SCREEN]: AttendeeListScreenProps;
  [routes.ATTENDEE_DETAIL_SCREEN]: GetSingleBookingsAttendeeDetailReq;
  [routes.GROUP_ACCESS_BOOKING_DETAILS_SCREEN]: ScreenWithId;

  // ACTIVITY SCREENS

  [routes.NEW_WALK_IN_VISITOR_ACTIVITY_SCREEN]: ScreenWithId;

  // ACCOUNTS SCREEN
  [routes.MANAGE_PROFILE_SCREEN]: undefined;
  [routes.UPDATE_PHONE_NUMBER_SCREEN]: undefined;
  [routes.EMERGENCY_CONTACTS_SCREEN]: undefined;
  [routes.MANAGE_EMERGENCY_CONTACT_SCREEN]: ScreenWithId;
  [routes.EMERGENCY_CONTACTS_LIST_SCREEN]: undefined;
  [routes.NOTIFICATION_PREFERENCES_SCREEN]: undefined;

  // MANAGE HOUSEHOLD SCREENS
  [routes.MANAGE_HOUSEHOLD_SCREEN]: undefined;
  [routes.HOUSEHOLD_METRICS_SCREEN]: undefined;

  // ALPHA OCCUPANTS
  [routes.MANAGE_ALPHA_OCCUPANTS_SCREEN]: ScreenWithIdAndName;
  [routes.ADD_ALPHA_OCCUPANT_SCREEN]: ScreenWithIdAndName;
  [routes.ADD_ALPHA_OCCUPANT_FORM_SCREEN]: AddAlphaOccupantFormScreenProps;
  [routes.ADD_ALPHA_OCCUPANT_SUCCESS_SCREEN]: PostHouseholdCreateOccupantResData;

  // DEPENDENTS
  [routes.MANAGE_DEPENDENTS_SCREEN]: ScreenWithIdAndName;
  [routes.ADD_DEPENDENT_SCREEN]: ScreenWithIdAndName;
  [routes.ADD_DEPENDENT_FORM_SCREEN]: AddDependentFormScreenProps;
  [routes.ADD_DEPENDENT_SUCCESS_SCREEN]: PostHouseholdCreateOccupantResData;
  [routes.DEPENDENT_DETAILS_NAVIGATOR]: undefined;

  // MANAGE HOUSEHOLD STAFF SCREEN
  [routes.MANAGE_HOUSEHOLD_STAFF_NAVIGATOR]: ScreenWithName;
  [routes.ADD_HOUSEHOLD_STAFF_SCREEN]: ScreenWithIdAndName;
  [routes.ADD_HOUSEHOLD_STAFF_FORM_SCREEN]: AddDependentFormScreenProps;
  [routes.ADD_HOUSEHOLD_STAFF_SUCCESS_SCREEN]: AddHouseholdStaffSuccessScreenProps;
  [routes.HOUSEHOLD_STAFF_DETAILS_NAVIGATOR]: undefined;

  // MANAGE SITE WORKER SCREEN
  [routes.MANAGE_SITE_WORKERS_NAVIGATOR]: ScreenWithName;
  [routes.ADD_SITE_WORKER_SCREEN]: ScreenWithIdAndName;
  [routes.ADD_SITE_WORKER_FORM_SCREEN]: AddDependentFormScreenProps;
  [routes.ADD_SITE_WORKER_SUCCESS_SCREEN]: AddSiteWorkerSuccessScreenProps;
  [routes.SITE_WORKER_DETAILS_NAVIGATOR]: undefined;

  [routes.MANAGE_ACCESS_CARDS_SCREEN]: ScreenWithIdAndName;
  [routes.MANAGE_RFIDS_SCREEN]: ScreenWithIdAndName;
  [routes.ACCESS_CARD_HISTORY_SCREEN]: GetHouseholdAccessCardsResData;
  [routes.RFID_HISTORY_SCREEN]: GetHouseholdRFIDsResData;

  [routes.MY_QR_CODE_SCREEN]: undefined;
  [routes.PROPERTY_DETAILS_SCREEN]: undefined;
  [routes.PROPERTY_DETAILS_OCCUPANT_HISTORY_SCREEN]: undefined;
  [routes.PROPERTY_DETAILS_CONFIGURE_ACCESS_SCREEN]: undefined;
  [routes.HOUSEHOLD_ACTIVITY_PAGE]: ScreenWithIdAndName;
  [routes.HOUSEHOLD_ACTIVITY_DETAILS_PAGE]: ScreenWithId;
  [routes.ACCOUNT_SETTINGS_SCREEN]: undefined;
  [routes.CHANGE_PASSWORD_SCREEN]: undefined;
  [routes.CHANGE_WALLET_PIN_SCREEN]: undefined;
  [routes.DELETE_ACCOUNT_SCREEN]: undefined;
  [routes.RESET_WALLET_PIN_SCREEN]: undefined;
  [routes.HELP_CENTER_SCREEN]: undefined;
  [routes.EMERGENCY_SERVICES_SCREEN]: undefined;
  [routes.EMERGENCY_SERVICE_DETAILS_SCREEN]: GetEmergencyServicesResData;
  [routes.ESTATE_RULES_SCREEN]: undefined;
  [routes.ESTATE_RULE_DETAILS_SCREEN]: GetEstateRulesResData;

  // REUSABLE SCREENS
  [routes.SCAN_BAR_CODE_SCREEN]: ScanBarCodeScreenProps;
};

export type AppParamsNavigator = NativeStackNavigationProp<AppNavigatorParams>;

export type AppNavigatorRoutes = keyof AppNavigatorParams;

export type AppScreenProps<RouteName extends keyof AppNavigatorParams> =
  NativeStackScreenProps<AppNavigatorParams, RouteName>;

export const useAppNavigator = () => {
  return useNavigation<AppParamsNavigator>();
};

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
    // animation: 'fade_from_bottom',
  },

  groups: {
    FIRST_TIME_USER: {
      if: useCheckIsFirstTimeUser,
      screens: {
        [routes.ONBOARDING_SCREEN_1]: OnboardingScreen1,
      },
    },

    GUEST_USER: {
      if: useIsSignedOut,
      screens: {
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
        // HOME SCREEN / MY HUB PAGES
        [routes.HOME_BOTTOM_TABS_NAVIGATOR]: HomeBottomTabsNavigator,
        [routes.BOOK_VISITOR_SCREEN]: BookVisitorScreen,
        [routes.BOOK_VISITOR_SUCCESS_SCREEN]: BookVisitorSuccessScreen,
        [routes.CREATE_EVENTS_SCREEN]: CreateEventsScreen,
        [routes.CREATE_EVENT_SUCCESS_SCREEN]: CreateEventSuccessScreen,
        [routes.GROUP_ACCESS_SCREEN]: GroupAccessScreen,
        [routes.CREATE_GROUP_ACCESS_SCREEN]: CreateGroupAccessScreen,
        [routes.CREATE_GROUP_ACCESS_SUCCESS_SCREEN]:
          CreateGroupAccessSuccessScreen,
        [routes.BILLS_AND_COLLECTIONS_SCREEN]: BillsAndCollectionsScreen,
        [routes.UNPAID_ESTATE_PAYMENT_SCREEN]: UnPaidEstatePaymentsScreen,
        [routes.PAY_INVOICE_SCREEN]: PayInvoiceScreen,
        [routes.PAYMENT_INVOICE_DETAILS_SCREEN]: PaymentInvoiceDetailsScreen,
        [routes.BUY_POWER_SCREEN]: BuyPowerScreen,
        [routes.BUY_POWER_FORM_SCREEN]: BuyPowerFormScreen,
        [routes.PANIC_ALERT_SCREEN]: PanicAlertScreen,
        [routes.HIRE_ARTISAN_SCREEN]: HireArtisanScreen,
        [routes.ADD_MONEY_SCREEN]: AddMoneyScreen,
        [routes.ADD_MONEY_ATM_CARD_SCREEN]: AddMoneyViaCardScreen,
        [routes.TRANSACTION_LIST_SCREEN]: TransactionListScreen,
        [routes.TRANSACTION_DETAILS_SCREEN]: TransactionDetailsScreen,
        [routes.TRANSACTION_SUCCESS_SCREEN]: TransactionSuccessScreen,

        //BOOKING SCREENS
        [routes.VISITOR_BOOKING_DETAILS_SCREEN]: VisitorBookingDetailsScreen,
        [routes.EVENT_BOOKING_DETAILS_SCREEN]: EventBookingDetailsScreen,
        [routes.GROUP_ACCESS_BOOKING_DETAILS_SCREEN]:
          GroupAccessBookingDetailsScreen,
        [routes.ATTENDEE_LIST_SCREEN]: AttendeeListScreen,
        [routes.ATTENDEE_DETAIL_SCREEN]: AttendeeDetailScreen,

        // ACTIVITY SCREENS
        [routes.NEW_WALK_IN_VISITOR_ACTIVITY_SCREEN]:
          NewWalkInVisitorActivityScreen,

        // ACCOUNTS SCREEN
        [routes.MANAGE_PROFILE_SCREEN]: ManageProfileScreen,
        [routes.UPDATE_PHONE_NUMBER_SCREEN]: UpdatePhoneNumberScreen,
        [routes.EMERGENCY_CONTACTS_SCREEN]: EmergencyContactsScreen,
        [routes.EMERGENCY_CONTACTS_LIST_SCREEN]: EmergencyContactListScreen,
        [routes.MANAGE_EMERGENCY_CONTACT_SCREEN]: ManageEmergencyContactScreen,
        [routes.NOTIFICATION_PREFERENCES_SCREEN]: NotificationPreferencesScreen,

        [routes.MANAGE_HOUSEHOLD_SCREEN]: ManageHouseholdScreen,
        [routes.HOUSEHOLD_METRICS_SCREEN]: HouseHoldMetricsScreen,

        // ALPHA OCCUPANTS
        [routes.MANAGE_ALPHA_OCCUPANTS_SCREEN]: ManageAlphaOccupantsScreen,
        [routes.ADD_ALPHA_OCCUPANT_SCREEN]: AddAlphaOccupantScreen,
        [routes.ADD_ALPHA_OCCUPANT_FORM_SCREEN]: AddAlphaOccupantFormScreen,
        [routes.ADD_ALPHA_OCCUPANT_SUCCESS_SCREEN]:
          AddAlphaOccupantSuccessScreen,

        // DEPENDENTS
        [routes.MANAGE_DEPENDENTS_SCREEN]: ManageDependentsScreen,
        [routes.ADD_DEPENDENT_SCREEN]: AddDependentScreen,
        [routes.ADD_DEPENDENT_FORM_SCREEN]: AddDependentFormScreen,
        [routes.ADD_DEPENDENT_SUCCESS_SCREEN]: AddDependentSuccessScreen,
        [routes.DEPENDENT_DETAILS_NAVIGATOR]: DependentTopTabsNavigator,

        // MANAGE HOUSEHOLD STAFF SCREEN
        [routes.MANAGE_HOUSEHOLD_STAFF_NAVIGATOR]:
          ManageHouseholdStaffNavigator,
        [routes.ADD_HOUSEHOLD_STAFF_SCREEN]: AddHouseholdStaffScreen,
        [routes.ADD_HOUSEHOLD_STAFF_FORM_SCREEN]: AddHouseholdStaffFormScreen,
        [routes.ADD_HOUSEHOLD_STAFF_SUCCESS_SCREEN]:
          AddHouseholdStaffSuccessScreen,
        [routes.HOUSEHOLD_STAFF_DETAILS_NAVIGATOR]:
          HouseholdStaffDetailsNavigator,

        // MANAGE SITE WORKER SCREEN
        [routes.MANAGE_SITE_WORKERS_NAVIGATOR]: ManageSiteWorkersNavigator,
        [routes.ADD_SITE_WORKER_SCREEN]: AddSiteWorkerScreen,
        [routes.ADD_SITE_WORKER_FORM_SCREEN]: AddSiteWorkerFormScreen,
        [routes.ADD_SITE_WORKER_SUCCESS_SCREEN]: AddSiteWorkerSuccessScreen,
        [routes.SITE_WORKER_DETAILS_NAVIGATOR]: SiteWorkerDetailNavigator,

        [routes.MANAGE_ACCESS_CARDS_SCREEN]: ManageAccessCardsScreen,
        [routes.MANAGE_RFIDS_SCREEN]: ManageRFIDsScreen,
        [routes.ACCESS_CARD_HISTORY_SCREEN]: AccessCardHistoryScreen,
        [routes.RFID_HISTORY_SCREEN]: RFIDHistoryScreen,

        [routes.MY_QR_CODE_SCREEN]: MyQRCodeScreen,
        [routes.PROPERTY_DETAILS_SCREEN]: PropertyDetailScreen,
        [routes.PROPERTY_DETAILS_OCCUPANT_HISTORY_SCREEN]: OccupantHistoryPage,
        [routes.PROPERTY_DETAILS_CONFIGURE_ACCESS_SCREEN]:
          PropertyDetailsConfigureAccessScreen,
        [routes.HOUSEHOLD_ACTIVITY_PAGE]: HouseholdActivityPage,
        [routes.HOUSEHOLD_ACTIVITY_DETAILS_PAGE]: HouseHoldActivityDetailsPage,
        [routes.ACCOUNT_SETTINGS_SCREEN]: AccountSettingsScreen,
        [routes.CHANGE_PASSWORD_SCREEN]: ChangePasswordScreen,
        [routes.CHANGE_WALLET_PIN_SCREEN]: ChangeWalletPinScreen,
        [routes.DELETE_ACCOUNT_SCREEN]: DeleteAccountScreen,
        [routes.RESET_WALLET_PIN_SCREEN]: ResetWalletPinScreen,
        [routes.HELP_CENTER_SCREEN]: HelpCenterScreen,
        [routes.EMERGENCY_SERVICES_SCREEN]: EmergencyServicesScreen,
        [routes.EMERGENCY_SERVICE_DETAILS_SCREEN]:
          EmergencyServiceDetailsScreen,
        [routes.ESTATE_RULES_SCREEN]: EstateRulesScreen,
        [routes.ESTATE_RULE_DETAILS_SCREEN]: EstateRuleDetailsScreen,

        // REUSABLE SCREENS
        [routes.SCAN_BAR_CODE_SCREEN]: ScanBarCodeScreen,
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

interface ScreenWithId {
  id: number;
}

export interface ScreenWithName {
  name: string;
}

type ScreenWithIdAndName = ScreenWithId & ScreenWithName;

// interface ScreenWithIdAndName {
//   id: number;
//   name: string;
// }
