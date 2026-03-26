import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { GetEmergencyContactsResData } from '@src/api/profile.api';
import AppAvatar from '@src/components/AppAvatar';
import AppText from '@src/components/AppText';
import AppModalHeader from '@src/components/common/AppModalHeader';
import {
  MaterialSymbolsCall,
  MaterialSymbolsDeleteOutline,
  MaterialSymbolsEditOutline,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useAppStateStore } from '@src/stores/appState.store';
import Size from '@src/utils/useResponsiveSize';

interface Props {
  data: GetEmergencyContactsResData;
  onEdit: () => void;
  onDelete: () => void;
}
const EmergencyContactActionModal = (props: Props): React.JSX.Element => {
  const { closeActiveModal } = useAppStateStore();
  const { data, onDelete, onEdit } = props;
  const firstName = data?.name?.split(' ')[0];
  const lastName = data?.name?.split(' ')[1];

  const actions = [
    {
      title: 'Edit emergency contact',
      onPress: onEdit,
      Icon: MaterialSymbolsEditOutline,
    },
    {
      title: 'Delete emergency contact',
      onPress: onDelete,
      Icon: MaterialSymbolsDeleteOutline,
    },
  ];

  return (
    <View style={styles.modalContainer}>
      <AppModalHeader onBackPress={closeActiveModal} title="Contact Options" />
      <View style={styles.profileContainer}>
        <View style={styles.profileDetails}>
          <AppText style={styles.profileName}>{data?.name}</AppText>

          <View style={styles.row2}>
            <MaterialSymbolsCall
              height={Size.calcAverage(12)}
              width={Size.calcAverage(12)}
              color={colors.GRAY_100}
            />
            <AppText style={styles.profileText}>{data?.phoneNumber}</AppText>
          </View>
        </View>
        <AppAvatar
          firstWord={firstName}
          lastWord={lastName}
          style={styles.profileImage}
        />
      </View>
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
  modalContainer: {
    backgroundColor: colors.WHITE_100,
    borderRadius: Size.calcAverage(12),
    overflow: 'hidden',
  },

  profileContainer: {
    flexDirection: 'row',
    columnGap: Size.calcWidth(12),
    paddingHorizontal: Size.calcWidth(21),
    justifyContent: 'space-between',
    paddingVertical: Size.calcHeight(13),
  },

  profileDetails: {
    rowGap: Size.calcHeight(6),
  },

  profileImage: {
    height: Size.calcAverage(40),
    width: Size.calcAverage(40),
    borderRadius: Size.calcAverage(40),
  },

  profileName: {
    fontFamily: fonts.INTER_500,
    color: colors.BLACK_300,
  },

  profileText: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },

  row2: {
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: Size.calcWidth(4),
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
});

export default EmergencyContactActionModal;
