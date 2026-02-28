import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { DEFAULT_API_DATA_SIZE } from '@src/api/base.api';
import { getEstateRules } from '@src/api/helpCenter.api';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppListFooterLoader from '@src/components/common/AppListFooterLoader';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import DuplicateLoader from '@src/components/DuplicateLoader';
import AppSearchInput from '@src/components/forms/AppSearchInput';
import colors from '@src/configs/colors';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { getTotalPages } from '@src/utils';
import { handleToastApiError } from '@src/utils/handleErrors';
import { dayJSFormatter } from '@src/utils/time';
import Size from '@src/utils/useResponsiveSize';
import { FlatList } from 'react-native';
import EstateRuleRow, { EstateRuleRowLoader } from './EstateRuleRow';
import EmptyTableComponent from '@src/components/EmptyTableComponent';

const pageSize = DEFAULT_API_DATA_SIZE;

const EstateRulesScreen = (): React.JSX.Element => {
  const [searchText, setSearchText] = useState('');
  const navigation = useAppNavigator();
  const queryKey = ['getEstateRules', searchText];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey,

      queryFn: async ({ pageParam }) => {
        const response = await getEstateRules({
          PageNumber: pageParam,
          PageSize: pageSize,
          ...(searchText ? { SearchText: searchText } : {}),
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
  const refetch = () => queryClient.resetQueries({ queryKey });

  return (
    <AppScreen showDownInset>
      <AppScreenHeader title="Estate Rules" />
      <AppSearchInput
        disabled={isLoading}
        onSearchDone={val => setSearchText(val)}
        placeholder="Search estate rules"
        containerStyle={{
          marginHorizontal: Size.calcWidth(21),
          marginVertical: Size.calcHeight(10),
        }}
      />
      <AppText
        style={{
          paddingVertical: Size.calcHeight(8),
          color: colors.GRAY_100,
          fontSize: Size.calcAverage(12),
          paddingHorizontal: Size.calcWidth(21),
          borderBottomWidth: Size.calcWidth(1),
          borderTopWidth: Size.calcWidth(1),
          borderColor: colors.WHITE_300,
        }}
      >
        Last Updated{' '}
        {dayJSFormatter(formattedData?.[0]?.timeUpdated, 'MMM D, YYYY')}
      </AppText>

      <FlatList
        data={formattedData}
        refreshControl={
          <AppRefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator
        ListEmptyComponent={
          isLoading ? (
            <DuplicateLoader loader={<EstateRuleRowLoader />} />
          ) : (
            <EmptyTableComponent />
          )
        }
        renderItem={({ item }) => (
          <EstateRuleRow
            onPress={() =>
              navigation.navigate(routes.ESTATE_RULE_DETAILS_SCREEN, item)
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

export default EstateRulesScreen;
