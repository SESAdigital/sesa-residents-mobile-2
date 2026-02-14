import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FlatList, StyleSheet, View } from 'react-native';

import queryKeys from '@src/api/constants/queryKeys';
import { getWalletTransactions } from '@src/api/wallets.api';
import AppScreen from '@src/components/AppScreen';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import DuplicateLoader from '@src/components/DuplicateLoader';
import AppSearchInput from '@src/components/forms/AppSearchInput';
import { MaterialSymbolsHistory } from '@src/components/icons';
import colors from '@src/configs/colors';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import EmtpyTransactionComponent from './components/EmtpyTransactionComponent';
import TransactionListRow, {
  TransactionListRowLoader,
} from './components/TransactionListRow';

const isLoading = false;
const queryKey = [queryKeys.GET_WALLET_TRANSACTIONS, 'a'];

const TransactionListScreen = (): React.JSX.Element => {
  const { data: walletTransactions } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getWalletTransactions();
      if (response.ok) {
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
  });

  const queryClient = useQueryClient();

  const refetch = () => queryClient.resetQueries({ queryKey });

  return (
    <AppScreen showDownInset style={styles.container}>
      <AppScreenHeader title="Transaction History" />
      <View style={styles.searchContainer}>
        <AppSearchInput
          disabled={isLoading}
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
        data={walletTransactions?.records || []}
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
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },

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
    paddingHorizontal: Size.calcWidth(21),
  },
});

export default TransactionListScreen;
