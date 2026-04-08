import { useQueryClient } from '@tanstack/react-query';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import queryKeys from '@src/api/constants/queryKeys';
import { postAddSelfAsOccupant } from '@src/api/household.api';
import AppText from '@src/components/AppText';
import AppModalHeader from '@src/components/common/AppModalHeader';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useAppStateStore } from '@src/stores/appState.store';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';

interface Props {
  id: number;
  handleNavigation: () => void;
}

const AddAlphaOccupantActionsModal = (props: Props): React.JSX.Element => {
  const { closeActiveModal, setActiveModal, setIsAppModalLoading } =
    useAppStateStore();
  const queryClient = useQueryClient();
  const { handleNavigation, id } = props;

  const handleNoClick = () => {
    setActiveModal({
      modalType: 'EMPTY_MODAL',
      shouldBackgroundClose: true,
      emptyModalComponent: <AddAlphaOccupantActionsModal {...props} />,
    });
  };

  const onMyselfAddSubmit = async () => {
    setIsAppModalLoading(true);
    const response = await postAddSelfAsOccupant({
      isAlpha: true,
      propertyUnitId: id,
    });
    setIsAppModalLoading(false);

    if (response?.ok) {
      queryClient.resetQueries({ queryKey: [queryKeys.GET_HOUSEHOLDS] });
      appToast.Success(
        response?.data?.message || 'You have been added as an alpha occupant',
      );
      closeActiveModal();
    } else {
      handleToastApiError(response);
    }
  };

  const onMyselfAdd = () => {
    setActiveModal({
      modalType: 'PROMT_MODAL',
      shouldBackgroundClose: false,
      promptModal: {
        title: 'Adding yourself?',
        description:
          'Adding yourself as an alpha occupant means you live in this property and are a member of this household. Are you sure you want to proceed?',
        noButtonTitle: 'Cancel',
        yesButtonTitle: "Yes, I'm Sure",
        onYesButtonClick: onMyselfAddSubmit,
        onNoButtonClick: handleNoClick,
      },
    });
  };

  const onAddAplha = () => {
    closeActiveModal();
    handleNavigation?.();
  };

  const actions = [
    {
      title: 'Add alpha occupant',
      description: 'Add another alpha occupant',
      onPress: onAddAplha,
    },
    {
      title: 'Add myself',
      description: 'Make myself an alpha occupant',
      onPress: onMyselfAdd,
    },
  ];

  return (
    <View style={styles.modalContainer}>
      <AppModalHeader onBackPress={closeActiveModal} title="Select an option" />

      {actions?.map(({ onPress, title, description }, key) => {
        return (
          <TouchableOpacity
            onPress={onPress}
            style={styles.actionItem}
            key={key}
          >
            <AppText style={{ fontFamily: fonts.INTER_500 }}>{title}</AppText>
            <AppText style={styles.description}>{description}</AppText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  actionItem: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(25),
    borderTopWidth: Size.calcHeight(1),
    borderTopColor: colors.WHITE_300,
  },

  description: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
    paddingTop: Size.calcHeight(4),
  },

  modalContainer: {
    backgroundColor: colors.WHITE_100,
    borderRadius: Size.calcAverage(12),
    overflow: 'hidden',
  },
});

export default AddAlphaOccupantActionsModal;
