import { ScrollView } from 'react-native';

import { authenticateWithOptions } from '@sbaiahmed1/react-native-biometrics';
import AppScreen from '@src/components/AppScreen';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppVersionText from '@src/components/custom/AppVersionText';
import AppSwitch from '@src/components/forms/AppSwitch';
import {
  MaterialSymbolsLightContactSupportOutline,
  MaterialSymbolsLightDeleteOutlineRounded,
  MaterialSymbolsLightGavelRounded,
  MaterialSymbolsLightLockOutline,
  MaterialSymbolsLightLogoutRounded,
  MaterialSymbolsLightPasswordRounded,
  MaterialSymbolsLightScreenshotFrame2Rounded,
  RiExternalLinkLine,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import { useLogout } from '@src/hooks';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { useAuthStore } from '@src/stores/auth.store';
import { openURL } from '@src/utils';
import appConfig from '@src/utils/appConfig';
import Size from '@src/utils/useResponsiveSize';
import { ActionItemData } from '@src/components/common/ActionItem';
import ActionSectionItem from '@src/components/common/ActionSectionItem';

interface Section {
  title: string;
  actions: ActionItemData[];
}

const AccountSettingsScreen = (): React.JSX.Element => {
  const navigation = useAppNavigator();
  const { onLogoutClick } = useLogout();
  const { setIsBiometricEnabled, isBiometricEnabled } = useAuthStore();

  const handleToggleBiometric = async () => {
    try {
      const result = await authenticateWithOptions({
        title: 'Verify your identity',
        subtitle: 'Use biometric or device passcode',
        allowDeviceCredentials: true,
        disableDeviceFallback: false,
        fallbackLabel: 'Use Passcode',
        // description: 'Use your biometric to access your account securely',
        cancelLabel: 'No, Cancel',
      });

      if (result?.success) {
        setIsBiometricEnabled(!isBiometricEnabled);
      } else {
        // appToast.Info('Authentication failed: ' + result?.error);
      }
    } catch (error) {
      console.error(error);
      // appToast.Info('Authentication failed: ' + error);
    }
  };

  const sections: Section[] = [
    {
      title: 'Security',
      actions: [
        {
          title: 'Change Password',
          onPress: () => navigation.navigate(routes.CHANGE_PASSWORD_SCREEN),
          Icon: MaterialSymbolsLightLockOutline,
        },
        {
          title: 'Change Wallet PIN',
          onPress: () => navigation.navigate(routes.CHANGE_WALLET_PIN_SCREEN),
          Icon: MaterialSymbolsLightPasswordRounded,
        },
        {
          title: 'Enable face ID or biometric login',
          onPress: handleToggleBiometric,
          Icon: MaterialSymbolsLightScreenshotFrame2Rounded,
          rightIcon: (
            <AppSwitch
              isEnabled={isBiometricEnabled}
              onValueChange={handleToggleBiometric}
            />
          ),
        },
      ],
    },
    {
      title: 'Legal & Support',
      actions: [
        {
          title: 'Privacy policy',
          onPress: () => openURL(`${appConfig.APP_WEBSITE_URL}/privacy-policy`),
          Icon: MaterialSymbolsLightGavelRounded,
          rightIcon: (
            <RiExternalLinkLine
              height={Size.calcAverage(15)}
              color={colors.BLUE_600}
              width={Size.calcAverage(15)}
            />
          ),
        },
        {
          title: 'Frequently asked questions',
          onPress: () => openURL(`${appConfig.APP_WEBSITE_URL}/#faq`),
          Icon: MaterialSymbolsLightContactSupportOutline,
          rightIcon: (
            <RiExternalLinkLine
              height={Size.calcAverage(15)}
              color={colors.BLUE_600}
              width={Size.calcAverage(15)}
            />
          ),
        },
      ],
    },
  ];
  const bottomSection: Section[] = [
    {
      title: 'Account',
      actions: [
        {
          title: 'Delete account',
          description:
            'Delete your SESA account. Access to your information will be lost.',
          onPress: () => navigation.navigate(routes.DELETE_ACCOUNT_SCREEN),
          Icon: MaterialSymbolsLightDeleteOutlineRounded,
        },
        {
          title: 'Sign out',
          onPress: onLogoutClick,
          Icon: MaterialSymbolsLightLogoutRounded,
        },
      ],
    },
  ];
  return (
    <AppScreen showDownInset>
      <AppScreenHeader title="Account Settings" />

      <ScrollView>
        <ActionSectionItem sections={sections} />

        <ActionSectionItem sections={bottomSection} />
      </ScrollView>
      <AppVersionText />
    </AppScreen>
  );
};

export default AccountSettingsScreen;
