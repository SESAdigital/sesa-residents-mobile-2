import { ScrollView, StyleSheet, View } from 'react-native';

import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
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
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { openURL } from '@src/utils';
import appConfig from '@src/utils/appConfig';
import { appToast } from '@src/utils/appToast';
import Size from '@src/utils/useResponsiveSize';
import ActionItem, {
  ActionItemData,
} from '../manage-profile/components/ActionItem';

interface Section {
  title: string;
  actions: ActionItemData[];
}

const AccountSettingsScreen = (): React.JSX.Element => {
  const navigation = useAppNavigator();

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
          onPress: () => {},
          Icon: MaterialSymbolsLightScreenshotFrame2Rounded,
          rightIcon: <AppSwitch isEnabled onValueChange={() => {}} />,
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
          onPress: () => {},
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
          onPress: () => appToast.Info('Coming soon'),
          Icon: MaterialSymbolsLightDeleteOutlineRounded,
        },
        {
          title: 'Sign out',
          onPress: () => appToast.Info('Coming soon'),
          Icon: MaterialSymbolsLightLogoutRounded,
        },
      ],
    },
  ];
  return (
    <AppScreen showDownInset>
      <AppScreenHeader title="Account Settings" />

      <ScrollView>
        <View style={styles.container}>
          {sections?.map((section, index) => (
            <View key={index}>
              <AppText style={styles.sectionTitle}>{section?.title}</AppText>
              <ActionItem
                containerStyle={{ paddingVertical: 0 }}
                data={section?.actions}
              />
            </View>
          ))}
        </View>

        <View style={styles.container}>
          {bottomSection?.map((section, index) => (
            <View key={index}>
              <AppText style={styles.sectionTitle}>{section?.title}</AppText>
              <ActionItem
                containerStyle={{ paddingVertical: 0 }}
                data={section?.actions}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <AppVersionText />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: Size.calcHeight(16),
    paddingVertical: Size.calcHeight(20),
  },

  sectionTitle: {
    paddingVertical: Size.calcHeight(4),
    paddingHorizontal: Size.calcWidth(21),
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
  },
});

export default AccountSettingsScreen;
