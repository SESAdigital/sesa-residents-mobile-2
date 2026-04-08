import { ScrollView, StyleSheet } from 'react-native';

import { mapPropertyCategoryTypeToShortCharacter } from '@src/api/constants/data';
import AppScreen from '@src/components/AppScreen';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import ActionSectionItem, {
  ActionSectionItemData,
} from '@src/components/common/ActionSectionItem';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import {
  MaterialSymbolsLightBadgeOutlineRounded,
  MaterialSymbolsLightDeployedCodeAccountOutlineRounded,
  MaterialSymbolsLightEngineeringOutlineRounded,
  MaterialSymbolsLightGroupOutline,
  MaterialSymbolsLightHomeOutlineRounded,
  MaterialSymbolsLightHomePinOutlineRounded,
  MaterialSymbolsLightStickyNote2OutlineRounded,
  MaterialSymbolsLightSupervisorAccountOutline,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import {
  useGetFees,
  useGetHouseholdMetrics,
  useGetWalletBalance,
} from '@src/hooks/useGetRequests';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { useAppStateStore } from '@src/stores/appState.store';
import { useAuthStore } from '@src/stores/auth.store';
import Size from '@src/utils/useResponsiveSize';
import appConfig from '@src/utils/appConfig';

const HouseHoldMetricsScreen = (): React.JSX.Element => {
  const { selectedHousehold } = useAppStateStore();
  const id = selectedHousehold?.id || 0;

  useGetFees();
  useGetWalletBalance();
  const { selectedProperty } = useAuthStore();

  const {
    value: { data, isLoading },
    customRefetch,
  } = useGetHouseholdMetrics();

  const name = data?.name || '';

  const navigation = useAppNavigator();

  function handleLoading(val: string) {
    if (isLoading) {
      return <AppSkeletonLoader width={Size.calcWidth(50)} />;
    } else {
      return val;
    }
  }

  const sections: ActionSectionItemData[] = [
    {
      title: 'Property Details',
      actions: [
        {
          title: 'Property Type',
          Icon: MaterialSymbolsLightHomeOutlineRounded,
          endText: handleLoading(
            `${
              selectedProperty?.name || ''
            } (${mapPropertyCategoryTypeToShortCharacter(
              selectedProperty?.propertyCategory || 1,
            )})`,
          ),
        },
        {
          title: 'Property Address',
          Icon: MaterialSymbolsLightHomePinOutlineRounded,
          endText: handleLoading(selectedProperty?.propertyAddress || ''),
        },
      ],
    },
    {
      title: 'People',
      actions: [
        {
          title: 'Manage alpha occupants',
          onPress: () =>
            navigation.navigate(routes.MANAGE_ALPHA_OCCUPANTS_SCREEN, {
              id,
              name,
            }),
          Icon: MaterialSymbolsLightGroupOutline,
          endText: handleLoading(
            `${data?.totalAlphaCount?.toLocaleString() || ''} added of ${
              appConfig.APP_MAX_ALPHA_OCCUPANTS
            }`,
          ),
        },
        {
          title: 'Manage dependents',
          onPress: () =>
            navigation.navigate(routes.MANAGE_DEPENDENTS_SCREEN, { id, name }),
          Icon: MaterialSymbolsLightSupervisorAccountOutline,
          endText: handleLoading(
            `${data?.totalDependentCount?.toLocaleString() || ''} added of ${
              data?.dependentMaximumCount?.toLocaleString() || ''
            }`,
          ),
        },

        {
          title: 'Manage household staff',
          onPress: () =>
            navigation.navigate(routes.MANAGE_HOUSEHOLD_STAFF_NAVIGATOR, {
              name,
            }),
          Icon: MaterialSymbolsLightDeployedCodeAccountOutlineRounded,
          endText: handleLoading(
            `${data?.totalHouseholdStaffCount?.toLocaleString() || ''}`,
          ),
        },
        {
          title: 'Manage site workers',
          onPress: () =>
            navigation.navigate(routes.MANAGE_SITE_WORKERS_NAVIGATOR, {
              name,
            }),
          Icon: MaterialSymbolsLightEngineeringOutlineRounded,
          endText: handleLoading(
            `${data?.totalSiteWorkerCount?.toLocaleString() || ''}`,
          ),
        },
      ],
    },
    {
      title: 'Security',
      actions: [
        {
          title: 'Manage RFIDs',
          onPress: () =>
            navigation.navigate(routes.MANAGE_RFIDS_SCREEN, { id, name }),
          Icon: MaterialSymbolsLightStickyNote2OutlineRounded,
          endText: handleLoading(
            `${data?.totalRFIDCount?.toLocaleString() || ''}`,
          ),
        },
        {
          title: 'Manage access cards',
          onPress: () =>
            navigation.navigate(routes.MANAGE_ACCESS_CARDS_SCREEN, {
              id,
              name,
            }),
          Icon: MaterialSymbolsLightBadgeOutlineRounded,
          endText: handleLoading(
            `${data?.totalAccessCardCount?.toLocaleString() || ''}`,
          ),
        },
      ],
    },
  ];

  return (
    <AppScreen showDownInset>
      <AppScreenHeader>
        <AppText style={styles.headerTitle}>Manage household</AppText>
        {isLoading ? (
          <AppSkeletonLoader
            style={styles.headerSubtitleLoading}
            width={Size.calcWidth(100)}
          />
        ) : (
          <AppText style={styles.headerSubtitle}>{name}</AppText>
        )}
      </AppScreenHeader>
      <ScrollView
        refreshControl={
          <AppRefreshControl refreshing={isLoading} onRefresh={customRefetch} />
        }
      >
        <ActionSectionItem disabled={isLoading} sections={sections} />
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(16),
    color: colors.BLACK_200,
    textAlign: 'center',
  },

  headerSubtitle: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
    textAlign: 'center',
  },

  headerSubtitleLoading: {
    marginHorizontal: 'auto',
    paddingTop: Size.calcHeight(6),
  },
});

export default HouseHoldMetricsScreen;
