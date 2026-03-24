import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ScrollView, StyleSheet } from 'react-native';

import queryKeys from '@src/api/constants/queryKeys';
import { getHouseholdPropertyMetrics } from '@src/api/household.api';
import AppScreen from '@src/components/AppScreen';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppSwitch from '@src/components/forms/AppSwitch';
import {
  MaterialSymbolsLightBadgeOutlineRounded,
  MaterialSymbolsLightContactSupportOutline,
  MaterialSymbolsLightEngineeringOutlineRounded,
  MaterialSymbolsLightGavelRounded,
  MaterialSymbolsLightGroupOutline,
  MaterialSymbolsLightLockOutline,
  MaterialSymbolsLightPasswordRounded,
  MaterialSymbolsLightScreenshotFrame2Rounded,
  RiExternalLinkLine,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { AppScreenProps, useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { openURL } from '@src/utils';
import appConfig from '@src/utils/appConfig';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import ActionSectionItem, {
  ActionSectionItemData,
} from '../manage-profile/components/ActionSectionItem';
import { DependentIcon, RFIDIcon } from '@src/components/icons/custom';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';

type Props = AppScreenProps<'HOUSEHOLD_METRICS_SCREEN'>;

const HouseHoldMetricsScreen = ({ route }: Props): React.JSX.Element => {
  const id = route?.params?.id;
  const queryKey = [
    queryKeys.GET_HOUSEHOLDS,
    'getHouseholdPropertyMetrics',
    id,
  ];

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getHouseholdPropertyMetrics(id);
      if (response.ok) {
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
  });
  const navigation = useAppNavigator();
  const queryClient = useQueryClient();
  const customRefetch = () => queryClient.resetQueries({ queryKey });

  function handleLoading(val: string) {
    if (isLoading) {
      return <AppSkeletonLoader width={Size.calcWidth(50)} />;
    } else {
      return val;
    }
  }

  const sections: ActionSectionItemData[] = [
    {
      title: 'People',
      actions: [
        {
          title: 'Manage alpha occupants',
          onPress: () => console.log(routes.CHANGE_PASSWORD_SCREEN),
          Icon: MaterialSymbolsLightGroupOutline,
          endText: handleLoading(
            `${data?.totalAlphaCount?.toLocaleString() || ''} added of 2`,
          ),
        },
        {
          title: 'Manage dependents',
          onPress: () => console.log(routes.CHANGE_WALLET_PIN_SCREEN),
          Icon: DependentIcon,
          endText: handleLoading(
            `${data?.totalDependentCount?.toLocaleString() || ''} added of ${
              data?.dependentMaximumCount?.toLocaleString() || ''
            }`,
          ),
        },
        {
          title: 'Manage household staff',
          onPress: () => console.log(routes.CHANGE_WALLET_PIN_SCREEN),
          Icon: DependentIcon, // TODO: change icon
          endText: handleLoading(
            `${data?.totalHouseholdStaffCount?.toLocaleString() || ''}`,
          ),
        },
        {
          title: 'Manage site workers',
          onPress: () => console.log(routes.CHANGE_WALLET_PIN_SCREEN),
          Icon: MaterialSymbolsLightEngineeringOutlineRounded,
          endText: handleLoading(
            `${data?.totalRFIDCount?.toLocaleString() || ''}`,
          ),
        },
      ],
    },
    {
      title: 'Security',
      actions: [
        {
          title: 'Manage RFIDs',
          onPress: () => console.log(routes.CHANGE_WALLET_PIN_SCREEN),
          Icon: RFIDIcon,
          endText: handleLoading(
            `${data?.totalRFIDCount?.toLocaleString() || ''}`,
          ),
        },
        {
          title: 'Manage access cards',
          onPress: () => console.log(routes.CHANGE_WALLET_PIN_SCREEN),
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
          <AppText style={styles.headerSubtitle}>{data?.name}</AppText>
        )}
      </AppScreenHeader>
      <ScrollView
        refreshControl={
          <AppRefreshControl refreshing={isLoading} onRefresh={customRefetch} />
        }
      >
        <ActionSectionItem sections={sections} />
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
