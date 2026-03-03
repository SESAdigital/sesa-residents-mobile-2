import { StyleSheet, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { SvgProps } from 'react-native-svg';

import {
  UserAccountStatusData,
  UserAccountStatusType,
} from '@src/api/constants/default';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import {
  MaterialSymbolsCheckRounded,
  MaterialSymbolsCloseRounded,
  MaterialSymbolsHorizontalRuleRounded,
  MaterialSymbolsLightCallOutline,
  MaterialSymbolsLightEmergencyHomeOutlineRounded,
  MaterialSymbolsLightNotificationsOutline,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import {
  useGetNotificationPreference,
  useGetUserDetails,
} from '@src/hooks/useGetRequests';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { dayJSFormatter } from '@src/utils/time';
import Size from '@src/utils/useResponsiveSize';
import ProfileDetailsRow from '../../components/ProfileDetailsRow';
import ActionItem from './components/ActionItem';

const ManageProfileScreen = (): React.JSX.Element => {
  const { details } = useGetUserDetails();
  const { StatusIcon, color } = getStatusDetails(details?.status);
  const navigation = useAppNavigator();
  useGetNotificationPreference();

  const actions = [
    {
      title: 'Update phone number',
      onPress: () => navigation.navigate(routes.UPDATE_PHONE_NUMBER_SCREEN),
      Icon: MaterialSymbolsLightCallOutline,
    },
    {
      title: 'My emergency contacts',
      onPress: () => navigation.navigate(routes.EMERGENCY_CONTACTS_LIST_SCREEN),
      Icon: MaterialSymbolsLightEmergencyHomeOutlineRounded,
    },
    {
      title: 'Notification preferences',
      onPress: () =>
        navigation.navigate(routes.NOTIFICATION_PREFERENCES_SCREEN),
      Icon: MaterialSymbolsLightNotificationsOutline,
    },
  ];

  return (
    <AppScreen showDownInset style={styles.container}>
      <AppScreenHeader title="Manage Profile" />
      <ProfileDetailsRow containerStyle={styles.profileContainer} />

      <View style={styles.onboardContainer}>
        <AppText style={{ fontSize: Size.calcAverage(12) }}>
          Onboarded{' '}
          {dayJSFormatter({
            value: details?.dateOnboarded || '',
            format: 'MMMM D, YYYY',
          })}
        </AppText>

        <View style={styles.row}>
          <StatusIcon
            color={color}
            height={Size.calcAverage(14)}
            width={Size.calcAverage(14)}
          />
          <AppText style={[styles.statusText, { color }]}>
            {details?.statusText}
          </AppText>
        </View>
      </View>
      <ActionItem data={actions} />

      <AppText style={styles.footer}>
        Version: {DeviceInfo?.getVersion?.()}
      </AppText>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },

  footer: {
    marginTop: 'auto',
    padding: Size.calcAverage(21),
    textAlign: 'center',
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_200,
  },

  profileContainer: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(16),
  },

  onboardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(12),
    borderBottomWidth: Size.calcAverage(1),
    borderTopWidth: Size.calcAverage(1),
    borderColor: colors.LIGHT_GRAY_200,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusText: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
    fontFamily: fonts.INTER_500,
    paddingLeft: Size.calcWidth(4),
  },
});

export default ManageProfileScreen;

interface GetStatusDetails {
  color: string;
  StatusIcon: (props: SvgProps) => React.JSX.Element;
}

function getStatusDetails(
  val: UserAccountStatusType | undefined,
): GetStatusDetails {
  if (val === UserAccountStatusData.Active)
    return { color: colors.GREEN_100, StatusIcon: MaterialSymbolsCheckRounded };

  if (val === UserAccountStatusData.InActive)
    return { color: colors.RED_100, StatusIcon: MaterialSymbolsCloseRounded };

  return {
    color: colors.GRAY_100,
    StatusIcon: MaterialSymbolsHorizontalRuleRounded,
  };
}
