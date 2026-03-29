import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { FlatList } from 'react-native';

import { DEFAULT_API_DATA_SIZE } from '@src/api/base.api';
import queryKeys from '@src/api/constants/queryKeys';
import { getPropertyDependentsVisitors } from '@src/api/household.api';
import AppListFooterLoader from '@src/components/common/AppListFooterLoader';
import GenericVisitorRow, {
  GenericVisitorRowLoader,
} from '@src/components/common/GenericVisitorRow';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import DuplicateLoader from '@src/components/DuplicateLoader';
import EmptyTableComponent from '@src/components/EmptyTableComponent';
import { useAppStateStore } from '@src/stores/appState.store';
import { useAuthStore } from '@src/stores/auth.store';
import { getTotalPages } from '@src/utils';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';

const pageSize = DEFAULT_API_DATA_SIZE;

const DependentVisitorsScreen = (): React.JSX.Element => {
  const { selectedDependent } = useAppStateStore();
  const { selectedProperty } = useAuthStore();
  const id = selectedDependent?.id || 0;
  const propId = selectedProperty?.id || 0;

  const queryKey = [
    queryKeys.GET_HOUSEHOLDS,
    'getPropertyDependentsVisitors',
    id,
    propId,
  ];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey,

      queryFn: async ({ pageParam }) => {
        const response = await getPropertyDependentsVisitors({
          PageNumber: pageParam,
          PageSize: pageSize,
          propId,
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
      enabled: !!propId && !!id,
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
          <DuplicateLoader loader={<GenericVisitorRowLoader />} />
        ) : (
          <EmptyTableComponent />
        )
      }
      renderItem={({ item }) => <GenericVisitorRow value={item} />}
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

export default DependentVisitorsScreen;
