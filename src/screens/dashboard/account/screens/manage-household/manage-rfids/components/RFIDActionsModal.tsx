import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { AccessCardStatusTypeData } from '@src/api/constants/default';
import { GetHouseholdRFIDsResData } from '@src/api/household.api';
import AppText from '@src/components/AppText';
import AppModalHeader from '@src/components/common/AppModalHeader';
import {
  MaterialSymbolsDeleteOutline,
  MaterialSymbolsEditOutline,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useAppStateStore } from '@src/stores/appState.store';
import Size from '@src/utils/useResponsiveSize';
import RFIDRow from './RFIDRow';

interface Props {
  data: GetHouseholdRFIDsResData;
  onStatusToggle: () => void;
  onDelete: () => void;
}
const RFIDActionsModal = (props: Props): React.JSX.Element => {
  const { closeActiveModal } = useAppStateStore();
  const { data, onDelete, onStatusToggle } = props;

  const actions = [
    {
      title: `${
        data?.status === AccessCardStatusTypeData.Active
          ? 'Deactivate'
          : 'Activate'
      } RFID`,
      onPress: onStatusToggle,
      Icon: MaterialSymbolsEditOutline,
    },
    {
      title: 'Delete RFID',
      onPress: onDelete,
      Icon: MaterialSymbolsDeleteOutline,
    },
  ];

  return (
    <View style={styles.modalContainer}>
      <AppModalHeader onBackPress={closeActiveModal} title="Options" />
      <RFIDRow
        data={data}
        contentContainerStyle={styles.accessCardRow}
        containerStyle={styles.accessCardRowContainer}
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
  accessCardRow: {
    paddingBottom: 0,
    borderBottomWidth: 0,
  },

  accessCardRowContainer: {
    paddingTop: Size.calcHeight(20),
    paddingBottom: Size.calcHeight(20),
  },

  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: Size.calcWidth(10),
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(25),
    borderTopWidth: Size.calcHeight(1),
    borderTopColor: colors.WHITE_300,
  },

  modalContainer: {
    backgroundColor: colors.WHITE_100,
    borderRadius: Size.calcAverage(12),
    overflow: 'hidden',
  },
});

export default RFIDActionsModal;
