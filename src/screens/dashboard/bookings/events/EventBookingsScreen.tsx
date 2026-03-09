import { StyleSheet, Text, View } from 'react-native';

const EventBookingsScreen = (): React.JSX.Element => {
  return (
    <View>
      <View style={styles.container}>
        <Text>EventBookingsScreen</Text>
      </View>
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
