import { StyleSheet, View } from 'react-native';

import AppSearchInput from '@src/components/forms/AppSearchInput';
import AppScreenHeader from '@src/components/common/AppScreenHeader';

const isLoading = false;

const EventBookingsScreen = (): React.JSX.Element => {
  return (
    <View>
      <AppScreenHeader title="Transaction History" />
      {/* <View style={styles.searchContainer}>
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
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default EventBookingsScreen;
