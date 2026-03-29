import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { FlatList } from 'react-native';

import { DEFAULT_API_DATA_SIZE } from '@src/api/base.api';
import queryKeys from '@src/api/constants/queryKeys';
import { getHouseholdDependentsCheckInOut } from '@src/api/household.api';
import AppListFooterLoader from '@src/components/common/AppListFooterLoader';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import DuplicateLoader from '@src/components/DuplicateLoader';
import EmptyTableComponent from '@src/components/EmptyTableComponent';
import { useAppStateStore } from '@src/stores/appState.store';
import { getTotalPages } from '@src/utils';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import AccessCardHistoryRow, {
  AccessCardHistoryRowLoader,
} from '../../manage-access-cards/components/AccessCardHistoryRow';

const pageSize = DEFAULT_API_DATA_SIZE;

const DependentCheckInAndOutScreen = (): React.JSX.Element => {
  const { selectedDependent } = useAppStateStore();
  const id = selectedDependent?.id || 0;

  const queryKey = [
    queryKeys.GET_HOUSEHOLDS,
    'getHouseholdDependentsCheckInOut',
    id,
  ];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey,

      queryFn: async ({ pageParam }) => {
        const response = await getHouseholdDependentsCheckInOut({
          PageNumber: pageParam,
          PageSize: pageSize,
          id,
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
      enabled: !!id,
    });

  const formattedData =
    data?.pages?.flatMap(page => page?.data?.records)?.filter(val => !!val) ||
    [];

  const queryClient = useQueryClient();
  const refetch = () => queryClient.resetQueries({ queryKey });

  return (
    <FlatList
      data={formattedData}
      refreshControl={
        <AppRefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
      showsVerticalScrollIndicator
      ListEmptyComponent={
        isLoading ? (
          <DuplicateLoader loader={<AccessCardHistoryRowLoader />} />
        ) : (
          <EmptyTableComponent />
        )
      }
      renderItem={({ item }) => <AccessCardHistoryRow data={item} />}
      keyExtractor={(_, index) => index?.toString()}
      contentContainerStyle={{ paddingBottom: Size.calcHeight(20) }}
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
  );
};

export default DependentCheckInAndOutScreen;
