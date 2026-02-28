import { SvgProps } from 'react-native-svg';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import AppText from '@src/components/AppText';
import { MaterialSymbolsChevronRightRounded } from '@src/components/icons';
import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';
import fonts from '@src/configs/fonts';

export interface ActionItemData {
  Icon: (props: SvgProps) => React.JSX.Element;
  title: string;
  onPress: () => void;
  rightIcon?: React.JSX.Element;
}

interface Props {
  data: ActionItemData[];
  containerStyle?: StyleProp<ViewStyle>;
}

const ActionItem = ({ data, containerStyle }: Props): React.JSX.Element => {
  return (
    <View style={[styles.actionsContainer, containerStyle]}>
      {data.map(({ Icon, title, onPress, rightIcon }, index) => (
        <TouchableOpacity
          style={styles.actionRow}
          onPress={onPress}
          key={index}
        >
          <Icon
            color={colors.BLACK_100}
            height={Size.calcAverage(24)}
            width={Size.calcAverage(24)}
          />
          <AppText style={styles.actionText}>{title}</AppText>
          {rightIcon ? (
            rightIcon
          ) : (
            <MaterialSymbolsChevronRightRounded
              color={colors.BLACK_100}
              height={Size.calcAverage(24)}
              width={Size.calcAverage(24)}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Size.calcHeight(11),
    borderColor: colors.LIGHT_GRAY_200,
  },

  actionText: {
    flex: 1,
    paddingHorizontal: Size.calcWidth(20),
    fontFamily: fonts.INTER_500,
  },

  actionsContainer: {
    rowGap: Size.calcHeight(6),
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(24),
  },
});

export default ActionItem;
