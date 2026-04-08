import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { FlatList, StyleSheet } from 'react-native';

import { DEFAULT_API_DATA_SIZE } from '@src/api/base.api';
import queryKeys from '@src/api/constants/queryKeys';
import { getHouseholdAlphaOcccupants } from '@src/api/household.api';
import AppFAB from '@src/components/AppFAB';
import AppScreen from '@src/components/AppScreen';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import AppListFooterLoader from '@src/components/common/AppListFooterLoader';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import EmptyPersonnelComponent from '@src/components/common/EmptyPersonnelComponent';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import DuplicateLoader from '@src/components/DuplicateLoader';
import { MaterialSymbolsSupervisorAccountRounded } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { AppScreenProps } from '@src/navigation/AppNavigator';
import { useAppStateStore } from '@src/stores/appState.store';
import { useAuthStore } from '@src/stores/auth.store';
import { getTotalPages } from '@src/utils';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import ManageDependentRow, {
  ManageDependentRowLoader,
} from '../manage-dependents/components/ManageDependentRow';
import AddAlphaOccupantActionsModal from './components/AddAlphaOccupantActionsModal';
import { useGetHouseholdMetrics } from '@src/hooks/useGetRequests';
import appConfig from '@src/utils/appConfig';

type Props = AppScreenProps<'MANAGE_ALPHA_OCCUPANTS_SCREEN'>;

const pageSize = DEFAULT_API_DATA_SIZE;

const ManageAlphaOccupantsScreen = ({ route }: Props): React.JSX.Element => {
  const { id, name } = route?.params;

  const queryKey = [
    queryKeys.GET_HOUSEHOLDS,
    'getHouseholdAlphaOcccupants',
    id,
  ];
  const { setActiveModal } = useAppStateStore();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey,

      queryFn: async ({ pageParam }) => {
        const response = await getHouseholdAlphaOcccupants({
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
  const { value } = useGetHouseholdMetrics();

  const handleAdd = () => {
    if (!selectedProperty?.id)
      return appToast.Warning('Property details not found.');

    const max = appConfig.APP_MAX_ALPHA_OCCUPANTS;
    const totalRecordCount = value?.data?.totalAlphaCount;

    // if (max === undefined || max === null) {
    //   return appToast.Info('Alpha occupant limit not found.');
    // }

    if (totalRecordCount === undefined || totalRecordCount === null) {
      return appToast.Info('Alpha occupant count not found.');
    }

    if (totalRecordCount >= max) {
      return appToast.Info(
        'You have reached the maximum number of alpha occupants.',
      );
    }

    return setActiveModal({
      modalType: 'EMPTY_MODAL',
      shouldBackgroundClose: true,
      emptyModalComponent: (
        <AddAlphaOccupantActionsModal id={selectedProperty?.id} name={name} />
      ),
    });
  };

  return (
    <AppScreen showDownInset>
      <AppScreenHeader>
        <AppText style={styles.headerTitle}>Manage alpha occupants</AppText>
        {isLoading ? (
          <AppSkeletonLoader
            style={styles.headerSubtitleLoading}
            width={Size.calcWidth(100)}
          />
        ) : (
          <AppText style={styles.headerSubtitle}>{name}</AppText>
        )}
      </AppScreenHeader>

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
            <EmptyPersonnelComponent
              Icon={MaterialSymbolsSupervisorAccountRounded}
              title="Add your first alpha occupant"
              description="Tap “add alpha occupant” to get started."
              buttonTitle="Add alpha occupant"
              onPress={handleAdd}
            />
          )
        }
        renderItem={({ item }) => <ManageDependentRow data={item} />}
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

export default ManageAlphaOccupantsScreen;
