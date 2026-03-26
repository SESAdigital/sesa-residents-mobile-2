import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { DEFAULT_API_DATA_SIZE, GenericApiResponse } from '@src/api/base.api';
import queryKeys from '@src/api/constants/queryKeys';
import {
  deleteHouseholdAccessCard,
  getHouseholdAccessCardHistory,
  GetHouseholdAccessCardsResData,
  patchHouseholdAccessCardStatus,
} from '@src/api/household.api';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppListFooterLoader from '@src/components/common/AppListFooterLoader';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import DuplicateLoader from '@src/components/DuplicateLoader';
import EmptyTableComponent from '@src/components/EmptyTableComponent';
import { MaterialSymbolsMoreVert } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { AppScreenProps, useAppNavigator } from '@src/navigation/AppNavigator';
import { getTotalPages, truncateText } from '@src/utils';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import AccessCardHistoryRow, {
  AccessCardHistoryRowLoader,
} from './components/AccessCardHistoryRow';
import AccessCardRow from './components/AccessCardRow';
import AccessCardActionsModal from './components/AccessCardActionsModal';
import { useAppStateStore } from '@src/stores/appState.store';
import { appToast } from '@src/utils/appToast';
import { AccessCardStatusTypeData } from '@src/api/constants/default';
import { ApiResponse } from 'apisauce';

type Props = AppScreenProps<'ACCESS_CARD_HISTORY_SCREEN'>;

const pageSize = DEFAULT_API_DATA_SIZE;

const AccessCardHistoryScreen = ({ route }: Props): React.JSX.Element => {
  const params = route?.params || {};
  const formattedParam: GetHouseholdAccessCardsResData = {
    ...params,
    holderName: truncateText(params.holderName, 40),
  };
  const { setActiveModal, closeActiveModal, setIsAppModalLoading } =
    useAppStateStore();
  const id = params?.id;
  const navigation = useAppNavigator();
  const queryKey = [
    queryKeys.GET_HOUSEHOLDS,
    'getHouseholdAccessCardHistory',
    id,
  ];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey,

      queryFn: async ({ pageParam }) => {
        const response = await getHouseholdAccessCardHistory({
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

  const onMutate = async (status: 'Delete' | 'Activate' | 'Deactivate') => {
    let response: ApiResponse<GenericApiResponse, GenericApiResponse> | null =
      null;

    setIsAppModalLoading(true);
    if (status === 'Delete') {
      response = await deleteHouseholdAccessCard(id);
    } else {
      response = await patchHouseholdAccessCardStatus({ id, status });
    }
    setIsAppModalLoading(false);

    if (response.ok) {
      appToast.Success(
        response?.data?.message || `${status}d access card successfully`,
      );
      navigation.goBack();
      queryClient.resetQueries({ queryKey: [queryKeys.GET_HOUSEHOLDS] });
      closeActiveModal();
    } else {
      handleToastApiError(response);
    }
  };

  const handleMutation = (type: 'Delete' | 'Activate' | 'Deactivate') => {
    if (!id) return appToast.Warning('Access card not found');

    return setActiveModal({
      modalType: 'PROMT_MODAL',
      shouldBackgroundClose: true,
      promptModal: {
        title: `${type} access card?`,
        description: `You are about to ${type?.toLowerCase?.()} an access card with number ${truncateText(
          formattedParam?.serialNumber,
          20,
        )}. Are you sure you want to continue?`,
        yesButtonTitle: "Yes, I'm Sure",
        yesButtonProps: { variant: type === 'Activate' ? 'PRIMARY' : 'DANGER' },
        noButtonTitle: 'No, Cancel',
        onNoButtonClick: handleModal,
        onYesButtonClick: () => onMutate(type),
      },
    });
  };

  const handleModal = () => {
    setActiveModal({
      modalType: 'EMPTY_MODAL',
      shouldBackgroundClose: true,
      emptyModalComponent: (
        <AccessCardActionsModal
          data={formattedParam}
          onStatusToggle={() =>
            handleMutation(
              params?.status === AccessCardStatusTypeData.Active
                ? 'Deactivate'
                : 'Activate',
            )
          }
          onDelete={() => handleMutation('Delete')}
        />
      ),
    });
  };

  return (
    <AppScreen showDownInset>
      <AppScreenHeader
        rightIcon={
          <TouchableOpacity onPress={handleModal}>
            <MaterialSymbolsMoreVert
              height={Size.calcAverage(24)}
              width={Size.calcAverage(24)}
              color={colors.GRAY_100}
            />
          </TouchableOpacity>
        }
      >
        <AccessCardRow
          data={formattedParam}
          contentContainerStyle={styles.accessCardRow}
          containerStyle={{ paddingTop: 0 }}
        />
      </AppScreenHeader>
      <AppText
        style={[
          styles.instructions,
          !formattedData.length &&
            !isLoading && { borderBottomWidth: Size.calcHeight(1) },
        ]}
      >
        Access history
      </AppText>

      <FlatList
        data={formattedData}
        refreshControl={
          <AppRefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator
        ListEmptyComponent={
          isLoading ? (
            <DuplicateLoader loader={<AccessCardHistoryRowLoader />} />
          ) : (
            <EmptyTableComponent />
          )
        }
        renderItem={({ item }) => <AccessCardHistoryRow data={item} />}
        keyExtractor={(_, index) => index?.toString()}
        contentContainerStyle={{ paddingBottom: Size.calcHeight(20) }}
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
  accessCardRow: {
    paddingBottom: 0,
    borderBottomWidth: 0,
  },

  instructions: {
    paddingVertical: Size.calcHeight(8),
    fontFamily: fonts.INTER_500,
    paddingHorizontal: Size.calcWidth(21),
    borderBottomColor: colors.WHITE_300,
  },
});

export default AccessCardHistoryScreen;
