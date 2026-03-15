import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import { DEFAULT_API_DATA_SIZE } from '@src/api/base.api';
import { getBillsOlder } from '@src/api/bills.api';
import queryKeys from '@src/api/constants/queryKeys';
import AppScreen from '@src/components/AppScreen';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import AppListFooterLoader from '@src/components/common/AppListFooterLoader';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import SwitchPropertyRow from '@src/components/common/SwitchPropertyRow';
import AppProfilePicture from '@src/components/custom/AppProfilePicture';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import DuplicateLoader from '@src/components/DuplicateLoader';
import EmptyTableComponent from '@src/components/EmptyTableComponent';
import {
  MaterialSymbolsChevronRightRounded,
  MaterialSymbolsLightPaymentsOutlineRounded,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useGetBillsMetrics } from '@src/hooks/useGetRequests';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { useAuthStore } from '@src/stores/auth.store';
import { getTotalPages } from '@src/utils';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import EstatePaymentRow, {
  EstatePaymentRowLoader,
} from './components/EstatePaymentRow';

const pageSize = DEFAULT_API_DATA_SIZE;

const BillsAndCollectionsScreen = (): React.JSX.Element => {
  const {
    unPaidEstatePaymentCount,
    customRefetch,
    earliestPaymentDueDay,
    isLoading: isMetricsLoading,
  } = useGetBillsMetrics();
  const { selectedProperty } = useAuthStore();
  const id = selectedProperty?.id;
  const navigation = useAppNavigator();

  const queryKey = [queryKeys.GET_BILLS_AND_COLLECTIONS, 'getBillsOlder', id];

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isOlderPaymentLoading,
  } = useInfiniteQuery({
    queryKey,

    queryFn: async ({ pageParam }) => {
      const response = await getBillsOlder({
        PageNumber: pageParam,
        PageSize: pageSize,
        PropertyId: id!,
      });
      if (response.ok) {
        return response?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },

    initialPageParam: 1,
    enabled: !!id,
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
      <AppScreenHeader rightIcon={<AppProfilePicture disabled />}>
        <View>
          <AppText style={styles.headerTitle}>Bills & Collections</AppText>
          <SwitchPropertyRow />
        </View>
      </AppScreenHeader>

      <View style={styles.banner}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routes.UNPAID_ESTATE_PAYMENT_SCREEN)
          }
        >
          <View style={styles.iconContainer}>
            <MaterialSymbolsLightPaymentsOutlineRounded
              height={Size.calcAverage(26)}
              width={Size.calcAverage(26)}
              color={colors.BLUE_200}
            />
          </View>
          <AppText style={styles.bannerTitle}>
            Unpaid estate payment{unPaidEstatePaymentCount > 1 ? 's' : ''}
          </AppText>
          <View style={styles.row}>
            {isMetricsLoading ? (
              <AppSkeletonLoader width={Size.calcWidth(100)} />
            ) : (
              <View style={styles.row2}>
                <AppText style={styles.bannerCount}>
                  {unPaidEstatePaymentCount}
                </AppText>
                {earliestPaymentDueDay > 0 && (
                  <AppText style={styles.dueText}>
                    Due in {earliestPaymentDueDay} day
                    {earliestPaymentDueDay > 1 ? 's' : ''}
                  </AppText>
                )}
              </View>
            )}
            <MaterialSymbolsChevronRightRounded
              height={Size.calcAverage(24)}
              width={Size.calcAverage(24)}
              color={colors.WHITE_200}
            />
          </View>
        </TouchableOpacity>
      </View>
      <AppText style={styles.olderPayment}>Older Payments</AppText>

      <FlatList
        data={formattedData}
        refreshControl={
          <AppRefreshControl
            refreshing={isOlderPaymentLoading}
            onRefresh={refetch}
          />
        }
        showsVerticalScrollIndicator
        ListEmptyComponent={
          isOlderPaymentLoading ? (
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
  banner: {
    backgroundColor: colors.BLUE_200,
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(16),
  },

  bannerCount: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(16),
    color: colors.WHITE_200,
  },

  bannerTitle: {
    fontSize: Size.calcAverage(12),
    color: colors.WHITE_200,
    paddingTop: Size.calcHeight(9),
    paddingBottom: Size.calcHeight(5),
  },

  dueText: {
    fontSize: Size.calcAverage(11),
    color: colors.WHITE_200,
    paddingHorizontal: Size.calcWidth(8),
    paddingVertical: Size.calcHeight(2),
    backgroundColor: colors.BLUE_300,
    borderRadius: 100,
    borderWidth: Size.calcAverage(0.5),
    borderColor: colors.BLUE_600,
  },

  headerTitle: {
    fontFamily: fonts.INTER_600,
    textAlign: 'center',
    fontSize: Size.calcAverage(16),
    color: colors.BLACK_200,
    paddingBottom: Size.calcHeight(2),
  },

  iconContainer: {
    height: Size.calcAverage(40),
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: colors.WHITE_300,
    alignItems: 'center',
    justifyContent: 'center',
  },

  olderPayment: {
    fontFamily: fonts.INTER_600,
    color: colors.BLACK_200,
    paddingVertical: Size.calcHeight(22),
    paddingHorizontal: Size.calcWidth(21),
    borderBottomWidth: Size.calcWidth(1),
    borderBottomColor: colors.WHITE_300,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Size.calcAverage(10),
  },

  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Size.calcAverage(10),
    flexWrap: 'wrap',
  },
});

export default BillsAndCollectionsScreen;
