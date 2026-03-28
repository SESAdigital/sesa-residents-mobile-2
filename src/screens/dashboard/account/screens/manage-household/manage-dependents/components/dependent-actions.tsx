import { useQueryClient } from '@tanstack/react-query';
import { ApiResponse } from 'apisauce';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { GenericApiResponse } from '@src/api/base.api';
import { AccessCardStatusTypeData } from '@src/api/constants/default';
import queryKeys from '@src/api/constants/queryKeys';
import {
  deleteDependent,
  GetHouseholdPropertyDependentsResData,
  patchDependentStatus,
} from '@src/api/household.api';
import AppText from '@src/components/AppText';
import AppModalHeader from '@src/components/common/AppModalHeader';
import {
  MaterialSymbolsDeleteOutline,
  MaterialSymbolsEditOutline,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import { useAppStateStore } from '@src/stores/appState.store';
import { truncateText } from '@src/utils';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import ManageDependentRow from './ManageDependentRow';

export const useDependentActions = () => {
  const { setActiveModal, setIsAppModalLoading, closeActiveModal } =
    useAppStateStore();
  const queryClient = useQueryClient();
  const navigation = useAppNavigator();

  const onMutate = async (
    status: 'Delete' | 'Activate' | 'Deactivate',
    id: number,
  ) => {
    let response: ApiResponse<GenericApiResponse, GenericApiResponse> | null =
      null;

    setIsAppModalLoading(true);
    if (status === 'Delete') {
      response = await deleteDependent(id);
    } else {
      response = await patchDependentStatus({ id, status });
    }
    setIsAppModalLoading(false);

    if (response.ok) {
      queryClient.resetQueries({ queryKey: [queryKeys.GET_HOUSEHOLDS] });
      if (status === 'Delete') {
        navigation.goBack();
      }
      closeActiveModal();
      appToast.Success(
        response?.data?.message || `${status}d dependent successfully`,
      );
    } else {
      handleToastApiError(response);
    }
  };

  const handleMutation = (
    type: 'Delete' | 'Activate' | 'Deactivate',
    val: GetHouseholdPropertyDependentsResData,
  ) => {
    if (!val?.id) return appToast.Warning('Dependent not found');

    return setActiveModal({
      modalType: 'PROMT_MODAL',
      shouldBackgroundClose: true,
      promptModal: {
        title: `${type} dependent?`,
        description: `You are about to ${type?.toLowerCase?.()} a dependent with name ${truncateText(
          val?.name,
          20,
        )}. Are you sure you want to continue?`,
        yesButtonTitle: "Yes, I'm Sure",
        yesButtonProps: { variant: type === 'Activate' ? 'PRIMARY' : 'DANGER' },
        noButtonTitle: 'No, Cancel',
        onNoButtonClick: () => handleModal(val),
        onYesButtonClick: () => onMutate(type, val.id),
      },
    });
  };

  const handleModal = (data: GetHouseholdPropertyDependentsResData) => {
    const statusTitle =
      data?.status === AccessCardStatusTypeData.InActive
        ? 'Activate'
        : 'Deactivate';

    setActiveModal({
      modalType: 'EMPTY_MODAL',
      shouldBackgroundClose: true,
      emptyModalComponent: (
        <DependentActionsModal
          data={data}
          statusTitle={statusTitle}
          onStatusToggle={() => handleMutation(statusTitle, data)}
          onDelete={() => handleMutation('Delete', data)}
        />
      ),
    });
  };

  return { handleModal };
};

interface DependentActionsModalProps {
  data: GetHouseholdPropertyDependentsResData;
  onStatusToggle: () => void;
  onDelete: () => void;
  statusTitle: 'Activate' | 'Deactivate';
}
const DependentActionsModal = (
  props: DependentActionsModalProps,
): React.JSX.Element => {
  const { closeActiveModal } = useAppStateStore();
  const { data, onDelete, onStatusToggle, statusTitle } = props;

  const actions = [
    {
      title: `${statusTitle} dependent`,
      onPress: onStatusToggle,
      Icon: MaterialSymbolsEditOutline,
    },
    {
      title: 'Delete dependent',
      onPress: onDelete,
      Icon: MaterialSymbolsDeleteOutline,
    },
  ];

  return (
    <View style={styles.modalContainer}>
      <AppModalHeader onBackPress={closeActiveModal} title="Options" />
      <ManageDependentRow
        data={data}
        contentContainerStyle={styles.cardRow}
        containerStyle={styles.cardRowContainer}
      />
      {actions?.map(({ Icon, onPress, title }, key) => {
        const isLast = key === actions?.length - 1;
        return (
          <TouchableOpacity
            onPress={onPress}
            style={styles.actionItem}
            key={key}
          >
            <Icon
              height={Size.calcAverage(20)}
              width={Size.calcAverage(20)}
              color={isLast ? colors.RED_100 : colors.GRAY_100}
            />
            <AppText
              style={[
                { fontFamily: fonts.INTER_500 },
                isLast && { color: colors.RED_100 },
              ]}
            >
              {title}
            </AppText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: Size.calcWidth(10),
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(25),
    borderTopWidth: Size.calcHeight(1),
    borderTopColor: colors.WHITE_300,
  },

  cardRow: {
    paddingBottom: 0,
    borderBottomWidth: 0,
  },

  cardRowContainer: {
    paddingTop: Size.calcHeight(20),
    paddingBottom: Size.calcHeight(20),
  },

  modalContainer: {
    backgroundColor: colors.WHITE_100,
    borderRadius: Size.calcAverage(12),
    overflow: 'hidden',
  },
});
