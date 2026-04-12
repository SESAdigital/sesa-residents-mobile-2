import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ScrollView, StyleSheet } from 'react-native';

import queryKeys from '@src/api/constants/queryKeys';
import { getHouseholdSiteworkerSchedule } from '@src/api/household.api';
import AppDetailCard, {
  AppDetailCardDetailItem,
} from '@src/components/common/AppDetailCard';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import { useAppStateStore } from '@src/stores/appState.store';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';

const SiteWorkerScheduleScreen = (): React.JSX.Element => {
  const { selectedSiteWorker } = useAppStateStore();

  const id = selectedSiteWorker?.id;

  const queryKey = [
    queryKeys.GET_HOUSEHOLDS,
    'getHouseholdSiteworkerSchedule',
    id,
  ];

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getHouseholdSiteworkerSchedule(id!);
      if (response.ok) {
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
    enabled: !!id,
  });

  const queryClient = useQueryClient();
  const customRefetch = () => queryClient.resetQueries({ queryKey });

  const detailList: AppDetailCardDetailItem = [
    [
      {
        title: 'START DATE',
        value: data?.workPeriodStart || '',
      },
    ],
    [
      {
        title: 'END DATE',
        value: data?.workPeriodEnd || '',
      },
    ],
    [
      {
        title: 'CHECK-IN TIME',
        value: data?.clockInStart || '',
      },
      {
        title: 'CHECK-OUT TIME',
        value: data?.clockInEnd || '',
      },
    ],
    [
      {
        title: 'WORK DAYS',
        value: data?.workDays?.join(', ') || '',
      },
    ],
  ];
  return (
    <ScrollView
      refreshControl={
        <AppRefreshControl refreshing={isLoading} onRefresh={customRefetch} />
      }
      contentContainerStyle={styles.container}
    >
      <AppDetailCard detailList={detailList} isLoading={isLoading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(20),
  },
});

export default SiteWorkerScheduleScreen;
