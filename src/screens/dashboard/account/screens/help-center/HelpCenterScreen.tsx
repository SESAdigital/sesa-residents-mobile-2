import { ScrollView, View } from 'react-native';

import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import {
  MaterialSymbolsLightCallOutline,
  MaterialSymbolsLightContactSupportOutline,
  MaterialSymbolsLightEmergencyHomeOutlineRounded,
  MaterialSymbolsLightFormatListBulletedRounded,
  MaterialSymbolsLightGavelRounded,
  MaterialSymbolsLightShieldPersonOutlineRounded,
  RiExternalLinkLine,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import { openURL } from '@src/utils';
import appConfig from '@src/utils/appConfig';
import { appToast } from '@src/utils/appToast';
import Size from '@src/utils/useResponsiveSize';
import ActionItem, {
  ActionItemData,
} from '../../../../../components/common/ActionItem';
import routes from '@src/navigation/routes';
import AppVersionText from '@src/components/custom/AppVersionText';

interface Section {
  title: string;
  actions: ActionItemData[];
}

const HelpCenterScreen = (): React.JSX.Element => {
  const navigation = useAppNavigator();

  const sections: Section[] = [
    {
      title: 'Direct Contact',
      actions: [
        {
          title: 'Contact estate manager(s)',
          onPress: () => appToast.Info('Coming soon'),
          Icon: MaterialSymbolsLightCallOutline,
        },
        {
          title: 'Estate security guards',
          onPress: () => appToast.Info('Coming soon'),
          Icon: MaterialSymbolsLightShieldPersonOutlineRounded,
        },
        {
          title: 'Emergency services',
          onPress: () => navigation.navigate(routes.EMERGENCY_SERVICES_SCREEN),
          Icon: MaterialSymbolsLightEmergencyHomeOutlineRounded,
        },
      ],
    },
    {
      title: 'Resources',
      actions: [
        {
          title: 'My estate rules',
          onPress: () => navigation.navigate(routes.ESTATE_RULES_SCREEN),
          Icon: MaterialSymbolsLightFormatListBulletedRounded,
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
    {
      title: 'Legal',
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
      ],
    },
  ];

  return (
    <AppScreen showDownInset>
      <AppScreenHeader title="Help Center" />

      <ScrollView>
        <View
          style={{
            rowGap: Size.calcHeight(16),
            paddingVertical: Size.calcHeight(20),
          }}
        >
          {sections?.map((section, index) => (
            <View key={index}>
              <AppText
                style={{
                  paddingVertical: Size.calcHeight(4),
                  paddingHorizontal: Size.calcWidth(21),
                  color: colors.GRAY_100,
                  fontSize: Size.calcAverage(12),
                }}
              >
                {section?.title}
              </AppText>
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

export default HelpCenterScreen;
