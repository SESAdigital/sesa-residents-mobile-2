import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { DEFAULT_API_DATA_SIZE } from '@src/api/base.api';
import queryKeys from '@src/api/constants/queryKeys';
import { getPropertyDetailsHouseholdActivity } from '@src/api/property-details.api';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppListFooterLoader from '@src/components/common/AppListFooterLoader';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import DuplicateLoader from '@src/components/DuplicateLoader';
import EmptyTableComponent from '@src/components/EmptyTableComponent';
import AppSearchInput from '@src/components/forms/AppSearchInput';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { AppScreenProps, useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { useAuthStore } from '@src/stores/auth.store';
import { getTotalPages } from '@src/utils';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import { EstateRuleRowLoader } from '../../help-center/estate-rules/EstateRuleRow';
import HouseholdActivityRow from './components/HouseholdActivityRow';

type Props = AppScreenProps<'HOUSEHOLD_ACTIVITY_PAGE'>;

const pageSize = DEFAULT_API_DATA_SIZE;

const HouseholdActivityPage = ({ route }: Props): React.JSX.Element => {
  const { id, name } = route.params;
  const { selectedProperty } = useAuthStore();
  const propId = selectedProperty?.id;
  const [searchText, setSearchText] = useState('');
  const navigation = useAppNavigator();

  const queryKey = [
    queryKeys.GET_PROPERTY_DETAILS,
    'getPropertyDetailsHouseholdActivity',
    searchText,
    id,
    propId,
  ];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey,

      queryFn: async ({ pageParam }) => {
        const response = await getPropertyDetailsHouseholdActivity({
          PageNumber: pageParam,
          PageSize: pageSize,
          ...(searchText ? { SearchText: searchText } : {}),
          HouseHoldId: id,
          PropertyId: propId || 0,
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
      <AppScreenHeader>
        <View style={{ rowGap: Size.calcHeight(4) }}>
          <AppText style={styles.header}>Household activity </AppText>
          <AppText style={styles.headerSubtitle} numberOfLines={1}>
            {name}
          </AppText>
        </View>
      </AppScreenHeader>
      <View style={styles.searchContainer}>
        <AppSearchInput
          disabled={isLoading}
          onSearchDone={val => setSearchText(val)}
          placeholder="Search occupant name, car make, Reg. no "
        />
      </View>

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
          <HouseholdActivityRow
            onPress={() =>
              navigation.navigate(routes.HOUSEHOLD_ACTIVITY_DETAILS_PAGE, {
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
  header: {
    textAlign: 'center',
    fontSize: Size.calcAverage(16),
    fontFamily: fonts.INTER_600,
  },

  headerSubtitle: {
    textAlign: 'center',
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
    paddingHorizontal: Size.calcWidth(50),
  },

  searchContainer: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(10),
    borderBottomWidth: Size.calcHeight(0.5),
    borderColor: colors.LIGHT_GRAY_200,
  },
});

export default HouseholdActivityPage;
