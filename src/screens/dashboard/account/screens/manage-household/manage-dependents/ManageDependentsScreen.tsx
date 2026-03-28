import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { FlatList, StyleSheet } from 'react-native';

import { DEFAULT_API_DATA_SIZE } from '@src/api/base.api';
import queryKeys from '@src/api/constants/queryKeys';
import { getHouseholdPropertyDependents } from '@src/api/household.api';
import AppScreen from '@src/components/AppScreen';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import AppListFooterLoader from '@src/components/common/AppListFooterLoader';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import DuplicateLoader from '@src/components/DuplicateLoader';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { AppScreenProps, useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { getTotalPages } from '@src/utils';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import EmptyDependentComponent from './components/EmptyDependentComponent';
import ManageDependentRow, {
  ManageDependentRowLoader,
} from './components/ManageDependentRow';
import { useDependentActions } from './components/dependent-actions';
import AppFAB from '@src/components/AppFAB';
import { useGetFees, useGetWalletBalance } from '@src/hooks/useGetRequests';
import { useAuthStore } from '@src/stores/auth.store';
import { appToast } from '@src/utils/appToast';

type Props = AppScreenProps<'MANAGE_DEPENDENTS_SCREEN'>;

const pageSize = DEFAULT_API_DATA_SIZE;

const ManageDependentsScreen = ({ route }: Props): React.JSX.Element => {
  const { id, name } = route?.params;
  useGetFees();
  useGetWalletBalance();
  const queryKey = [
    queryKeys.GET_HOUSEHOLDS,
    'getHouseholdPropertyDependents',
    id,
  ];
  const navigation = useAppNavigator();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey,

      queryFn: async ({ pageParam }) => {
        const response = await getHouseholdPropertyDependents({
          PageNumber: pageParam,
          PageSize: pageSize,
          id,
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
  const { selectedProperty } = useAuthStore();
  const { handleModal } = useDependentActions();

  const handleAdd = () => {
    if (!selectedProperty?.id)
      return appToast.Warning('Property details not found.');

    return navigation.navigate(routes.ADD_DEPENDENT_SCREEN, {
      id: selectedProperty?.id,
      name,
    });
  };

  return (
    <AppScreen showDownInset>
      <AppScreenHeader>
        <AppText style={styles.headerTitle}>Manage dependents</AppText>
        {isLoading ? (
          <AppSkeletonLoader
            style={styles.headerSubtitleLoading}
            width={Size.calcWidth(100)}
          />
        ) : (
          <AppText style={styles.headerSubtitle}>{name}</AppText>
        )}
      </AppScreenHeader>
      {formattedData?.length > 0 && (
        <AppText style={styles.instructions}>
          Tap dependent for access & booking history
        </AppText>
      )}

      <FlatList
        data={formattedData}
        refreshControl={
          <AppRefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator
        ListEmptyComponent={
          isLoading ? (
            <DuplicateLoader loader={<ManageDependentRowLoader />} />
          ) : (
            <EmptyDependentComponent onPress={handleAdd} />
          )
        }
        renderItem={({ item }) => (
          <ManageDependentRow
            onPress={() =>
              navigation.navigate(routes.DEPENDENT_DETAILS_NAVIGATOR)
            }
            showActivity
            data={item}
            onMorePress={() => handleModal(item)}
          />
        )}
        keyExtractor={(_, index) => index?.toString()}
        contentContainerStyle={styles.contentContainerStyle}
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

      <AppFAB onPress={handleAdd} style={{ bottom: Size.calcHeight(60) }} />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: Size.calcHeight(70),
    minHeight: '100%',
  },

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

  headerSubtitleLoading: {
    marginHorizontal: 'auto',
    paddingTop: Size.calcHeight(6),
  },

  instructions: {
    paddingVertical: Size.calcHeight(8),
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
    paddingHorizontal: Size.calcWidth(21),
    borderBottomWidth: Size.calcWidth(1),
    borderColor: colors.WHITE_300,
  },
});

export default ManageDependentsScreen;
