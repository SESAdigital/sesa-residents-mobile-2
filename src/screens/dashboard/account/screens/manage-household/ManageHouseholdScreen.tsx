import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { FlatList, StyleSheet } from 'react-native';

import { DEFAULT_API_DATA_SIZE } from '@src/api/base.api';
import queryKeys from '@src/api/constants/queryKeys';
import { getHouseholdProperties } from '@src/api/household.api';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppListFooterLoader from '@src/components/common/AppListFooterLoader';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import DuplicateLoader from '@src/components/DuplicateLoader';
import EmptyTableComponent from '@src/components/EmptyTableComponent';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import { getTotalPages } from '@src/utils';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import ManangeHouseholdRow, {
  ManangeHouseholdRowLoader,
} from './components/ManangeHouseholdRow';
import routes from '@src/navigation/routes';

const queryKey = [queryKeys.GET_HOUSEHOLDS, 'getHouseholdProperties'];

const pageSize = DEFAULT_API_DATA_SIZE;

const ManageHouseholdScreen = (): React.JSX.Element => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey,

      queryFn: async ({ pageParam }) => {
        const response = await getHouseholdProperties({
          PageNumber: pageParam,
          PageSize: pageSize,
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

  const navigation = useAppNavigator();
  const queryClient = useQueryClient();
  const refetch = () => queryClient.resetQueries({ queryKey });

  return (
    <AppScreen showDownInset>
      <AppScreenHeader>
        <AppText style={styles.headerTitle}>Manage household</AppText>
        <AppText style={styles.headerSubtitle}>Select Property</AppText>
      </AppScreenHeader>
      <AppText style={styles.title}>
        Select a property to manage household
      </AppText>

      <FlatList
        data={formattedData}
        refreshControl={
          <AppRefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator
        ListEmptyComponent={
          isLoading ? (
            <DuplicateLoader loader={<ManangeHouseholdRowLoader />} />
          ) : (
            <EmptyTableComponent />
          )
        }
        renderItem={({ item }) => (
          <ManangeHouseholdRow
            onPress={() =>
              navigation.navigate(routes.HOUSEHOLD_METRICS_SCREEN, {
                id: item?.id,
              })
            }
            data={item}
          />
        )}
        keyExtractor={(_, index) => index?.toString()}
        contentContainerStyle={{ paddingBottom: Size.calcHeight(70) }}
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

  title: {
    paddingHorizontal: Size.calcWidth(21),
    paddingBottom: Size.calcHeight(8),
    paddingTop: Size.calcHeight(28),
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },
});

export default ManageHouseholdScreen;
