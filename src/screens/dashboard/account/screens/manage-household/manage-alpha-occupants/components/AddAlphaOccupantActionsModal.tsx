import { useQueryClient } from '@tanstack/react-query';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { postAddSelfAsOccupant } from '@src/api/household.api';
import AppText from '@src/components/AppText';
import AppModalHeader from '@src/components/common/AppModalHeader';
import {
  MaterialSymbolsLightGroupOutline,
  MaterialSymbolsLightSupervisorAccountOutline,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { useAppStateStore } from '@src/stores/appState.store';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import queryKeys from '@src/api/constants/queryKeys';

interface Props {
  name: string;
  id: number;
}

const AddAlphaOccupantActionsModal = (props: Props): React.JSX.Element => {
  const { closeActiveModal, setActiveModal, setIsAppModalLoading } =
    useAppStateStore();
  const queryClient = useQueryClient();
  const navigation = useAppNavigator();

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
      propertyUnitId: props?.id,
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
    navigation.navigate(routes.ADD_ALPHA_OCCUPANT_SCREEN, props);
  };

  const actions = [
    {
      title: 'Add alpha occupant',
      description: 'Add another alpha occupant',
      onPress: onAddAplha,
      Icon: MaterialSymbolsLightGroupOutline,
    },
    {
      title: 'Add myself',
      description: 'Make myself an alpha occupant',
      onPress: onMyselfAdd,
      Icon: MaterialSymbolsLightSupervisorAccountOutline,
    },
  ];

  return (
    <View style={styles.modalContainer}>
      <AppModalHeader onBackPress={closeActiveModal} title="Select an option" />

      {actions?.map(({ Icon, onPress, title, description }, key) => {
        return (
          <TouchableOpacity
            onPress={onPress}
            style={styles.actionItem}
            key={key}
          >
            <Icon
              height={Size.calcAverage(20)}
              width={Size.calcAverage(20)}
              color={colors.GRAY_100}
            />
            <View style={{ flexShrink: 1 }}>
              <AppText style={{ fontFamily: fonts.INTER_500 }}>{title}</AppText>
              <AppText style={styles.description}>{description}</AppText>
            </View>
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
