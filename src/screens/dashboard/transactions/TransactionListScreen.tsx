import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { DEFAULT_API_DATA_SIZE } from '@src/api/base.api';
import queryKeys from '@src/api/constants/queryKeys';
import { getWalletTransactions } from '@src/api/wallets.api';
import AppScreen from '@src/components/AppScreen';
import AppListFooterLoader from '@src/components/common/AppListFooterLoader';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import DuplicateLoader from '@src/components/DuplicateLoader';
import AppSearchInput from '@src/components/forms/AppSearchInput';
import { MaterialSymbolsHistory } from '@src/components/icons';
import colors from '@src/configs/colors';
import { getTotalPages } from '@src/utils';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import EmtpyTransactionComponent from './components/EmtpyTransactionComponent';
import TransactionListRow, {
  TransactionListRowLoader,
} from './components/TransactionListRow';

const pageSize = DEFAULT_API_DATA_SIZE;

const TransactionListScreen = (): React.JSX.Element => {
  const [searchText, setSearchText] = useState('');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [queryKeys.GET_WALLET_TRANSACTIONS, searchText],

      queryFn: async ({ pageParam }) => {
        const response = await getWalletTransactions({
          PageNumber: pageParam,
          SearchText: searchText,
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
  const refetch = () =>
    queryClient.resetQueries({ queryKey: [queryKeys.GET_WALLET_TRANSACTIONS] });

  return (
    <AppScreen showDownInset>
      <AppScreenHeader title="Transaction History" />
      <View style={styles.searchContainer}>
        <AppSearchInput
          disabled={isLoading}
          onSearchDone={val => setSearchText(val)}
          placeholder="Search transaction, amount"
          containerStyle={{ width: '84%' }}
        />
        <View style={styles.filterButton}>
          <MaterialSymbolsHistory
            height={Size.calcAverage(20)}
            width={Size.calcAverage(20)}
            color={colors.GRAY_100}
          />
        </View>
      </View>

      <FlatList
        data={formattedData}
        refreshControl={
          <AppRefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator
        ListEmptyComponent={
          isLoading ? (
            <DuplicateLoader loader={<TransactionListRowLoader />} />
          ) : (
            <EmtpyTransactionComponent />
          )
        }
        renderItem={({ item }) => <TransactionListRow val={item} />}
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


  filterButton: {
    marginLeft: Size.calcWidth(10),
    height: Size.calcAverage(39),
    aspectRatio: 1,
    borderRadius: Size.calcAverage(100),
    borderWidth: Size.calcAverage(1),
    borderColor: colors.LIGHT_GRAY_200,
    backgroundColor: colors.WHITE_300,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Size.calcHeight(12),
    paddingHorizontal: Size.calcWidth(20),
  },
});

export default TransactionListScreen;
