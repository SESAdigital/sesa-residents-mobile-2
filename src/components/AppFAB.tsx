import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';
import { MaterialSymbolsAddRounded } from './icons';

interface Props {
  onPress: () => void;
  style?: ViewStyle;
}
const AppFAB = ({ onPress, style }: Props): React.JSX.Element => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <MaterialSymbolsAddRounded
        color={colors.WHITE_100}
        height={Size.calcAverage(28)}
        width={Size.calcAverage(28)}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Size.calcHeight(95),
    right: Size.calcWidth(24),
    backgroundColor: colors.BLUE_200,
    height: Size.calcAverage(56),
    width: Size.calcAverage(56),
    borderRadius: Size.calcAverage(56),
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: colors.BLUE_200,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
});

export default AppFAB;
