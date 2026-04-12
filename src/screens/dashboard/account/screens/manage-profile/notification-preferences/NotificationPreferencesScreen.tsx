import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SvgProps } from 'react-native-svg';

import {
  GetNotificationPreference,
  patchNotificationPreference,
  PatchNotificationPreferenceReq,
} from '@src/api/auth.api';
import queryKeys from '@src/api/constants/queryKeys';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import AppSwitch from '@src/components/forms/AppSwitch';
import {
  MaterialSymbolsLightBadgeOutlineRounded,
  MaterialSymbolsLightEngineeringOutlineRounded,
  MaterialSymbolsLightPersonAddOutlineRounded,
  MaterialSymbolsLightStickyNote2OutlineRounded,
  MaterialSymbolsLightSupervisorAccountOutline,
  StreamlineInterfaceShareMegaPhone1BullhornLoudMegaphoneShareSpeakerTransmit,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import {
  useGetNotificationPreference,
  useGetPropertyDetailsPrivileges,
} from '@src/hooks/useGetRequests';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import { ScrollView, StyleSheet, View } from 'react-native';
import { checkPrivilegeEligibility } from '@src/utils';

type ValueTitle =
  | 'All visitors’ access activity'
  | 'Site workers’ access activity'
  | 'Occupants’ access activity'
  | 'Vehicle tag usage activity'
  | 'Access card usage activity'
  | 'Announcement activity';

interface Value {
  Icon: (props: SvgProps) => React.JSX.Element;
  title: ValueTitle;
  description: string;
  isDisabled: boolean;
  isChecked: boolean;
  size: number;
}

const NotificationPreferencesScreen = (): React.JSX.Element => {
  const queryClient = useQueryClient();
  const {
    data: notificationPreference,
    isLoading: isLoadingNotificationPreference,
  } = useGetNotificationPreference();
  const patchNotificationPreferenceAPI = useMutation({
    mutationFn: patchNotificationPreference,
    onMutate: async newPreferences => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: [queryKeys.GET_NOTIFICATION_PREFERENCES],
      });

      // Snapshot the previous value
      const previousPreferences = queryClient.getQueryData([
        queryKeys.GET_NOTIFICATION_PREFERENCES,
      ]);

      // Optimistically update to the new value
      // We merge with existing data to ensure we don't lose other fields
      queryClient.setQueryData(
        [queryKeys.GET_NOTIFICATION_PREFERENCES],
        (old: GetNotificationPreference) => ({
          ...old,
          ...newPreferences,
        }),
      );

      // Return a context object with the snapshotted value
      return { previousPreferences };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (_err, _newPreferences, context) => {
      queryClient.setQueryData(
        [queryKeys.GET_NOTIFICATION_PREFERENCES],
        context?.previousPreferences,
      );
    },
  });

  const {
    value: { data: privileges },
  } = useGetPropertyDetailsPrivileges();

  const refetch = () => {
    queryClient.resetQueries({
      queryKey: [queryKeys.GET_NOTIFICATION_PREFERENCES],
    });
  };

  const values: Value[] = [
    {
      Icon: MaterialSymbolsLightPersonAddOutlineRounded,
      title: 'All visitors’ access activity',
      description: "Receive updates about all visitors' access activity",
      isDisabled: !checkPrivilegeEligibility([
        privileges?.isAlpha,
        privileges?.isLandlordNonResident,
        privileges?.isDependent,
      ]),
      isChecked: !!notificationPreference?.allowVisitorAccessActivity,
      size: 26,
    },
    {
      Icon: MaterialSymbolsLightEngineeringOutlineRounded,
      title: 'Site workers’ access activity',
      description: "Receive updates on site workers' access activity.",
      isDisabled: !checkPrivilegeEligibility([privileges?.isLandlordDeveloper]),
      isChecked: !!notificationPreference?.allowSiteWorkerAccessActivity,
      size: 26,
    },
    {
      Icon: MaterialSymbolsLightSupervisorAccountOutline,
      title: 'Occupants’ access activity',
      description: "Receive updates about occupants' access activity.",
      isChecked: !!notificationPreference?.allowOccupantAccessActivity,
      isDisabled: !checkPrivilegeEligibility([privileges?.isAlpha]),
      size: 26,
    },
    {
      Icon: MaterialSymbolsLightStickyNote2OutlineRounded,
      title: 'Vehicle tag usage activity',
      description: 'Receive updates about vehicle tag usage activity.',
      isChecked: !!notificationPreference?.allowRFIDUsageActivity,
      isDisabled: !checkPrivilegeEligibility([
        privileges?.isAlpha,
        privileges?.isLandlordResident,
        privileges?.isLandlordNonResident,
      ]),
      size: 24,
    },
    {
      Icon: MaterialSymbolsLightBadgeOutlineRounded,
      title: 'Access card usage activity',
      description: 'Receive updates about access card usage activity.',
      isChecked: !!notificationPreference?.allowAccessCardUsageActivity,
      isDisabled: !checkPrivilegeEligibility([
        privileges?.isAlpha,
        privileges?.isLandlordResident,
        privileges?.isLandlordNonResident,
      ]),
      size: 24,
    },
    {
      Icon: StreamlineInterfaceShareMegaPhone1BullhornLoudMegaphoneShareSpeakerTransmit,
      title: 'Announcement activity',
      description: 'Receive updates about announcement activity.',
      isChecked: !!notificationPreference?.allowAnnouncementActivity,
      isDisabled: false,
      size: 20,
    },
  ];

  const onToggle = async (type: ValueTitle, value: boolean) => {
    const payload: PatchNotificationPreferenceReq = {
      allowVisitorAccessActivity:
        !!notificationPreference?.allowVisitorAccessActivity,

      allowSiteWorkerAccessActivity:
        !!notificationPreference?.allowSiteWorkerAccessActivity,

      allowOccupantAccessActivity:
        !!notificationPreference?.allowOccupantAccessActivity,

      allowRFIDUsageActivity: !!notificationPreference?.allowRFIDUsageActivity,

      allowAccessCardUsageActivity:
        !!notificationPreference?.allowAccessCardUsageActivity,

      allowAnnouncementActivity:
        !!notificationPreference?.allowAnnouncementActivity,
    };

    if (type === 'All visitors’ access activity') {
      payload.allowVisitorAccessActivity = value;
    } else if (type === 'Site workers’ access activity') {
      payload.allowSiteWorkerAccessActivity = value;
    } else if (type === 'Occupants’ access activity') {
      payload.allowOccupantAccessActivity = value;
    } else if (type === 'Vehicle tag usage activity') {
      payload.allowRFIDUsageActivity = value;
    } else if (type === 'Access card usage activity') {
      payload.allowAccessCardUsageActivity = value;
    } else if (type === 'Announcement activity') {
      payload.allowAnnouncementActivity = value;
    }

    const response = await patchNotificationPreferenceAPI.mutateAsync(payload);
    if (response?.ok) {
      appToast.Success(
        response?.data?.message || 'Preferences updated successfully',
      );
    } else {
      handleToastApiError(response);
    }
  };

  const isLoading =
    isLoadingNotificationPreference ||
    patchNotificationPreferenceAPI?.isPending;

  return (
    <AppScreen showDownInset>
      <AppScreenHeader title="Notification Preferences" />
      <AppText style={styles.title}>Property Access</AppText>

      <ScrollView
        refreshControl={
          <AppRefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        {values.map((props, index) => {
          const { Icon, description, isDisabled, title, isChecked } = props;
          if (isDisabled) return null;
          return (
            <View style={styles.rowItem} key={index}>
              <Icon
                color={colors.BLACK_200}
                height={Size.calcAverage(props.size)}
                width={Size.calcAverage(props.size)}
              />
              <View style={styles.rowContent}>
                <AppText style={{ fontFamily: fonts.INTER_500 }}>
                  {title}
                </AppText>
                <AppText style={styles.rowDescription}>{description}</AppText>
              </View>

              <AppSwitch
                isEnabled={isChecked}
                isLoading={isLoading}
                onValueChange={val => onToggle(title, val)}
              />
            </View>
          );
        })}
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  rowContent: {
    flex: 1,
    flexShrink: 1,
    rowGap: Size.calcHeight(4),
    paddingHorizontal: Size.calcWidth(20),
  },

  rowDescription: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
    maxWidth: Size.calcWidth(240),
  },

  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(10),
  },

  title: {
    paddingTop: Size.calcHeight(24),
    paddingBottom: Size.calcHeight(4),
    paddingHorizontal: Size.calcWidth(21),
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },
});

export default NotificationPreferencesScreen;
