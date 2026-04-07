import { FlatList, StyleSheet, View } from 'react-native';

import { DEFAULT_API_DATA_SIZE } from '@src/api/base.api';
import {
  GetEntityStatusData,
  GetEntityStatusType,
} from '@src/api/constants/default';
import queryKeys from '@src/api/constants/queryKeys';
import { getHouseholdSiteWorkers } from '@src/api/household.api';
import AppFAB from '@src/components/AppFAB';
import AppListFooterLoader from '@src/components/common/AppListFooterLoader';
import EmptyPersonnelComponent from '@src/components/common/EmptyPersonnelComponent';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import DuplicateLoader from '@src/components/DuplicateLoader';
import EmptyTableComponent from '@src/components/EmptyTableComponent';
import { MaterialSymbolsLightEngineeringOutlineRounded } from '@src/components/icons';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { useAppStateStore } from '@src/stores/appState.store';
import { useAuthStore } from '@src/stores/auth.store';
import { getTotalPages } from '@src/utils';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import SiteWorkerRow, { SiteWorkerRowLoader } from './components/SiteWorkerRow';
interface Props {
  Status: GetEntityStatusType;
}

const pageSize = DEFAULT_API_DATA_SIZE;

const SiteWorkersStatusListScreen = (props: Props): React.JSX.Element => {
  const { Status } = props;
  const { selectedHousehold, setSelectedSiteWorker } = useAppStateStore();
  const id = selectedHousehold?.id || 0;
  const { selectedProperty } = useAuthStore();

  const queryKey = [
    queryKeys.GET_HOUSEHOLDS,
    'getHouseholdSiteWorkers',
    Status,
  ];
  const navigation = useAppNavigator();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey,

      queryFn: async ({ pageParam }) => {
        const response = await getHouseholdSiteWorkers({
          PageNumber: pageParam,
          PageSize: pageSize,
          id,
          Status,
        });
        if (response.ok) {
          return response?.data;
        } else {
          handleToastApiError(response);
          return null;
        }
      },

      initialPageParam: 1,

      getNextPageParam: lastPage => {
        if (!lastPage) return undefined;
        const { currentPage, totalRecordCount: totalItems } = lastPage.data;
        const totalPages = getTotalPages({ pageSize, totalItems });
        return currentPage < totalPages ? currentPage + 1 : undefined;
      },
    });

  const formattedData =
    data?.pages?.flatMap(page => page?.data?.records)?.filter(val => !!val) ||
    [];

  const queryClient = useQueryClient();
  const refetch = () => queryClient.resetQueries({ queryKey });

  const handleAdd = () => {
    if (!selectedProperty?.id)
      return appToast.Warning('Property details not found.');

    return navigation.navigate(routes.ADD_SITE_WORKER_SCREEN, {
      id,
      name: selectedHousehold?.name || '',
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={formattedData}
        refreshControl={
          <AppRefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator
        ListEmptyComponent={
          isLoading ? (
            <DuplicateLoader loader={<SiteWorkerRowLoader />} />
          ) : Status === GetEntityStatusData.All ? (
            <EmptyPersonnelComponent
              Icon={MaterialSymbolsLightEngineeringOutlineRounded}
              title="Add your first site worker"
              description="Tap “Add site worker” to get started."
              buttonTitle="Add site worker"
              onPress={handleAdd}
            />
          ) : (
            <EmptyTableComponent />
          )
        }
        renderItem={({ item }) => (
          <SiteWorkerRow
            onPress={() => {
              setSelectedSiteWorker(item);
              navigation.navigate(routes.DEPENDENT_DETAILS_NAVIGATOR);
            }}
            showWorkDays
            data={item}
          />
        )}
        keyExtractor={(_, index) => index?.toString()}
        contentContainerStyle={styles.contentContainerStyle}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={2}
        ListFooterComponent={
          <AppListFooterLoader isloading={isFetchingNextPage} />
        }
      />

      <AppFAB onPress={handleAdd} style={{ bottom: Size.calcHeight(100) }} />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: Size.calcHeight(70),
    minHeight: '100%',
  },
});

export default SiteWorkersStatusListScreen;
