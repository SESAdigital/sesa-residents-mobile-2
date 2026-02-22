import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Contacts, { Contact } from 'react-native-contacts';
import { useEffect, useState } from 'react';

import AppText from '@src/components/AppText';
import SubmitButton from '@src/components/forms/SubmitButton';
import { MaterialSymbolsCloseRounded } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import AppModalContainer from './AppModalContainer';
import AppSearchInput from '@src/components/forms/AppSearchInput';
import AppContactRow, {
  AppContactRowLoader,
} from '@src/components/custom/AppContactRow';
import EmptyTableComponent from '@src/components/EmptyTableComponent';
import DuplicateLoader from '@src/components/DuplicateLoader';
import { useAppStateStore } from '@src/stores/appState.store';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';

interface Props {
  onClose: () => void;
  isVisible: boolean;
  onSelect: (val: string) => void;
}

const AppPhoneInputModal = (props: Props): React.JSX.Element => {
  const { onClose, isVisible, onSelect } = props;
  const [mutatedContacts, setMutatedContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { allPhoneContacts, setAllPhoneContacts } = useAppStateStore();

  const getAllContacts = async () => {
    try {
      setIsLoading(true);
      const searchResults = await Contacts.getAll();
      const sortedContacts = searchResults.sort((a, b) =>
        (a?.displayName || '').localeCompare(b?.displayName || ''),
      );
      setAllPhoneContacts(sortedContacts);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error getting contacts:', error);
      Alert.alert('Error', `Failed to get contacts. ${error}`);
    }
  };

  const searchContacts = async (searchText: string) => {
    try {
      setIsLoading(true);
      const searchResults = await Contacts?.getContactsMatchingString(
        searchText,
      );
      setMutatedContacts(searchResults);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error searching contacts:', error);
      Alert.alert('Error', 'Failed to search contacts.');
    }
  };

  useEffect(() => {
    if (allPhoneContacts?.length < 1) {
      getAllContacts();
    }
  }, []);

  useEffect(() => {
    if (searchValue?.trim()) {
      searchContacts(searchValue);
    }
  }, [searchValue]);

  const getData = () => {
    if (isLoading) return [];
    if (!searchValue) return allPhoneContacts;
    return mutatedContacts;
  };

  const refetch = () => {
    if (searchValue?.trim()) {
      searchContacts(searchValue);
    } else {
      getAllContacts();
    }
  };

  return (
    <AppModalContainer
      isVisible={isVisible}
      style={{ padding: 0 }}
      onClose={() => {}}
    >
      <FlatList
        refreshControl={
          <AppRefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        data={getData()}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <View style={{ backgroundColor: colors.WHITE_100 }}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.modalCloseContainer}
                onPress={onClose}
              >
                <MaterialSymbolsCloseRounded
                  height={Size.calcAverage(28)}
                  width={Size.calcAverage(28)}
                  color={colors.BLUE_120}
                />
              </TouchableOpacity>
              <AppText style={styles.modalHeaderTitle}>Select Contact</AppText>
            </View>
            <View style={styles.modalSearchContainer}>
              <AppSearchInput
                placeholder="Search contacts"
                disabled={isLoading}
                onSearchDone={val => setSearchValue(val)}
              />
            </View>
          </View>
        }
        ListEmptyComponent={
          isLoading ? (
            <DuplicateLoader loader={<AppContactRowLoader />} />
          ) : (
            <EmptyTableComponent title="Sorry, no contact(s) found." />
          )
        }
        style={styles.modalContainer}
        showsVerticalScrollIndicator
        renderItem={({ item }) => (
          <AppContactRow onSelect={onSelect} val={item} />
        )}
        keyExtractor={(_, index) => index?.toString()}
      />
      <View style={styles.modalFooter}>
        <SubmitButton onPress={onClose} variant="SECONDARY" title="Close" />
      </View>
    </AppModalContainer>
  );
};

const styles = StyleSheet.create({
  modalCloseContainer: {
    position: 'absolute',
    left: Size.calcWidth(21),
    padding: Size.calcAverage(5),
    top: Size.calcHeight(3),
    bottom: Size.calcHeight(3),
    justifyContent: 'center',
    zIndex: 2,
  },

  modalContainer: {
    backgroundColor: colors.WHITE_100,
    borderTopLeftRadius: Size.calcAverage(12),
    borderTopRightRadius: Size.calcAverage(12),
    overflow: 'hidden',
    maxHeight: Size.getHeight() / 1.4,
    marginTop: Size.calcHeight(10),
  },

  modalFooter: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(18),
    borderTopColor: colors.WHITE_300,
    borderTopWidth: Size.calcHeight(2),
    backgroundColor: colors.WHITE_100,
  },

  modalHeader: {
    padding: Size.calcAverage(16),
    position: 'relative',
  },

  modalHeaderTitle: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(16),
    textAlign: 'center',
  },

  modalSearchContainer: {
    paddingHorizontal: Size.calcWidth(10),
    paddingBottom: Size.calcHeight(10),
  },
});
export default AppPhoneInputModal;
