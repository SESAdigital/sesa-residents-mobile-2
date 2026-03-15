import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { FlatList, StyleSheet, View } from 'react-native';

import { DEFAULT_API_DATA_SIZE } from '@src/api/base.api';
import { getBillsUnpaid } from '@src/api/bills.api';
import queryKeys from '@src/api/constants/queryKeys';
import AppScreen from '@src/components/AppScreen';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import AppListFooterLoader from '@src/components/common/AppListFooterLoader';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import DuplicateLoader from '@src/components/DuplicateLoader';
import EmptyTableComponent from '@src/components/EmptyTableComponent';
import colors from '@src/configs/colors';
import { useGetBillsMetrics } from '@src/hooks/useGetRequests';
import { formatMoneyToTwoDecimals, getTotalPages } from '@src/utils';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import EstatePaymentRow, {
  EstatePaymentRowLoader,
} from './components/EstatePaymentRow';

const pageSize = DEFAULT_API_DATA_SIZE;
const queryKey = [queryKeys.GET_BILLS_AND_COLLECTIONS, 'getBillsUnpaid'];

const UnPaidEstatePaymentsScreen = (): React.JSX.Element => {
  const {
    unPaidEstatePaymentCount,
    customRefetch,
    unpaidEstatePaymentAmount,
    isLoading: isMetricsLoading,
  } = useGetBillsMetrics();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isPaymentLoading,
  } = useInfiniteQuery({
    queryKey,

    queryFn: async ({ pageParam }) => {
      const response = await getBillsUnpaid({
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

  const queryClient = useQueryClient();
  const refetch = () => {
    queryClient.resetQueries({ queryKey });
    customRefetch();
  };

  return (
    <AppScreen showDownInset>
      <AppScreenHeader title="Unpaid Estate Payments" />
      <View style={styles.container}>
        {isMetricsLoading ? (
          <>
            <AppSkeletonLoader
              height={Size.calcHeight(15)}
              width={Size.calcWidth(100)}
            />
            <AppSkeletonLoader
              height={Size.calcHeight(15)}
              width={Size.calcWidth(100)}
            />
          </>
        ) : (
          <>
            <AppText style={styles.text}>
              {unPaidEstatePaymentCount} Unpaid estate payment
              {unPaidEstatePaymentCount > 1 ? 's' : ''}
            </AppText>
            <AppText style={styles.text}>
              Total Due:{' '}
              {formatMoneyToTwoDecimals({ amount: unpaidEstatePaymentAmount })}
            </AppText>
          </>
        )}
      </View>

      <FlatList
        data={formattedData}
        refreshControl={
          <AppRefreshControl
            refreshing={isPaymentLoading}
            onRefresh={refetch}
          />
        }
        showsVerticalScrollIndicator
        ListEmptyComponent={
          isPaymentLoading ? (
            <DuplicateLoader loader={<EstatePaymentRowLoader />} />
          ) : (
            <EmptyTableComponent />
          )
        }
        renderItem={({ item }) => <EstatePaymentRow data={item} />}
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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Size.calcHeight(7),
    paddingHorizontal: Size.calcWidth(21),
    backgroundColor: colors.WHITE_300,
    flexWrap: 'wrap',
    gap: Size.calcAverage(10),
  },

  text: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },
});

export default UnPaidEstatePaymentsScreen;
