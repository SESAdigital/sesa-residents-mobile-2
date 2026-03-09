import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FlatList, StyleSheet } from 'react-native';

import queryKeys from '@src/api/constants/queryKeys';
import {
  deleteEmergencyContact,
  getEmergencyContacts,
  GetEmergencyContactsResData,
} from '@src/api/profile.api';
import AppFAB from '@src/components/AppFAB';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import DuplicateLoader from '@src/components/DuplicateLoader';
import EmptyTableComponent from '@src/components/EmptyTableComponent';
import colors from '@src/configs/colors';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { useAppStateStore } from '@src/stores/appState.store';
import { truncateText } from '@src/utils';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import EmergecyContactListRow, {
  EmergecyContactListRowLoader,
} from './components/EmergecyContactListRow';
import EmergencyContactActionModal from './components/EmergencyContactActionModal';

const maxContacts = 3;
const queryKey = [queryKeys.GET_EMERGENCY_CONTACTS];

const EmergencyContactListScreen = (): React.JSX.Element => {
  const queryClient = useQueryClient();
  const navigation = useAppNavigator();
  const { setActiveModal, closeActiveModal, setIsAppModalLoading } =
    useAppStateStore();

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getEmergencyContacts();
      if (response.ok) {
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
  });

  const refetch = () => queryClient.resetQueries({ queryKey });

  const handleAdd = () => {
    if (!data) return;
    if (data?.length >= maxContacts)
      return appToast.Warning('You can only add 3 emergency contacts.');

    return navigation.navigate(routes.EMERGENCY_CONTACTS_SCREEN);
  };

  const handleEdit = (id: number) => {
    closeActiveModal();
    navigation.navigate(routes.MANAGE_EMERGENCY_CONTACT_SCREEN, { id });
  };

  const onDelete = async (id: number) => {
    setIsAppModalLoading(true);
    const response = await deleteEmergencyContact(id);
    setIsAppModalLoading(false);

    if (response.ok) {
      appToast.Success(
        response?.data?.message || 'Emergency contact deleted successfully',
      );
      queryClient.resetQueries({ queryKey });
      closeActiveModal();
    } else {
      handleToastApiError(response);
    }
  };

  const handleDelete = (value: GetEmergencyContactsResData) => {
    const firstName = value?.name?.split(' ')?.[0];
    const lastName = value?.name?.split(' ')?.[1];

    setActiveModal({
      modalType: 'PROMT_MODAL',
      shouldBackgroundClose: true,
      promptModal: {
        title: 'Delete Contact',
        description: `You are about to delete an emergency contact with name ${truncateText(
          `${firstName || ''} ${lastName || ''}`,
          20,
        )}. Are you sure you want to continue?`,
        yesButtonTitle: "Yes, I'm Sure",
        noButtonTitle: 'No, Cancel',
        onNoButtonClick: () => handleModal(value),
        onYesButtonClick: () => onDelete(value?.id),
      },
    });
  };

  const handleModal = (value: GetEmergencyContactsResData) => {
    setActiveModal({
      modalType: 'EMPTY_MODAL',
      shouldBackgroundClose: true,
      emptyModalComponent: (
        <EmergencyContactActionModal
          data={value}
          onEdit={() => handleEdit(value?.id)}
          onDelete={() => handleDelete(value)}
        />
      ),
    });
  };

  return (
    <AppScreen showDownInset>
      <AppScreenHeader title="Emergency contacts" />
      <AppText style={styles.headerText}>
        {data?.length || 0} of {maxContacts} Contacts
      </AppText>

      <FlatList
        refreshControl={
          <AppRefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        data={data || []}
        ListEmptyComponent={
          isLoading ? (
            <DuplicateLoader loader={<EmergecyContactListRowLoader />} />
          ) : (
            <EmptyTableComponent title="Sorry, no contact(s) found." />
          )
        }
        showsVerticalScrollIndicator
        renderItem={({ item }) => (
          <EmergecyContactListRow
            data={item}
            onPress={() => handleModal(item)}
          />
        )}
        keyExtractor={(_, index) => index?.toString()}
      />
      <AppFAB onPress={handleAdd} />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  headerText: {
    paddingVertical: Size.calcHeight(4),
    paddingHorizontal: Size.calcWidth(21),
    fontSize: Size.calcAverage(12),
    borderBottomWidth: Size.calcHeight(1),
    color: colors.GRAY_100,
    borderBottomColor: colors.WHITE_300,
  },
});

export default EmergencyContactListScreen;
