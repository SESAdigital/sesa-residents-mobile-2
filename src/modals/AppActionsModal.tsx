import { StyleSheet, TouchableOpacity, View } from 'react-native';

import AppText from '@src/components/AppText';
import { MaterialSymbolsCloseRounded } from '@src/components/icons';
import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';
import { useAppStateStore } from '@src/stores/appState.store';
import fonts from '@src/configs/fonts';

export interface ActionData {
  icon: React.JSX.Element;
  title: string;
  onPress: () => void;
}

interface Props {
  actions: ActionData[];
}

const AppActionsModal = ({ actions }: Props): React.JSX.Element => {
  const { closeActiveModal } = useAppStateStore();
  return (
    <View style={styles.list}>
      <TouchableOpacity onPress={closeActiveModal} style={styles.closeButton}>
        <MaterialSymbolsCloseRounded
          height={Size.calcAverage(20)}
          width={Size.calcAverage(20)}
          color={colors.RED_100}
        />
      </TouchableOpacity>

      {actions?.map(({ icon, title, onPress }, key) => (
        <TouchableOpacity
          onPress={() => {
            onPress?.();
            closeActiveModal();
          }}
          style={styles.listButton}
          key={key}
        >
          {icon}
          <AppText style={styles.listText}>{title}</AppText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    marginLeft: 'auto',
    marginBottom: Size.calcHeight(5),
  },

  list: {
    backgroundColor: colors.WHITE_200,
    borderRadius: Size.calcAverage(8),
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(22),
  },

  listButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Size.calcHeight(15),
  },

  listText: {
    fontFamily: fonts.INTER_500,
    color: colors.GRAY_400,
    paddingLeft: Size.calcWidth(10),
  },
});

export default AppActionsModal;
