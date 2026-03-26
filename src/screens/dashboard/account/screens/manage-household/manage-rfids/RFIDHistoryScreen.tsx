import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { DEFAULT_API_DATA_SIZE, GenericApiResponse } from '@src/api/base.api';
import { AccessCardStatusTypeData } from '@src/api/constants/default';
import queryKeys from '@src/api/constants/queryKeys';
import {
  deleteHouseholdRFID,
  getHouseholdRFIDsHistory,
  GetHouseholdRFIDsResData,
  patchHouseholdRFIDStatus,
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
import { useAppStateStore } from '@src/stores/appState.store';
import { getTotalPages, truncateText } from '@src/utils';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import { ApiResponse } from 'apisauce';
import AccessCardHistoryRow, {
  AccessCardHistoryRowLoader,
} from '../manage-access-cards/components/AccessCardHistoryRow';
import RFIDActionsModal from './components/RFIDActionsModal';
import RFIDRow from './components/RFIDRow';

type Props = AppScreenProps<'RFID_HISTORY_SCREEN'>;

const pageSize = DEFAULT_API_DATA_SIZE;

const RFIDHistoryScreen = ({ route }: Props): React.JSX.Element => {
  const params = route?.params || {};
  const formattedParam: GetHouseholdRFIDsResData = {
    ...params,
    registrationNumber: truncateText(params.registrationNumber, 40),
    serialNumber: truncateText(params.serialNumber, 40),
  };
  const { setActiveModal, closeActiveModal, setIsAppModalLoading } =
    useAppStateStore();
  const id = params?.id;
  const navigation = useAppNavigator();
  const queryKey = [queryKeys.GET_HOUSEHOLDS, 'getHouseholdRFIDsHistory', id];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey,

      queryFn: async ({ pageParam }) => {
        const response = await getHouseholdRFIDsHistory({
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
      response = await deleteHouseholdRFID(id);
    } else {
      response = await patchHouseholdRFIDStatus({ id, status });
    }
    setIsAppModalLoading(false);

    if (response.ok) {
      queryClient.resetQueries({ queryKey: [queryKeys.GET_HOUSEHOLDS] });
      navigation.goBack();
      closeActiveModal();
      appToast.Success(
        response?.data?.message || `${status}d RFID successfully`,
      );
    } else {
      handleToastApiError(response);
    }
  };

  const handleMutation = (type: 'Delete' | 'Activate' | 'Deactivate') => {
    if (!id) return appToast.Warning('RFID not found');

    return setActiveModal({
      modalType: 'PROMT_MODAL',
      shouldBackgroundClose: true,
      promptModal: {
        title: `${type} RFID?`,
        description: `You are about to ${type?.toLowerCase?.()} an RFID with number ${truncateText(
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
        <RFIDActionsModal
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
        <RFIDRow
          data={formattedParam}
          contentContainerStyle={styles.row}
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
  instructions: {
    paddingVertical: Size.calcHeight(8),
    fontFamily: fonts.INTER_500,
    paddingHorizontal: Size.calcWidth(21),
    borderBottomColor: colors.WHITE_300,
  },

  row: {
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
});

export default RFIDHistoryScreen;
