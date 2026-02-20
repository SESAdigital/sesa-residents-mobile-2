import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import AppText from '../AppText';

const quickAmounts = [5000, 10_000, 20_000, 50_000];

interface Props {
  onSelect: (val: string) => void;
  style?: StyleProp<ViewStyle>;
}

const QuickAmounts = ({ onSelect, style }: Props): React.JSX.Element => {
  return (
    <View style={[styles.quickAmountContainer, style]}>
      {quickAmounts?.map((amount, key) => (
        <TouchableOpacity
          onPress={() => onSelect(amount?.toLocaleString())}
          key={key}
        >
          <AppText style={styles.quickAmount}>
            {amount?.toLocaleString()}
          </AppText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  quickAmount: {
    paddingVertical: Size.calcHeight(8),
    paddingHorizontal: Size.calcWidth(12),
    fontSize: Size.calcAverage(12),
    backgroundColor: colors.LIGHT_GRAY_100,
    borderRadius: 100,
    borderWidth: Size.calcAverage(1),
    borderColor: colors.LIGHT_GRAY_700,
    fontFamily: fonts.INTER_500,
    color: colors.GRAY_100,
  },

  quickAmountContainer: {
    flexDirection: 'row',
    gap: Size.calcAverage(10),
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

export default QuickAmounts;
