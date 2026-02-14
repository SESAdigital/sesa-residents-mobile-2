import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import {
  UserAccountStatusData,
  UserAccountStatusType,
} from '@src/api/constants/default';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import {
  MaterialSymbolsCloseRounded,
  MaterialSymbolsHorizontalRuleRounded,
  MaterialSymbolsCheckRounded,
  MaterialSymbolsLightNotificationsOutline,
  MaterialSymbolsLightCallOutline,
  MaterialSymbolsLightEmergencyHomeOutlineRounded,
  MaterialSymbolsChevronRightRounded,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useGetUserDetails } from '@src/hooks/useGetRequests';
import { dayJSFormatter } from '@src/utils/time';
import Size from '@src/utils/useResponsiveSize';
import ProfileDetailsRow from '../../components/ProfileDetailsRow';

const ManageProfileScreen = (): React.JSX.Element => {
  const { details } = useGetUserDetails();
  const { Icon, color } = getStatusDetails(details?.status);

  const actions = [
    {
      title: 'Update phone number',
      onPress: () => {},
      Icon: MaterialSymbolsLightCallOutline,
    },
    {
      title: 'My emergency contacts',
      onPress: () => {},
      Icon: MaterialSymbolsLightEmergencyHomeOutlineRounded,
    },
    {
      title: 'Notification preferences',
      onPress: () => {},
      Icon: MaterialSymbolsLightNotificationsOutline,
    },
  ];

  return (
    <AppScreen style={styles.container}>
      <AppScreenHeader title="Manage Profile" />
      <ProfileDetailsRow containerStyle={styles.profileContainer} />

      <View style={styles.onboardContainer}>
        <AppText style={{ fontSize: Size.calcAverage(12) }}>
          Onboarded{' '}
          {dayJSFormatter(details?.dateOnboarded || '', 'MMMM D, YYYY')}
        </AppText>

        <View style={styles.row}>
          <Icon
            color={color}
            height={Size.calcAverage(14)}
            width={Size.calcAverage(14)}
          />
          <AppText style={[styles.statusText, { color }]}>
            {details?.statusText}
          </AppText>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        {actions.map(({ Icon, title, onPress }, index) => (
          <TouchableOpacity
            style={styles.actionRow}
            onPress={onPress}
            key={index}
          >
            <Icon
              color={colors.BLACK_100}
              height={Size.calcAverage(24)}
              width={Size.calcAverage(24)}
            />
            <AppText style={styles.actionText}>{title}</AppText>
            <MaterialSymbolsChevronRightRounded
              color={colors.BLACK_100}
              height={Size.calcAverage(24)}
              width={Size.calcAverage(24)}
            />
          </TouchableOpacity>
        ))}
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Size.calcHeight(11),
    borderColor: colors.LIGHT_GRAY_200,
  },

  actionText: {
    flex: 1,
    paddingHorizontal: Size.calcWidth(20),
    fontFamily: fonts.INTER_500,
  },

  actionsContainer: {
    rowGap: Size.calcHeight(6),
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(24),
  },

  container: {
    paddingHorizontal: 0,
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
  Icon: (props: SvgProps) => React.JSX.Element;
}

function getStatusDetails(
  val: UserAccountStatusType | undefined,
): GetStatusDetails {
  if (val == UserAccountStatusData.Active)
    return { color: colors.GREEN_100, Icon: MaterialSymbolsCheckRounded };

  if (val == UserAccountStatusData.InActive)
    return { color: colors.RED_100, Icon: MaterialSymbolsCloseRounded };

  return {
    color: colors.GRAY_100,
    Icon: MaterialSymbolsHorizontalRuleRounded,
  };
}
