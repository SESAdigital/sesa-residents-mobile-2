import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { FlatList, StyleSheet, View } from 'react-native';

import { DEFAULT_API_DATA_SIZE } from '@src/api/base.api';
import queryKeys from '@src/api/constants/queryKeys';
import { getPropertyDetailsOccupantHistory } from '@src/api/property-details.api';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppListFooterLoader from '@src/components/common/AppListFooterLoader';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import DuplicateLoader from '@src/components/DuplicateLoader';
import EmptyTableComponent from '@src/components/EmptyTableComponent';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useGetPropertyDetails } from '@src/hooks/useGetRequests';
import { getTotalPages } from '@src/utils';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import OccupantHistoryRow, {
  OccupantHistoryRowLoader,
} from './OccupantHistoryRow';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';

const pageSize = DEFAULT_API_DATA_SIZE;

const OccupantHistoryPage = (): React.JSX.Element => {
  const {
    value: { data: propertyDetails },
    propertyId,
  } = useGetPropertyDetails();

  const queryKey = [
    queryKeys.GET_PROPERTY_DETAILS,
    'getPropertyDetailsOccupantHistory',
    propertyId,
  ];
  const navigation = useAppNavigator();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey,

      queryFn: async ({ pageParam }) => {
        const response = await getPropertyDetailsOccupantHistory({
          id: propertyId!,
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
      enabled: !!propertyId,
    });

  const formattedData =
    data?.pages?.flatMap(page => page?.data?.records)?.filter(val => !!val) ||
    [];

  const queryClient = useQueryClient();
  const refetch = () => queryClient.resetQueries({ queryKey });

  return (
    <AppScreen showDownInset>
      <AppScreenHeader>
        <View style={{ rowGap: Size.calcHeight(4) }}>
          <AppText style={styles.header}>Occupant history </AppText>
          <AppText style={styles.address} numberOfLines={1}>
            {propertyDetails?.address}
          </AppText>
        </View>
      </AppScreenHeader>

      <FlatList
        data={formattedData}
        refreshControl={
          <AppRefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator
        ListEmptyComponent={
          isLoading ? (
            <DuplicateLoader loader={<OccupantHistoryRowLoader />} />
          ) : (
            <EmptyTableComponent />
          )
        }
        renderItem={({ item }) => (
          <OccupantHistoryRow
            onPress={() =>
              navigation.navigate(routes.HOUSEHOLD_ACTIVITY_PAGE, {
                id: item?.id,
                name: item?.name,
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
  address: {
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
    textAlign: 'center',
    paddingHorizontal: Size.calcWidth(50),
  },

  header: {
    textAlign: 'center',
    fontSize: Size.calcAverage(16),
    fontFamily: fonts.INTER_600,
  },
});

export default OccupantHistoryPage;
